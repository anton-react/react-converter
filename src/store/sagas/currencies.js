import { all, put, call, takeLatest } from 'redux-saga/effects';

import { ActionTypes } from 'src/store/constants';
import {
  getCurrenciesSuccess,
  convertCurrencySuccess,
} from 'src/store/actions/currencies';

export function* loadCurrenciesSaga({ payload }) {
  const currencies = yield fetch(`${process.env.REACT_APP_API_URL}/symbols`, {
    method: 'GET',
    headers: {
      'x-rapidapi-host': 'fixer-fixer-currency-v1.p.rapidapi.com',
      'x-rapidapi-key': process.env.REACT_APP_API_TOKEN,
    },
  }).then((response) => response.json());

  yield put(getCurrenciesSuccess(currencies.symbols));
}

export function* convertCurrencySaga({ payload: { from, to, amount } }) {
  console.log('payload', { from, to, amount });

  const response = yield fetch(
    `${process.env.REACT_APP_API_URL}/convert?from=${from}&to=${to}&amount=${amount}`,
    {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'fixer-fixer-currency-v1.p.rapidapi.com',
        'x-rapidapi-key': process.env.REACT_APP_API_TOKEN,
      },
    }
  ).then((response) => response.json());

  yield put(convertCurrencySuccess(response));
}

export default function* root() {
  yield all([
    takeLatest(ActionTypes.GET_CURRENCIES, loadCurrenciesSaga),
    takeLatest(ActionTypes.CONVERT_CURRENCY, convertCurrencySaga),
  ]);
}
