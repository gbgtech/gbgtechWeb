import React  from 'react';
import TopMenu from './TopMenu';

const App = ({ children }) => (
    <div className="main-body">
        <TopMenu />
        {children}
    </div>
);

export default App;
