import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faPlus, faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import './EditPartners.css';

const URL = process.env.REACT_APP_BASE_URL;

const EditPartners = () => {
    const [partners, setPartners] = useState([]);
    const [expandedPartner, setExpandedPartner] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newPartner, setNewPartner] = useState({ name: '', logo: null, logoPreview: '', title: '', text: '' });
    const [editPartner, setEditPartner] = useState({ id: null, name: '', logo: null, logoPreview: '', title: '', text: '' });
    const [addingNew, setAddingNew] = useState(false);

    useEffect(() => {
        fetchPartners();
    }, []);

    const fetchPartners = async () => {
        try {
            const response = await axios.get(`${URL}partners/get`);
            setPartners(response.data);
            setLoading(false);
        } catch (error) {
            setError(error.message || 'Error fetching partners');
            setLoading(false);
        }
    };

    const uploadImageHandler = async (file) => {
        const formData = new FormData();
        formData.append("image", file);
        try {
            const response = await axios.post(`${URL}partners/upload`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            return response.data.url; // Assuming the API returns the URL of the uploaded image
        } catch (error) {
            console.error("Error uploading image:", error);
            return null;
        }
    };

    const handleAddPartner = async (e) => {
        e.preventDefault();
        try {
            const imageUrl = await uploadImageHandler(newPartner.logo);
            if (!imageUrl) throw new Error('Image upload failed.');

            const response = await axios.post(`${URL}partners/add`, {
                name: newPartner.name,
                logo: imageUrl,
                title: newPartner.title,
                text: newPartner.text,
            });

            setPartners([...partners, response.data]);
            setNewPartner({ name: '', logo: null, logoPreview: '', title: '', text: '' });
            setAddingNew(false);
            await fetchPartners();
        } catch (error) {
            setError(error.message || 'Error adding partner');
        }
    };

    const handleEditPartner = async (e) => {
        e.preventDefault();
        try {
            let imageUrl = editPartner.logo;
            if (editPartner.logo instanceof File) {
                imageUrl = await uploadImageHandler(editPartner.logo);
                if (!imageUrl) throw new Error('Image upload failed.');
            }

            const response = await axios.put(`${URL}partners/update/${editPartner.id}`, {
                name: editPartner.name,
                logo: imageUrl,
                title: editPartner.title,
                text: editPartner.text,
            });

            await fetchPartners();
            setEditPartner({ id: null, name: '', logo: null, logoPreview: '', title: '', text: '' });
        } catch (error) {
            setError(error.message || 'Error editing partner');
        }
    };

    const handleDeletePartner = async (id) => {
        try {
            await axios.delete(`${URL}partners/delete/${id}`);
            const updatedPartners = partners.filter(partner => partner.id !== id);
            setPartners(updatedPartners);
        } catch (error) {
            setError(error.message || 'Error deleting partner');
        }
    };

    const togglePartner = (index) => {
        if (expandedPartner === index) {
            setExpandedPartner(null);
        } else {
            setExpandedPartner(index);
        }
    };

    const toggleAddNew = () => {
        if (editPartner.id !== null) {
            setEditPartner({ id: null, name: '', logo: null, logoPreview: '', title: '', text: '' });
        }
        setAddingNew(!addingNew);
        setNewPartner({ name: '', logo: null, logoPreview: '', title: '', text: '' });
    };

    const handleEditClick = (partner) => {
        if (addingNew) {
            setAddingNew(false);
            setNewPartner({ name: '', logo: null, logoPreview: '', title: '', text: '' });
        }
        setEditPartner({ ...partner });
        setExpandedPartner(null);
    };

    const handleCancelEdit = () => {
        setEditPartner({ id: null, name: '', logo: null, logoPreview: '', title: '', text: '' });
    };

    const handleChangeNewPartner = (e) => {
        const { name, value } = e.target;
        setNewPartner({ ...newPartner, [name]: value });
    };

    const handleChangeEditPartner = (e) => {
        const { name, value } = e.target;
        setEditPartner(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFileChange = (e, setPartner) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setPartner(prevState => ({
                ...prevState,
                logo: file,
                logoPreview: reader.result
            }));
        };
        reader.readAsDataURL(file);
    };

    const handleUploadButtonClick = () => {
        document.getElementById('logoInput').click();
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error">Error: {error}</div>;
    }

    return (
        <div className="edit-partners-container">
            <h2>Գործընկերների կառավարում</h2>

            {!addingNew && (
                <button className="add-new-btn" onClick={toggleAddNew}><FontAwesomeIcon icon={faPlus} /> Ավելացնել նոր գործընկեր</button>
            )}

            {addingNew && (
                <form onSubmit={handleAddPartner} className="partner-form">
                    <label>Անուն:</label>
                    <input type="text" name="name" value={newPartner.name} onChange={handleChangeNewPartner} required />
                    <label>Լոգոն:</label>
                    <div className="file-upload">
                        <input type="file" id="logoInput" name="logo" onChange={(e) => handleFileChange(e, setNewPartner)} style={{ display: 'none' }} required />
                        <button type="button" className="upload-btn" onClick={handleUploadButtonClick}>Վերբեռնել լոգոն</button>
                    </div>
                    {newPartner.logoPreview && <img src={newPartner.logoPreview} alt="Logo Preview" className="logo-preview" />}
                    <label>Վերնագիր:</label>
                    <input type="text" name="title" value={newPartner.title} onChange={handleChangeNewPartner} required />
                    <label>Տեքստ:</label>
                    <input type="text" name="text" value={newPartner.text} onChange={handleChangeNewPartner} required />
                    <div className="form-buttons">
                        <button type="submit"><FontAwesomeIcon icon={faCheck} /> Ավելացնել գործընկեր</button>
                        <button type="button" onClick={toggleAddNew}><FontAwesomeIcon icon={faTimes} /> Չեղարկել</button>
                    </div>
                </form>
            )}

            <div className="partners-list">
                {partners.map((partner, index) => (
                    <div key={partner.id} className="partner-item">
                        <div className="partner-header" onClick={() => togglePartner(index)}>
                            <h3>{partner.name}</h3>
                            <div className="partner-icons">
                                <FontAwesomeIcon icon={faEdit} onClick={() => handleEditClick(partner)} className="edit-icon" />
                                <FontAwesomeIcon icon={faTrashAlt} onClick={() => handleDeletePartner(partner.id)} className="delete-icon" />
                            </div>
                        </div>
                        {expandedPartner === index && (
                            <div className="partner-details">
                                <img src={partner.logo} alt={partner.name} />
                                <p>Վերնագիր: {partner.title}</p>
                                <p>Տեքստ: {partner.text}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {editPartner.id !== null && (
                <form onSubmit={handleEditPartner} className="partner-form edit-form">
                    <label>Անուն:</label>
                    <input type="text" name="name" value={editPartner.name} onChange={handleChangeEditPartner} required />
                    <label>Լոգոն:</label>
                    <div className="file-upload">
                        <input type="file" id="logoInput" name="logo" onChange={(e) => handleFileChange(e, setEditPartner)} style={{ display: 'none' }} />
                        <button type="button" className="upload-btn" onClick={handleUploadButtonClick}>Վերբեռնել լոգոն</button>
                    </div>
                    {editPartner.logoPreview && <img src={editPartner.logoPreview} alt="Logo Preview" className="logo-preview" />}
                    <label>Վերնագիր:</label>
                    <input type="text" name="title" value={editPartner.title} onChange={handleChangeEditPartner} required />
                    <label>Տեքստ:</label>
                    <input type="text" name="text" value={editPartner.text} onChange={handleChangeEditPartner} required />
                    <div className="form-buttons">
                        <button type="submit"><FontAwesomeIcon icon={faCheck} /> Թարմացնել գործընկեր</button>
                        <button type="button" onClick={handleCancelEdit}><FontAwesomeIcon icon={faTimes} /> Չեղարկել</button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default EditPartners;
