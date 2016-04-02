import React  from 'react';
import TopMenu from './TopMenu';
import RightColumn from './RightColumn';
import LeftColumn from './LeftColumn';
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
            <div className="main-container">
                <LeftColumn/>
                {children}
                <RightColumn/>
            </div>
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
