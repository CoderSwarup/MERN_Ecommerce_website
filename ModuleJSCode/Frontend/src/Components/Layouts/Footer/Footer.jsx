import React from "react";
// import playStore from "../../../images/playstore.png";
// import appStore from "../../../images/Appstore.png";
import "./Footer.css";

const Footer = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and IOS mobile phone</p>
        {/* <img src={playStore} alt="playstore" />
        <img src={appStore} alt="Appstore" /> */}
      </div>

      <div className="midFooter">
        <h1>ECOMMERCE.</h1>
        <p>High Quality is our first priority</p>

        <p>Copyrights {currentYear} &copy; Swarup Bhise</p>
      </div>

      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href="https://www.instagram.com/swarup_bhise999">Instagram</a>
        <a href="https://api.whatsapp.com/send?phone=8308657425">Whatsapp</a>
        <a href="https://github.com/CoderSwarup">GitHub</a>
      </div>
    </footer>
  );
};

export default Footer;
