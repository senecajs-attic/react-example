import React from 'react'

class Shell extends React.Component {

  render () {
    var child = this.props.children // eslint-disable-line

    return (
    <div className='shell'>
        <div className='header'>
          <div className='box-header'>
            <div className='box-header-icon'> </div>
            <div className='box-header-titlebar'>
              <span>React: Example</span>
            </div>
          </div>
        </div>
        {child}
        <div className='footer'>
          <div className='box-header'>
            <div className='box-header-icon'></div>
            <div className='box-header-titlebar'>
              <span>Powered by Varo and Seneca</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Shell
