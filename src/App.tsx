import Dashboard from 'containers/Dashboard';
import React from 'react';
interface ISample {
    id?: string;
    name?: string;
    yearOld?: number;
    createdAt?: Date;
}
interface IAppProps {
    sample?: ISample;
}

function App(props: IAppProps): React.FunctionComponentElement<IAppProps> {
    return (
        <div className="App">
            <p className="style-app-p">This is from App</p>
            <Dashboard />
        </div>
    );
}

export default App;
