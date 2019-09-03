import React from 'react';
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import reducer from './reducer/reducer'
import createSagaMiddleware from 'redux-saga'
import saga from './sagas/sagas'
import CustomCardList from './container/AppContainer'
import './index.css'; 

import * as serviceWorker from './serviceWorker';

const initialState ={
  card:[]
}
const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, initialState  
  ,applyMiddleware(sagaMiddleware));
sagaMiddleware.run(saga)
render(
  <Provider store={store}>
    <CustomCardList />
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
