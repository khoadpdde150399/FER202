import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// Import all components
import CounterComponent from './components/CounterComponent';
import LightSwitch from './components/LightSwitch';
import LoginForm from './components/LoginForm';
import LoginForm2 from './components/LoginForm2';
import SearchItem from './components/SearchItem';
import SearchAccount from './components/SearchAccount';
import RegisterForm from './components/RegisterForm';
function App() {
  return (
    <div className="App">
      <h1 style={{ textAlign: 'center', marginTop: '20px', color: '#007bff' }}>
        useState Exercises
      </h1>

      <div style={{ padding: '20px' }}>
        {/* Exercise 1 */}
        <CounterComponent />

        {/* Exercise 2 */}
        <LightSwitch />

        {/* Exercise 3 */}
        <LoginForm />

        {/* Exercise 4 */}
        <LoginForm2 />

        {/* Exercise 5 */}
        <SearchItem />

        {/* Exercise 6 */}
        <SearchAccount />

        {/* Exercise 7 */}
        <RegisterForm />
      </div>
    </div>
  );
}

export default App;
