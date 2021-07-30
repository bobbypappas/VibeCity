import React, {Component} from 'react';
import './App.css';
import './Register.css';
import axios from 'axios';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      username: '',
    };
  }

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { email, password, firstName, lastName, username } = this.state;

    const user = {
      email,
      password,
      firstName,
      lastName,
      username,
    };

  axios
    .post('api/auth/register', user)
    .then(() => console.log('user created'))
    .catch(err => {
      console.error(err);
    });
  };
  render() {
      return (
          <div className="Home">
          <div className="inner">
              <form onSubmit={this.handleSubmit}>
                  <h3 className="text-white font-weight-medium">Register</h3>

                  <div className="form-group">
                      <label>Email
                        <input type="text"
                          className="form-control"
                          name="email"
                          placeholder="Email"
                          onChange={this.handleInputChange}
                        />
                      </label>
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

                  <div className="form-group">
                      <label>Firstname</label>
                      <input type="text"
                        className="form-control"
                        name="firstName"
                        placeholder="Firstname"
                        onChange={this.handleInputChange}
                      />
                  </div>

                  <div className="form-group">
                      <label>Lastname</label>
                      <input type="text"
                        className="form-control"
                        name="lastName"
                        placeholder="Lastname"
                        onChange={this.handleInputChange}
                      />
                  </div>

                  <div className="form-group">
                      <label>Username</label>
                      <input type="text"
                        className="form-control"
                        name="username"
                        placeholder="Username"
                        onChange={this.handleInputChange}
                      />
                  </div>

                  <button type="submit" className="btns btns-spotify btn-lg btn-block"> Submit </button>

                  <p className="forgot-password text-right text-white">
                       Already have an account? <a href="/login">Sign in Here</a>
                  </p>
              </form>
          </div>
          </div>
          );
    }
}

export default Register;
