import React from 'react'
import {observer} from 'mobx-react'
import {
    Layout, Row, Icon, Col,
    Spin, Upload, message
} from 'antd'

import Item from './item'
import ModalFolder from './ModalFolder'
import Breadcrumb from './breadcrumb'

const Dragger = Upload.Dragger
const {Content} = Layout;

const content = observer( (props)=>{
    const {idBucket, store, account} = props;
    const {curentData, isLoading} = store;
    const {buckets, parents} = curentData
    const {token, profile} = account;

    // console.log('on content ', idBucket)

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
            const upload = await store.upload(
            {
                token: token, apiKey: profile.apiKey, apiSecret: profile.apiSecret
            },
            {
                name: file.name,
                idBucket: idBucket,
                // mimetype: file.mimetype,
                // size: file.size,
                base64File: data
            })
            if(upload.success){ message.success(upload.message, 10) }
            else{ message.warning(upload.message, 10) }
        })
        .catch(err => { message.error(err.message, 10) })

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
                <Breadcrumb parents={parents} rootParent={account.profile._id} />
                <Content style={{ background: '#fff', padding: 24}}>
                    <Row gutter={16} stype='flex' justify='center'>
                        {
                            buckets && buckets.map((bucket, iter)=>{
                                return <Item item={bucket} key={iter} {...props}/>
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
