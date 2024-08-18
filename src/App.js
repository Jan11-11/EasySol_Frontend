import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import InfoPage from './pages/Info/InfoPage';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Snack from './pages/Snack/Snack';
import Partners from './pages/Partners/Partners';
import Vacancies from './pages/Vacancies/Vacancies';
import { LoginForm } from './pages/Admin/Login';
import { AdminHome } from './pages/Admin/AdminHome';
import { PrivacyPolicyModal } from './Components/PollicyModal';
import { Services } from './Components/Servicess';
import axios from 'axios';
import Contact from './pages/Contact/Contact';


function App() {
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const userAgreed = localStorage.getItem('agreedToPrivacyPolicy');
  const [auth, setAuth] = useState(null);
  const navigate = useNavigate();
  const path = window.location.pathname;
  const location = useLocation();
  const fetchPrivacyPolicy = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}policies/get`);
      setModalIsOpen(response.data[0].show)
    } catch (error) {
      console.error('Error fetching privacy policy:', error);
    }
  };
  useEffect(()=>{},[])
  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleAgree = () => {
    console.log('User agreed to privacy policy');
    closeModal();
  };

  useEffect(() => {
    const storedAuth = localStorage.getItem('auth');
    if (storedAuth) {
      setAuth(JSON?.parse(storedAuth));
    }
    fetchPrivacyPolicy()
  }, []);

  useEffect(() => {
    if (!auth?.accessToken && !localStorage.getItem('auth') && path.includes('admin')) {
      navigate('/login');
    } else if (path?.includes('admin')) {
      navigate('/admin');
    } else if (!path?.includes('admin')) {
      localStorage.removeItem('auth');
    }
  }, [auth, navigate, path]);

  return (
    <div className="App">
      {!location.pathname.startsWith('/login') && <Header />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/info" element={<InfoPage />} />
        <Route path="/partners" element={<Partners />} />
        <Route path="/vacancies" element={<Vacancies />} />
        <Route path="/snack" element={<Snack />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/admin" element={<AdminHome
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />

        {/* <Route path="/service/:id" element={<ServiceDetail />} /> Add this route */}
      </Routes>
      {!location.pathname.startsWith('/login') && <Footer />}
      <PrivacyPolicyModal
        isOpen={modalIsOpen}
        closeModal={closeModal}
        onAgree={handleAgree}
      />
    </div>
  );
}

export default App;
