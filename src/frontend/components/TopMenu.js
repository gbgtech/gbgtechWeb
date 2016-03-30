import React from 'react';
import { Link } from 'react-router';
import { postJson } from '../fetcher';

var TopMenu = React.createClass({
  getInitialState() {
    return {
      loginBoxOpen: false,
      complete: false,
      success: false
    };
  },
  openLoginBox() {
    this.setState({
      loginBoxOpen: true,
      complete: false
    });
  },
  closeLoginBox() {
    this.setState({
      loginBoxOpen: false,
      complete: false
    });
  },
  handleSubmit(event) {
    event.preventDefault();
    postJson('/auth/email/request', { email: this.mail.value })
    .then(status => {
      if (status.exists) {
        this.setState({
          failed: false,
          complete: true
        });
      }
    });
  },
  render() {
    const { loginBoxOpen, complete } = this.state;

    return (
      <nav>
        <Link to={'/'} className="logo"></Link>
        <ul className="navigation">
          <li><Link to={'/'}>news</Link></li>
          <li><Link to={'/hubs'}>hubs</Link></li>
          <li><Link to={'/post'}>post</Link></li>
          <li><a href="http://gothenburgstartup.com">gothenburg startup map</a></li>
        </ul>
        <ul className="login-menu">
          <li onClick={this.openLoginBox}>Login</li>
        </ul>
        {loginBoxOpen && (
          <div className="shade" onClick={this.closeLoginBox}>
            <div className="login-box">
              {complete ? (
                "Thanks! Check your mailbox!"
              ) : (
                <form onSubmit={this.handleSubmit} onClick={e => e.stopPropagation()}>
                  <div className="email-row">
                    <label>Email:</label>
                    <input type="email" ref={mail => this.mail = mail} placeholder="enter email"/>
                    <button className="button">Submit</button>
                  </div>
                  <a href="/api/auth/google" className="google-signin">Sign in with Google</a>
                </form>
              )}
            </div>
          </div>
        )}
      </nav>
    );
  }
});

export default TopMenu;
