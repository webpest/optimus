import React from 'react'
import { Form, Input, Modal, Steps, Icon } from 'antd'
import DraftEditor from '../../../components/Editor/Editor'

const { TextArea } = Input

const FormItem = Form.Item
const formItemLayout = {
  labelCol: {
    span: 3,
  },
  wrapperCol: {
    span: 17,
  },
}
const modal = ({
  item = {},
  companyId,
  onOk,
  form: { getFieldDecorator, validateFields, getFieldsValue },
  ...modalProps
}) => {
  const handleOk = () => {
    validateFields(errors => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
        company_id: companyId,
      }
      onOk(data)
    })
  }

  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  }
  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label="Title" hasFeedback {...formItemLayout}>
          {getFieldDecorator('title', {
            rules: [
              {
                required: true,
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="Note" hasFeedback {...formItemLayout}>
          {getFieldDecorator('note', {
            rules: [
              {
                required: true,
              },
            ],
          })(<TextArea rows={8} />)}
        </FormItem>
      </Form>
      {/* <DraftEditor /> */}
    </Modal>
  )
}

export default Form.create()(modal)
