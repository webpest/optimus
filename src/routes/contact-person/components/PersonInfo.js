import React from 'react'
import { Row, Col } from 'antd'

const PersonInfo = ({ info = {}, visible, hidePerson }) => {
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
      <button className="closeBtn" onClick={hidePerson}>
        X
      </button>
      <Row>
        <Col span={18}>
          <table style={{ width: '100%' }} className="companyTable">
            <tbody>
              <tr>
                <td className="rowTitle">
                  <strong>Company: </strong> {info.country}/{info.city}
                </td>
                <td className="rowTitle">
                  <strong>Position: </strong>
                </td>
                <td className="rowTitle">
                  <strong>Country: </strong>
                </td>
              </tr>
              <tr>
                <td className="rowTitle">
                  <strong>Department: </strong>
                </td>
                <td className="rowTitle">
                  <strong>Function: </strong>
                </td>
                <td className="rowTitle">
                  <strong>Skype: </strong>
                </td>
              </tr>
              <tr>
                <td className="rowTitle">
                  <strong>Mobile 1: </strong>
                </td>
                <td className="rowTitle">
                  <strong>Email Work: </strong>
                </td>
                <td className="rowTitle">
                  <strong>Prefered mode of Communication: </strong>
                </td>
              </tr>
              <tr>
                <td className="rowTitle">
                  <strong>Mobile 2: </strong>
                </td>
                <td className="rowTitle">
                  <strong>Email Personal: </strong>
                </td>
                <td className="rowTitle">
                  <strong>Mailing List: </strong>
                </td>
              </tr>
              <tr>
                <td className="rowTitle">
                  <strong>Landline: </strong>
                </td>
                <td className="rowTitle">
                  <strong>Ext: </strong>
                </td>
                <td className="rowTitle" />
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
            {info.FirstName} {info.MiddleName} {info.LastName}
          </h3>
        </Col>
      </Row>
    </div>
  )
}

export default PersonInfo
