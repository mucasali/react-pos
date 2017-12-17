import React from 'react'
import { Form, Modal, Input, Button, message } from 'antd'
import {observer} from 'mobx-react'

const FormItem = Form.Item

const formItemLayout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 14,
    },
}

const durationMessage = 5;


const ModalFolder = observer((props)=>{
    // console.log('ModalInput..',)
    const {store, idBucket, account, form} = props;
    const {getFieldDecorator} = form;
    const {
        isLoading, inputVisible,
        hideInput, typeCreate,
        modalType, selectData,
    } = store;
    // console.log('(ModalFolder) ',props)

    const handleSave = (e)=>{
        // store.inputVisible = false;
        form.validateFields( async(err, values)=>{
            if(err){ return message.error(err.message, durationMessage)}
            let result = {};
            // console.log('on ok ', err, values)
            if(modalType === typeCreate){
                result = await store.createFolder(account.token, {
                    idBucket: idBucket,
                    name: values.name,
                    type: 'folder'
                })
            }else{
                result = await store.update(account.token, selectData._id, {
                    // idBucket: match.params,
                    name: values.name
                })
            }

            if(result.success){
                form.resetFields()
                message.success(modalType+' success', durationMessage)
            }else{
                message.warning(result.message, durationMessage)
            }
        })
    }

    return (
        <div>
            <div>
                <Button
                    onClick={()=> {
                        store.showInput(store.typeCreate, {type:'folder', name:''})
                    }}
                    style={{ margin: '16px 0' }}
                >
                    New Folder
                </Button>
            </div>
            <Modal
                title= {modalType+" "+selectData.type}
                visible={inputVisible}
                okText={modalType}
                onOk={handleSave}
                confirmLoading={isLoading}
                cancelText="Cancel"
                onCancel={hideInput.bind(store)}
            >
                <Form layout="horizontal">
                    <FormItem label="Name " hasFeedback {...formItemLayout}>
                        {
                            getFieldDecorator('name', {
                                initialValue : selectData.name,
                                rules: [
                                    {
                                        required: true,
                                    },
                                ],
                            })(<Input/>)
                        }
                    </FormItem>
                </Form>
            </Modal>
        </div>
    )
})

export default Form.create()(ModalFolder);
