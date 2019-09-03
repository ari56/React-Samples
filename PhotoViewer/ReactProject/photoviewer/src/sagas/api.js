/* データ取得関数定義ファイル */
import axios from 'axios'
import {BASE_URL} from '../AppConstant'

// データ取得関数
export const getDataApi = (cate, seq) => {    
  return axios({
    method: 'get',
    url: BASE_URL + 'seq=' + seq + '&cate=' + cate,
  }).then((results) => {
    const data = results.data;
    return {data};
  }).catch((error) => {
    return {error};
  });
}