import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios'; 
import './PrivacyPolicyModal .css'; 

Modal.setAppElement('#root'); 
const URL = process.env.REACT_APP_BASE_URL;


const PrivacyPolicyModal = ({ isOpen, closeModal, onAgree, }) => {
  const [agreed, setAgreed] = useState(false);
  const [policyText, setPolicyText] = useState('');

  useEffect(() => {
    const userAgreed = localStorage.getItem('agreedToPrivacyPolicy');
    if (userAgreed) {
      setAgreed(true);
    }

    fetchPrivacyPolicy(); 
  }, []);


  const fetchPrivacyPolicy = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}policies/get`);
  
      console.log(response.data);
      
    
      setPolicyText(response.data[0].text)
    } catch (error) {
      console.error('Error fetching privacy policy:', error);
    }
  };
  
  const handleAgree = () => {
    localStorage.setItem('agreedToPrivacyPolicy', 'true');
    setAgreed(true);
    onAgree(); 
  };

  return (
    <Modal
      isOpen={isOpen && !agreed} 
      onRequestClose={closeModal}
      contentLabel="Privacy Policy Modal"
      className="modal-content" 
      overlayClassName="modal-overlay" 
      ariaHideApp={true} 
    >
      <div className="modal-header">
        <h2>Գաղտնիության քաղաքականություն</h2>
      </div>
      <div className="modal-body">
        <p>{policyText}</p>
      </div>
      <div className="modal-footer">
        <button onClick={handleAgree} className="modal-button">
          {agreed ? 'Agreed' : 'Agree to Policy'}
        </button>
      </div>
    </Modal>
  );
};

export default PrivacyPolicyModal;
