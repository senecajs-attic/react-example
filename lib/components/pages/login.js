import React from 'react'
import {History} from 'react-router'
import Varo from '../../services'
import reactMixin from 'react-mixin'

class Login extends React.Component {
    constructor () {
      super()
      this.state = {
        authFailed: false
      }
    }

    handleSubmit (event) {
      event.preventDefault()

      var loginMsg = {
        role: 'auth',
        cmd: 'login',
        email: this.refs.email.value,
        pass: this.refs.pass.value
      }

      var that = this
      Varo.act(loginMsg, function (err, reply) {
        if (err) {
          that.history.replaceState(err, '/error')
        }

        if (!reply.isAuthenticated) {
          return that.setState({auth_failed: true})
        }

        var location = that.props
        if (location.state && location.state.nextPathname) {
          that.history.replaceState(null, location.state.nextPathname)
        } else {
          that.history.replaceState(null, '/')
        }
      })
    }

    render () {
      return (
        <div className='login'>
          <form className='login-form' onSubmit={this.handleSubmit.bind(this)}>
            <div className='box-header'>
              <div className='box-header-icon'>
              </div>
              <div className='box-header-titlebar'>
                <span>Please log in</span>
              </div>
            </div>
            <fieldset>
              <input ref='email' type='email' placeholder='Email' required />
              <input ref='pass' type='password' placeholder='Password' required />
              <button type='submit' className='submit'>
                <span>Submit</span>
              </button>
            </fieldset>
          </form>
        </div>
      )
    }
}

reactMixin.onClass(Login, History)

export default Login
