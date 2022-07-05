import React from 'react';
import JwtInterceptor from './helpers/JwtInterceptor';
import './App.css';
import Navigation from './components/navigation.component';


function App() {
  JwtInterceptor();
  return (
    <Navigation/>

  );
}

export default App;
