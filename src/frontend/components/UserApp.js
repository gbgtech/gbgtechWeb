import React  from 'react';
import RightColumn from './RightColumn';
import LeftColumn from './LeftColumn';

const UserApp = ({ children }) => (
  <div className="main-container">
      <LeftColumn/>
      {children}
      <RightColumn/>
  </div>
);

export default UserApp;
