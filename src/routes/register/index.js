import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'

const Register = props => {
  console.log(props)
  return (
    <div>
      <h1>Register Page</h1>
    </div>
  )
}

Register.propTypes = {}

export default connect(({ app }) => ({ app }))(Register)
