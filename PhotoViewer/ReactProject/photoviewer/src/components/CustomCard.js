import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardMedia from '@material-ui/core/CardMedia';
import Link from '@material-ui/core/Link';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Slide from '@material-ui/core/Slide';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText'
import {BASE_URL, SPACER_GIF} from '../AppConstant';
import {openDialog, renewDialog, closeErrorDialog} from '../actions/actions';
import $ from 'jquery';
import './CustomCard.css';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// 各画像の表示処理
export const CustomCard = (props) => {
  
  const cate = props.cate;
  const [imageUrl, setImageUrl] = useState(SPACER_GIF);
  const [title, setTitle] = useState('');    
  const [open, setOpen] = useState(false);
  const [errDialog, setErrDialog] = useState(props.err===false);
  var seq = props.seq;
 
  // 画像アップの表示処理
  const showUpImage = () => {
    props.openDialog(seq, imageUrl, title);
    setOpen(true);
  };

  // 画像アップの非表示処理
  const showDownImage = () => {
    setOpen(false);
  };
  
  // 画像アップの前画像表示処理
  const backImage = () => {
    if (props.dialogSeq > 1) {
      props.renewDialog(cate, props.dialogSeq-1);
    }
  }

  // 画像アップの次画像表示処理
  const nextImage = () => {
    if (props.dialogSeq < props.cardNum) {
      props.renewDialog(cate, props.dialogSeq+1);
    } 
  }

  // エラーダイアログの非表示処理
  const errorClose = () => {
    $('.errDialog').find('.MuiPaper-root').css('display','none');
    $(document).click();
    setErrDialog(false);
    props.closeErrorDialog();
    setTimeout( () => {clearError()}, 60 * 1000);
  }

  // エラーダイアログの表示制御に関するリセット処理
  const clearError = () => {
    $('#dataDetail').html('');
  }

  // レンダリング後に実行
  useEffect(() => {
    $('.MuiDialog-scrollPaper').css('display','block');
    $('.MuiDialog-paper').css('margin','40px auto');
    $('.MuiPaper-elevation1').css('box-shadow','0 0 0 0');
  })

  // 画像データの取得処理
  const getData = (seq, cate, setImageUrl, setTitle) => {
    fetch( BASE_URL + 'seq=' + seq + '&cate=' + cate, {  
      method: 'GET',
      mode: 'cors',
      credentials: 'omit',
      headers: {
        'Access-Control-Request-Methods': 'GET',
        'Access-Control-Request-Headers': 
                  'accept, origin, content-type'
      }
    }
    ).then((response) => response.json()
    ).then(data => {
      setImageUrl(data['url']);
      setTitle(data['title']);
    }).catch( () => {
      if ($('#dataDetail').html().length===0) {
        $('#dataDetail').html('err');
        setErrDialog(true);
        $('.errDialogButtonOk').css('margin','0 auto');
      }
    })
  }
  getData (seq, cate, setImageUrl, setTitle);
  return (
      <Grid item key={seq} xs={12} sm={6} md={4}>
        <Card className='card'>
          <Link onClick={()=>showUpImage()} underline="none">
            <CardMedia className='cardMedia'
                image={imageUrl}>
              <div style=
                {{color: props.color, 
                fontWeight: props.dispBold? 'bold':'normal',
                opacity: props.dispMemo? 1: 0
                }} className="imageTitle">
                {title}
              </div>
            </CardMedia>
          </Link>
        </Card>
        { /* 画像アップのダイアログ */ }
        <Dialog open={open} onClose={showDownImage}
            TransitionComponent={Transition}
            keepMounted>
            <DialogTitle className="detailDialogTitle">
              {props.dialogTitle? props.dialogTitle : ''}
            </DialogTitle>  
          <DialogContent className="detailDialog">
            <Card className='card' >
              <div className='dialogInner'>
                <Chip label='前の画像' color='primary' 
                  variant={(props.dialogSeq === 1 ? 'outlined' : 'default')}
                  onClick={()=>backImage()} className='chipBack' />
                <Chip label='次の画像' color='primary' 
                  variant={ (props.dialogSeq === props.cardNum ? 'outlined':'default') }  
                  onClick={()=>nextImage()} className='chipNext' />
              </div>
              <CardMedia className='cardMediaDialog'
                image={props.dialogImageUrl?props.dialogImageUrl:SPACER_GIF} />
            </Card>
          </DialogContent>
        </Dialog>
        { /* エラーメッセージのダイアログ */ }
        <Dialog open={errDialog} onClose={errorClose}
          className="errDialog">
          <DialogTitle>
            サーバ通信エラー
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              サーバからのデータ取得に失敗しました<br/>
              尚、このメッセージにつきましては、<br/>
              1分以内のリトライの失敗については表示しておりません
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={errorClose} color="default"
            className="errDialogButtonOk">
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    );
  }

  // データ転送の定義
  const mapStateToProps = state => {
    return state;
  }
    
  // アクションマッピングの定義
  const mapDispatchToProps = (dispatch) => {
    return {
      openDialog:(seq,url,title) => 
              dispatch(openDialog(seq,url,title)),
      renewDialog:(cate,seq) => dispatch(renewDialog(cate,seq)),
      closeErrorDialog:() => dispatch(closeErrorDialog())
  };
}

// コネクト処理
export default connect(mapStateToProps, mapDispatchToProps)(CustomCard);
