import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faPlus, faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import './EditVacancies.css';

const URL = process.env.REACT_APP_BASE_URL;

const EditVacancies = () => {
  const [vacancies, setVacancies] = useState([]);
  const [expandedVacancy, setExpandedVacancy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newVacancy, setNewVacancy] = useState({
    name: '',
    description: '',
    title: '',
    text: '',
    salary: '',
    titles1: [''],
    titles2: [''],
    titles3: [''],
  });
  const [editVacancy, setEditVacancy] = useState({
    id: null,
    name: '',
    description: '',
    title: '',
    text: '',
    salary: '',
    titles1: [''],
    titles2: [''],
    titles3: [''],
  });
  const [addingVacancy, setAddingVacancy] = useState(false);

  useEffect(() => {
    fetchVacancies();
  }, []);

  const fetchVacancies = async () => {
    try {
      const response = await axios.get(`${URL}vacancies/get`);
      setVacancies(response.data);
      setLoading(false);
      console.log(response.data);
    } catch (error) {
      setError(error.message || 'Error fetching vacancies');
      setLoading(false);
    }
  };

  const toggleVacancy = (index) => {
    if (expandedVacancy === index) {
      setExpandedVacancy(null);
    } else {
      setExpandedVacancy(index);
    }
  };

  const handleAddVacancy = async (e) => {
    e.preventDefault();
    try {
        const vacancyData = {
            ...newVacancy,
            salary: Number(newVacancy.salary),
            titles1: JSON.stringify(newVacancy.titles1),
            titles2: JSON.stringify(newVacancy.titles2),
            titles3: JSON.stringify(newVacancy.titles3),
        };
        await axios.post(`${URL}vacancies/add`, vacancyData);
        await fetchVacancies();
        setNewVacancy({
            name: '',
            description: '',
            title: '',
            text: '',
            salary: '',
            titles1: [''],
            titles2: [''],
            titles3: [''],
        });
        setAddingVacancy(false);
    } catch (error) {
        setError(error.message || 'Error adding vacancy');
    }
};

const handleEditVacancy = async (e) => {
    e.preventDefault();
    try {
        const vacancyData = {
            ...editVacancy,
            salary: Number(editVacancy.salary),
            titles1: JSON.stringify(editVacancy.titles1),
            titles2: JSON.stringify(editVacancy.titles2),
            titles3: JSON.stringify(editVacancy.titles3),
        };
        await axios.put(`${URL}vacancies/put/${editVacancy.id}`, vacancyData);
        await fetchVacancies();
        setEditVacancy({
            id: null,
            name: '',
            description: '',
            title: '',
            text: '',
            salary: '',
            titles1: [''],
            titles2: [''],
            titles3: [''],
        });
    } catch (error) {
        setError(error.message || 'Error editing vacancy');
    }
};


  const handleDeleteVacancy = async (id) => {
    try {
      await axios.delete(`${URL}vacancies/del/${id}`);
      const updatedVacancies = vacancies.filter((vacancy) => vacancy.id !== id);
      setVacancies(updatedVacancies);
    } catch (error) {
      setError(error.message || 'Error deleting vacancy');
    }
  };

  const handleEditClick = (vacancy) => {
    setEditVacancy({ ...vacancy });
    setExpandedVacancy(null);
  };

  const handleCancelEdit = () => {
    setEditVacancy({
      id: null,
      name: '',
      description: '',
      title: '',
      text: '',
      salary: '',
      titles1: [''],
      titles2: [''],
      titles3: [''],
    });
  };

  const handleChangeNewVacancy = (e) => {
    const { name, value } = e.target;
    setNewVacancy({ ...newVacancy, [name]: value });
  };

  const handleChangeEditVacancy = (e) => {
    const { name, value } = e.target;
    setEditVacancy((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleArrayChange = (e, index, arrayName, stateUpdater) => {
    const { value } = e.target;
    stateUpdater((prevState) => {
      const updatedArray = [...prevState[arrayName]];
      updatedArray[index] = value;
      return { ...prevState, [arrayName]: updatedArray };
    });
  };

  const addArrayItem = (arrayName, stateUpdater) => {
    stateUpdater((prevState) => ({
      ...prevState,
      [arrayName]: [...prevState[arrayName], ''],
    }));
  };

  const removeArrayItem = (index, arrayName, stateUpdater) => {
    stateUpdater((prevState) => {
      const updatedArray = prevState[arrayName].filter((_, i) => i !== index);
      return { ...prevState, [arrayName]: updatedArray };
    });
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="edit-vacancies-container">
      <h2>Manage Vacancies</h2>

      {!addingVacancy && (
        <button className="add-vacancy-btn" onClick={() => setAddingVacancy(true)}>
          <FontAwesomeIcon icon={faPlus} /> Add Vacancy
        </button>
      )}

      {addingVacancy && (
        <form onSubmit={handleAddVacancy} className="vacancy-form">
          <label>Name:</label>
          <input type="text" name="name" value={newVacancy.name} onChange={handleChangeNewVacancy} required />

          <label>Description:</label>
          <input type="text" name="description" value={newVacancy.description} onChange={handleChangeNewVacancy} required />

          <label>Title:</label>
          <input type="text" name="title" value={newVacancy.title} onChange={handleChangeNewVacancy} required />

          <label>Text:</label>
          <input type="text" name="text" value={newVacancy.text} onChange={handleChangeNewVacancy} required />

          <label>Salary:</label>
          <input type="number" name="salary" value={newVacancy.salary} onChange={handleChangeNewVacancy} required />

          <label>Titles1:</label>
          {newVacancy.titles1.map((title, index) => (
            <div key={index}>
              <input
                type="text"
                value={title}
                onChange={(e) => handleArrayChange(e, index, 'titles1', setNewVacancy)}
              />
              <button type="button" onClick={() => removeArrayItem(index, 'titles1', setNewVacancy)}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
          ))}
          <button type="button" onClick={() => addArrayItem('titles1', setNewVacancy)}>
            Add Titles1
          </button>

          <label>Titles2:</label>
          {newVacancy.titles2.map((title, index) => (
            <div key={index}>
              <input
                type="text"
                value={title}
                onChange={(e) => handleArrayChange(e, index, 'titles2', setNewVacancy)}
              />
              <button type="button" onClick={() => removeArrayItem(index, 'titles2', setNewVacancy)}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
          ))}
          <button type="button" onClick={() => addArrayItem('titles2', setNewVacancy)}>
            Add Titles2
          </button>

          <label>Titles3:</label>
          {newVacancy.titles3.map((title, index) => (
            <div key={index}>
              <input
                type="text"
                value={title}
                onChange={(e) => handleArrayChange(e, index, 'titles3', setNewVacancy)}
              />
              <button type="button" onClick={() => removeArrayItem(index, 'titles3', setNewVacancy)}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
          ))}
          <button type="button" onClick={() => addArrayItem('titles3', setNewVacancy)}>
            Add Titles3
          </button>

          <div className="form-buttons">
            <button type="submit">
              <FontAwesomeIcon icon={faPlus} /> Add Vacancy
            </button>
            <button type="button" onClick={() => setAddingVacancy(false)}>
              <FontAwesomeIcon icon={faTimes} /> Cancel
            </button>
          </div>
        </form>
      )}

      <div className="vacancies-list">
        {vacancies.map((vacancy, index) => (
          <div key={vacancy.id} className="vacancy-item">
            <div className="vacancy-header" onClick={() => toggleVacancy(index)}>
              <h3>{vacancy.name}</h3>
              <div className="vacancy-icons">
                <FontAwesomeIcon
                  icon={faEdit}
                  onClick={() => handleEditClick(vacancy)}
                  className="edit-vacancies"
                />
                <FontAwesomeIcon
                  icon={faTrashAlt}
                  onClick={() => handleDeleteVacancy(vacancy.id)}
                  className="delete-vacancies"
                />
              </div>
            </div>
            {expandedVacancy === index && (
              <div className="vacancy-details">
                <p>{vacancy.description}</p>
                <p>Title: {vacancy.title}</p>
                <p>Text: {vacancy.text}</p>
                <p>Salary: ${vacancy.salary}</p>
                <p>Created At: {vacancy.created_at}</p>
                <p>Updated At: {vacancy.updated_at}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {editVacancy.id !== null && (
        <form onSubmit={handleEditVacancy} className="vacancy-form edit-form">
          <label>Name:</label>
          <input type="text" name="name" value={editVacancy.name} onChange={handleChangeEditVacancy} required />

          <label>Description:</label>
          <input type="text" name="description" value={editVacancy.description} onChange={handleChangeEditVacancy} required />

          <label>Title:</label>
          <input type="text" name="title" value={editVacancy.title} onChange={handleChangeEditVacancy} required />

          <label>Text:</label>
          <input type="text" name="text" value={editVacancy.text} onChange={handleChangeEditVacancy} required />

          <label>Salary:</label>
          <input type="number" name="salary" value={editVacancy.salary} onChange={handleChangeEditVacancy} required />

          <label>Titles1:</label>
          {editVacancy.titles1.map((title, index) => (
            <div key={index}>
              <input
                type="text"
                value={title}
                onChange={(e) => handleArrayChange(e, index, 'titles1', setEditVacancy)}
              />
              <button type="button" onClick={() => removeArrayItem(index, 'titles1', setEditVacancy)}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
          ))}
          <button type="button" onClick={() => addArrayItem('titles1', setEditVacancy)}>
            Add Titles1
          </button>

          <label>Titles2:</label>
          {editVacancy.titles2.map((title, index) => (
            <div key={index}>
              <input
                type="text"
                value={title}
                onChange={(e) => handleArrayChange(e, index, 'titles2', setEditVacancy)}
              />
              <button type="button" onClick={() => removeArrayItem(index, 'titles2', setEditVacancy)}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
          ))}
          <button type="button" onClick={() => addArrayItem('titles2', setEditVacancy)}>
            Add Titles2
          </button>

          <label>Titles3:</label>
          {editVacancy.titles3.map((title, index) => (
            <div key={index}>
              <input
                type="text"
                value={title}
                onChange={(e) => handleArrayChange(e, index, 'titles3', setEditVacancy)}
              />
              <button type="button" onClick={() => removeArrayItem(index, 'titles3', setEditVacancy)}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
          ))}
          <button type="button" onClick={() => addArrayItem('titles3', setEditVacancy)}>
            Add Titles3
          </button>

          <div className="form-buttons">
            <button type="submit">
              <FontAwesomeIcon icon={faCheck} /> Update Vacancy
            </button>
            <button type="button" onClick={handleCancelEdit}>
              <FontAwesomeIcon icon={faTimes} /> Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default EditVacancies;
