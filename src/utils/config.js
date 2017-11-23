const APIV1 = '/api/v1'
const APIV2 = '/api/v2'
// const ENDPOINT = 'http://optimus-server.dev/api/v1'

module.exports = {
  name: 'Optimus',
  prefix: 'optimus',
  footerText: 'Optimus  © 2017',
  iconFontCSS: '/iconfont.css',
  iconFontJS: '/iconfont.js',
  YQL: ['http://www.zuimeitianqi.com'],
  CORS: ['http://localhost:7000'],
  openPages: ['/login', '/register'],
  apiPrefix: '/api/v1',
  endpoint: 'http://optimus-server.dev/api/v1',
  api: {
    userLogin: `${APIV1}/user/login`,
    userLogout: `${APIV1}/user/logout`,
    userInfo: `${APIV1}/userInfo`,
    users: `${APIV1}/users`,
    user: `${APIV1}/user/:id`,
    // dashboard: `${ENDPOINT}/dashboard`,
    // companies: `${ENDPOINT}/companies`,
    // company: `${ENDPOINT}/companies/:id`,
    // contactpeople: `${ENDPOINT}/contactpeople`,
    // contactperson: `${ENDPOINT}/contactpeople/:id`,
  },
}
