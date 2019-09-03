import {connect} from 'react-redux';
import {addImage,initCate,setColor,changeBold,changeDisp} from '../actions/actions';
import CustomCardList from '../components/CustomCardList';

// データ転送の定義
const mapStateToProps = state => {
  return state;
}  

// アクションマッピングの定義
const mapDispatchToProps = (dispatch) => {
  return {
    addImage:() => dispatch(addImage()),
    initCate:(cate) => dispatch(initCate(cate)),
    setColor:(color) => dispatch(setColor(color)),
    changeBold:(status) => dispatch(changeBold(status)),
    changeDisp:(status) => dispatch(changeDisp(status)),
  };
}
// コネクト処理
export default connect(mapStateToProps, mapDispatchToProps)(CustomCardList);