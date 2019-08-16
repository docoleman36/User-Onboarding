import React from 'react';
import ReactDOM from 'react-dom';

import UserForm from './component/UserForm';

import './App.css';

function App() {
  return (
    <div className="App">
      <UserForm />
    </div>
  );
}

export default App;

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
