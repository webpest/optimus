import React from 'react'
import { connect } from 'dva'
import styles from './index.less'

function Dashboard ({ dashboard, dispatch }) {
  return (
    <div className="content-inner">
      <div>
        <h1>Dashboard</h1>
      </div>
    </div>
  )
}

function mapStateToProps (state) {
  return { dashboard: state.companies }
}

export default connect(mapStateToProps)(Dashboard)
