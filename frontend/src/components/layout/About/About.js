import React from "react";
import "./AboutSection.css";
import { Button, Typography, Avatar } from "@material-ui/core";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
const About = () => {
    const visitInstagram = () => {
        window.location = "https://www.instagram.com/mihir_baidya";
    };
    return (
        <div className="aboutSection">
            <div></div>
            <div className="aboutSectionGradient"></div>
            <div className="aboutSectionContainer">
                <Typography component="h1">About Us</Typography>

                <div>
                    <div>
                        <Avatar
                            style={{
                                width: "12vmax",
                                height: "12vmax",
                                margin: "2vmax 0",
                            }}
                            src="https://res.cloudinary.com/dpd7ktvlq/image/upload/v1641062799/personal/IMG_20220102_001430_ildmaz.jpg"
                            alt="Founder"
                        />
                        <Typography>Mihir Baidya</Typography>
                        <Button onClick={visitInstagram} color="primary">
                            Visit Instagram
                        </Button>
                        <span>
                            This is a sample wesbite made by @mihir_baidya. For
                            learning purpose.
                        </span>
                    </div>
                    <div className="aboutSectionContainer2">
                        <Typography component="h2">Our Brands</Typography>
                        <a
                            href="https://www.facebook.com/profile.php?id=100013249242875"
                            target="blank"
                        >
                            <FacebookIcon className="facebookSvgIcon" />
                        </a>

                        <a
                            href="https://www.instagram.com/mihir_baidya"
                            target="blank"
                        >
                            <InstagramIcon className="instagramSvgIcon" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
