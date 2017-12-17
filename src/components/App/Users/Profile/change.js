import React from 'react'
// import PropTypes from 'prop-types'
import { Button, Form, Input, message, Layout } from 'antd'
import {inject, observer} from 'mobx-react'

const FormItem = Form.Item
const formItemLayout = {
    labelCol: {
        xs: {span: 30},
        sm: {span: 6}
    },
    wrapperCol: {
        xs: {span: 30},
        sm: {span: 10}
    }
}

const tailFormItemLayout = {
    wrapperCol: {
        xs: {span:24, offset: 0},
        sm: {span:14, offset: 6}
    }
}

class ChangeProfile extends React.Component {

    state = {
        confirmDirty: false
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.form.validateFieldsAndScroll(async (err, values)=>{
            if(!err){
                const {token, profile, setAccount} = this.props.Account;

                const result = await this.props.UsersStore.ChangeProfile(
                    token, profile._id,  values);
                if(result.success){
                    this.props.form.resetFields()
                    setAccount.bind(this.props.Account)(result.result)
                    message.success('Change profile success', 10)
                }else{
                    message.warning(result.message, 10)
                }
            }
        })
    }

    handleConfirmBlur(e){
        const value = e.target.value;
        this.setState({confirmDirty: this.state.confirmDirty || !!value})
    }

    checkPassword(rule, value, callback){
        if(value && value !== this.props.form.getFieldValue('newPassword')){
            callback('New password and confirm password is not match')
        }else{
            callback()
        }
    }

    checkConfirm(rule, value, callback){
        if(value && this.state.confirmDirty){
            this.props.validateFields(['confirm', {force: true}])
        }
        callback()
    }

    render(){
        const {UsersStore, form} = this.props
        const {getFieldDecorator} = form;
        // console.log('change-password', this.props)
        return(
            <Layout.Content style={{padding:20}}>
            <Form
                layout="horizontal"
                onSubmit={this.handleSubmit.bind(this)}
            >
                <FormItem
                    {...formItemLayout}
                    label="Username"
                >
                    {
                        getFieldDecorator('username', {
                            rules: [{
                                required: true, message: "Please, Input your password"
                            },{
                                validator: this.checkConfirm.bind(this)
                            }]
                        })(
                            <Input/>
                        )
                    }
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="Email"
                >
                    {
                        getFieldDecorator('email', {
                            rules: [{
                                type: 'email', message: 'this input is not valid E-mail'
                            },{
                                required: true, message: "Please, Input your email"
                            },{
                                validator: this.checkConfirm.bind(this)
                            }]
                        })(
                            <Input type='email'/>
                        )
                    }
                </FormItem>
                <FormItem
                  {...tailFormItemLayout}
                >
                  <Button type="primary" htmlType="submit" loading={UsersStore.isLoading}>Submit</Button>
                </FormItem>
            </Form>
            </Layout.Content>
        )

    }
}

const changePassword = inject('UsersStore')(observer(ChangeProfile))

export default Form.create()(changePassword)
