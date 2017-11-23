import React from 'react'
import { Tabs, Row, Col } from 'antd'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { default as CI } from '../components/CompanyInfo'
import ContactDetail from './contact_detail'
import Notes from './notes'
import Equipments from './equipments'
import ContactPerson from './contact_person'
import Sites from './sites'
import FinancialDetail from './financial_detail'

const TabPane = Tabs.TabPane

const CompanyDetail = {
  CONTACTDETAILS: 1,
  CONTACTPERSONS: 2,
  EQUIPMENTS: 3,
  JOBS: 4,
  SPAREPARTS: 5,
  INVOICES: 6,
  FINANCIALDETAILS: 7,
  SITES: 8,
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

  const equipmentProps = {
    assignEquipment () {
      dispatch({
        type: 'companyDetail/showEquipmentModal',
      })
    },
    unAssignEquipment (companyId, equipmentId) {
      console.log('unassigned', equipmentId)
    },
  }

  const contactProps = {
    assignContact () {
      dispatch({
        type: 'companyDetail/showContactModal',
      })
    },
    unAssignContact (companyId, contactId) {
      dispatch({
        type: 'companyDetail/unAssignContact',
        payload: {
          companyId,
          contactId,
        },
      })
    },
  }

  const siteProps = {
    createSite () {
      dispatch({
        type: 'companyDetail/showSiteModal',
      })
    },
  }

  const contactDetailProps = {
    info,
  }

  const financialDetailProps = {
    info,
  }
  const companyProps = {
    info: info,
    visible: true,
    hideCompany () {
      dispatch({
        type: 'companies/hideCompanyInfo',
        payload: {
          currentItem: {},
        },
      })
    },
  }

  const noteProps = {
    createNote () {
      console.log('Hi Note')
      dispatch({
        type: 'companyDetail/showNoteModal',
      })
    },
  }

  return (
    <div className="content-inner">
      <CI {...companyProps} />
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
              <ContactDetail {...contactDetailProps} />
            </TabPane>
            <TabPane
              tab="Contact Persons"
              key={String(CompanyDetail.CONTACTPERSONS)}
            >
              <ContactPerson {...contactProps} />
            </TabPane>
            <TabPane tab="Equipments" key={String(CompanyDetail.EQUIPMENTS)}>
              <Equipments {...equipmentProps} />
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
              <FinancialDetail {...financialDetailProps} />
            </TabPane>
            <TabPane tab="Sites" key={String(CompanyDetail.SITES)}>
              <Sites {...siteProps} />
            </TabPane>
            <TabPane tab="Notes / News" key={String(CompanyDetail.NOTESNEWS)}>
              <Notes {...noteProps} />
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
