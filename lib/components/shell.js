'use strict'

var React = require('react')

module.exports = React.createClass({
  render: function () {
    var child = this.props.children

    return (
      <div className="shell">
        <div className="header">
          <div className="box-header">
            <div className="box-header-icon"> </div>
            <div className="box-header-titlebar">
              <span>React: Example</span>
            </div>
          </div>
        </div>
        {child}
        <div className="footer">
          <div className="box-header">
            <div className="box-header-icon"></div>
            <div className="box-header-titlebar">
              <span>Powered by Varo and Seneca</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
})
