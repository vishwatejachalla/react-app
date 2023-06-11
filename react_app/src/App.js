import React, { useState } from 'react';
import MainPage from './components/MainPage';
import NotificationBar from './components/NotificationBar';
import './App.css';
import SecondPage from './components/SecondPage';

const App = () => {
  const [currentPage, setCurrentPage] = useState('main');

  const handleNextPage = () => {
    setCurrentPage('second');
  };

  const handleBackPage = () => {
    setCurrentPage('main');
  }

  return (
    <>
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <h1 className="navbar-head mx-auto">GM Law</h1>
          <p className='navbar-subhead mx-auto'>Estate Planning & Asset Protection</p>
        </div>
      </nav>
      <form id="msform">
        <NotificationBar currentPage={currentPage}  onNext={handleNextPage} onBack={handleBackPage}/>
          {currentPage === 'main' && (
            <fieldset>
              <MainPage onNextPage={handleNextPage}/>
            </fieldset>
          )}
          {currentPage === 'second' && (
            <fieldset>
              <SecondPage onBackPage={handleBackPage}/>
            </fieldset>
          )}
      </form>
    </>
  );
};

export default App;
