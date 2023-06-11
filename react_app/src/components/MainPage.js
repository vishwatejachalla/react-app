import React, { useState, useEffect } from 'react';
import { statesData } from '../data/statesData';
import { countiesData } from '../data/countiesData';
import { countriesData } from '../data/countriesData';

const MainPage = ({ onNextPage }) => {
  const [name, setName] = useState({ first: '', middle: '', last: '' });
  const [address, setAddress] = useState({ line1: '', line2: '', city: '', state: '', zip: '' });
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [residency, setResidency] = useState({ state: '', county: '' });
  const [citizenship, setCitizenship] = useState('');
  const [errorMessage, setErrorMessage] = useState({});



  useEffect(() => {
    const storedData = localStorage.getItem('data1');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setName(parsedData.name);
      setAddress(parsedData.address);
      setEmail(parsedData.email);
      setGender(parsedData.gender);
      setResidency(parsedData.residency);
      setCitizenship(parsedData.citizenship);
    }
    window.onbeforeunload = () => {
      localStorage.removeItem('data1');
      localStorage.removeItem('data2');
    };
  }, []);

  const handleNameChange = (event) => {
    const { name, value } = event.target;
    setName((prevName) => ({ ...prevName, [name]: value }));
  };

  const handleAddressChange = (event) => {
    const { name, value } = event.target;
    setAddress((prevAddress) => ({ ...prevAddress, [name]: value }));
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleResidencyChange = (event) => {
    const { name, value } = event.target;
    setResidency((prevResidency) => ({ ...prevResidency, [name]: value }));
  };

  const handleCitizenshipChange = (event) => {
    setCitizenship(event.target.value);
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  async function validateForm(data) {
    debugger
    const errors = {};

    if (!data.name.first.trim()) {
      errors.first = 'First name is required';
    }

    if (!data.name.last.trim()) {
      errors.last = 'Last name is required';
    }

    if (!data.email.trim()) {
      errors.email = 'Email is required';
    } else if (!isValidEmail(email)) {
      errors.email = 'Invalid email format';
    }
    return errors;
  }

  const handleNext = async () => {
    const data = {
        name,
        address,
        email,
        gender,
        residency,
        citizenship,
    }
    localStorage.setItem('data1',JSON.stringify(data));
    const error = await validateForm(data);
    const err = Object.keys(error).length === 0;
    if(!err){
      setErrorMessage(error);
    }
    if(data && err){
      onNextPage();
    }
    console.log(errorMessage);
 };

  const handleReset = () => {
    setName({ first: '', middle: '', last: '' });
    setAddress({ line1: '', line2: '', city: '', state: '', zip: '' });
    setEmail('');
    setGender('');
    setResidency({ state: '', county: '' });
    setCitizenship('');
    setErrorMessage('');
  };

  return (
    <>
      <div className='firstPage'>
        <div className="form-section">
          <h2>Personal Information</h2>
          <h3>Your Name<span className="text-danger">*</span></h3>
          <div className="name-inputs">
            {errorMessage.first && <label id="errors">{errorMessage.first}</label>}
            <input
              type="text"
              name="first"
              placeholder="First"
              value={name.first}
              onChange={handleNameChange}
              className="form-control input-3d"
              required
            />
            <input
              type="text"
              name="middle"
              placeholder="Middle Name"
              value={name.middle}
              onChange={handleNameChange}
              className="form-control input-3d"
            />
            {errorMessage.last && <label id="errors">{errorMessage.last}</label>}
            <input
              type="text"
              name="last"
              placeholder="Last Name"
              value={name.last}
              onChange={handleNameChange}
              className="form-control input-3d"
              required
            />
          </div>
        </div>

        <div className="form-section">
          <h3>Mailing Address<span className="text-danger">*</span></h3>
          <div className="address-inputs">
            <input
              type="text"
              name="line1"
              placeholder="Address Line 1"
              value={address.line1}
              onChange={handleAddressChange}
              className="form-control input-3d"
              required
            />
            <br />
            <input
              type="text"
              name="line2"
              placeholder="Address Line 2"
              value={address.line2}
              onChange={handleAddressChange}
              className="form-control input-3d"
            />
            <br />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={address.city}
              onChange={handleAddressChange}
              className="form-control input-3d"
              required
            />
          </div>
          <div className="state-zip">
            <select
              name="state"
              value={address.state}
              onChange={handleAddressChange}
              className="state-dropdown form-control select-3d"
              required
            >
              <option value="">State</option>
              {statesData.map((state) => (
                <option key={state.code} value={state.code}>
                  {state.name}
                </option>
              ))}
            </select>
            <br />
            <input
              type="text"
              name="zip"
              placeholder="Zip Code"
              value={address.zip}
              onChange={handleAddressChange}
              className="form-control input-3d"
              required
            />
          </div>
        </div>

        <div className="form-section">
          <h3>Email <span className="text-danger">*</span></h3>
          {errorMessage.email && <label id="errors">{errorMessage.email}</label>}
          <input type="email" 
          value={email} 
          placeholder='Email'
          onChange={handleEmailChange} 
          className="form-control input-3d"
          required
          />
        </div>

        <div className="form-section">
          <h3>Gender<span className="text-danger">*</span> </h3>
          <select 
          value={gender} 
          onChange={handleGenderChange}
          className="form-control select-3d"
          >
            <option value="">Not Selected</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="container">
          <div className='row'>
            <div className='col'>
              <h3>State of Residency </h3>
              <select
                name="state"
                value={residency.state}
                onChange={handleResidencyChange}
                className="form-control select-3d"
              >
                <option value="">Not selected</option>
                {statesData.map((state) => (
                  <option key={state.code} value={state.code}>
                    {state.name}
                  </option>
                ))}
              </select>
            </div>
            <br/>
            <div className='col'>
              <h3>County of Residency </h3>
              <select
                name="county"
                value={residency.county}
                onChange={handleResidencyChange}
                className="form-control select-3d"
              >
                <option value="">Not Selected</option>
                {countiesData[residency.state]?.map((county) => (
                  <option key={county} value={county}>
                    {county}
                  </option>
                ))}
              </select>
            </div>
            <br/>
            <div className='col'>
              <h3>Country of Citizenship </h3>
              <select
                value={citizenship}
                onChange={handleCitizenshipChange}
                className="form-control select-3d"
              >
                <option value="">Not Selected</option>
                {countriesData.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="button-container">
          <div className="button">
            <button className="action-button" onClick={handleReset}>Reset</button>
            <button className="action-button" onClick={handleNext}>Next</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainPage;
