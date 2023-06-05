import React, { useState } from 'react';
import './MainPage.css';
import { statesData } from '../data/statesData';
import { countiesData } from '../data/countiesData';
import { countriesData } from '../data/countriesData';
import SecondPage from '../components/SecondPage';
import postCustomerData from '../service/service';

const MainPage = () => {
  const [name, setName] = useState({ first: '', middle: '', last: '' });
  const [address, setAddress] = useState({ line1: '', line2: '', city: '', state: '', zip: '' });
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [residency, setResidency] = useState({ state: '', county: '' });
  const [citizenship, setCitizenship] = useState('');
  const [isSecondRendered, setIsSecondRendered] = useState(false);
  const [mainPageData, setMainPageData] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

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

  async function validateForm(data) {
    let errors = '';

    if (!data.email) {
      errors = 'Please enter an email address.';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
      errors = 'Invalid email address.';
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
    setMainPageData(data);
    const error = await validateForm(data);
    if(error){
      setErrorMessage(error);
    }
    if(data && !error){
      setIsSecondRedered(true);
      await postCustomerData(name, address); // TODO: need to move data obj to second page submit button
    }
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
      {isSecondRendered ? (
        <SecondPage data={mainPageData} />
      ) : (
        <div className="container page-container">
          <h1 className="heading">GM LAW</h1>
          <h2 className="subheading">Estate Planning & Asset Protection</h2>
          <div className="form-container card">
            <div className="error-message">
              <label>{errorMessage}</label>
            </div>
            <div className="form-section">
              <h2>Personal Information</h2>
              <h3>Your Name*</h3>
              <div className="name-inputs">
                <input
                  type="text"
                  name="first"
                  placeholder="First"
                  value={name.first}
                  onChange={handleNameChange}
                  className="form-control input-3d"
                />
                <input
                  type="text"
                  name="middle"
                  placeholder="Middle Name"
                  value={name.middle}
                  onChange={handleNameChange}
                  className="form-control input-3d"
                />
                <input
                  type="text"
                  name="last"
                  placeholder="Last Name"
                  value={name.last}
                  onChange={handleNameChange}
                  className="form-control input-3d"
                />
              </div>
            </div>

            <div className="form-section">
              <h3>Mailing Address*</h3>
              <div className="address-inputs">
                <input
                  type="text"
                  name="line1"
                  placeholder="Address Line 1"
                  value={address.line1}
                  onChange={handleAddressChange}
                  className="form-control input-3d"
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
                />
              </div>
              <div className="state-zip">
                <select
                  name="state"
                  value={address.state}
                  onChange={handleAddressChange}
                  className="state-dropdown form-control select-3d"
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
                />
              </div>
            </div>

            <div className="form-section">
              <strong>Email* </strong>
              <input type="text" 
              value={email} 
              placeholder='Email'
              onChange={handleEmailChange} 
              className="form-control input-3d"
              required
              />
            </div>

            <div className="form-section">
              <strong>Gender* </strong>
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
                  <strong>State of Residency </strong>
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
                  <strong>County of Residency </strong>
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
                  <strong>Country of Citizenship </strong>
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
              <div className="buttons">
                <button onClick={handleReset}>Reset</button>
                <button onClick={handleNext}>Next</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MainPage;
