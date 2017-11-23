import React from 'react'

const ContactDetail = ({ info }) => {
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>Company Reference</td>
            <td>{info.reference}</td>
          </tr>
          <tr>
            <td />
            <td />
          </tr>
          <tr>
            <td>
              <h3>Office Details</h3>
            </td>
            <td />
          </tr>
          <tr>
            <td>Country</td>
            <td>{info.country}</td>
          </tr>
          <tr>
            <td>State</td>
            <td>{info.state}</td>
          </tr>
          <tr>
            <td>City</td>
            <td>{info.city}</td>
          </tr>
          <tr>
            <td>Area</td>
            <td>{info.area}</td>
          </tr>
          <tr>
            <td>Road/Street</td>
            <td>{info.street}</td>
          </tr>
          <tr>
            <td>Website</td>
            <td>{info.website}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>{info.email}</td>
          </tr>
          <tr>
            <td>Email 2</td>
            <td>{info.email2}</td>
          </tr>
          <tr>
            <td>Mobile 1</td>
            <td>{info.mobile}</td>
          </tr>
          <tr>
            <td>Mobile 2</td>
            <td>{info.mobile2}</td>
          </tr>
          <tr>
            <td>Landline 1</td>
            <td>{info.landline}</td>
          </tr>
          <tr>
            <td>Landline 2</td>
            <td>{info.landline2}</td>
          </tr>
          <tr>
            <td>Fax</td>
            <td>{info.fax}</td>
          </tr>
          <tr>
            <td>Preferred mode of Communication</td>
            <td />
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default ContactDetail
