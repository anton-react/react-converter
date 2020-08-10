import { handleActions } from 'redux-actions';

import { ActionTypes } from 'src/store/constants';

export const initialState = {
  loading: false,
  currencies: [],
};

export default {
  currencies: handleActions(
    {
      [ActionTypes.GET_CURRENCIES]: (state) => {
        return {
          ...state,
          loading: true,
        };
      },
      [ActionTypes.GET_CURRENCIES_SUCCESS]: (state, { payload }) => {
        debugger;
        return {
          ...state,
          loading: false,
          currencies: Object.entries(payload).reduce((acc, [key, value]) => {
            debugger;
            return [
              ...acc,
              {
                key,
                value,
              },
            ];
          }, []),
        };
      },
    },
    initialState
  ),
};
