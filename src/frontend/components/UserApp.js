import React  from 'react';
import RightColumn from './RightColumn';
import LeftColumn from './LeftColumn';

const UserApp = ({ children }) => (
  <div className="main-container">
      <section className="who-are-we">
            <h1>GBG tech</h1>
      </section>
      <LeftColumn/>
      {children}
      <RightColumn/>
  </div>
);

export default UserApp;
