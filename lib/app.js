'use strict'

var React = require('react')
var ReactDom = require('react-dom')
var Router = require('react-router').Router
var Route = require('react-router').Route
var IndexRoute = require('react-router').IndexRoute

var Shell = require('./components/shell')
var Login = require('./components/pages/login')
var Dashboard = require('./components/pages/dashboard')

var Varo = require('./services').Varo
var Auth = require('./services/auth')
var Session = require('./services/session')

var CreateBrowserHistory = require('history/lib/createBrowserHistory')
var history = CreateBrowserHistory()

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
    if (!reply.isAuthenticated) {
      replaceState({nextPathname: nextState.location.pathname}, '/login')
    }

    return done()
  })
}

function renderApp () {
  ReactDom.render((
    <Router history={history}>
      <Route path="/" component={Shell}>
        <IndexRoute component={Dashboard} onEnter={requireAuth} />
        <Route path="login" component={Login} />
        <Route path="dashboard" component={Dashboard} onEnter={requireAuth} />
      </Route>
    </Router>),
    document.getElementById('app'))
}

start()
