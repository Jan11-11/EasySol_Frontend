import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Vacancies.css";

const Vacancies = () => {
    const [vacancies, setVacancies] = useState([]);
    const [openIndex, setOpenIndex] = useState(null);


    useEffect(() => {
        fetchVacancies();
    }, []);

    const fetchVacancies = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}vacancies/get`);
            setVacancies(response.data);
            console.log(response.data,'11111111111111111111111111');
            
        } catch (error) {
            console.error('Error fetching vacancies:', error);
            // Handle error fetching vacancies
        }
    };
    const handleVacancyClick = (index) => {
        setOpenIndex(openIndex === index ? null : index);
      };
    
    




    return (
        <div className='vacancies-page_big'>  
            <div className="vacancies-page">
                <h1>Թափուր աշխատատեղեր</h1>
                <div className="vacancies-list">
                    {vacancies.map((vacancy, index) => (
                        <div key={index} className="vacancy-item">
                            <div className='nameClass' onClick={() => handleVacancyClick(index)}>
                                <h2>{vacancy.name}</h2>
                            </div>
                            
                          {  openIndex === index && (
                            <div className='vacancyTitle'>
                            <p className='descriptClass'>{vacancy.description}</p>
                            <div className='title0Class'>
                            <div> <p>Վերնագիր:</p> {vacancy.title}</div>
                            <div> <p>Տեքստ:</p> {vacancy.text}</div>
                            <div> <p>Աշխատավարձ:</p> ${vacancy.salary}</div>
                            <div> <p>Տեղադրվել է: </p> {vacancy.created_at}</div>
                            <div> <p>Թարմացվել է:</p> {vacancy.updated_at}</div>
                            </div>
                            <div className='titles1Class'>
                            <div className='nameCLassName' >Աշխատանքի նկարագիր<p>{vacancy.titleName}</p></div>
                             
                             <div className='titles1'>Դու կունենաս՝
                             {vacancy.titles1.map((title1, index) => (
                                
                              <li key={index}>{title1}</li>
                        ))}
                        </div>
                             </div>
                             <div className='titles1'  >Աշխատանքի ընթացքում պետք է՝
                             {vacancy.titles2.map((title2, index) => (
                                
                              <li key={index}>{title2}</li>
                        ))}
                             </div>
                             <div className='titles1' >Հաջողելու համար պետք է՝
                             {vacancy.titles3.map((title3, index) => (
                                
                              <li key={index}>{title3}</li>
                        ))}
                             </div>
                                  
                                  <div className='emailclassName'>{vacancy.email}</div>

                             </div>
                             )}
                             </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Vacancies;
