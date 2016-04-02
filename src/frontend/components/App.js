import React  from 'react';
import TopMenu from './TopMenu';
import { get } from '../fetcher';
import { connect } from 'react-redux';
import { setSignedIn } from '../store/actions';

const App = React.createClass({
  componentDidMount() {
    const { signedIn, signIn} = this.props;
    if(!signedIn) {
      get('/users/me').then((user) => {
        signIn(user);
      }, (err) => {
        console.log("Not signed in:",err);
      });
    }
  },
  render() {
    const children = this.props.children;
    return (
        <div className="app">
            <TopMenu />
            {children}
        </div>
    );
  }
});

const mapStateToProps = state => ({
  signedIn: state.signedIn,
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  signIn: (user) => dispatch(setSignedIn(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
