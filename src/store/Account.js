import {extendObservable} from 'mobx'

const LOG_NAME = "(store.Account)";

class Account{

    constructor(){
        extendObservable(this, {
            dataAkses : JSON.parse(localStorage.getItem('data_akses')),
            username : localStorage.getItem('username'),
            isLoading : false
        })
        this.isLogged();
    }

    setAccount(username, dataAkses){
        console.log(LOG_NAME+' setAccount ', username, dataAkses)
        if(username) {
            localStorage.setItem('username', username)
            this.username = username;
        }
        if(dataAkses){
            console.log(LOG_NAME+' setAccount.dataAkses', dataAkses )
            localStorage.setItem('data_akses', JSON.stringify(dataAkses))
            this.dataAkses = dataAkses;
        }
    }

  isLogged(){
    // this.profile = JSON.parse(localStorage.getItem('profile'));
    // this.token = localStorage.getItem('token')
    // console.log('isLogged ', this)
    if(this.username || this.dataAkses){
      return true
    }
    return false;
  }

  logOut(){
    this.profile = localStorage.setItem('username', null);
    this.token = localStorage.setItem('data_akses', "");
    // console.log('on logout', this)
  }

}

export default new Account()
