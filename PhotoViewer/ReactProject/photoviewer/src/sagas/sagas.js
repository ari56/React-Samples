/* SAGAモデュール定義ファイル */

import {put, call, takeEvery} from 'redux-saga/effects';
import {RENEW_DIALOG, renewDialogData} from '../actions/actions';
import {getDataApi} from './api';

// 画像アップの更新のための画像取得用
function* renewDialog(action) {
  const cate = action.cate
  const seq = action.seq
  
  const json = yield call(getDataApi, cate, seq);
  yield put(renewDialogData(seq,　json));  
}

// ルートSAGA定義
export default function* rootSaga() {
  yield takeEvery(RENEW_DIALOG, renewDialog);
}
