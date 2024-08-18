import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faPlus, faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import './EditServices.css';

const URL = process.env.REACT_APP_BASE_URL;

const EditServices = () => {
    const [services, setServices] = useState([]);
    const [expandedService, setExpandedService] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newService, setNewService] = useState({ name: '', description: '',  subTitle: [{ text: '', details: [''] }] });
    const [editService, setEditService] = useState({ id: null, name: '', description: '',  subTitle: [{ text: '', details: [''] }] });
    const [showAddForm, setShowAddForm] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const response = await axios.get(`${URL}services/get`);
            setServices(response.data);
            setLoading(false);
        } catch (error) {
            setError(error.message || 'Error fetching services');
            setLoading(false);
        }
    };

    const toggleService = (index) => {
        setExpandedService(expandedService === index ? null : index);
    };

    const handleAddService = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await axios.post(`${URL}services/add`, newService);
            await fetchServices();
            setNewService({ name: '', description: '',  subTitle: [{ text: '', details: [''] }] });
            setShowAddForm(false);
        } catch (error) {
            setError(error.message || 'Error adding service');
        } finally {
            setLoading(false);
        }
    };

    // const handleEditService = async (e) => {
    //     e.preventDefault();
    //     try {
    //         setLoading(true);
    //         await axios.put(`${URL}services/put/${editService.id}`, editService);
    //         await fetchServices();
    //         setEditService({ id: null, name: '', description: '',  subTitle: [{ text: '', details: [''] }] });
    //     } catch (error) {
    //         setError(error.message || 'Error editing service');
    //     } finally {
    //         setLoading(false);
    //     }
    // };


    const handleEditService = async (e) => {
        e.preventDefault();
        console.log('Editing service:', editService);
        try {
            setLoading(true);
            await axios.put(`${URL}services/put/${editService.id}`, editService);
            await fetchServices();
            setEditService({ id: null, name: '', description: '',  subTitle: [{ text: '', details: [''] }] });
        } catch (error) {
            console.error('Error editing service:', error);
            setError(error.message || 'Error editing service');
        } finally {
            setLoading(false);
        }
    };
    


    const handleDeleteService = async (id) => {
        try {
            await axios.delete(`${URL}services/del/${id}`);
            setServices(services.filter(service => service.id !== id));
        } catch (error) {
            setError(error.message || 'Error deleting service');
        }
    };

    // const handleEditClick = (service) => {
    //     setEditService({ ...service });
    //     setExpandedService(null);
    // };
    const handleEditClick = (service) => {
        setEditService({ ...service });
        setExpandedService(null);
    };
    

    const handleCancelEdit = () => {
        setEditService({ id: null, name: '', description: '', subTitle: [{ text: '', details: [''] }] });
    };

    const handleChangeNewService = (e) => {
        const { name, value } = e.target;
        setNewService(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleChangeEditService = (e) => {
        const { name, value } = e.target;
        setEditService(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handlesubTitleChange = (index, key, value, isEdit) => {
        if (isEdit) {
            setEditService(prevState => {
                const subTitle = [...prevState.subTitle];
                subTitle[index] = { ...subTitle[index], [key]: value };
                return { ...prevState, subTitle };
            });
        } else {
            setNewService(prevState => {
                const subTitle = [...prevState.subTitle];
                subTitle[index] = { ...subTitle[index], [key]: value };
                return { ...prevState, subTitle };
            });
        }
    };

    const handleDetailsChange = (subTitleIndex, detailIndex, value, isEdit) => {
        if (isEdit) {
            setEditService(prevState => {
                const subTitle = [...prevState.subTitle];
                const details = [...subTitle[subTitleIndex].details];
                details[detailIndex] = value;
                subTitle[subTitleIndex] = { ...subTitle[subTitleIndex], details };
                return { ...prevState, subTitle };
            });
        } else {
            setNewService(prevState => {
                const subTitle = [...prevState.subTitle];
                const details = [...subTitle[subTitleIndex].details];
                details[detailIndex] = value;
                subTitle[subTitleIndex] = { ...subTitle[subTitleIndex], details };
                return { ...prevState, subTitle };
            });
        }
    };

    const addsubTitleField = (isEdit) => {
        if (isEdit) {
            setEditService(prevState => ({
                ...prevState,
                subTitle: [...prevState.subTitle, { text: '', details: [''] }]
            }));
        } else {
            setNewService(prevState => ({
                ...prevState,
                subTitle: [...prevState.subTitle, { text: '', details: [''] }]
            }));
        }
    };

    const addDetailField = (subTitleIndex, isEdit) => {
        if (isEdit) {
            setEditService(prevState => {
                const subTitle = [...prevState.subTitle];
                subTitle[subTitleIndex].details.push('');
                return { ...prevState, subTitle };
            });
        } else {
            setNewService(prevState => {
                const subTitle = [...prevState.subTitle];
                subTitle[subTitleIndex].details.push('');
                return { ...prevState, subTitle };
            });
        }
    };

    const removesubTitleField = (index, isEdit) => {
        if (isEdit) {
            setEditService(prevState => {
                const subTitle = [...prevState.subTitle];
                subTitle.splice(index, 1);
                return { ...prevState, subTitle };
            });
        } else {
            setNewService(prevState => {
                const subTitle = [...prevState.subTitle];
                subTitle.splice(index, 1);
                return { ...prevState, subTitle };
            });
        }
    };

    const removeDetailField = (subTitleIndex, detailIndex, isEdit) => {
        if (isEdit) {
            setEditService(prevState => {
                const subTitle = [...prevState.subTitle];
                subTitle[subTitleIndex].details.splice(detailIndex, 1);
                return { ...prevState, subTitle };
            });
        } else {
            setNewService(prevState => {
                const subTitle = [...prevState.subTitle];
                subTitle[subTitleIndex].details.splice(detailIndex, 1);
                return { ...prevState, subTitle };
            });
        }
    };

    return (
        <div className="edit-services-container">
            <h2>Մեր ծառայությունները</h2>

            {!showAddForm && (
                <button onClick={() => setShowAddForm(true)} className="add-service-button">
                    <FontAwesomeIcon icon={faPlus} /> Ավելացնել ծառայություն
                </button>
            )}

            {showAddForm && (
                <form className="service-form">
                    <label>Անուն:</label>
                    <input type="text" name="name" value={newService.name} onChange={handleChangeNewService} required />
                    
                    <label>Նկարագրություն:</label>
                    <input type="text" name="description" value={newService.description} onChange={handleChangeNewService} required />
{/*                     
                    <label>Մանրամասներ:</label>
                    <input type="text" name="" value={newService.} onChange={handleChangeNewService} required /> */}

                    {newService.subTitle.map((subTitle, index) => (
                        <div key={index}>
                            <label>Մանրամասներ {index + 1} </label>
                            <input
                                type="text"
                                value={subTitle.text}
                                onChange={(e) => handlesubTitleChange(index, 'text', e.target.value, false)}
                            />
                            <label>Ենթավերնագիր:</label>
                            {subTitle.details.map((detail, detailIndex) => (
                                <div key={detailIndex}>
                                    <input
                                        type="text"
                                        value={detail}
                                        onChange={(e) => handleDetailsChange(index, detailIndex, e.target.value, false)}
                                    />
                                    <button type="button" onClick={() => removeDetailField(index, detailIndex, false)}>
                                        <FontAwesomeIcon icon={faTimes} />
                                    </button>
                                </div>
                            ))}
                            <button type="button" onClick={() => addDetailField(index, false)}>
                                <FontAwesomeIcon icon={faPlus} /> Ավելացնել մանրամասնություն
                            </button>
                            <button type="button" onClick={() => removesubTitleField(index, false)}>
                                <FontAwesomeIcon icon={faTimes} />
                            </button>
                        </div>
                    ))}

                    <button type="button" onClick={() => addsubTitleField(false)}>
                        <FontAwesomeIcon icon={faPlus} /> Ավելացնել ենթավերնագիր
                    </button>

                    <div className="form-buttons">
                        <button type="subTitlemit" onClick={handleAddService}><FontAwesomeIcon icon={faPlus} /> Ավելացնել ծառայություն</button>
                        <button type="button" onClick={() => setShowAddForm(false)}><FontAwesomeIcon icon={faTimes} /> Չեղարկել</button>
                    </div>
                </form>
            )}

            <div className="services-list">
                {services.map((service, index) => (
                    <div key={service.id} className="service-item">
                        <div className="service-header" onClick={() => toggleService(index)}>
                            <h3>{service.name}</h3>
                            <div className="service-icons">
                                <FontAwesomeIcon icon={faEdit} onClick={() => handleEditClick(service)} className="edit-iconservice" />
                                <FontAwesomeIcon icon={faTrashAlt} onClick={() => handleDeleteService(service.id)} className="delete-icon" />
                            </div>
                        </div>
                        {expandedService === index && (
                            <div className="service-">
                                <p>{service.description}</p>
                                {/* <p>{service.}</p> */}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {editService.id !== null && (
               <form onSubmit={handleEditService} className="service-form edit-form">
    <label>Անուն:</label>
    <input type="text" name="name" value={editService.name} onChange={handleChangeEditService} required />
    
    <label>Նկարագրություն:</label>
    <input type="text" name="description" value={editService.description} onChange={handleChangeEditService} required />
    
    {editService.subTitle.map((subTitle, index) => (
        <div key={index}>
            <label>Մանրամասներ {index + 1} </label>
            <input
                type="text"
                value={subTitle.text}
                onChange={(e) => handlesubTitleChange(index, 'text', e.target.value, true)}
            />
            <label>Ենթավերնագիր:</label>
            {subTitle.details.map((detail, detailIndex) => (
                <div key={detailIndex}>
                    <input
                        type="text"
                        value={detail}
                        onChange={(e) => handleDetailsChange(index, detailIndex, e.target.value, true)}
                    />
                    <button type="button" onClick={() => removeDetailField(index, detailIndex, true)}>
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                </div>
            ))}
            <button type="button" onClick={() => addDetailField(index, true)}>
                <FontAwesomeIcon icon={faPlus} /> Ավելացնել մանրամասնություն
            </button>
            <button type="button" onClick={() => removesubTitleField(index, true)}>
                <FontAwesomeIcon icon={faTimes} />
            </button>
        </div>
    ))}

    <button type="button" onClick={() => addsubTitleField(true)}>
        <FontAwesomeIcon icon={faPlus} /> Ավելացնել ենթավերնագիր
    </button>

    <div className="form-buttons">
        <button type="submit"><FontAwesomeIcon icon={faCheck} /> Թարմացման ծառայություն</button>
        <button type="button" onClick={handleCancelEdit}><FontAwesomeIcon icon={faTimes} /> Չեղարկել</button>
    </div>
</form>

            )}

            {loading && <div className="loading">Բեռնվում է...</div>}
            {error && <div className="error">Սխալ: {error}</div>}
        </div>
    );
};

export default EditServices;
