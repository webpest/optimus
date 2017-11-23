import React from 'react'
import { Form, Input, Modal, Select } from 'antd'

const Option = Select.Option

const FormItem = Form.Item
const formItemLayout = {
  labelCol: {
    span: 9,
  },
  wrapperCol: {
    span: 11,
  },
}
const modal = ({
  item = {},
  onOk,
  form: { getFieldDecorator, validateFields, getFieldsValue, getFieldValue },
  ...modalProps
}) => {
  const handleOk = () => {
    validateFields(errors => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
        ContactFunction: `${getFieldValue('ContactFunction')}`,
        PreferredCommunicationMode: `${getFieldValue(
          'PreferredCommunicationMode'
        )}`,
        key: item.key,
      }
      onOk(data)
    })
  }

  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  }
  function splitString (val) {
    if (val == null || val === '') {
      return []
    } else {
      return val.includes(',') ? val.split(',') : val.split
    }
  }
  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label="First Name" hasFeedback {...formItemLayout}>
          {getFieldDecorator('FirstName', {
            initialValue: item.FirstName,
            rules: [
              {
                required: true,
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="Middle Name" hasFeedback {...formItemLayout}>
          {getFieldDecorator('MiddleName', {
            initialValue: item.MiddleName,
            rules: [],
          })(<Input />)}
        </FormItem>
        <FormItem label="Last Name" hasFeedback {...formItemLayout}>
          {getFieldDecorator('LastName', {
            initialValue: item.LastName,
            rules: [
              {
                required: true,
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="Position" hasFeedback {...formItemLayout}>
          {getFieldDecorator('Position', {
            initialValue: item.Position,
            rules: [
              {
                required: true,
              },
            ],
          })(
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="Select a Position"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0}
            >
              <Option value="general-manager">General Manager</Option>
              <Option value="sales-manager">Sales Manager</Option>
              <Option value="crane-manager">Crane Manager</Option>
              <Option value="service-engineer">Service Engr</Option>
              <Option value="accountant">Accountant</Option>
              <Option value="procurement-officer">Procurement Office</Option>
            </Select>
          )}
        </FormItem>
      </Form>
      <FormItem label="Function" hasFeedback {...formItemLayout}>
        {getFieldDecorator('ContactFunction', {
          initialValue: splitString(item.ContactFunction),
          rules: [
            {
              required: true,
            },
          ],
        })(
          <Select
            mode="multiple"
            style={{ width: 200 }}
            placeholder="Select a function"
            optionFilterProp="children"
          >
            <Option value="debt-collection">Debt Collection</Option>
            <Option value="invoicing">Invoicing</Option>
            <Option value="job-planning">Job Planning</Option>
            <Option value="parts-ordering">Parts Ordering</Option>
          </Select>
        )}
      </FormItem>
      <FormItem label="Mobile 1" hasFeedback {...formItemLayout}>
        {getFieldDecorator('Mobile1', {
          initialValue: item.Mobile1,
          rules: [
            {
              required: true,
            },
          ],
        })(<Input />)}
      </FormItem>
      <FormItem label="Mobile 2" hasFeedback {...formItemLayout}>
        {getFieldDecorator('Mobile2', {
          initialValue: item.Mobile2,
          rules: [],
        })(<Input />)}
      </FormItem>
      <FormItem label="Work Email" hasFeedback {...formItemLayout}>
        {getFieldDecorator('EmailWork', {
          initialValue: item.EmailWork,
          rules: [
            {
              required: true,
              pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
              message: 'The input is not valid E-mail!',
            },
          ],
        })(<Input />)}
      </FormItem>
      <FormItem label="Personal Email" hasFeedback {...formItemLayout}>
        {getFieldDecorator('EmailPersonal', {
          initialValue: item.EmailPersonal,
          rules: [
            {
              pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
              message: 'The input is not valid E-mail!',
            },
          ],
        })(<Input />)}
      </FormItem>
      <FormItem label="Landline" hasFeedback {...formItemLayout}>
        {getFieldDecorator('Landline', {
          initialValue: item.Landline,
          rules: [],
        })(<Input />)}
      </FormItem>
      <FormItem label="Ext" hasFeedback {...formItemLayout}>
        {getFieldDecorator('Extension', {
          initialValue: item.Extension,
          rules: [],
        })(<Input />)}
      </FormItem>
      <FormItem
        label="Preferred Comunication Mode"
        hasFeedback
        {...formItemLayout}
      >
        {getFieldDecorator('PreferredCommunicationMode', {
          initialValue: splitString(item.PreferredCommunicationMode),
          rules: [],
        })(
          <Select
            mode="multiple"
            style={{ width: '100%' }}
            placeholder="Please select"
          >
            <Option value="mobile">Mobile</Option>
            <Option value="email">Email</Option>
            <Option value="skype">Skype</Option>
          </Select>
        )}
      </FormItem>
      <FormItem label="Skype" hasFeedback {...formItemLayout}>
        {getFieldDecorator('Skype', {
          initialValue: item.Skype,
          rules: [],
        })(<Input />)}
      </FormItem>
      <FormItem label="Department" hasFeedback {...formItemLayout}>
        {getFieldDecorator('Department', {
          initialValue: item.Department,
          rules: [],
        })(
          <Select style={{ width: 120 }}>
            <Option value="procurement">Procurement</Option>
            <Option value="sales">Sales</Option>
            <Option value="accounting">Accounting</Option>
          </Select>
        )}
      </FormItem>
    </Modal>
  )
}

export default Form.create()(modal)
