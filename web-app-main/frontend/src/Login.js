import React, {Component} from 'react';
import { Redirect } from "react-router-dom"
import './App.css';
import './Register.css';
import axios from 'axios';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { email, password } = this.state;

    const user = {
      email,
      password,
    };

  axios
    .post('api/auth/login', user)
    .then(res => {
		console.log('successful login');
		window.localStorage.setItem('token', res.data.token);
		window.localStorage.setItem('username', res.data.user.username);
		this.props.history.push("/discover");
		console.log("token: " + localStorage.getItem('token'));
		console.log("username: " + localStorage.getItem('username'));
	})
    .catch(err => {
      console.error(err.message);
    });
  };
  render() {
      return (
          <div className="Home">
          <div className="inner">
              <form onSubmit={this.handleSubmit}>
                  <h3 className="text-white font-weight-medium">Log In</h3>

                  <div className="form-group">
                      <label>Email</label>
                      <input type="text"
                        className="form-control"
                        name="email"
                        placeholder="Email"
                        onChange={this.handleInputChange}
                      />
                  </div>

                  <div className="form-group">
                      <label>Password</label>
                      <input type="password"
                        className="form-control"
                        name="password"
                        placeholder="Password"
                        onChange={this.handleInputChange}
                      />
                  </div>

                  <button type="submit" className="btns btns-spotify btn-lg btn-block"> Sign in </button>

                  <p className="forgot-password text-right text-white">
                       Forgot your password? <a href="/reset">Reset Password</a>
                  </p>
                  <p className="forgot-password text-right text-white">
                       Don't have an account? <a href="/register">Register Here</a>
                  </p>
              </form>
          </div>
          </div>
          );
    }
}

export default Login;
