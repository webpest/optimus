import React from 'react'
import { Form, Input, Modal, Select, Icon, Radio } from 'antd'

const { TextArea } = Input
const FormItem = Form.Item
const Option = Select.Option
const RadioButton = Radio.Button
const RadioGroup = Radio.Group
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
  contacts,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
    setFieldsValue,
    getFieldValue,
  },
  ...modalProps
}) => {
  const handleOk = () => {
    validateFields(errors => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
        account_handler_department: `${getFieldValue(
          'account_handler_department'
        )}`,
        account_handler_division: `${getFieldValue(
          'account_handler_division'
        )}`,
        account_handler_person: `${getFieldValue('account_handler_person')}`,
        spare_part_provider: `${getFieldValue('spare_part_provider')}`,
        prefered_comm: `${getFieldValue('prefered_comm')}`,
        key: item.key,
      }

      onOk(data)
    })
  }

  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  }
  function handleChange (value) {
    console.log(value)
    setFieldsValue({
      account_handler_department: `${value}`,
    })
    console.log(value)
  }
  function splitString (val) {
    if (val == null || val === '') {
      return []
    } else {
      return val.includes(',') ? val.split(',') : val.split
    }
  }
  const contactList = contacts.map(iContact => {
    return (
      <Option
        value={`${iContact.FirstName} ${iContact.LastName}`}
        key={iContact.id}
      >
        {`${iContact.FirstName} ${iContact.LastName}`}
      </Option>
    )
  })
  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label="Company Name" hasFeedback {...formItemLayout}>
          {getFieldDecorator('company_name', {
            initialValue: item.company_name,
            rules: [
              {
                required: true,
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="Reference" hasFeedback {...formItemLayout}>
          {getFieldDecorator('reference', {
            initialValue: item.reference,
            rules: [{}],
          })(<Input />)}
        </FormItem>
        <FormItem label="Industry" hasFeedback {...formItemLayout}>
          {getFieldDecorator('industry', {
            initialValue: item.industry,
            rules: [
              {
                required: true,
              },
            ],
          })(
            <Select placeholder="Please select an industry">
              <Option value="oil and gas">Oil & Gas</Option>
              <Option value="mining">Mining</Option>
              <Option value="ports">Ports</Option>
              <Option value="construction">Construction</Option>
            </Select>
          )}
        </FormItem>
        <FormItem label="Liebherr Client" hasFeedback {...formItemLayout}>
          {getFieldDecorator('liebherr_client', {
            initialValue: item.liebherr_client,
            rules: [
              {
                required: true,
              },
            ],
          })(
            <RadioGroup>
              <RadioButton value="yes">Yes</RadioButton>
              <RadioButton value="no">No</RadioButton>
              <RadioButton value="potential">Potential</RadioButton>
            </RadioGroup>
          )}
        </FormItem>
        <FormItem label="Service Contract" hasFeedback {...formItemLayout}>
          {getFieldDecorator('service_contract', {
            initialValue: item.service_contract,
            rules: [
              {
                required: true,
              },
            ],
          })(
            <RadioGroup>
              <RadioButton value="yes">Yes</RadioButton>
              <RadioButton value="no">No</RadioButton>
            </RadioGroup>
          )}
        </FormItem>
        <FormItem label="Office Type" hasFeedback {...formItemLayout}>
          {getFieldDecorator('office_type', {
            initialValue: item.office_type,
            rules: [
              {
                required: true,
              },
            ],
          })(
            <Select placeholder="Please select an office type">
              <Option value="head office int">Head Office - Int</Option>
              <Option value="satellite office">Satellite Office</Option>
              <Option value="head office country">Head Office Country</Option>
              <Option value="regional office">Regional Office</Option>
            </Select>
          )}
        </FormItem>
        <FormItem label="Country" hasFeedback {...formItemLayout}>
          {getFieldDecorator('country', {
            initialValue: item.country,
            rules: [
              {
                required: true,
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="State" hasFeedback {...formItemLayout}>
          {getFieldDecorator('state', {
            initialValue: item.state,
            rules: [
              {
                required: true,
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="City" hasFeedback {...formItemLayout}>
          {getFieldDecorator('city', {
            initialValue: item.city,
            rules: [
              {
                required: true,
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="Street / Road" hasFeedback {...formItemLayout}>
          {getFieldDecorator('street', {
            initialValue: item.street,
            rules: [
              {
                required: true,
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="Building #" hasFeedback {...formItemLayout}>
          {getFieldDecorator('building_no', {
            initialValue: item.building_no,
            rules: [{}],
          })(<Input />)}
        </FormItem>
        <FormItem label="Mobile" hasFeedback {...formItemLayout}>
          {getFieldDecorator('mobile', {
            initialValue: item.mobile,
            rules: [
              {
                required: true,
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="Mobile 2" hasFeedback {...formItemLayout}>
          {getFieldDecorator('mobile2', {
            initialValue: item.mobile2,
            rules: [{}],
          })(<Input />)}
        </FormItem>
        <FormItem label="Email" hasFeedback {...formItemLayout}>
          {getFieldDecorator('email', {
            initialValue: item.email,
            rules: [
              {
                required: true,
                pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
                message: 'The input is not valid E-mail!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="Email 2" hasFeedback {...formItemLayout}>
          {getFieldDecorator('email2', {
            initialValue: item.email2,
            rules: [
              {
                pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
                message: 'The input is not valid E-mail!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="Land Line" hasFeedback {...formItemLayout}>
          {getFieldDecorator('landline', {
            initialValue: item.landline,
            rules: [{}],
          })(<Input />)}
        </FormItem>
        <FormItem label="Land Line 2" hasFeedback {...formItemLayout}>
          {getFieldDecorator('landline2', {
            initialValue: item.landline2,
            rules: [{}],
          })(<Input />)}
        </FormItem>
        <FormItem label="Fax" hasFeedback {...formItemLayout}>
          {getFieldDecorator('fax', {
            initialValue: item.fax,
            rules: [{}],
          })(<Input />)}
        </FormItem>
        <FormItem
          label="Preferred Comunication Mode"
          hasFeedback
          {...formItemLayout}
        >
          {getFieldDecorator('prefered_comm', {
            initialValue: splitString(item.prefered_comm),
            rules: [],
          })(
            <Select
              mode="multiple"
              style={{ width: '100%' }}
              placeholder="Please select"
            >
              <Option value="mobile">Mobile</Option>
              <Option value="email">Email</Option>
              <Option value="landline">Landline</Option>
              <Option value="fax">Fax</Option>
            </Select>
          )}
        </FormItem>
        <FormItem label="Website" hasFeedback {...formItemLayout}>
          {getFieldDecorator('website', {
            initialValue: item.website,
            rules: [{}],
          })(<Input />)}
        </FormItem>
        <FormItem
          label="Account Handler - Division"
          hasFeedback
          {...formItemLayout}
        >
          {getFieldDecorator('account_handler_division', {
            initialValue: splitString(item.account_handler_division),
            rules: [],
          })(
            <Select
              mode="multiple"
              style={{ width: 300 }}
              placeholder="Select an Account Handler Division"
              optionFilterProp="children"
            >
              <Option value="mmc">MCC</Option>
              <Option value="lwe">LWE</Option>
              <Option value="lbc">LBC</Option>
              <Option value="emt">EMT</Option>
              <Option value="lnl">LNL</Option>
            </Select>
          )}
        </FormItem>
        <FormItem
          label="Account Handler - Department"
          hasFeedback
          {...formItemLayout}
        >
          {getFieldDecorator('account_handler_department', {
            initialValue: splitString(item.account_handler_department),
            rules: [],
          })(
            <Select
              mode="multiple"
              style={{ width: 300 }}
              placeholder="Select an Account Handler Department"
              optionFilterProp="children"
              onChange={handleChange}
            >
              <Option value="mmc">MCC</Option>
              <Option value="lwe">LWE</Option>
              <Option value="lbc">LBC</Option>
              <Option value="emt">EMT</Option>
              <Option value="lnl">LNL</Option>
            </Select>
          )}
        </FormItem>
        <FormItem label="Spare Parts Provider" hasFeedback {...formItemLayout}>
          {getFieldDecorator('spare_part_provider', {
            initialValue: splitString(item.spare_part_provider),
            rules: [],
          })(
            <Select
              mode="multiple"
              style={{ width: 300 }}
              placeholder="Select a Spare Part Provider"
              optionFilterProp="children"
            >
              <Option value="mmc">MCC</Option>
              <Option value="lwe">LWE</Option>
              <Option value="lbc">LBC</Option>
              <Option value="emt">EMT</Option>
              <Option value="lnl">LNL</Option>
            </Select>
          )}
        </FormItem>
        <FormItem
          label="Account Handler - Person"
          hasFeedback
          {...formItemLayout}
        >
          {getFieldDecorator('account_handler_person', {
            initialValue: splitString(item.account_handler_person),
            rules: [],
          })(
            <Select
              mode="multiple"
              style={{ width: 300 }}
              placeholder="Select an Account Handler Person"
              optionFilterProp="children"
            >
              {contactList}
            </Select>
          )}
        </FormItem>
        <FormItem label="Payment History" hasFeedback {...formItemLayout}>
          {getFieldDecorator('payment_history', {
            initialValue: item.payment_history,
            rules: [],
          })(
            <RadioGroup>
              <RadioButton value="excellent">Excellent</RadioButton>
              <RadioButton value="good">Good</RadioButton>
              <RadioButton value="bad">Bad</RadioButton>
              <RadioButton value="unknown">Unknown</RadioButton>
            </RadioGroup>
          )}
        </FormItem>
        <FormItem label="Credit Terms" hasFeedback {...formItemLayout}>
          {getFieldDecorator('credit_terms', {
            initialValue: item.credit_terms,
            rules: [],
          })(
            <Select placeholder="Please select a term">
              <Option value="15 Days">15 Days</Option>
              <Option value="30 Days">30 Days</Option>
              <Option value="45 Days">45 Days</Option>
              <Option value="60 Days">60 Days</Option>
            </Select>
          )}
        </FormItem>
        <FormItem label="Credit Limit" hasFeedback {...formItemLayout}>
          {getFieldDecorator('credit_limit', {
            initialValue: item.credit_limit,
            rules: [{}],
          })(<Input />)}
        </FormItem>
        <FormItem label="Status" hasFeedback {...formItemLayout}>
          {getFieldDecorator('status', {
            initialValue: item.status,
            rules: [],
          })(
            <RadioGroup>
              <RadioButton value="ok">Ok</RadioButton>
              <RadioButton value="warning">Warning</RadioButton>
              <RadioButton value="onstop">On Stop</RadioButton>
            </RadioGroup>
          )}
        </FormItem>
      </Form>
    </Modal>
  )
}

export default Form.create()(modal)
