import React from 'react'
import { Form, Modal, Select } from 'antd'

const FormItem = Form.Item
const Option = Select.Option
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}
const modal = ({
  companyDetail,
  item = {},
  contacts,
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
  const contactList = contacts.map(iContact => {
    return (
      <Option value={`${iContact.id}`} key={iContact.id}>
        {`${iContact.FirstName} ${iContact.LastName}`}
      </Option>
    )
  })
  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  }
  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label="Contact Person" hasFeedback {...formItemLayout}>
          {getFieldDecorator('contact_person', {
            initialValue: item.contact_person,
            rules: [
              {
                required: true,
              },
            ],
          })(
            <Select
              showSearch
              style={{ width: 300 }}
              placeholder="Select a person"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0}
            >
              {contactList}
            </Select>
          )}
        </FormItem>
      </Form>
    </Modal>
  )
}

export default Form.create()(modal)
