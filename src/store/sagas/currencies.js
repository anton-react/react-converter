import { all, put, call, takeLatest } from 'redux-saga/effects';

import { ActionTypes } from 'src/store/constants';
import {
  getCurrenciesSuccess,
  getCurrenciesFailure,
} from 'src/store/actions/currencies';

export function* authenticateSaga({ payload }) {
  const currencies = yield fetch(
    `${process.env.REACT_APP_API_URL}/currencies.json`
  )
    .then((res) => res.json())
    .catch((err) => {
      console.log('err', err);
    });
  yield put(getCurrenciesSuccess(currencies));
}

export default function* root() {
  yield all([takeLatest(ActionTypes.GET_CURRENCIES, authenticateSaga)]);
}
