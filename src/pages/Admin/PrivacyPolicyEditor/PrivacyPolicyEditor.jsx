import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import './PrivacyPolicyEditor.css';

const PrivacyPolicyEditor = ({ modalIsOpen, setModalIsOpen }) => {
  const [policyText, setPolicyText] = useState('');
  const [editable, setEditable] = useState(false);
  const [newPolicyText, setNewPolicyText] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPrivacyPolicy();
  }, []);

  const fetchPrivacyPolicy = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}policies/get`);
      const policy = response.data[0];
      setPolicyText(policy.text);
      setModalIsOpen(policy.show);
    } catch (error) {
      console.error('Error fetching privacy policy:', error);
      setError('Failed to fetch privacy policy. Please try again later.');
    }
  };

  const handleEdit = () => {
    setNewPolicyText(policyText);
    setEditable(true);
  };

  const handleSave = async () => {
    try {
      await axios.put(`${process.env.REACT_APP_BASE_URL}policies/put/1`, {
        text: newPolicyText,
        show: modalIsOpen,
      });
      setPolicyText(newPolicyText);
      setEditable(false);
    } catch (error) {
      console.error('Error updating privacy policy:', error);
      setError('Failed to update privacy policy. Please try again later.');
    }
  };

  const handleCancel = () => {
    setEditable(false);
    setNewPolicyText('');
  };

  const handleChangeShow = async (e) => {
    try {
      const newShowValue = e.target.checked;
      await axios.put(`${process.env.REACT_APP_BASE_URL}policies/put/1`, {
        show: newShowValue,
        text: policyText,
      });
      setModalIsOpen(newShowValue);
    } catch (error) {
      console.error('Error updating privacy policy:', error);
      setError('Failed to update privacy policy. Please try again later.');
    }
  };

  return (
    <div className="privacy-policy-editor">
      <h2>Գաղտնիության քաղաքականություն</h2>
      {!editable ? (
        <div className="policy-text">
          <p>{policyText}</p>
          <FontAwesomeIcon icon={faEdit} className="edit-iconPrivate" onClick={handleEdit} />
        </div>
      ) : (
        <div className="edit-mode">
          <textarea
            className="policy-textarea"
            value={newPolicyText}
            onChange={(e) => setNewPolicyText(e.target.value)}
          />
          <div className="edit-controls">
            <button onClick={handleSave} className="save-button">
              <FontAwesomeIcon icon={faSave} /> Պահպանել
            </button>
            <button onClick={handleCancel} className="cancel-button">
              <FontAwesomeIcon icon={faTimes} /> Չեղարկել
            </button>
          </div>
        </div>
      )}
      {error && <div className="error-message">{error}</div>}
      <input
        type="checkbox"
        checked={modalIsOpen}
        onChange={handleChangeShow}
      />
    </div>
  );
};

export default PrivacyPolicyEditor;
