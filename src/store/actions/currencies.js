import { createActions } from 'redux-actions';
import { ActionTypes } from 'src/store/constants';

export const {
  getCurrencies,
  getCurrenciesSuccess,
  convertCurrency,
  convertCurrencySuccess,
} = createActions({
  [ActionTypes.GET_CURRENCIES]: (payload) => payload,
  [ActionTypes.GET_CURRENCIES_SUCCESS]: (payload) => payload,
  [ActionTypes.CONVERT_CURRENCY]: (payload) => payload,
  [ActionTypes.CONVERT_CURRENCY_SUCCESS]: (payload) => payload,
});
