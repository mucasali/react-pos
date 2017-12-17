import { extendObservable} from 'mobx'
import config from '../config'
import FetchApi from '../utils/FetchApi'

const log = '(store.Bucket)'

class BucketStore {

    typeCreate = 'Create'
    typeUpdate = 'Update'
    typeDelete = 'Delete'

    constructor(){
        extendObservable(this, {
            isLoading : false,
            inputVisible : false,
        })
        this.fetch = new FetchApi(config.urlApi+'/api/bucket');
    }

    data = {};
    curentData = {
        idBucket : '',
        parents: null,
        buckets : []
    }

    selectData = {type:'folder', name:''}
    modalType = "Create"

    showInput(type, item){
        // if(type && item){
            this.modalType = type
            this.selectData = item
        // }
        this.inputVisible = true
    }

    hideInput(){
        this.modalType = "Create"
        this.selectData = {type:'folder', name:''}
        this.inputVisible = false
    }

    async list(token, idBucket){
        this.isLoading = true;

        let res = {success: false};
        if(this.data[idBucket]){
            this.curentData = {
                idBucket: idBucket,
                buckets: this.data[idBucket].list,
                parents: this.data[idBucket].detail
            };
        }else{
            res = await this.fetch.get('/?idBucket='+idBucket, {"authorization":token});
            if(res.success){
                this.curentData = {
                    idBucket: idBucket,
                    buckets: res.result.list,
                    parents: res.result.detail
                }
                this.data[idBucket] = res.result;
            }
        }
        this.isLoading = false;
        return res;
    }

    /**
    * function for store new bucket / folder to server
    * - token = key for authenticating user
    * - data = object to store server
    *   - idBucket
    *   - name
    *   - type = must 'folder'
    **/
    async createFolder(token, data){
        let res = {success : false, message:"input empty"}
        if(!data){ return res}
        this.isLoading = true;
        data.type = 'folder';
        res = await this.fetch.post('/',
            {"authorization":token}, JSON.stringify(data)
        );
        // console.log('result ', res)
        const {success, result} = res
        if(success){
            this.curentData.buckets.push(result)
        }

        this.inputVisible = false;
        this.isLoading = false;
        return res;
    }

    async update(token, _id, data){
        let res = {success : false, message:"input empty"}
        if(!data){ return res}
        this.isLoading = true;

        res = await this.fetch.put('/'+_id,
            {"authorization":token}, JSON.stringify(data)
        );
        // console.log('result ', res)
        const {success, result} = res
        if(success){
            const index = this.curentData.buckets.findIndex((item)=>{
            // console.log('findIndex ', item);
                return item._id === _id;
            })

            this.curentData.buckets[index] = result
        }

        this.inputVisible = false;
        this.isLoading = false;
        return res;
    }

    async delete(token, _id){
        let res = {success : false, message:"id empty"}
        if(!_id){ return res}
        this.isLoading = true;

        res = await this.fetch.delete('/'+_id,
            {"authorization":token}
        );
        // console.log('result ', res)
        const {success} = res
        if(success){
            const index = this.curentData.buckets.findIndex((item)=>{
                // console.log('findIndex ', item);
                return item._id === _id;
            })
            this.curentData.buckets.splice(index, 1)
        }

        this.inputVisible = false;
        this.isLoading = false;
        return res;
    }

    async upload( key, data ){

        let res = {success : false, message:"input empty"}

        if(!data){ return res}
        const {token, apiKey, apiSecret} = key
        const {name, base64File, idBucket} = data;
        // console.log(log+' pre.upload => key, data ', key, data)
        // return null
        this.isLoading = true;

        res = await this.fetch.post('/upload',
            {"authorization":token}, JSON.stringify({
                idBucket: idBucket,
                apiKey: apiKey,
                apiSecret: apiSecret,
                type: "file",
                name: name,
                base64File: base64File,
                // mode: 'no_nyimpeni'
            })
        );
        console.log(log+' post.upload => res ', res)
        const {success, result} = res
        if(success){
            this.curentData.buckets.push(result)
        }

        this.isLoading = false;
        return res;
    }


}

const bucketStore = new BucketStore()
export default bucketStore;
