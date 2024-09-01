import React from 'react';
import './Footer.css';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__logo" onClick={() => { navigate("/") }}>
          <img src="./images/EasySol.svg" alt="Easy Sol Logo" />
        </div>
        <div className="footer__info">
          <p>© 2024 Easy Sol. Բոլոր իրավունքները պաշտպանված են.</p>
          <p>Գործունեություն Շենքերի ինժեներական համակարգերի սպասարկում և կառավարում</p>
        </div>
        <div className="footer__nav">
          <ul>
            <li><a href="#terms" onClick={() => { navigate("/Contact") }}> Կապ մեզ հետ </a></li>
            {/* <li><a href="#privacy" onClick={() => { navigate("/Snack") }}>Գաղտնիության քաղաքականություն</a></li> */}
            {/* <li><a href="#terms" onClick={() => { navigate("/Snack") }}>Ծառայության պայմաններ</a></li> */}
          </ul>
        </div>
        <div className="footer__social">
          
        {/* <li><a href="#terms" onClick={() => { navigate("/Contact") }}> Կապ մեզ հետ </a></li> */}

          <a href="https://www.facebook.com/profile.php?id=61562435567827&mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faFacebook} /></a>
          <a href="https://www.instagram.com/easy_sol.am?igsh=ZHJlczNvNW4yNWlh" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faInstagram} /></a>
          <a href="https://www.linkedin.com/company/104765741/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faLinkedin} /></a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
