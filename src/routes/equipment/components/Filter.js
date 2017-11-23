import React from 'react'
import { Row, Col, Input, Icon, AutoComplete, Button } from 'antd'

const Filter = ({ onAdd }) => {
  return (
    <Row>
      <Col style={{ marginBottom: '16px' }}>
        <Row>
          <Col span={12}>
            <AutoComplete
              size="large"
              style={{ width: 300 }}
              placeholder="type here to search"
            >
              <Input
                suffix={
                  <Icon type="search" className="certain-category-icon" />
                }
              />
            </AutoComplete>
          </Col>
          <Col span={4} offset={8} style={{ textAlign: 'right' }}>
            <Button onClick={onAdd} size="large" type="primary" icon="plus">
              Create an Equipment
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default Filter
