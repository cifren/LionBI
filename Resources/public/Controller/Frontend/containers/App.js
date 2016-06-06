import React, { Component } from "react";

export default class App extends Component {
  render() {
    const {navigation, content} = this.props;
    return (
      <div>
        {navigation || <p>navigation.</p>}
        <div class="container">
            {content || <p>Default.</p>}
        </div>
      </div>
    );
  }
}