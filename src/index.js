import ReactDOM from 'react-dom'
import dva from 'dva'
import 'babel-polyfill'
import createLoading from 'dva-loading'
import { browserHistory } from 'dva/router'
import { message, LocaleProvider } from 'antd'
import enUS from 'antd/lib/locale-provider/en_US'

// 1. Initialize
const app = dva({
  ...createLoading({
    effects: true,
  }),
  history: browserHistory,
  onError (error) {
    message.error(error.message)
  },
})

// 2. Model
app.model(require('./models/app'))

// app.model(require("./models/companies"));

// 3. Router
app.router(require('./router'))

// 4. Start
const App = app.start()

ReactDOM.render(
  <LocaleProvider locale={enUS}>
    <App />
  </LocaleProvider>,
  document.getElementById('root')
)
// app.start('#root')
