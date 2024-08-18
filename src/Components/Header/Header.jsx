import React, { useState } from 'react';
import './Header.css';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { CloseOutlined, MenuOutlined } from "@ant-design/icons";

function Header() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobile,setMobile]=useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="header">
      {/* <div className="header__logo" onClick={() => { navigate("/") }}>
        <img src="./images/EasySol.svg" alt="Easy Sol Logo" />
      </div>
      <div className="header__title">
        <h1>EASY SOL</h1>
        <p className="headerParagraph">Activity Maintenance and Management of Engineering Systems of Buildings</p>
      </div>
      <nav className={`header__nav ${isMobileMenuOpen ? 'header__nav--open' : ''}`}>
        <ul>
          <li><a onClick={() => { navigate("/") }} href="#home"  >Home</a></li>
          <li><a onClick={() => { navigate("/") }} href="#services"  >Services</a></li>
          <li><a onClick={() => { navigate("/") }} href="#about"  >About Us</a></li>
          <li><a href="#contact" onClick={() => { navigate("/vacancies") }}>Vacancies</a></li>
          <li><a href="#contact" onClick={() => { navigate("/partners") }}>Our partners</a></li>
        </ul>
      </nav>
      <div className="header__hamburger" onClick={toggleMobileMenu}>
        <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} size="2x" color="#fff" />
      </div> */}

<div className="constainerHeader">
        <div className="imageHeader" onClick={()=>navigate("/")} >
        <img src="./images/EasySol.svg" alt="Easy Sol Logo" />
            </div>
            <div className="header__title">
        <h2>EASY SOL</h2>
      </div>
        <div className="headericone"id="headericone"onClick={() => setMobile(true)}>{!mobile && <div onClick={() => setMobile(true) }><MenuOutlined /></div>}</div>
        <div className={!mobile ? "items" : "items-mobile"} >
       
          <div className="itemsContainer" id="itemsContainer">

   

          <li><a onClick={() => { navigate("/") }} href="#home"  >Գլխավոր</a></li>
            <li><a onClick={() => { navigate("/") }} href="#services"  >Ծառայություններ</a></li>
            <li><a onClick={() => { navigate("/") }} href="#about"  >Մեր մասին</a></li>
            <li><a href="#contact" onClick={() => { navigate("/vacancies") }}>Թափուր աշխատատեղեր</a></li>
            <li><a href="#contact" onClick={() => { navigate("/partners") }}>Գործընկերներ</a></li>
            {mobile && (
            <div className="closeHeader" id="closeHeader">
              <CloseOutlined onClick={() => {setMobile(!mobile)}}/>
            </div>
          )}

          </div>

          
        </div>
      </div>

    </header>







  );
}

export default Header;
