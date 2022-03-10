import React from 'react';
import swal from 'sweetalert';
import { Button, TextField, Link } from '@material-ui/core';
const axios = require('axios');

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      age: '',
      firstName: '',
      surName: '',
      hivStatus: '',
      phoneNumber: '',
      email: ''
    };
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  register = () => {

    axios.post('http://localhost:2000/register', {
      username: this.state.username,
      password: this.state.password,
      age: this.state.age,
      firstName: this.state.firstName,
      surName: this.state.surName,
      hivStatus: this.state.hivStatus,
      phoneNumber: this.state.phoneNumber,
      email: this.state.email
    }).then((res) => {
      swal({
        text: res.data.title,
        icon: "success",
        type: "success"
      });
      this.props.history.push('/');
    }).catch((err) => {
      swal({
        text: err.response.data.errorMessage,
        icon: "error",
        type: "error"
      });
    });
  }

  render() {
    return (
      <div style={{ marginTop: '100px' }}>
        <div>
          <h2>Register</h2>
        </div>

        <div>
          <TextField
            id="username"
            type="text"
            autoComplete="off"
            name="username"
            value={this.state.username}
            onChange={this.onChange}
            placeholder="User Name"
            required
          />
          <br /><br />
          <TextField
            id="password"
            type="password"
            autoComplete="off"
            name="password"
            value={this.state.password}
            onChange={this.onChange}
            placeholder="Password"
            required
          />
          <br /><br />
          <TextField
            id="age"
            type="number"
            autoComplete="off"
            name="age"
            value={this.state.age}
            onChange={this.onChange}
            placeholder="Age"
            required
          />
          <br /><br />
          <TextField
            id="firstName"
            type="text"
            autoComplete="off"
            name="firstName"
            value={this.state.firstName}
            onChange={this.onChange}
            placeholder="First Name"
            required
          />
          <br /><br />
          <TextField
            id="surName"
            type="text"
            autoComplete="off"
            name="surName"
            value={this.state.surName}
            onChange={this.onChange}
            placeholder="SurName"
            required
          />
          <br /><br />
          <TextField
            id="hivStatus"
            type="text"
            autoComplete="off"
            name="hivStatus"
            value={this.state.hivStatus}
            onChange={this.onChange}
            placeholder="HIV Status"
            required
          />
          <br /><br />
          <TextField
            id="phone"
            type="text"
            autoComplete="off"
            name="phoneNumber"
            value={this.state.phoneNumber}
            onChange={this.onChange}
            placeholder="Phone Number"
            required
          />
          <br /><br />
          <TextField
            id="email"
            type="email"
            autoComplete="off"
            name="email"
            value={this.state.email}
            onChange={this.onChange}
            placeholder="Email"
            required
          />
          <br /><br />
          <Button
            className="button_style"
            variant="contained"
            color="primary"
            size="small"
            disabled={this.state.username === '' && this.state.password === ''}
            onClick={this.register}
          >
            Register
          </Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Link href="/">
            Login
          </Link>
        </div>
      </div>
    );
  }
}
