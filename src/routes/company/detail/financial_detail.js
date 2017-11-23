import React from 'react'

const FinancialDetail = ({ info }) => {
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>Payment History</td>
            <td>{info.payment_history}</td>
          </tr>
          <tr>
            <td>Credit Terms</td>
            <td>{info.credit_terms}</td>
          </tr>
          <tr>
            <td>Credit Limit</td>
            <td>{info.credit_limit}</td>
          </tr>
          <tr>
            <td>Total Debt</td>
            <td />
          </tr>
          <tr>
            <td>Total Revenue</td>
            <td />
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default FinancialDetail
