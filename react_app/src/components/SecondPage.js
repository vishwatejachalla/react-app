import React, { useState } from 'react';
import './MainPage.css';
import { useNavigate } from 'react-router-dom';

const SecondPage = (data) => {
  const history = useNavigate();
  const formData = data;
  const [selectedPackages, setSelectedPackages] = useState([]);
  const [selectedIndividualDocuments, setSelectedIndividualDocuments] = useState([]);
  const [selectedSpecialTrust, setSelectedSpecialTrust] = useState('');
  const [selectedTransferDocuments, setSelectedTransferDocuments] = useState([]);

  const handleSave = () => {
    const combinedData = {
      ...formData,
      selectedPackages,
      selectedIndividualDocuments,
      selectedSpecialTrust,
      selectedTransferDocuments,
    };

    fetch('/api/save-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(combinedData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Data saved successfully:', data);
        // Handle any further actions or UI updates
      })
      .catch((error) => {
        console.error('Error saving data:', error);
        // Handle error case
      });
  };

  return ( 
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
        <button onClick={history(-1)}>Back</button>
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
    </div>
  </div>
  );
};

export default SecondPage;
