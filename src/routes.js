// src/routes.js
import React from 'react';
import { Switch, Route, Redirect} from 'react-router-dom'
import {observer, inject} from 'mobx-react'

import App from './components/App';
import NotFound from './components/NotFound';
import Login from './components/Login';
import Register from './components/Register';

const authAccount = inject('Account')((props)=>{
// console.log('authAccount ', props.Account.isLogged())
    return props.Account.isLogged() ?
        <App {...props} /> :
        <Redirect to="/login" />
})

const Routes = observer((props) => {
    return (
        <Switch {...props} >
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route path="/" component={authAccount}/>
            <Route path="*" component={NotFound} />
        </Switch>
    )
});

export default Routes;
