// import React from 'react'
// import {Redirect} from 'react-router-dom'
const LOGNAME = '(fetchApi)'

const fetchApi = async (url, option) => {
  let resJSON = {success : false}
  try{
    const response = await fetch(url, option)
    console.log(LOGNAME+' response ', response)
    resJSON = await response.json();
    resJSON.status = response.ok 
  }catch(err){
    resJSON.message = err.message
  }
  console.log(LOGNAME+' result ', url, option, resJSON)
  return resJSON;
}

export default class FetchApi{

  headers = {
    "Content-Type": "application/json",
    "Accept": "application/json"
  }

  constructor(url){
    this.url = url;
  }

  async get(endPoint, header){
    return await fetchApi(this.url+endPoint, {
      method : 'GET',
      headers : Object.assign(header, this.headers)
    });
  }

  async post(endPoint, header, body){
    return await fetchApi(this.url+endPoint, {
      method: 'POST',
      headers: Object.assign(header, this.headers),
      body: body
    })
  }

  async put(endPoint, header, body){
    return await fetchApi(this.url+endPoint, {
      method: 'PUT',
      headers: Object.assign(header, this.headers),
      body: body
    })
  }

  async delete(endPoint, header){
    return await fetchApi(this.url+endPoint, {
      method: 'DELETE',
      headers: Object.assign(header, this.headers)
    })
  }

}
