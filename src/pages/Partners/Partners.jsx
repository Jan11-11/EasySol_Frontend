import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Partners.css";

const Partners = () => {
    const [partners, setPartners] = useState([]);
    const [selectedPartner, setSelectedPartner] = useState(null);

    useEffect(() => {
        fetchPartners();
    }, []);

    const fetchPartners = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}partners/get`);
            setPartners(response.data);
        } catch (error) {
            console.error('Error fetching partners:', error);
            // Handle error fetching partners
        }
    };

    const openModal = (partner) => {
        setSelectedPartner(partner);
    };

    const closeModal = () => {
        setSelectedPartner(null);
    };

    return (
        <div className="partners-page">
            <h1>Մեր Գործընկերները</h1>
            <div className="partners-list">
                {partners.map((partner) => (
                    <div key={partner.id} className="partner-card" onClick={() => openModal(partner)}>
                        <img src={partner.logo} alt={partner.name} />
                        <div className="partner-details">
                            <h3>{partner.name}</h3>
                        </div>
                    </div>
                ))}
            </div>
            {selectedPartner && (
                <div className="modal" onClick={closeModal}>
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>&times;</span>
                        <h2>{selectedPartner.title}</h2>
                        <p>{selectedPartner.text}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Partners;
