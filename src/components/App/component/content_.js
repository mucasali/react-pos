import React from 'react'
import {observer, inject} from 'mobx-react'
import {
  Layout, Row, Icon, Col, Breadcrumb,
  Spin, Popover, Upload, message, Menu
} from 'antd'

import Item from './item'
import ModalFolder from './ModalFolder'

const Dragger = Upload.Dragger
const {Content} = Layout;

const content = observer( (props)=>{
  const {Bucket} = props;
  const {curentData, isLoading} = Bucket;
  const {member, bucket} = curentData

  // console.log('on content ', member, match)

  const getBase64 = (file)=>{
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  const uploadFile = (file)=>{
    getBase64(file)
    .then(async (data) =>{
      const upload = await Bucket.upload({
        name: file.name,
        type: 'file',
        idBucket: 'root',
        mimetype: file.mimetype,
        size: file.size,
        file: data
      })
      if(upload.success){ message.success(upload.message, 10)}
      else{message.warning(upload.message, 10)}
    })
    .catch(err => {message.error(err.message, 10)})

    return false;
  }

  const propDragger = {
    name: 'file',
    multiple : true,
    showUploadList: false,
    action: 'http://',
    beforeUpload : uploadFile
  }

  const addButton = (
    <Col xs={20} sm={8} md={6} lg={4} xl={2} className="colContent" >
      <Dragger {...propDragger} >
        <a > <Icon type={'plus'}/> </a>
        <p>New File</p>
      </Dragger>
    </Col>
  )

  return(
    <Layout style={{ padding: '0 24px 24px' }}>
      <Spin spinning={isLoading}>
        <ModalFolder {...props}/>
        <Content style={{ background: '#fff', padding: 24, margin: 0, height: '100%' }}>
          <Row gutter={16} stype='flex' justify='center'>
            {
              member && member.map((member, iter)=>{
                return <Item item={member} key={iter} Bucket={Bucket}/>
              })
            }
            {addButton}
          </Row>
        </Content>
      </Spin>
    </Layout>

  )
})

export default content;
