import React, { useState, useEffect } from 'react';
import './MultiStepForm.css';

const MultiStepForm = () => {
  const [formData, setFormData] = useState({
    personalDetails: {
      firstName: '',
      lastName: '',
      email: '',
    },
    addressDetails: {
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      zipCode: '',
    },
    paymentDetails: {
      cardNumber: '',
      expirationDate: '',
      cvv: '',
    },
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [formErrors, setFormErrors] = useState({});
  const [submissionResult, setSubmissionResult] = useState(null);

  const validatePersonalDetails = () => {
    const { firstName, lastName, email } = formData.personalDetails;
    let errors = {};

    // first name validation 
    if (!firstName.trim()) {
      errors.firstName = 'First Name is required';
    }
    else if (!/^[A-Za-z]+$/.test(firstName)) {
      errors.firstName = 'First Name should contain only alphabets';
    }

    //last name validation

    if (!lastName.trim()) {
      errors.lastName = 'Last Name is required';
    }
    else if (!/^[A-Za-z]+$/.test(lastName)) {
      errors.lastName = 'First Name should contain only alphabets';
    }

    //Email validation
    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Invalid email address';
    }
    return errors;
  };

  const validateAddressDetails = () => {
    const { addressLine1, city, state, zipCode } = formData.addressDetails;
    let errors = {};

    if (!addressLine1.trim()) {
      errors.addressLine1 = 'Address Line 1 is required';
    }

    if (!city.trim()) {
      errors.city = 'City is required';
    }

    if (!state.trim()) {
      errors.state = 'State is required';
    }

    if (!zipCode.trim()) {
      errors.zipCode = 'Zip Code is required';
    }else if (!/^\d{6}$/.test(zipCode)){
      errors.zipCode = 'Zip Code is not valid';
    }

    return errors;
  };

  const validatePaymentDetails = () => {
    const { cardNumber, expirationDate, cvv } = formData.paymentDetails;
    let errors = {};


    //card validation 
    if (!cardNumber.trim()) {
      errors.cardNumber = 'Card Number is required';
    }else if (!/^\d{16}$/.test(cardNumber)){
      errors.cardNumber='card Number is not valid'
    } 


    //date validation 

    if (!expirationDate.trim()) {
      errors.expirationDate = 'Expiration Date is required';
    }else {
      const isValidDate = /^\d{2}\/\d{2}$/.test(expirationDate); // MM YY formate
    
      if (!isValidDate) {
        errors.expirationDate = 'Expiration Date should be in MM/YY format';
      } else {
        const [month, year] = expirationDate.split('/');
        const currentDate = new Date();
        const inputDate = new Date(`20${year}`, month - 1);     
        if (inputDate < currentDate) {
          errors.expirationDate = 'Expiration Date should be in the future';
        }
      }
    }

    // check for cvv 
    
    if (!cvv.trim()) {
      errors.cvv = 'CVV is required';
    }else if (!/^\d{3}$/.test(cvv)){
      errors.cvv = 'CVV is invalid';
    }

    return errors;
  };

  const handleNextPage = () => {
    let errors = {};

    switch (currentPage) {
      case 1:
        errors = validatePersonalDetails();
        break;
      case 2:
        errors = validateAddressDetails();
        break;
      case 3:
        errors = validatePaymentDetails();
        break;
      default:
        break;
    }

    if (Object.keys(errors).length === 0) {
      setFormErrors({});
      setCurrentPage(currentPage + 1);
    } else {
      setFormErrors(errors);
    }
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleInputChange = (e, section) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,[section]: {
        ...prevData[section],[name]: value,
      },
    }));
  };

  const handleSubmit = () => {
    const result = {...formData};
    setSubmissionResult(result);
    console.log('Form Submitted:', formData);
  };

  useEffect(() => {
    if (currentPage === 4) {
      handleSubmit();
    }
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 1:
        return (
          <div className="form-page">
            <h2>Personal Details</h2>
            <div className="form-group">
              <label>First Name:</label>
              <input
                type="text"
                name="firstName"
                value={formData.personalDetails.firstName}
                onChange={(e) => handleInputChange(e, 'personalDetails')}
              />
              {formErrors.firstName && (
                <span className="error-message">{formErrors.firstName}</span>
              )}
            </div>
            <div className="form-group">
              <label>Last Name:</label>
              <input
                type="text"
                name="lastName"
                value={formData.personalDetails.lastName}
                onChange={(e) => handleInputChange(e, 'personalDetails')}
              />
              {formErrors.lastName && (
                <span className="error-message">{formErrors.lastName}</span>
              )}
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="text"
                name="email"
                value={formData.personalDetails.email}
                onChange={(e) => handleInputChange(e, 'personalDetails')}
              />
              {formErrors.email && (
                <span className="error-message">{formErrors.email}</span>
              )}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="form-page">
            <h2>Address Details</h2>
            <div className="form-group">
              <label>Address Line 1:</label>
              <input
                type="text"
                name="addressLine1"
                value={formData.addressDetails.addressLine1}
                onChange={(e) => handleInputChange(e, 'addressDetails')}
              />
              {formErrors.addressLine1 && (
                <span className="error-message">{formErrors.addressLine1}</span>
              )}
            </div>
            <div className="form-group">
              <label>Address Line 2:</label>
              <input
                type="text"
                name="addressLine2"
                value={formData.addressDetails.addressLine2}
                onChange={(e) => handleInputChange(e, 'addressDetails')}
              />
            </div>
            <div className="form-group">
              <label>City:</label>
              <input
                type="text"
                name="city"
                value={formData.addressDetails.city}
                onChange={(e) => handleInputChange(e, 'addressDetails')}
              />
              {formErrors.city && (
                <span className="error-message">{formErrors.city}</span>
              )}
            </div>
            <div className="form-group">
              <label>State:</label>
              <input
                type="text"
                name="state"
                value={formData.addressDetails.state}
                onChange={(e) => handleInputChange(e, 'addressDetails')}
              />
              {formErrors.state && (
                <span className="error-message">{formErrors.state}</span>
              )}
            </div>
            <div className="form-group">
              <label>Zip Code:</label>
              <input
                type="text"
                name="zipCode"
                value={formData.addressDetails.zipCode}
                onChange={(e) => handleInputChange(e, 'addressDetails')}
              />
              {formErrors.zipCode && (
                <span className="error-message">{formErrors.zipCode}</span>
              )}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="form-page">
            <h2>Payment Details</h2>
            <div className="form-group">
              <label>Card Number:</label>
              <input
                type="text"
                name="cardNumber"
                value={formData.paymentDetails.cardNumber}
                onChange={(e) => handleInputChange(e, 'paymentDetails')}
              />
              {formErrors.cardNumber && (
                <span className="error-message">{formErrors.cardNumber}</span>
              )}
            </div>
            <div className="form-group">
              <label>Expiration Date:</label>
              <input
                type="text"
                name="expirationDate"
                value={formData.paymentDetails.expirationDate}
                onChange={(e) => handleInputChange(e, 'paymentDetails')}
              />
              {formErrors.expirationDate && (
                <span className="error-message">{formErrors.expirationDate}</span>
              )}
            </div>
            <div className="form-group">
              <label>CVV:</label>
              <input
                type="text"
                name="cvv"
                value={formData.paymentDetails.cvv}
                onChange={(e) => handleInputChange(e, 'paymentDetails')}
              />
              {formErrors.cvv && (
                <span className="error-message">{formErrors.cvv}</span>
              )}
            </div>
          </div>
        );
      case 4:
        return (
            <div className="form-page">
              <h2>Submission Result</h2>
              {submissionResult && (
                <div>
                  <p>Form submitted successfully!</p>
                  <div className="submission-details">
                    <h3>Personal Details</h3>
                    <p>First Name: {submissionResult.personalDetails.firstName}</p>
                    <p>Last Name: {submissionResult.personalDetails.lastName}</p>
                    <p>Email: {submissionResult.personalDetails.email}</p>
  
                    <h3>Address Details</h3>
                    <p>Address Line 1: {submissionResult.addressDetails.addressLine1}</p>
                    <p>Address Line 2: {submissionResult.addressDetails.addressLine2}</p>
                    <p>City: {submissionResult.addressDetails.city}</p>
                    <p>State: {submissionResult.addressDetails.state}</p>
                    <p>Zip Code: {submissionResult.addressDetails.zipCode}</p>
  
                    <h3>Payment Details</h3>
                    <p>Card Number: {submissionResult.paymentDetails.cardNumber}</p>
                    <p>Expiration Date: {submissionResult.paymentDetails.expirationDate}</p>
                    <p>CVV: {submissionResult.paymentDetails.cvv}</p>
                  </div>
                </div>
              )}
            </div>
          );
      default:
        return null;
    }
  };

  return (

    <div className='background'>
    <h2 className='main-head'>Multistep Form</h2>
    <div className="multi-step-form-container">
      {renderPage()}
      {currentPage !== 4 && (
        <div className="button-container">
          <button onClick={handlePreviousPage} disabled={currentPage === 1}>
            Previous
          </button>
          <button onClick={handleNextPage}>Next</button>
        </div>
      )}
    </div>
    </div>

  );
};

export default MultiStepForm;
