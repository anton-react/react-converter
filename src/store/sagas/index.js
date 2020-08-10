import { all, fork } from 'redux-saga/effects';

import currencies from 'src/store/sagas/currencies';

export default function* root() {
  yield all([fork(currencies)]);
}
