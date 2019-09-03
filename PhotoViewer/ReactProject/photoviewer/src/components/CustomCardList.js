import React, {useEffect} from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Switch from '@material-ui/core/Switch';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import './CustomCardList.css';

// ツールチップの表示定義
const HtmlTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',  
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}))(Tooltip);

// 動的スタイルの定義
const useStyles = makeStyles(theme => ({
  overMessage: {
    margin: theme.spacing(5),
  },
}));

// 画面全体の表示
const CustomCardList = (props) => {
  const classes = useStyles();

  // 文字色選択のトグル処理
  const handleColorToggle = (event, toggle) => {
    props.setColor(toggle);
  };

  // 太文字表示のトグル処理
  const handleBold = () => event => {
    props.changeBold(event.target.checked);
  };

  // 文字表示のトグル処理
  const handleDisp = () => event => {
    props.changeDisp(event.target.checked);
  };

  // 無限スクロールの処理
  const getMoreOrNone = (e) =>  {
    const pagesize = document.documentElement.scrollHeight || document.body.scrollHeight;
    const scrollsize = document.documentElement.scrollTop || document.body.scrollTop;
    
    if ( pagesize - scrollsize < 700 ) {
      props.addImage();
    }
  }

  // スクロールのイベントハンドラ
  const handleScroll = (e) => {
    getMoreOrNone(e);
  }

  // リサイズのイベントハンドラ
  const handleResize = (e) => {
    getMoreOrNone(e);
  }

  // レンダリング後に実行
  useEffect(() => { 
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize); 
  })

  // 色選択のボタン定義
  const colorBtns = [
    {message: '概要の文字色を青に変更', className: 'btnBlue', 
    value: 'blue'},
    {message: '概要の文字色を赤に変更', className: 'btnRed', 
    value: 'red'},
    {message: '概要の文字色を黑に変更', className: 'btnBlack', 
    value: 'black'},
    {message: '概要の文字色を白に変更', className: 'btnWhite', 
    value: 'white'}];

  // カテゴリ選択のボタン定義  
  const categoryBtns = [
      {message: 'インテリアの画像を表示', displayName: 'インテリア', 
      value: 'interior'},
      {message: 'デザインの画像を表示', displayName: 'デザイン', 
      value: 'design'},
      {message:'芸術の画像を表示', displayName: '芸術', 
      value: 'art'},
      {message: '風景の画像を表示', displayName: '風景', 
      value: 'landscape'},
      {message:'写真の画像を表示', displayName: '写真', 
      value: 'picture'}, 
      {message: '壁紙の画像を表示', displayName: '壁紙', 
      value: 'wallpaper'},
      {message: 'すごい画像を表示', displayName: 'すごい', 
      value: 'wow'}, 
      {message: 'なにこれの画像を表示', displayName: 'なにこれ', 
      value: 'whatsthis'},
      {message: 'びっくりの画像を表示', displayName: 'びっくり', 
      value: 'surprised'}];

  return (
    <React.Fragment>
      <CssBaseline />
      <Grid container spacing={2} direction="column" 
          alignItems="center" className='header'>
        <Grid item>
          <ToggleButtonGroup size="large" value={props.color}
                exclusive onChange={handleColorToggle} className="colorBtn">
            { /* 色選択のボタン表示のループ開始 */
              colorBtns.map((btn,index) => { 
              return <HtmlTooltip key={index} title={
                        <React.Fragment>
                          <Typography color="primary">
                            {btn.message}            
                          </Typography>
                        </React.Fragment>
                      }>
                        <ToggleButton className={btn.className} key={index} value={btn.value}>
                          &nbsp;
                        </ToggleButton>  
                      </HtmlTooltip>
              }) /* 色選択のボタン表示のループ終了 */ }
            </ToggleButtonGroup>
            <HtmlTooltip title={
              <React.Fragment>
                <Typography color="primary">
                  概要の表示有無を切り替え            
                </Typography>
              </React.Fragment>
              }>
              <FormControlLabel label="概要" className="labelMemo"
                control={
                    <Switch checked={props.dispMemo} color="primary" 
                      onChange={ handleDisp() } />}
                labelPlacement="top" />
              </HtmlTooltip>     
              <HtmlTooltip title={
                <React.Fragment>
                  <Typography color="primary">
                    概要の太文字表示を切り替え            
                  </Typography>
                </React.Fragment>
              }>
                <FormControlLabel className="labelBold"
                    disabled={ props.dispMemo === false} label="太字"
                    control={
                        <Switch color="primary" 
                            onChange={ handleBold() }/>}
                    labelPlacement="top" />
              </HtmlTooltip>      
        </Grid>
      </Grid>

      <div id="btnCate" >
        { /* カテゴリ選択のボタン表示のループ開始 */
          categoryBtns.map((btn,index) => {         
          return <HtmlTooltip key={index} title={
                    <React.Fragment>
                      <Typography color="primary">
                        {btn.message}            
                      </Typography>
                    </React.Fragment>
                  }>
                    <Button variant={ props.curCate === btn.value ? 
                          'contained' : 'outlined' } 
                      size="large" color="primary"  key={index+1}
                      onClick={ () => props.initCate(btn.value)}>
                      {btn.displayName}
                    </Button>
                  </HtmlTooltip> 
          }) /* カテゴリ選択のボタン表示のループ終了 */ }    
      </div>

      <main>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {props.card}
          </Grid>
          <Collapse in={props.dataOver} collapsedHeight="40px">
            <Typography elevation={4} className={classes.overMessage}
              align="center" color="primary">
              表示画像の件数が最大({props.dispMax})に達しました
            </Typography>
          </Collapse>
        </Container>
      </main>

      <div id="foot"></div>
      <div id='dataDetail'></div>
    </React.Fragment>
  );
}

export default CustomCardList;