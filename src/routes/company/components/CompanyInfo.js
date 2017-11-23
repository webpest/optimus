import React from 'react'
import { Row, Col } from 'antd'

const CompanyInfo = ({ info = {}, visible, hideCompany }) => {
  const style = {
    display: visible ? 'block' : 'none',
    marginBottom: '15px',
    border: '1px solid #b1acac',
    borderRadius: '3px',
    padding: '15px',
    height: '150px',
    position: 'relative',
    overflow: 'hidden',
  }
  let bg = '#605E5B'
  switch (info.status) {
    case 'onstop':
      bg = 'red'
      break
    case 'warning':
      bg = 'orange'
      break
    default:
      bg = '#605E5B'
      break
  }

  return (
    <div style={style}>
      <button className="closeBtn" onClick={hideCompany}>
        X
      </button>
      <Row>
        <Col span={18}>
          <table style={{ width: '100%' }} className="companyTable">
            <tbody>
              <tr>
                <td className="rowTitle">
                  <strong>Country & City: </strong> {info.country}/{info.city}
                </td>
                <td className="rowTitle">
                  <strong>Service Contract: </strong>
                  {info.service_contract}
                </td>
                <td />
              </tr>
              <tr>
                <td className="rowTitle">
                  <strong>Office Type: </strong>
                  {info.office_type}
                </td>

                <td className="rowTitle">Limit Status</td>

                <td className="rowTitle">
                  <strong>Account Handler - Division: </strong>
                  {info.account_handler_division}
                </td>
              </tr>
              <tr>
                <td className="rowTitle">Office Function</td>

                <td className="rowTitle">Total Revenue:YTD</td>

                <td className="rowTitle">
                  <strong>Account Handler - Sales: </strong>
                  {info.account_handler_sales}
                </td>
              </tr>
              <tr>
                <td className="rowTitle">
                  <strong>Industry: </strong>
                  {info.industry}
                </td>

                <td className="rowTitle">Total Debt</td>

                <td className="rowTitle">
                  <strong>Account Handler - Service: </strong>
                  {info.account_handler_service}
                </td>
              </tr>
              <tr>
                <td className="rowTitle">
                  <strong>Liebherr Client: </strong>
                  {info.liebherr_client}
                </td>

                <td className="rowTitle">
                  <strong>Spare Part Provider: </strong>
                  {info.spare_part_provider}
                </td>

                <td className="rowTitle">
                  <strong>Divisions Involved: </strong>
                  {info.divisions_involved}
                </td>
              </tr>
            </tbody>
          </table>
        </Col>
        <Col
          span={6}
          style={{
            backgroundColor: `${bg}`,
            color: '#fff',
            textAlign: 'center',
            height: '150px',
            marginTop: '-15px',
            marginBottom: '-34px',
            marginRight: '-15px',
            padding: '15px',
          }}
        >
          <h3 style={{ color: '#fff', fontSize: '24px', marginTop: '25px' }}>
            {info.company_name}
          </h3>
        </Col>
      </Row>
    </div>
  )
}

export default CompanyInfo
