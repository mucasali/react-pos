// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom'
import {Provider} from 'mobx-react'

import Stores from './store'
import Routes from './routes';

import './index.css';

if(process.env.NODE_ENV === 'production'){
    console.log = function(){}
}

ReactDOM.render(
  <Provider {...Stores} >
    <BrowserRouter>
      <Route component={Routes} />
    </BrowserRouter>
  </Provider>
  ,
  document.getElementById('App')
);
