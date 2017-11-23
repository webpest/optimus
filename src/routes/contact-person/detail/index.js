import React from 'react'
import { Tabs, Row, Col, Card } from 'antd'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'

const TabPane = Tabs.TabPane

const CompanyDetail = {
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

const CompanyInfo = ({ companyDetail, dispatch, loading, location }) => {
  const { query = {}, pathname } = location

  const info = companyDetail

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
            defaultActiveKey={String(CompanyDetail.CONTACTPERSONS)}
            onTabClick={handleTabClick}
          >
            <TabPane
              tab="Contact Details"
              key={String(CompanyDetail.CONTACTDETAILS)}
            >
              1
            </TabPane>
            <TabPane
              tab="Contact Persons"
              key={String(CompanyDetail.CONTACTPERSONS)}
            >
              2
            </TabPane>
            <TabPane tab="Equipments" key={String(CompanyDetail.EQUIPMENTS)}>
              3
            </TabPane>
            <TabPane tab="Jobs" key={String(CompanyDetail.JOBS)}>
              4
            </TabPane>
            <TabPane tab="Spare Parts" key={String(CompanyDetail.SPAREPARTS)}>
              5
            </TabPane>
            <TabPane tab="Invoices" key={String(CompanyDetail.INVOICES)}>
              6
            </TabPane>
            <TabPane
              tab="Financial Details"
              key={String(CompanyDetail.FINANCIALDETAILS)}
            >
              7
            </TabPane>
            <TabPane
              tab="Relationships"
              key={String(CompanyDetail.RELATIONSHIPS)}
            >
              8
            </TabPane>
            <TabPane tab="Notes / News" key={String(CompanyDetail.NOTESNEWS)}>
              9
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    </div>
  )
}

export default connect(({ companyDetail, loading }) => ({
  companyDetail,
  loading,
}))(CompanyInfo)
