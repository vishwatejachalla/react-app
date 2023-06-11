import React, { useState } from 'react';
import MainPage from './components/MainPage';
import NotificationBar from './components/NotificationBar';
import './App.css';
import SecondPage from './components/SecondPage';
import VerticalProgressBar from './components/verticalProgressBar';

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
      <NotificationBar currentPage={currentPage}  onNext={handleNextPage} onBack={handleBackPage}/>
      <div class="container">
        <div class="card">
            <div class="form">
              <VerticalProgressBar/>
              <div class="right-side">
                <form id="msform">
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
              </div>
            </div>
        </div>
      </div>
      <footer>
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <p className='navbar-subhead'>2023 Copyright</p>
        </div>
        </nav>
      </footer>
    </>
  );
};

export default App;
