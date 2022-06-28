import './Footer.css';
import twitter from './twitter.png';
import github from './github.png';
import instagram from './instagram.png';
import linkedin from './linkedin.png';

export const Footer = () => {
    return (
        <>
        <div className="Footer">
            <div className="d-flex justify-content-around">
            
                <div className="Container">

                </div>
                
                <div className="Container">
                    <h5 className="List_Header">Learn More</h5>
                    <hr></hr>
                    <a className="Link" href="#">Airport Management Tutorial</a>
                    <a className="Link" href="#">Employee Management Tutorial</a>
                    <a className="Link" href="#">Flight Management Tutorial</a>
                    <a className="Link" href="#">Flight Crew Management Tutorial</a>
                    <a className="Link" href="#">Passenger Management Tutorial</a>
                </div>

                <div className="Container">
                    <h5 className="List_Header">Support</h5>
                    <hr></hr>
                    <a className="Link" href="#">Github</a>
                    <a className="Link" href="#">FAQs</a>
                    <a className="Link" href="/about">About</a>
                </div>

                <div className="Container">
                    <h5 className="List_Header">Contact Me</h5>
                    <hr></hr>
                    <div class="d-flex justify-content-between">
                        <img className="Icons" src={twitter} alt="Twitter Icon"/>
                        <img className="Icons" src={github} alt="GitHub Icon"/>
                        <img className="Icons" src={instagram} alt="Instagram Icon"/>
                        <img className="Icons" src={linkedin} alt="LinkedIn Icon"/>
                    </div>
                </div>

                <div className="Container">

                </div>
                
            </div>
        </div>

        </>
    );
}