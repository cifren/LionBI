import React, { Component } from "react";

export default class App extends Component {
  render() {
    const {navigation, content} = this.props;
    return (
      <div id="wrapper">
        {navigation || <p>navigation.</p>}
        <div id="page-wrapper">
            {content || <p>Default.</p>}
        </div>
      </div>
    );
  }
}