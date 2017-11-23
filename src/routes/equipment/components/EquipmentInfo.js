import React from 'react'
import { Row, Col } from 'antd'

const EquipmentInfo = ({ info = {}, visible, hideEquipment }) => {
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
  return (
    <div style={style}>
      <button className="closeBtn" onClick={hideEquipment}>
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
                </td>
                <td className="rowTitle">
                  <strong>Status: </strong>
                </td>
              </tr>
              <tr>
                <td className="rowTitle">Office Type</td>

                <td className="rowTitle">Limit Status</td>

                <td className="rowTitle">Account Handler - Division</td>
              </tr>
              <tr>
                <td className="rowTitle">Office Function</td>

                <td className="rowTitle">Total Revenue:YTD</td>

                <td className="rowTitle">Account Handler - Sales</td>
              </tr>
              <tr>
                <td className="rowTitle">Industry</td>

                <td className="rowTitle">Total Debt</td>

                <td className="rowTitle">Account Handler - Service</td>
              </tr>
              <tr>
                <td className="rowTitle">Liebherr Client</td>

                <td className="rowTitle">Spare Part Provider</td>

                <td className="rowTitle">Divisions Involved</td>
              </tr>
            </tbody>
          </table>
        </Col>
        <Col
          span={6}
          style={{
            backgroundColor: '#605E5B',
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
            {info.SerialNumber}
          </h3>
        </Col>
      </Row>
    </div>
  )
}

export default EquipmentInfo
