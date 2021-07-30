import React, {Component} from 'react';
import './App.css';
import './Register.css';
import axios from 'axios';

class Reset extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
    };
  }

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { email } = this.state;

    const user = {
      email,
    };

  axios
    .post('api/auth/recover', user)
    .then(() => console.log('recovery email sent'))
    .catch(err => {
      console.error(err);
    });
  };
  render() {
      return (
          <div className="Home">
          <div className="inner">
              <form onSubmit={this.handleSubmit}>
                  <h3 className="text-white font-weight-medium">Reset your password</h3>

                  <div className="form-group">
                      <label>Email</label>
                      <input type="text"
                        className="form-control"
                        name="email"
                        placeholder="Email"
                        onChange={this.handleInputChange}
                      />
                  </div>

                  <button type="submit" className="btns btns-spotify btn-lg btn-block"> Send recovery email </button>

                  <p className="forgot-password text-right text-white">
                       Remembered your password? <a href="/login">Login Here</a>
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

export default Reset;
