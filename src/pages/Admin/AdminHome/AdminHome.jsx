import React, { useState } from 'react';
import "./AdminHome.css";
import { EditPartners } from '../EditPartners';
import EditServices from '../EditServices/EditServices';
import EditVacancies from '../EditVacancies/EditVacancies';
import PrivacyPolicyEditor from '../PrivacyPolicyEditor/PrivacyPolicyEditor';
import { useNavigate } from 'react-router-dom';


const AdminHome = ({modalIsOpen,setModalIsOpen}) => {
    const adminHeader = ['Գործընկերներ', 'Ծառայություններ', 'Թափուր աշխատատեղեր', 'Գաղտնիություն', 'Դուրս գալ'];
    const [activeSection, setActiveSection] = useState('Գործընկերներ');
    const navigate = useNavigate();

    const renderSection = () => {
        switch (activeSection) {
            case 'Գործընկերներ':
                return <EditPartners />;
            case 'Ծառայություններ':
                return <EditServices />;
            case 'Թափուր աշխատատեղեր':
                return <EditVacancies />;
            case 'Գաղտնիություն':
                return <PrivacyPolicyEditor 
                modalIsOpen={modalIsOpen}
                setModalIsOpen={setModalIsOpen}
                />;
            case 'Դուրս գալ':
                localStorage.removeItem('auth');
                navigate("/");
                break;
            default:
                return <EditPartners />;
        }
    };

    return (
        <div className="admin-home">
            <aside className="admin-sidebar">
                {adminHeader.map((item) => (
                    <button
                        key={item}
                        className={`admin-sidebar-item ${activeSection === item ? 'active' : ''}`}
                        onClick={() => setActiveSection(item)}
                    >
                        {item}
                    </button>
                ))}
            </aside>
            <main className="admin-content">
                {renderSection()}
            </main>
        </div>
    );
};

export default AdminHome;
