import React  from 'react';
import TopMenu from './TopMenu';

const App = ({ children }) => (
    <div className="app">
        <TopMenu />
        <div className="main-container">
            {children}
        </div>
    </div>
);

export default App;
