import React from 'react'
import PropTypes from 'prop-types'
import { Router } from 'dva/router'
import App from './routes/app'

const registerModel = (app, model) => {
  if (
    !(app._models.filter(m => m.namespace === model.namespace).length === 1)
  ) {
    app.model(model)
  }
}

const Routers = function ({ history, app }) {
  const routes = [
    {
      path: '/',
      component: App,
      getIndexRoute (nextState, cb) {
        require.ensure(
          [],
          require => {
            registerModel(app, require('./models/dashboard'))
            cb(null, { component: require('./routes/dashboard/') })
          },
          'dashboard'
        )
      },
      childRoutes: [
        {
          path: '/dashboard',
          getComponent (nextState, cb) {
            require.ensure(
              [],
              require => {
                registerModel(app, require('./models/dashboard'))
                cb(null, require('./routes/dashboard/'))
              },
              'dashboard'
            )
          },
        },
        {
          path: '/user',
          getComponent (nextState, cb) {
            require.ensure(
              [],
              require => {
                registerModel(app, require('./models/user'))
                cb(null, require('./routes/user/'))
              },
              'user'
            )
          },
        },
        {
          path: '/user/:id',
          getComponent (nextState, cb) {
            require.ensure(
              [],
              require => {
                registerModel(app, require('./models/user/detail'))
                cb(null, require('./routes/user/detail/detail'))
              },
              'user-detail'
            )
          },
        },
        {
          path: '/login',
          getComponent (nextState, cb) {
            require.ensure(
              [],
              require => {
                registerModel(app, require('./models/login'))
                cb(null, require('./routes/login/'))
              },
              'login'
            )
          },
        },
        {
          path: '/register',
          getComponent (nextState, cb) {
            require.ensure(
              [],
              require => {
                registerModel(app, require('./models/login'))
                cb(null, require('./routes/register/'))
              },
              'register'
            )
          },
        },
        {
          path: '/company',
          getComponent (nextState, cb) {
            require.ensure(
              [],
              require => {
                registerModel(app, require('./models/companies/index'))
                cb(null, require('./routes/company/'))
              },
              'company'
            )
          },
        },
        {
          path: '/company/:id',
          getComponent (nextState, cb) {
            require.ensure(
              [],
              require => {
                registerModel(app, require('./models/companies/detail'))
                cb(null, require('./routes/company/detail/'))
              },
              'company-detail'
            )
          },
        },
        {
          path: '/contact-person',
          getComponent (nextState, cb) {
            require.ensure(
              [],
              require => {
                registerModel(app, require('./models/contactperson/index'))
                cb(null, require('./routes/contact-person/'))
              },
              'contact-person'
            )
          },
        },
        {
          path: '/equipment',
          getComponent (nextState, cb) {
            require.ensure(
              [],
              require => {
                registerModel(app, require('./models/equipments/index'))
                cb(null, require('./routes/equipment/'))
              },
              'equipment'
            )
          },
        },
        {
          path: '/equipment/:id',
          getComponent (nextState, cb) {
            require.ensure(
              [],
              require => {
                registerModel(app, require('./models/equipments/detail'))
                cb(null, require('./routes/equipment/detail/'))
              },
              'equipment-detail'
            )
          },
        },
        {
          path: '/reference',
          getComponent (nextState, cb) {
            require.ensure(
              [],
              require => {
                cb(null, require('./routes/reference/'))
              },
              'reference'
            )
          },
        },
        {
          path: '*',
          getComponent (nextState, cb) {
            require.ensure(
              [],
              require => {
                cb(null, require('./routes/error/'))
              },
              'error'
            )
          },
        },
      ],
    },
  ]

  return <Router history={history} routes={routes} />
}

Routers.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
}

export default Routers
