import React, { useState, useEffect } from 'react';
import MainPage from './MainPage'
import './MainPage.css';
import postCustomerData from '../service/service';
import {packages, planningDocs, specialTrusts, trustTransferDocs} from '../data/checkboxConstants';

const SecondPage = () => {
  const [selectedPackage, setSelectedPackages] = useState([]);
  const [selectedIndividualDocuments, setSelectedIndividualDocuments] = useState([]);
  const [selectedSpecialTrust, setSelectedSpecialTrust] = useState('');
  const [selectedTransferDocuments, setSelectedTransferDocuments] = useState([]);
  const [isMainPageRender, setisMainPageRender] = useState(false);

  const handleBack = () =>{
    saveData();
    setisMainPageRender(true);
  }

  useEffect(() => {
    const storedData = localStorage.getItem('data2');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setSelectedPackages(parsedData.selectedPackage);
      setSelectedIndividualDocuments(parsedData.selectedIndividualDocuments);
      setSelectedSpecialTrust(parsedData.selectedSpecialTrust);
      setSelectedTransferDocuments(parsedData.selectedTransferDocuments);
    }
  }, []);

  const saveData = () =>{
    localStorage.setItem('data2',
    JSON.stringify({
      selectedPackage,
      selectedIndividualDocuments,
      selectedSpecialTrust,
      selectedTransferDocuments,
    }));
  }

  const handleSave = async () => {
    saveData();
    await postCustomerData(); // TODO: need to move data obj to second page submit button
  };

  const handlePackagesCheckboxChange = (event) => {
    const { name, checked } = event.target;
    if (checked) {
      setSelectedPackages(name);
    } else {
      setSelectedPackages('');
    }
  }

  const handleDocsCheckboxChange = (event) => {
      const { name, checked } = event.target;
      if (checked) {
        setSelectedIndividualDocuments([...selectedIndividualDocuments, name]);
      } else {
        setSelectedIndividualDocuments(selectedIndividualDocuments.filter((item) => item !== name));
      }
  };

  const handleSpecTrustsCheckboxChange = (event) => {
      const { name, checked } = event.target;
      if (checked) {
        setSelectedSpecialTrust([...selectedSpecialTrust, name]);
      } else {
        setSelectedSpecialTrust(selectedSpecialTrust.filter((item) => item !== name));
      }
  };

  const handletrustTransferDocsCheckboxChange = (event) => {
    const { name, checked } = event.target;
    if (checked) {
      setSelectedTransferDocuments([...selectedTransferDocuments, name]);
    } else {
      setSelectedTransferDocuments(selectedTransferDocuments.filter((item) => item !== name));
    }
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
    <div className="checkbox-list">
      {packages.map((pack) => (
        <div className="form-check" key={pack.id}>
          <input
            className="form-check-input"
            type="checkbox"
            name={pack.label}
            checked={selectedPackage === pack.label}
            onChange={handlePackagesCheckboxChange}
          />
          <label className="form-check-label">{pack.label}</label>
        </div>
      ))}
    </div>

    <h3>INDIVIDUAL ESTATE PLANNING DOCUMENT</h3>
    <div className="checkbox-list">
      {planningDocs.map((planningDoc) => (
        <div className="form-check" key={planningDoc.id}>
          <input
            className="form-check-input"
            type="checkbox"
            name={planningDoc.label}
            checked={selectedIndividualDocuments.includes(planningDoc.label)}
            onChange={handleDocsCheckboxChange}
          />
          <label className="form-check-label">{planningDoc.label}</label>
        </div>
      ))}
    </div>


    <h3>SPECIAL IRREVOCABLE TRUSTS</h3>
    <div className="checkbox-list">
      {specialTrusts.map((specialTrust) => (
        <div className="form-check" key={specialTrust.id}>
          <input
            className="form-check-input"
            type="checkbox"
            name={specialTrust.label}
            checked={selectedSpecialTrust.includes(specialTrust.label)}
            onChange={handleSpecTrustsCheckboxChange}
          />
          <label className="form-check-label">{specialTrust.label}</label>
        </div>
      ))}
    </div>

    <h3>TRUST TRANSFER DOCUMENTS</h3>
    <div className="checkbox-list">
      {trustTransferDocs.map((trustTransferDoc) => (
        <div className="form-check" key={trustTransferDoc.id}>
          <input
            className="form-check-input"
            type="checkbox"
            name={trustTransferDoc.label}
            checked={selectedTransferDocuments.includes(trustTransferDoc.label)}
            onChange={handletrustTransferDocsCheckboxChange}
          />
          <label className="form-check-label">{trustTransferDoc.label}</label>
        </div>
      ))}
    </div>

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
