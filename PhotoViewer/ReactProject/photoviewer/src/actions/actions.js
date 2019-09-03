/* アクション関数定義ファイル */

export const INIT_CATE = 'INIT_CATE';
export const ADD_IMAGE = 'ADD_IMAGE';
export const SET_COLOR = 'SET_COLOR';
export const CHANGE_DISP = 'CHANGE_DISP';
export const CHANGE_BOLD = 'CHANGE_BOLD';
export const OPEN_DIALOG = 'OPEN_DIALOG';
export const RENEW_DIALOG = 'RENEW_DIALOG';
export const RENEW_DIALOG_DATA = 'RENEW_DIALOG_DATA'
export const CLOSE_ERROR_DIALOG = 'CLOSE_ERROR_DIALOG';


// カテゴリ変更時のアクション
export const initCate = (cate) => ({
  type: INIT_CATE,
  cate: cate,
});

// カテゴリ変更時のアクション
export const addImage = () => ({
  type: ADD_IMAGE,
});

// 文字色変更時のアクション
export const setColor = (color) => ({
  type: SET_COLOR,
  color: color,
});

// 表示文字の書体変更時のアクション
export const changeBold = (status) => ({
  type: CHANGE_BOLD,
  status: status,
});

// 表示文字の表示有無変更時のアクション
export const changeDisp = (status) => ({
  type: CHANGE_DISP,
  status: status,
});

// 画像アップダイアログ表示時のアクション
export const openDialog = (seq,url,title) => ({
  type: OPEN_DIALOG,
  seq: seq,
  url: url,
  title: title,
}); 

// 画像アップダイアログ表示時のアクション
export const renewDialog = (cate,seq) => ({
  type: RENEW_DIALOG,
  seq: seq,
  cate: cate,
}); 

// 画像アップダイアログ表示時のアクション(sagaからのコール用)
export const renewDialogData = (seq,data) => ({
  type: RENEW_DIALOG_DATA,
  seq: seq,
    data: data,
}); 

// エラーダイアログクローズ時のアクション
export const closeErrorDialog = () => ({
  type: CLOSE_ERROR_DIALOG,
}); 
