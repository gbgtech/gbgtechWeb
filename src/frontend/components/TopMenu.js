import React from 'react';
import { Link } from 'react-router';
import { postJson } from '../fetcher';

import { connect } from 'react-redux';

import { setSignedOut } from '../store/actions';


const LoginBox = ({complete, mail, onSubmit, onClose, onChangeMail}) => (
  <div className="shade" onClick={onClose}>
    <div className="login-box">
      {complete ? (
        "Thanks! Check your mailbox!"
      ) : (
        <form onSubmit={onSubmit} onClick={e => e.stopPropagation()}>
          <div className="email-row">
            <label>Email:</label>
            <input type="email" value={mail} onChange={onChangeMail} placeholder="enter email"/>
            <button className="button">Submit</button>
          </div>
          <a href="/api/auth/google" className="google-signin">Sign in with Google</a>
        </form>
      )}
    </div>
  </div>
);

var TopMenu = React.createClass({
  getInitialState() {
    return {
      loginBoxOpen: false,
      complete: false,
      success: false,
      mail: ''
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
  handleChangeMail(event) {
    this.setState({
      mail: event.target.value
    });
  },
  handleSubmit(event) {
    event.preventDefault();
    postJson('/auth/email/request', { email: this.state.mail })
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
    const { signedIn, signOut } = this.props;
    const { loginBoxOpen, complete, success, mail } = this.state;

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
          {!signedIn && <li onClick={this.openLoginBox}>Login</li>}
          {signedIn && <li onClick={signOut}>Logout</li>}
        </ul>
        {loginBoxOpen && (<LoginBox complete={complete} mail={mail} success={success} onSubmit={this.handleSubmit} onClose={this.closeLoginBox} onChangeMail={this.handleChangeMail} />)}
      </nav>
    );
  }
});

const mapStateToProps = state => ({
  signedIn: state.signedIn,
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  signOut: () => dispatch(setSignedOut())
});

export default connect(mapStateToProps, mapDispatchToProps)(TopMenu);
