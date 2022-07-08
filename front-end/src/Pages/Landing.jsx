import { useRef, useState } from "react";
import {Three_Column_Card} from "../Components/Website_Structure/3_Column_Card/3_Column_Card";
import { Info_Card_Left } from '../Components/Website_Structure/Info_Card_Left';
import { Info_Card_Right } from '../Components/Website_Structure/Info_Card_Right';

import bourneLogo from '../Images/logo.png';
import airport from '../Images/airport.png';
import employee from '../Images/employee.png';
import flight from '../Images/flight.png';
import flightCrew from '../Images/flightCrew.png';
import passenger from '../Images/passenger.png';
import quick from '../Images/quick.png';
import organize from '../Images/organize.png';
import centralize from '../Images/centralize.png';

export const Landing = () => {

    const [shouldRender, setShouldRender] = useState(true);

    const toggleComponent = () => {
        setShouldRender(!shouldRender);
    }

    const goToAirports = () =>{
            window.location.href='./airports';
    }

    const goToEmployees = () =>{
        window.location.href='./employees';
    }

    const goToFlights = () =>{
        window.location.href='./flights';
    }

    const goToFlightCrew = () =>{
        window.location.href='./flight-crew';
    }   
    
    const goToPassengers = () =>{
        window.location.href='./passengers';
    }

    return (
        <>
            <div>
                {/* Home Logo */}
                <img className="Logo" src={bourneLogo} alt="Bourne Flight Management Logo"/>
            </div>
            
            <div>
                {/* Hero Statement*/}
                <h1 style={{"padding-left": "7%", "padding-right": "7", "padding-top": "2%"}}>Providing quick and easy access for <br/>flight managers.</h1>
                    {/* App Description */}
                    <p style={{"padding-left": "5%", "padding-right": "5%", "padding-top": "2%"}}><b style={{color:"white"}}>Bourne Flight Management Systems (BFMS) is a web application that provides CRUD (Create, Read, Update, and Delete) operations <br/>for managing airline services. BFMS provides CRUD operations for interacting with airports, employees, flights, flight crews, and passengers.</b></p>
                    <br></br><br></br>
            </div>
            
        <div className="Main">
                <div>
                {/* Features Header */}
                <h2>Features</h2>

                {/* Airport Info Card*/}
                    <Info_Card_Right header="Airport Management" 
                    para1="Create, read, update, and delete airports from a single webpage. Airport listings update in real time to reflect a current and accurate depiction of your airport entries. Each airport can be mapped to a specific city, state, and country and has its own associated supported airlines. Search for airports by its supported airline or by country to narrow down your options."
                    para2="Required Information: Airport Name, City, State, Country, Supported Airlines, and Terminals"
                    imageAlt="Airport Terminal"
                    handleClick={goToAirports} image={airport}/>
                    <br/>
                {/* Employee Info Card */}
                    <Info_Card_Left header="Employee Management" 
                    para1="Create, read, update, and delete employees from a single webpage. Employee listings update in real time to reflect a current and accurate depiction of your employee entries.  Search for employees by last names or occupations."
                    para2="Required Information: First Name, Last Name, Date of Birth, and Occupation"
                    imageAlt="Placeholder image"
                    handleClick={goToEmployees} image={employee}/>
                    <br/>
                {/* Flight Info Card */}
                    <Info_Card_Right header="Flight Management" 
                    para1="Create, read, update, and delete flights from a single webpage. Flight listings update in real time to reflect a current and accurate depiction of your flight entries. Each flight can be mapped to a specific city, state, and country and has its own associated supported airlines. Search for flights by its supported airline or by country to narrow down your options."
                    para2="Required Information: Flight Number, Departures: Airport, Terminal, Date & Time, Arrivals: Airport, Terminals, Date & Time, Flight Crew, Max Passengers, and Passengers"
                    imageAlt="Placeholder image"
                    handleClick={goToFlights} image={flight}/>
                    <br/>
                {/* Flight Crew Info Card */}
                    <Info_Card_Left header="Flight Crew Management" 
                    para1="Create, read, update, and delete flight crews from a single webpage. Flight listings update in real time to reflect a current and accurate depiction of your flight crew entries. Each flight crew can be mapped to a specific airline. Search for flight crews by airline to narrow down your options."
                    para2="Required Information: Team Number, Captain, First Officer, Second Officer, Flight Engineer, Navigator, Purser, Flight Attendants, Load Master, and Flight Medic"
                    imageAlt="Placeholder image"
                    handleClick={goToFlightCrew} image={flightCrew}/>
                    <br/>
                {/* Passengers Info Card */}
                    <Info_Card_Right header="Passenger Management" 
                    para1="Create, read, update, and delete passengers from a single webpage. Passenger listings update in real time to reflect a current and accurate depiction of your passenger entries. Search for passengers by last names."
                    para2="Required Information: First Name, Last Name, Date of Birth, and Requires Assistance"
                    imageAlt="Placeholder image"
                    handleClick={goToPassengers} image={passenger}/>
            </div>

            <br/><br/>

            <div>
                {/* Benefits Header */}
                <h2>Benefits</h2>
                    {/* 3-Column Description */}
                    <Three_Column_Card image1={quick} image2={organize} image3={centralize}
                    imageAlt1="Placeholder image" imageAlt2="Placeholder image" imageAlt3="Placeholder image"
                    head1="Quick Transactions" head2="Organized Information" head3="Centralized Access"
                    par1="Interactive with flight information in real time with no delay."
                    par2="Organize flight information by airports, employees, flights, flight crews, and passengers. Use searching and sorting to find information quick and easy."
                    par3="Access flight information all in one place. Each category can be created, read, updated, and deleted all on one page."/>
            </div>
        </div>
        </>
        
    );
}