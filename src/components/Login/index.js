import React from 'react'
import PropTypes from 'prop-types'
import { Button, Form, Input, Icon, message } from 'antd'
// import {Link} from 'react-router-dom'
import {inject} from 'mobx-react'

// import AuthStore from '../../store/Auth'
import config from '../../config'

import './styles.css'

const FormItem = Form.Item

const Login = inject('Auth')(({
  loading,
  dispatch,
  form: {
    getFieldDecorator,
    validateFieldsAndScroll,
  },
  Account,
  Auth,
  match,
  location,
  history
}) => {
  // console.log('on login ', Auth, Account)
  function handleOk () {
    validateFieldsAndScroll(async (errors, values) => {
      if (errors) {
        message.error(errors.message, 10)
        return
      }else if(values.username && values.password){
        const login = await Auth.login(values)
        // console.log('on login ', login)
        if(login.success){
          message.success("login success")
          history.push('/'+login.data._id)
        }else{
          message.error("login failed, "+login.message)
        }
      }
    })
  }

  return (
    <div className="form">
      <div className="logo">
        <img alt={'logo'}  />
        <span> {config.name} {}</span>
      </div>
      <form>
        <FormItem hasFeedback>
          {getFieldDecorator('username', {
            rules: [
              {
                required: true,
              },
            ],
          })(<Input
            prefix={<Icon type="user" style={{ fontSize: 13 }} />}
            size="large" onPressEnter={handleOk} placeholder="Username" />)}
        </FormItem>
        <FormItem hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
              },
            ],
          })(<Input
            prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
            size="large" type="password" onPressEnter={handleOk} placeholder="Password" />)}
        </FormItem>
        <Button type="primary" size="large" onClick={handleOk} style={{marginBottom:20}} className="button">
          Sign in
        </Button>
      </form>
    </div>
  )
})

Login.propTypes = {
  form: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default Form.create()(Login)
