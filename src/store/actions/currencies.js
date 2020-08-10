import { createActions } from 'redux-actions';
import { ActionTypes } from 'src/store/constants';

export const {
  getCurrencies,
  getCurrenciesSuccess,
  getCurrenciesFailure,
} = createActions({
  [ActionTypes.GET_CURRENCIES]: (payload) => payload,
  [ActionTypes.GET_CURRENCIES_SUCCESS]: (payload) => payload,
  [ActionTypes.GET_CURRENCIES_FAILURE]: (payload) => payload,
});
