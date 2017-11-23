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
  equipment_list,
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
  const equipmentList = equipment_list.map(iEquipment => {
    return (
      <Option value={`${iEquipment.id}`} key={iEquipment.id}>
        {`${iEquipment.serial_number}`}
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
        <FormItem label="Equipments" hasFeedback {...formItemLayout}>
          {getFieldDecorator('equipments', {
            initialValue: item.equipments,
            rules: [
              {
                required: true,
              },
            ],
          })(
            <Select
              showSearch
              style={{ width: 300 }}
              placeholder="Select an Equipment"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0}
            >
              {equipmentList}
            </Select>
          )}
        </FormItem>
      </Form>
    </Modal>
  )
}

export default Form.create()(modal)
