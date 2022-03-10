import React, { Component } from 'react';
import {
  TextField, LinearProgress, TableBody, Table,
  TableContainer, TableHead, TableRow, TableCell
} from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import swal from 'sweetalert';

const axios = require('axios');

export default class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      token: '',
      openFriendsModal: false,
      id: '',
      name: '',
      page: 1,
      file: '',
      fileName: '',
      search: '',
      products: [],
      friendlist: [],
      users: [],
      pages: 0,
      loading: false,
      disabled: false
    };
  }

  componentDidMount = () => {
    let token = localStorage.getItem('token');
    if (!token) {
      this.props.history.push('/login');
    } else {
      this.setState({ token: token }, () => {
        this.getUsers();
      });
    }
  }

  getUsers = () => {

    this.setState({ loading: true });

    let data = '?';
    data = `${data}page=${this.state.page}`;
    if (this.state.search) {
      data = `${data}&search=${this.state.search}`;
    }
    axios.get(`http://localhost:2000/users${data}`, {
      headers: {
        'token': this.state.token
      }
    }).then((res) => {
      console.log("users ", res.data.users);
      this.setState({ loading: false, users: res.data.users, pages: res.data.pages });
    }).catch((err) => {
      swal({
        text: err.response.data.errorMessage,
        icon: "error",
        type: "error"
      });
      this.setState({ loading: false, users: [], pages: 0 }, () => { });
    });
  }

  pageChange = (e, page) => {
    this.setState({ page: page }, () => {
      this.getUsers();
    });
  }

  logOut = () => {
    localStorage.setItem('token', null);
    this.props.history.push('/');
  }
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value }, () => { });
    if (e.target.name === 'search') {
      this.setState({ page: 1 }, () => {
        this.getUsers();
      });
    }
  };

  render() {
    return (
      <div>
        {this.state.loading && <LinearProgress size={40} />}
        <ul>

          <li onClick={this.logOut}><i className="fa fa-sign-in" />Log Out </li>
          <li>  </li>
          <li>Home </li>
        </ul>

        <br />

        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">First Name</TableCell>
                <TableCell align="center">SurName</TableCell>
                <TableCell align="center">Username</TableCell>
                <TableCell align="center">Age</TableCell>
                <TableCell align="center">HIV Status</TableCell>
                <TableCell align="center">Phone Number</TableCell>
                <TableCell align="center">Email</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.users.map((row) => (
                <TableRow key={row.username}>
                  <TableCell align="center" component="th" scope="row">
                    {row.firstName}
                  </TableCell>
                  <TableCell align="center" component="th" scope="row">
                    {row.surName}
                  </TableCell>
                  <TableCell align="center" component="th" scope="row">
                    {row.username}
                  </TableCell>
                  <TableCell align="center" component="th" scope="row">
                    {row.age}
                  </TableCell>
                  <TableCell align="center" component="th" scope="row">
                    {row.hivStatus}
                  </TableCell>
                  <TableCell align="center" component="th" scope="row">
                    {row.phoneNumber}
                  </TableCell>
                  <TableCell align="center" component="th" scope="row">
                    {row.email}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <br />
          <Pagination count={this.state.pages} page={this.state.page} onChange={this.pageChange} color="primary" />
        </TableContainer>
        <footer className="fixed-bottom" >
          <div className="container">
            <span className="navbar-text ml-auto">&copy; Register/Login Inc All rights reserved</span>
          </div>
        </footer>
      </div>
    );
  }
}