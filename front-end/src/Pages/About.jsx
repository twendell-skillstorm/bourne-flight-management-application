import {useState} from 'react'
import { Info_Card_Left } from '../Components/Website_Structure/Info_Card_Left';
import { Info_Card_Right } from '../Components/Website_Structure/Info_Card_Right';
import React from 'react';
import ReactImagesCarousel from 'react-images-carousel';

import grad from '../Images/grad.png';
import logo from '../Images/logo.png';
import airport from '../Images/airport.png';
import employee from '../Images/employee.png';
import flight from '../Images/flight.png';
import flightCrew from '../Images/flightCrew.png';
import passenger from '../Images/passenger.png';
import quick from '../Images/quick.png';
import organize from '../Images/organize.png';
import centralize from '../Images/centralize.png';

export const About = () => {
    const [shouldRender, setShouldRender] = useState(true);

    const toggleComponent = () => {
        setShouldRender(!shouldRender);
    }

    const sliderData = [
        logo,
        airport,
        employee,
        flight,
        flightCrew,
        passenger,
        quick,
        organize,
        centralize
    ];

    return (
        <>
            <div className='Main'>
                <h1>About Me</h1>
                {/* Personal Description */}
                    <Info_Card_Right header="Hi, my name is Taylor Wendell." 
                    para1="I am a computer programmer with six years of education experience in programming with proficiency in JavaScript, HTML/CSS, and Python. Among my specific areas of expertise are web design, software development, social media marketing, and sales. I hold a Bachelor's degree in Computer Science from Liberty University."
                    para2="I am currently focusing on video game development, web design, and graphic design through personal projects. Additional focuses include general computer programming, software development, and database management."
                    imageAlt="Placeholder image"
                    image={grad}/>

                {/* Skills & Experience */}

                <div className='row'>
                    {/* Skills */}
                    <div className='col-sm-6' style={{padding:"2%"}}>
                        <h3>Skills</h3>
                        <br></br>
                        <div className='d-flex justify-content-between'>
                            <div>
                                <h6>Software</h6>
                                <br></br>
                                <ul>
                                    <li>VSCode</li>
                                    <li>React</li>
                                    <li>Maven</li>
                                    <li>NodeJS</li>
                                    <li>Bootstrap</li>
                                </ul>
                            </div>

                            <div>
                                <h6>Technical Skills</h6>
                                <br></br>
                                <ul>
                                    <li>Database Management</li>
                                    <li>Server Development</li>
                                    <li>Web Application Development</li>
                                    <li>UX Design</li>
                                    <li>Graphic Design</li>
                                </ul>
                            </div>

                            <div>
                                <h6>Languages</h6>
                                <br></br>
                                <ul>
                                    <li>Python</li>
                                    <li>Java</li>
                                    <li>JavaScript</li>
                                    <li>SQL</li>
                                    <li>HTML/ CSS</li>
                                </ul>
                            </div>
                        </div>
                        <br></br>

                        {/*Portfollio Carousel */}
                        <div>
                            <h3>Portfolio</h3>
                            <p>Enjoy some of my designs created using Canva</p>
                            <ReactImagesCarousel className="Carousel" images={sliderData} sliderBg="white" paginationBg="#1C3556"/>
                        </div>
                    </div>

                    {/* Experience */}
                    <div className='col-sm-6' style={{padding:"2%"}}>
                        <h3>Experience</h3>
                        <br></br>
                        <h5 style={{textAlign: "left"}}>LP3 -Remote Web Developer</h5>
                        <h6 style={{textAlign: "left"}}>MAR 2022 - JUN 2022</h6>
                        <p style={{textAlign: "left"}}>Web developer in charge of creating, revising, and maintaining the company website. Responsibilities included:</p>
                        <ul>
                            <li>Created dynamic screen mockups</li>
                            <li>Organized website navigation</li>
                            <li>Created web page banners and organized layouts</li>
                            <li>Added web pages with related information</li>
                            <li>Created working resources leading to outside sources</li>
                            <li>Connected news APIs to the website</li>
                        </ul>
                        <br></br>
                        <h5 style={{textAlign: "left"}}>SkillStorm -Remote Software Developer</h5>
                        <h6 style={{textAlign: "left"}}>May 2022 - CURRENT</h6>
                        <p style={{textAlign: "left"}}>Software developer in charge of creating, testing, and executing software applications. Responsibilities included:</p>
                        <ul>
                            <li>Creating dynamic websites using React and NodeJS</li>
                            <li>Connecting front-end web applications with a back-end server</li>
                            <li>Implementing focused projects with CRUD-operation support</li>
                            <li>Documenting, testing, and fixing software bugs and issues</li>
                            <li>Creating and maintaining Java Servlet applications</li>
                            <li>Creating and maintaining React web applications</li>
                            <li>Creating and maintaining MongoDB databases</li>
                            <li>Creating and maintainingg MYSQL databases</li>
                        </ul>
                    </div>

                </div>
            </div>
        </>
    );
}