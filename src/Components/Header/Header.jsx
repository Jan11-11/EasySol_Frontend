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
            <li><a href="#contact" onClick={() => { navigate("/partners") }}>Գործընկերները</a></li>
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
