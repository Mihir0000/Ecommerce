import React from "react";
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";
import "./Footer.css";

const Footer = () => {
    return (
        <footer id="footer">
            <div className="leftFooter">
                <h4>DOENLOAD OUR APP</h4>
                <p>Download App for Android and IOS mobile phone</p>
                <img src={playStore} alt="playStore" />
                <img src={appStore} alt="AppStore" />
            </div>
            <div className="midFooter">
                <h1>ECOMMERCE</h1>
                <p>High Quality is our first priority</p>
                <p>Copyrights 2022 &copy; MeMihirBaidya</p>
            </div>
            <div className="rightFooter">
                <h4>Follow Us</h4>
                <a href="https://www.instagram.com/mihir_baidya/">Instagram</a>
                <a href="https://www.facebook.com/profile.php?id=100013249242875">
                    Facebook
                </a>
                <a href="https://www.youtube.com/">YouTube</a>
            </div>
        </footer>
    );
};

export default Footer;
