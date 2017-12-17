import { extendObservable} from 'mobx'
import config from '../config'
import FetchApi from '../utils/FetchApi'

import Account from './Account'

class AuthStore{

  constructor(){
    extendObservable(this, {
      isLoading : false,
    })
    this.fetch = new FetchApi(config.urlApi);
  }

  async login({username, password}){
    this.isLoading = true
    const result = await this.fetch.post('/readLogin', {},
    JSON.stringify({
      user : username,
      pass : password,
      idp : config.idp
    }));
    if(result.status){

      Account.setAccount(result.user, result.data_akses)
      // console.log('on result.success', Account)
    }
    // console.log('result ', result)
    this.isLoading = false;
    return result;
  }

  async register({username, password, repassword, email}){
    this.isLoading = true;
    const result = await this.fetch.post('/register',{},
    JSON.stringify({
      username: username,
      password: password,
      email: email
    }))
    // console.log('Auth.register.result ', result)
    this.isLoading = false;
    return result;
  }



}

const authStore = new AuthStore()
export default authStore;
