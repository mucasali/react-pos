import React from 'react'
import PropTypes from 'prop-types'
import { Button, Form, Input, message, Spin, Icon } from 'antd'
import {observer, inject} from 'mobx-react'
import { Link} from 'react-router-dom'

import config from '../../config'

import './styles.css'

const FormItem = Form.Item

const Register = inject('Auth')(observer( ({
  loading,
  dispatch,
  form: {
    getFieldDecorator,
    validateFieldsAndScroll,
  },
  Auth, match, location, history
}) => {
  // console.log('on register ', Auth)
  function handleOk () {
    validateFieldsAndScroll(async (errors, values) => {
      if (errors) {
        message.error(errors.message, 10)
        return
      }else if(values.password !== values.repassword){
        message.error("password and re-password not match", 10)
        return
      }else if(values.username && values.password && values.repassword){
        const register = await Auth.register(values)
        if(register.success){
          message.success("register success")
          history.push('/login')
        }else{
          message.error("register failed, "+register.message)
        }
      }
    })
  }

  return (
    <div className="form">
      <Spin spinning={Auth.isLoading} >
        <div className="logo">
          <img alt={'logo'}  />
          <span> {config.name}</span>
        </div>
        <form>
          <FormItem hasFeedback>
            {getFieldDecorator('username', {
              rules: [
                {
                  required: true,
                },
              ],
            })(
              <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />}
                size="large" onPressEnter={handleOk} placeholder="Username" />
            )}
          </FormItem>
          <FormItem hasFeedback>
              {
                  getFieldDecorator('email', {
                      rules: [{
                          type: 'email', message: 'this input is not valid E-mail'
                      },{
                          required: true, message: "Please, Input your Email"
                      }]
                  })(
                      <Input type='email' prefix={<Icon type="mail" style={{ fontSize: 13 }} />}
                        size="large" onPressEnter={handleOk} placeholder="Email"/>
                  )
              }
          </FormItem>
          <FormItem hasFeedback>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                },
              ],
            })(
              <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
                size="large" type="password" onPressEnter={handleOk}
                placeholder="Password" />
            )}
          </FormItem>
          <FormItem hasFeedback>
            {getFieldDecorator('repassword', {
              rules: [
                {
                  required: true,
                },
              ],
            })(<
              Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
                  size="large" type="password" onPressEnter={handleOk} placeholder="Re Password" />
              )}
          </FormItem>
            <Button type="primary" size="large" onClick={handleOk} style={{marginBottom:20}} className="button">
              Sign up
            </Button>

              Have Account ? <Link to='/login'>Login</Link>
        </form>
      </Spin>
    </div>
  )
}))

Register.propTypes = {
  form: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default Form.create()(Register)
