import React from 'react';
import { Link, browserHistory } from 'react-router';
import { postJson } from '../fetcher';

import { connect } from 'react-redux';

import { setSignedOut } from '../store/actions';
import { roles } from '../roles';



const LoginBox = ({complete, mail, onSubmit, onClose, onChangeMail}) => (
  <div className="shade" onClick={onClose}>
    <div className="login-box">
      {complete ? (
        "Thanks! Check your mailbox!"
      ) : (
        <form onSubmit={onSubmit} onClick={e => e.stopPropagation()}>
          <div className="email-row">
            <label>Email:</label>
            <input type="email" value={mail} onChange={onChangeMail} placeholder="Enter email"/>
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
      mail: '',
      navOpen: false
    };
  },
  toggleNav() {
    this.setState({
      navOpen: !this.state.navOpen
    });
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
  handleSignout() {
    const { signOut } = this.props;
    signOut();
    browserHistory.push('/');
  },
  render() {
    const { signedIn,user } = this.props;

    const { loginBoxOpen, complete, success, mail,navOpen } = this.state;

    return (
      <nav className="main-navigation">
        <Link to={'/'} className="logo"></Link>
        <div className="mobile-button-container">
          <button onClick={this.toggleNav} className={"c-hamburger "+ (navOpen? 'is-active' : '')}>
            <span className="rotateable-span"></span>
            <span></span>
            <span className="rotateable-span"></span>
          </button>
        </div>
        <div className="link-wrapper">
          <ul className={"navigation "+ (navOpen? 'active' : '')}>
            <li><Link to={'/'}>news</Link></li>
            <li><Link to={'/hubs'}>hubs</Link></li>
            {signedIn && <li><Link to={'/post'}>post</Link></li>}
            {signedIn && user.role >= roles.editor && <li><Link to={'/feeds'}>feeds</Link></li>}
            {signedIn && user.role >= roles.editor && <li><Link to={'/admin'}>admin</Link></li>}
            <li><a href="http://gothenburgstartup.com">gothenburg startup map</a></li>
            {!signedIn && <li onClick={this.openLoginBox}><a href="#">login</a></li>}
            {signedIn && <li onClick={this.handleSignout}><a href="#">logout</a></li>}
          </ul>
          {loginBoxOpen && (<LoginBox complete={complete} mail={mail} success={success} onSubmit={this.handleSubmit} onClose={this.closeLoginBox} onChangeMail={this.handleChangeMail} />)}
        </div>
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
