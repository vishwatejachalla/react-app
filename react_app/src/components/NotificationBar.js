import React from 'react';
import './NotificationBar.css';
import $ from 'jquery';

const NotificationBar = ({ currentPage, onNext, onBack }) => {
  // return (
  //   <div className="chain">
  //     <div className={currentPage === 'main' ? 'circle active' : 'circles'}>
  //       1
  //     </div>
  //     <div className='pageName'>
  //        <p> Main Page</p>
  //     </div>
  //     <div className="line"></div>
  //     <div className={currentPage === 'second' ? 'circle active' : 'circles'}>
  //       2
  //     </div>
  //     <div className='pageName'>
  //        <p>Second Page</p>
  //     </div>
  //   </div>
  // );
    return(
      <>
        <ul id="progressbar">
          <li className='active' onClick={onBack}>Main Page</li>
          <li className={currentPage === 'second' ? 'active' : ''} onClick={onNext}>Second Page</li>
        </ul>
      </>
    );
};

export default NotificationBar;
