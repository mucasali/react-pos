import { extendObservable, observable} from 'mobx'
import config from '../config'
import FetchApi from '../utils/FetchApi'

const urlEndPoint = config.urlEndPoint+"/users"
const PAGESIZE = 10

class UserStore {

  constructor(){
    extendObservable(this, {
      isLoading : false,
      inputVisible : false,
    })
    console.log('config user ', config)
    this.fetch = new FetchApi(config.urlApi+'/api/users');
  }

 items = [
    { title : 'Vm name', dataIndex : 'vmName', key : 'vmName', width : 50},
    { title : 'Exsi', dataIndex : 'exsi', key : 'exsi', width : 50 },
    { title : 'User Name', dataIndex : 'userName', key : 'userName', width : 60},
    { title : 'Running Program', dataIndex : 'runningProgram', key : 'runningProgram', width : 80 },
    { title : 'OS', dataIndex : 'os', key : 'os', width : 80 },
    { title : 'Creator', dataIndex : 'creator', key : 'creator', width : 100 },
    { title : 'vLan', dataIndex : 'vlan', key : 'vlan', width : 90 },
  ]

  data = [];
  page = {
    size : PAGESIZE, totalElements : 0, totalPages : 0, number : 0
  }
  curentItem = {}
  modalType = "Add"

  showInput(type, item){
    if(item && item){
      this.modalType = type
      this.curentItem = item
    }
    this.inputVisible = true
  }

  hideInput(){
    this.modalType = "Add"
    this.curentItem = {}
    this.inputVisible = false
  }

  async fetchData(url, option, action, messageSucces){
    this.isLoading = true;
    let resJSON = {error : false, message: messageSucces, result:[]}
    try{
      const response = await fetch(url, option)
      resJSON.result = (response.status !== 204) && await response.json();
    }catch(err){
      resJSON = {error:true, message:err.message}
    }
    action(resJSON)
    this.isLoading = false;
    return resJSON;
  }

  async list(page){
    if(!page){page = 0}
    const result = fetchApi.get(urlEndPoint+'/users')



    const result = await this.fetchData(urlEndPoint+"?page="+page+"&size="+PAGESIZE+"&sort=id,desc",
      {
        method : "GET",
        headers : {"Content-Type": "application/json", "Accept": "application/json"}
      }, (resJSON)=>{
        // console.log('resJSON', resJSON);
        if(!resJSON.error){
          const {_embedded, page} = resJSON.result;
          this.page = page;
          this.data = _embedded.address;
        }
      }
    )
    return result;
  }

  refresh(){
    this.list(this.page.number)
  }

  async add(data){
    this.isLoading = true;

    // const result = await this.fetch.post('', )

  //   let result = {error : true, message:"input empty"}
  //   if(!data){ return result}
  //
  //   result = await this.fetchData(urlEndPoint, {
  //     method : "POST",
  //     headers : {"Content-Type": "application/json"},
  //     body : JSON.stringify(data)
  //   }, (resJSON)=>{}, "Add Data Ip Address Success")
  //   if(!result.error){
  //     this.inputVisible = false;
  //     this.list(0);
  //   }
    return result;
  }

  async update(data){
    let result = {error : true, message:"input or id empty"}
    if(!data && this.curentItem){ return result}

    const {_links} = this.curentItem;
    const url = _links.self.href;
    result = await this.fetchData(url, {
      method : "PUT",
      headers : {"Content-Type": "application/json"},
      body : JSON.stringify(data)
    }, (resJSON)=>{}, "Update Data Ip Address Success")

    if(!result.error){
      this.inputVisible = false;
      this.refresh()
    }
    return result;
  }

  async delete(url){
    // console.log('delete', url)
    let result = {error : true, message:"url empty"}
    if(!url){ return result}

    result = await this.fetchData(url, {
      method : "DELETE",
      headers : {"Content-Type": "application/json"}
    }, (resJSON)=>{}, "Delete Data Ip Address Success")

    if(!result.error){
      this.refresh()
    }
    return result;

  }


}

const ipAddressStore = new IpAddressStore()
export default ipAddressStore;
