import React from 'react'
import { Tabs, Row, Col, Card } from 'antd'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'

const TabPane = Tabs.TabPane

const EquipmentDetail = {
  CONTACTDETAILS: 1,
  CONTACTPERSONS: 2,
  EQUIPMENTS: 3,
  JOBS: 4,
  SPAREPARTS: 5,
  INVOICES: 6,
  FINANCIALDETAILS: 7,
  RELATIONSHIPS: 8,
  NOTESNEWS: 9,
}

const EquipmentInfo = ({ equipmentDetail, dispatch, loading, location }) => {
  const { query = {}, pathname } = location

  const info = equipmentDetail

  const handleTabClick = key => {
    dispatch(
      routerRedux.push({
        pathname,
        query: {
          status: key,
        },
      })
    )
  }
  return (
    <div className="content-inner">
      <Card>{info.company_name}</Card>
      <Row
        style={{
          backgroundColor: '#605E5B',
          padding: '15px',
          marginBottom: '30px',
          color: '#fff',
        }}
      >
        <Col span={24}>
          <div>{info.company_name}</div>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Tabs
            defaultActiveKey={String(EquipmentDetail.CONTACTPERSONS)}
            onTabClick={handleTabClick}
          >
            <TabPane tab="Issues" key={String(EquipmentDetail.CONTACTDETAILS)}>
              1
            </TabPane>
            <TabPane tab="Jobs" key={String(EquipmentDetail.CONTACTPERSONS)}>
              2
            </TabPane>
            <TabPane
              tab="Planned Jobs"
              key={String(EquipmentDetail.EQUIPMENTS)}
            >
              3
            </TabPane>
            <TabPane tab="Spare Parts" key={String(EquipmentDetail.JOBS)}>
              4
            </TabPane>
            <TabPane tab="Attachments" key={String(EquipmentDetail.SPAREPARTS)}>
              5
            </TabPane>
            <TabPane tab="Wanrranty" key={String(EquipmentDetail.INVOICES)}>
              6
            </TabPane>
            <TabPane
              tab="Machine Info"
              key={String(EquipmentDetail.FINANCIALDETAILS)}
            >
              7
            </TabPane>
            <TabPane tab="Notes" key={String(EquipmentDetail.RELATIONSHIPS)}>
              8
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    </div>
  )
}

export default connect(({ equipmentDetail, loading }) => ({
  equipmentDetail,
  loading,
}))(EquipmentInfo)
