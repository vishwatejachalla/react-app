import React, {useState} from 'react';
import './verticalProgressBar.css';

const VerticalProgressBar = ({ currentNum, onNumChange }) => {
    return (
        <>
        <div className="left-side">
            <div className="steps-content">
                <h3>Step <span className="step-number">1</span></h3>
                <p className="step-number-content active">Enter your personal information to get closer to companies.</p>
                <p className="step-number-content d-none">Get to know better by adding your diploma,certificate and education life.</p>
                <p className="step-number-content d-none">Help companies get to know you better by telling then about your past experiences.</p>
                <p className="step-number-content d-none">Add your profile piccture and let companies find youy fast.</p>
            </div>
            <ul className="progress-bar">
                <li 
                 className={currentNum >= 1 ? 'active' : ''}
                 onClick={() => onNumChange(1)}>
                    Personal Information
                </li>
                <li 
                 className={currentNum >= 2 ? 'active' : ''}
                 onClick={() => onNumChange(2)}>
                    Document Menu
                </li>
                <li 
                 className={currentNum >= 3 ? 'active' : ''}
                 onClick={() => onNumChange(3)}>
                    Preliminary Trust Information
                </li>
                <li 
                 className={currentNum >= 4 ? 'active' : ''}
                 onClick={() => onNumChange(4)}>
                    Family Information
                </li>
                <li 
                 className={currentNum >= 5 ? 'active' : ''}
                 onClick={() => onNumChange(5)}>
                    Successor Trustees
                </li>
                <li className={currentNum >= 6 ? 'active' : ''}
                 onClick={() => onNumChange(6)}>
                    Special Distributions
                </li>
                <li className={currentNum >= 7 ? 'active' : ''}
                 onClick={() => onNumChange(7)}>
                    Remaining Distributions
                </li>
            </ul>
        </div>
        </>
    );
}

export default VerticalProgressBar