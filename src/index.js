import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import store, { history } from './store'
import App from './containers/app'

import 'bootstrap/dist/css/bootstrap.css'
import 'element-theme-default'
import 'sanitize.css/sanitize.css'
import './assets/style/icomoon.css'
import './assets/style/main.css'


import { i18n } from 'element-react'
import locale from 'element-react/src/locale/lang/ru-RU'

i18n.use(locale);

const target = document.querySelector('#root')

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
        <App />
    </ConnectedRouter>
  </Provider>,
  target
)
