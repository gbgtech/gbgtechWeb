import React  from 'react';
import TopMenu from './TopMenu';
import RightColumn from './RightColumn';
import LeftColumn from './LeftColumn';

const App = ({ children }) => (
    <div className="app">
        <TopMenu />
        <div className="main-container">
            <LeftColumn/>
            {children}
            <RightColumn/>
        </div>
    </div>
);

export default App;
