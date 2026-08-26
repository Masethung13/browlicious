import React from 'react';
import Header from './components/Header';
import Home from './components/Home';


function App() {
  return (
    <div className="App">
      {/* Premium responsive header with slide-out menu drawer */}
      <Header />
      <Home />
    </div>
  );
}

export default App;