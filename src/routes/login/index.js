import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Link } from 'dva/router'
import { Button, Form, Input, Checkbox } from 'antd'
import { config } from '../../utils'
import styles from './index.less'

const FormItem = Form.Item

const Login = ({
  login,
  dispatch,
  form: { getFieldDecorator, validateFieldsAndScroll },
}) => {
  const { loginLoading } = login

  function handleOk () {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }
      dispatch({ type: 'login/login', payload: values })
    })
  }

  return (
    <div className={styles.loginpage}>
      <div className={styles.page}>
        <div className={styles.form}>
          <div className={styles.logo}>
            <h1 style={{ textTransform: 'uppercase', fontWeight: 'bold' }}>
              {config.name}
            </h1>
            <div style={{ padding: '0px' }}>
              please login with your credentials
            </div>
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
                <Input
                  size="large"
                  onPressEnter={handleOk}
                  placeholder="username"
                />
              )}
            </FormItem>
            <FormItem hasFeedback>
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                  },
                ],
              })(
                <Input
                  size="large"
                  type="password"
                  onPressEnter={handleOk}
                  placeholder="password"
                />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(<Checkbox>Remember me</Checkbox>)}
              <a className="login-form-forgot" href="">
                Forgot password
              </a>
              <Button
                type="primary"
                size="large"
                onClick={handleOk}
                loading={loginLoading}
              >
                Login
              </Button>
              Or <Link to="/register">register now!</Link>
            </FormItem>
          </form>
        </div>
      </div>
    </div>
  )
}

Login.propTypes = {
  form: PropTypes.object,
  login: PropTypes.object,
  dispatch: PropTypes.func,
}

export default connect(({ login }) => ({ login }))(Form.create()(Login))
