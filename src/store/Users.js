import { extendObservable} from 'mobx'
import config from '../config'
import FetchApi from '../utils/FetchApi'

// import Account from './Account'

class UsersStore{

  constructor(){
    extendObservable(this, {
      isLoading : false,
    })
    this.fetch = new FetchApi(config.urlApi+"/api/users");
  }

  async ChangePassword(token, {oldPassword, newPassword, confirmPassword}){
    this.isLoading = true
    const result = await this.fetch.post('/change-password', {
        "authorization":token
    },
    JSON.stringify({
      oldPassword : oldPassword,
      newPassword : newPassword,
      confirmPassword : confirmPassword
    }));

    console.log('result ', result)
    this.isLoading = false;
    return result;
  }

  async ChangeProfile(token, _id, {username, email}){
    this.isLoading = true
    const result = await this.fetch.put('/'+_id, {
        "authorization":token
    },
    JSON.stringify({
        username: username,
        email: email
    }));
    if(result.success){

    }
    console.log('result ', result)
    this.isLoading = false;
    return result;
  }




}

const usersStore = new UsersStore()
export default usersStore;
