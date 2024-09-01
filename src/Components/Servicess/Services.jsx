import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import './Services.css';

Modal.setAppElement('#root'); // Assuming your app's root element has id 'root'

const Services = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedService, setSelectedService] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BASE_URL}services/get`);
                
                
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setServices(data);
                setLoading(false);
                console.log(data);
                
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    if (loading) {
        return <div>Բեռնվում է...</div>;
    }

    if (error) {
        return <div>Սխալ: {error.message}</div>;
    }

    const openModal = (service) => {
        setSelectedService(service);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedService(null);
    };
console.log(services,555555555555555555);
console.log(selectedService,6666666666666);



    return (
        <>
            <h3>Մեր ծառայությունները</h3>
            <div className="homepage__services-list">
                {services.map((service, index) => (
                    <div key={index} className="homepage__service" onClick={() => openModal(service)}>
                        <h3>{service?.name}</h3>
                        <p>{service?.description}</p>

                

                    </div>

                    
                ))}
            </div>
            
            {selectedService && (
    <div className='ModalPage'>
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Service Details"
            className="service-modal"
            overlayClassName="service-modal-overlay"
        >
            <div className='modalll'>
                <div className='button_close'>
            <button  onClick={closeModal}>Փակել</button>
            </div>
                <h2>{selectedService?.name}</h2>
                <p>{selectedService?.description}</p>

                <div className='titles1'>
                    {selectedService.subTitle.map((item, index) => (
                        <div key={index}>
                            <h4>{item.text}</h4>
                            <ul>
                                {item.details.map((detail, detailIndex) => (
                                    <li key={detailIndex}>{detail}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

            </div>
        </Modal>
    </div>
)}
        </>
    );
};

export default Services;
