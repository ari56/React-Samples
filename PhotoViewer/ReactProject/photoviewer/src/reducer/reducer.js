/* リデューサ関数定義ファイル */
import React from 'react';
import {DISP_MAX} from '../AppConstant';
import CustomCard from '../components/CustomCard';
import {ADD_IMAGE, INIT_CATE, SET_COLOR, CHANGE_DISP,
        CHANGE_BOLD, OPEN_DIALOG, RENEW_DIALOG_DATA,
        CLOSE_ERROR_DIALOG} from '../actions/actions';

// リデューサメイン
const reducer = (state, action) => {

  // 初回アクセス時のデータ用
  if ( action.type.indexOf('@@redux/INIT') !== -1 ) {
    return initReducer(state, action);
  } 
  switch(action.type){
    case INIT_CATE:
      return initCateReducer(state, action);
    case SET_COLOR:
      return setColorReducer(state, action);
    case ADD_IMAGE:
      return addImageReducer(state, action);
    case CHANGE_BOLD:
      return changeBoldReducer(state, action);
    case CHANGE_DISP:
      return changeDispReducer(state, action);
    case OPEN_DIALOG:
      return openDialogReducer(state, action);
    case RENEW_DIALOG_DATA:          
      return renewDialogDataReducer (state, action);
    case CLOSE_ERROR_DIALOG:
      return closeErrorDialogReducer (state, action);
    default:
      return state;
  }
}

// 初回アクセス時の表示用のリデューサ
const initReducer = (state, action) => {
  let newItems = []
  for (let i = 1; i <= 12; i++) {
    newItems.push( React.createElement(CustomCard,
      {key:i, seq:i, cate:'interior', color:'blue',
       dispBold:false, dispMemo:true}));
  }

  return {card:newItems, cardNum:newItems.length,
     color:'blue', curCate:'interior', 
     dispBold:false, dispMemo:true}; 
}

// カテゴリ変更時の表示用のリデューサ
const initCateReducer = (state, action) => {
  let newItems = []
  let data = getCurrentStatus(state.card[0].props);
  data['cate'] = action.cate;
  for (let i = 0; i < 12; i++) {
    data['key'] = i + 1;
    data['seq'] = i + 1;
    newItems.push(React.createElement(CustomCard,data));
  }

  return Object.assign({}, state, {
    card:newItems, 
    cardNum:newItems.length,
    curCate:action.cate
  }); 
}

// データ追加時の表示用のリデューサ
const addImageReducer = (state, action) => {
  let newItems = [];
  
  if ( state.card.length >=DISP_MAX ) {
    return Object.assign({}, state, {
      dataOver: true,
      dispMax:DISP_MAX,
    }); 
  }
  for (let i = 0; i < state.card.length; i++) {
    newItems.push( state.card[i] );
  }
  const lastKey = Number(newItems[newItems.length-1].key);
  const getNum = DISP_MAX < newItems.length + 12 ?
         DISP_MAX - newItems.length : 12 ; 

  let data = getCurrentStatus(state.card[0].props);
  for (let i = 0; i < getNum; i++) {
    data['key'] = lastKey + i + 1;
    data['seq'] = lastKey + i + 1;
    newItems.push(React.createElement(CustomCard,data));
  }
      
  return Object.assign({}, state, {
    card:newItems, 
    cardNum:newItems.length,
  }); 
}

// 文字色変更時の表示用のリデューサ
const setColorReducer = (state, action) => {
  let newItems = []
  for (let i = 0; i < state.card.length; i++) {
    let data = getCurrentStatus(state.card[i].props);
    data['color'] = action.color;
    data['key'] = i + 1;
    data['seq'] = i + 1;
    newItems.push(React.createElement(CustomCard,data));
  }
  return Object.assign({}, state, {
    card:newItems, 
    color:action.color,
  }); 
}

// 表示文字の書体変更時の表示用のリデューサ
const changeBoldReducer = (state, action) => {
  let newItems = []
  
  for (let i = 0; i < state.card.length; i++) {
    let data = getCurrentStatus(state.card[i].props);  
    data['dispBold'] = action.status;
    data['key'] = i + 1;
    data['seq'] = i + 1;
    newItems.push(React.createElement(CustomCard,data));
  }
  
  return Object.assign({}, state, {
    card:newItems,
    dispBold:action.status,
  });      
}

// 表示文字の表示有無変更時の表示用のリデューサ
const changeDispReducer = (state, action) => {
  
  let newItems = []
  for (let i = 0; i < state.card.length; i++) {
    let data = getCurrentStatus(state.card[i].props);  
    data['dispMemo'] = action.status;
    data['key'] = + i + 1;
    data['seq'] = + i + 1;
    newItems.push(React.createElement(CustomCard,data));
  }

  return Object.assign({}, state, {
    card:newItems,
    dispMemo:action.status,
  }); 
}

// 画像アップダイアログ表示時の表示用のリデューサ
const openDialogReducer = (state, action) => {
  
  return Object.assign({}, state, {
    dispDialog:true,
    dialogSeq:action.seq,
    dialogTitle: action.title, 
    dialogImageUrl:action.url, 
  }); 
}

// 画像アップダイアログ更新時の表示用のリデューサ
const renewDialogDataReducer = (state, action) => {

  if (action.data.error) {
    return Object.assign({}, state, {
      err:true
    });
  }
  return Object.assign({}, state, {
    dialogSeq:action.seq,
    dialogTitle: action.data.data.title, 
    dialogImageUrl:action.data.data.url, 
  }); 
}

// エラーダイアログクローズ時の表示用のリデューサ
const closeErrorDialogReducer = (state, action) => {
  return Object.assign({}, state, {
    err:false
  });
}

// カードデータのコピーをする関数
const getCurrentStatus = (src) => {
  const map = {color: src.color, cate: src.cate,
     dispBold: src.dispBold, dispMemo: src.dispMemo};
  return map
}

export default reducer