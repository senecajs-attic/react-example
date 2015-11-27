import React from 'react'
import ReactDom from 'react-dom'
import {Router, Route, IndexRoute} from 'react-router'

import Shell from './components/shell'
import Login from './components/pages/login'
import Dashboard from './components/pages/dashboard'

import Varo from './services'
import Auth from './services/auth'
import Session from './services/session'

import {createHistory} from 'history'

function start () {
  Varo.plugin(Session)
      .plugin(Auth)

  Varo.act({role: 'session', cmd: 'start'}, function (err) {
    if (!err) {
      renderApp()
    }
  })
}

function requireAuth (nextState, replaceState, done) {
  Varo.act({role: 'auth', cmd: 'isAuthenticated'}, function (err, reply) {
    if (err) return done(err)
    if (!reply.isAuthenticated) {
      replaceState({nextPathname: nextState.location.pathname}, '/login')
    }

    return done()
  })
}

function renderApp () {
  ReactDom.render((
    <Router history={createHistory()}>
      <Route path='/' component={Shell}>
        <IndexRoute component={Dashboard} onEnter={requireAuth} />
        <Route path='login' component={Login} />
        <Route path='dashboard' component={Dashboard} onEnter={requireAuth} />
      </Route>
    </Router>),
    document.getElementById('app'))
}

start()
