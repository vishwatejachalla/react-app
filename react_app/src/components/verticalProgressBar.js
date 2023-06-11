import React from 'react';
import './verticalProgressBar.css';

const VerticalProgressBar = () => {
    return (
        <>
        <div class="left-side">
            <div class="steps-content">
                <h3>Step <span class="step-number">1</span></h3>
                <p class="step-number-content active">Enter your personal information to get closer to companies.</p>
                <p class="step-number-content d-none">Get to know better by adding your diploma,certificate and education life.</p>
                <p class="step-number-content d-none">Help companies get to know you better by telling then about your past experiences.</p>
                <p class="step-number-content d-none">Add your profile piccture and let companies find youy fast.</p>
            </div>
            <ul class="progress-bar">
                <li class="active">Personal Information</li>
                <li>Education</li>
                <li>Work Experience</li>
                <li>User Photo</li>
            </ul>
        </div>
        </>
    );
}

export default VerticalProgressBar