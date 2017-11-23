import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal } from 'antd'
import { Link } from 'dva/router'
import classnames from 'classnames'
import styles from './List.less'
import AnimTableBody from '../../components/DataTable/AnimTableBody'

const confirm = Modal.confirm

const List = ({
  onDeleteItem,
  onEditItem,
  isMotion,
  location,
  ...tableProps
}) => {
  const handleMenuClick = (record, e) => {
    if (e.key === '1') {
      onEditItem(record)
    } else if (e.key === '2') {
      confirm({
        title: 'Are you sure delete this record?',
        onOk () {
          onDeleteItem(record.id)
        },
      })
    }
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => <Link to={`user/${record.id}`}>{text}</Link>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
  ]

  const getBodyWrapperProps = {
    page: location.query.page,
    current: tableProps.pagination.current,
  }

  const getBodyWrapper = body => {
    return isMotion ? (
      <AnimTableBody {...getBodyWrapperProps} body={body} />
    ) : (
      body
    )
  }

  return (
    <div>
      <Table
        {...tableProps}
        className={classnames({
          [styles.table]: true,
          [styles.motion]: isMotion,
        })}
        bordered
        scroll={{ x: 1250 }}
        columns={columns}
        simple
        rowKey={record => record.id}
        getBodyWrapper={getBodyWrapper}
      />
    </div>
  )
}

List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  isMotion: PropTypes.bool,
  location: PropTypes.object,
}

export default List
