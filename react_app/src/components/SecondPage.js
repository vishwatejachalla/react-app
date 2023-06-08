import React, { useState } from 'react';
import MainPage from './MainPage'
import './MainPage.css';
import postCustomerData from '../service/service';

const SecondPage = () => {
  const [selectedPackages, setSelectedPackages] = useState([]);
  const [selectedIndividualDocuments, setSelectedIndividualDocuments] = useState([]);
  const [selectedSpecialTrust, setSelectedSpecialTrust] = useState('');
  const [selectedTransferDocuments, setSelectedTransferDocuments] = useState([]);
  const [isMainPageRender, setisMainPageRender] = useState(false);

  const handleBack = () =>{
    setisMainPageRender(true);
  }

  const handleSave = async () => {
    const savedData = localStorage.getItem('data');
    localStorage.setItem('data',
    {
      ...savedData,
      selectedPackages,
      selectedIndividualDocuments,
      selectedSpecialTrust,
      selectedTransferDocuments,
    });

    await postCustomerData(localStorage.getItem('data')); // TODO: need to move data obj to second page submit button
  };

  return ( 
    <>
    {isMainPageRender ? (
        <MainPage/>
      ) : (
    <div className="container page-container">
      
    <div className='form-container card'>

    <h3>FROM THE LIST BELOW, SELECT THE DOCUMENT(S) OR THE PACKAGE THAT BEST FITS YOUR NEEDS.</h3>

    <p>The package or documents selected will dictate the questions that follow.</p>

    <h3>STATE PLANNING PACKAGES (insert prices for each set of documents)</h3>
    <div>
      <input
        type="checkbox"
        id="revocable-trust-package"
        checked={selectedPackages.includes('Revocable Trust Package')}
        onChange={(e) => {
          if (e.target.checked) {
            setSelectedPackages([...selectedPackages, 'Revocable Trust Package']);
          } else {
            setSelectedPackages(selectedPackages.filter((pkg) => pkg !== 'Revocable Trust Package'));
          }
        }}
      />
      <label htmlFor="revocable-trust-package">Revocable Trust Package</label>
    </div>
    <div>
      <input
        type="checkbox"
        id="last-will-package"
        checked={selectedPackages.includes('Last Will and Testament Package')}
        onChange={(e) => {
          if (e.target.checked) {
            setSelectedPackages([...selectedPackages, 'Last Will and Testament Package']);
          } else {
            setSelectedPackages(selectedPackages.filter((pkg) => pkg !== 'Last Will and Testament Package'));
          }
        }}
      />
      <label htmlFor="last-will-package">Last Will and Testament Package</label>
    </div>
    <div>
      <input
        type="checkbox"
        id="power-of-attorney-package"
        checked={selectedPackages.includes('Power of Attorney Package')}
        onChange={(e) => {
          if (e.target.checked) {
            setSelectedPackages([...selectedPackages, 'Power of Attorney Package']);
          } else {
            setSelectedPackages(selectedPackages.filter((pkg) => pkg !== 'Power of Attorney Package'));
          }
        }}
      />
      <label htmlFor="power-of-attorney-package">Power of Attorney Package</label>
    </div>

    <h3>INDIVIDUAL ESTATE PLANNING DOCUMENT</h3>
    {/* Render the individual documents options similarly */}

    <h3>SPECIAL IRREVOCABLE TRUSTS</h3>
    {/* Render the special trusts options similarly */}

    <h3>TRUST TRANSFER DOCUMENTS</h3>
    {/* Render the transfer documents options similarly */}
    <div className="button-container">
      <div className="buttons">
        <button onClick={handleBack}>Back</button>
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
    </div>
  </div>)}
  </>
  );
};

export default SecondPage;
