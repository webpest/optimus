import React, { Component } from 'react'
import {
  Form,
  Input,
  Modal,
  Cascader,
  Select,
  DatePicker,
  InputNumber,
} from 'antd'

const Option = Select.Option

const FormItem = Form.Item
const formItemLayout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 12,
  },
}
const modelOptions = [
  {
    value: 'LR',
    label: 'LR',
    children: [
      {
        value: '1100',
        label: '1100',
        children: [
          {
            value: '/1',
            label: '/1',
          },
        ],
      },
    ],
  },
  {
    value: 'HS',
    label: 'HS',
    children: [
      {
        value: '883',
        label: '883',
        children: [
          {
            value: 'HD',
            label: 'HD',
          },
        ],
      },
    ],
  },
]
class modal extends Component {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
    // this.props.fetchContact()
    // console.log(this.props)
  }
  handleCompanySelect = key => {
    return this.props.fetchSites(key)
  }

  render () {
    const {
      item = {},
      onOk,
      form: { getFieldDecorator, validateFields, getFieldsValue },
      ...modalProps
    } = this.props
    const contactList = this.props.contacts.map(iContact => {
      return (
        <Option
          value={`${iContact.FirstName} ${iContact.LastName}`}
          key={iContact.id}
        >
          {`${iContact.FirstName} ${iContact.LastName}`}
        </Option>
      )
    })

    const locationList = this.props.companySites.map(iContact => {
      return (
        <Option value="" key="">
          loc
        </Option>
      )
    })

    const companyList = this.props.companies.map(iCompany => {
      return (
        <Option value={`${iCompany.id}`} key={iCompany.id}>
          {`${iCompany.company_name}`}
        </Option>
      )
    })

    const handleOk = () => {
      validateFields(errors => {
        if (errors) {
          return
        }
        const data = {
          ...getFieldsValue(),
          // ContactFunction: `${getFieldValue('ContactFunction')}`,
          // PreferredCommunicationMode: `${getFieldValue(
          //   'PreferredCommunicationMode'
          // )}`,
          key: item.key,
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
          <FormItem label="Serial #" hasFeedback {...formItemLayout}>
            {getFieldDecorator('company_name', {
              initialValue: item.company_name,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem label="Model" hasFeedback {...formItemLayout}>
            {getFieldDecorator('country', {
              initialValue: item.country,
              rules: [
                {
                  required: true,
                },
              ],
            })(
              <Cascader
                options={modelOptions}
                placeholder="Please select a model"
              />
            )}
          </FormItem>
          <FormItem label="Fleet #" hasFeedback {...formItemLayout}>
            {getFieldDecorator('state', {
              initialValue: item.state,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem label="Company" hasFeedback {...formItemLayout}>
            {getFieldDecorator('company', {
              initialValue: item.company,
              rules: [
                {
                  required: true,
                },
              ],
            })(
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Select a company"
                onChange={this.handleCompanySelect}
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0}
              >
                {companyList}
              </Select>
            )}
          </FormItem>
          <FormItem label="Operator" hasFeedback {...formItemLayout}>
            {getFieldDecorator('operator', {
              initialValue: item.operator,
              rules: [{}],
            })(<Input />)}
          </FormItem>
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
                style={{ width: 200 }}
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
          <FormItem label="Location" hasFeedback {...formItemLayout}>
            {getFieldDecorator('location', {
              initialValue: item.location,
              rules: [
                {
                  required: true,
                },
              ],
            })(
              <Select style={{ width: 200 }} placeholder="Select a location">
                {locationList}
              </Select>
            )}
          </FormItem>
          <FormItem label="Year of Manufacture" hasFeedback {...formItemLayout}>
            {getFieldDecorator('manufacture_year', {
              initialValue: item.manufacture_year,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem label="Commisioning Date" hasFeedback {...formItemLayout}>
            {getFieldDecorator('commisioning_date', {
              initialValue: item.commisioning_date,
              rules: [
                {
                  required: true,
                },
              ],
            })(<DatePicker />)}
          </FormItem>
          <FormItem label="Engine Make" hasFeedback {...formItemLayout}>
            {getFieldDecorator('engine_make', {
              initialValue: item.engine_make,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem label="Engine Model" hasFeedback {...formItemLayout}>
            {getFieldDecorator('engine_model', {
              initialValue: item.engine_model,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem label="Engine Power" hasFeedback {...formItemLayout}>
            {getFieldDecorator('engine_power', {
              initialValue: item.engine_power,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem label="Eng. Serial #" hasFeedback {...formItemLayout}>
            {getFieldDecorator('engine_serial_number', {
              initialValue: item.engine_serial_number,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem label="Software #" hasFeedback {...formItemLayout}>
            {getFieldDecorator('software_number', {
              initialValue: item.software_number,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem label="Softwware Version" hasFeedback {...formItemLayout}>
            {getFieldDecorator('software_version', {
              initialValue: item.software_version,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem label="Warranty Duration" hasFeedback {...formItemLayout}>
            {getFieldDecorator('warranty_duration', {
              initialValue: item.warranty_duration,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem label="Warranty Hours" hasFeedback {...formItemLayout}>
            {getFieldDecorator('warranty_hours', {
              initialValue: item.warranty_hours,
              rules: [
                {
                  required: true,
                },
              ],
            })(<InputNumber min={0} />)}
          </FormItem>
          <FormItem label="Warranty Start Date" hasFeedback {...formItemLayout}>
            {getFieldDecorator('warranty_start_date', {
              initialValue: item.warranty_start_date,
              rules: [
                {
                  required: true,
                },
              ],
            })(<DatePicker />)}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

export default Form.create()(modal)
