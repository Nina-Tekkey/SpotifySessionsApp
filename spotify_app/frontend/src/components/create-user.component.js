import React, { Component } from 'react';
import App from '../App' 
import axios from 'axios';

export default class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: ''
    }
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();
    window.location = "/"
    this.setState({
      username: ''

    })
  }

  render() {
    return (
      <div>
      <form onSubmit={this.onSubmit}>
        <div className="form-group">
          <input type="submit" value="Log Out" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}