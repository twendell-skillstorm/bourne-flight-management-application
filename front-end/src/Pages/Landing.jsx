import { useRef, useState } from "react";
import {Three_Column_Card} from "../Components/Website_Structure/3_Column_Card/3_Column_Card";
import { Button } from '../Components/Website_Structure/Button';
import { Info_Card_Left } from '../Components/Website_Structure/Info_Card_Left';
import { Info_Card_Right } from '../Components/Website_Structure/Info_Card_Right';

import bourneLogo from '../Images/logo.png';
import placeholder from '../Images/placeholder.png';

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
                <h1>quisque id diam vel quam elementum pulvinar etiam non quam</h1>
                    {/* App Description */}
                    <p><b>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Placerat in egestas erat imperdiet sed euismod nisi porta lorem.</b></p>
                    <br></br><br></br>
            </div>
            
            <div>
                {/* Features Header */}
                <h2>Features</h2>

                {/* Airport Info Card*/}
                    <Info_Card_Right header="Airport Management" 
                    para1="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed vulputate mi sit amet. Sollicitudin nibh sit amet commodo nulla facilisi nullam vehicula. Volutpat maecenas volutpat blandit aliquam etiam. Dictum varius duis at consectetur lorem. Tellus orci ac auctor augue mauris augue neque gravida in. Risus nec feugiat in fermentum posuere urna nec tincidunt. Proin nibh nisl condimentum id venenatis a. Consequat semper viverra nam libero justo laoreet sit amet. Id interdum velit laoreet id donec ultrices. Id donec ultrices tincidunt arcu non sodales. Elit ut aliquam purus sit amet luctus venenatis lectus."
                    para2="Feugiat nibh sed pulvinar proin gravida hendrerit. Egestas dui id ornare arcu odio ut sem nulla pharetra. Sed adipiscing diam donec adipiscing. Id velit ut tortor pretium. Sollicitudin aliquam ultrices sagittis orci a scelerisque purus. Aliquet enim tortor at auctor urna nunc id cursus metus. Nisi lacus sed viverra tellus in hac habitasse platea dictumst. Senectus et netus et malesuada fames. At varius vel pharetra vel turpis nunc eget. Et netus et malesuada fames ac turpis egestas. Id eu nisl nunc mi ipsum faucibus vitae aliquet. Amet risus nullam eget felis eget nunc lobortis mattis aliquam. Aliquet bibendum enim facilisis gravida neque convallis."
                    imageAlt="Placeholder image"
                    handleClick={goToAirports} image={placeholder}/>

                {/* Employee Info Card */}
                    <Info_Card_Left header="Employee Management" 
                    para1="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed vulputate mi sit amet. Sollicitudin nibh sit amet commodo nulla facilisi nullam vehicula. Volutpat maecenas volutpat blandit aliquam etiam. Dictum varius duis at consectetur lorem. Tellus orci ac auctor augue mauris augue neque gravida in. Risus nec feugiat in fermentum posuere urna nec tincidunt. Proin nibh nisl condimentum id venenatis a. Consequat semper viverra nam libero justo laoreet sit amet. Id interdum velit laoreet id donec ultrices. Id donec ultrices tincidunt arcu non sodales. Elit ut aliquam purus sit amet luctus venenatis lectus."
                    para2="Feugiat nibh sed pulvinar proin gravida hendrerit. Egestas dui id ornare arcu odio ut sem nulla pharetra. Sed adipiscing diam donec adipiscing. Id velit ut tortor pretium. Sollicitudin aliquam ultrices sagittis orci a scelerisque purus. Aliquet enim tortor at auctor urna nunc id cursus metus. Nisi lacus sed viverra tellus in hac habitasse platea dictumst. Senectus et netus et malesuada fames. At varius vel pharetra vel turpis nunc eget. Et netus et malesuada fames ac turpis egestas. Id eu nisl nunc mi ipsum faucibus vitae aliquet. Amet risus nullam eget felis eget nunc lobortis mattis aliquam. Aliquet bibendum enim facilisis gravida neque convallis."
                    imageAlt="Placeholder image"
                    handleClick={goToEmployees} image={placeholder}/>

                {/* Flight Info Card */}
                    <Info_Card_Right header="Flight Management" 
                    para1="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed vulputate mi sit amet. Sollicitudin nibh sit amet commodo nulla facilisi nullam vehicula. Volutpat maecenas volutpat blandit aliquam etiam. Dictum varius duis at consectetur lorem. Tellus orci ac auctor augue mauris augue neque gravida in. Risus nec feugiat in fermentum posuere urna nec tincidunt. Proin nibh nisl condimentum id venenatis a. Consequat semper viverra nam libero justo laoreet sit amet. Id interdum velit laoreet id donec ultrices. Id donec ultrices tincidunt arcu non sodales. Elit ut aliquam purus sit amet luctus venenatis lectus."
                    para2="Feugiat nibh sed pulvinar proin gravida hendrerit. Egestas dui id ornare arcu odio ut sem nulla pharetra. Sed adipiscing diam donec adipiscing. Id velit ut tortor pretium. Sollicitudin aliquam ultrices sagittis orci a scelerisque purus. Aliquet enim tortor at auctor urna nunc id cursus metus. Nisi lacus sed viverra tellus in hac habitasse platea dictumst. Senectus et netus et malesuada fames. At varius vel pharetra vel turpis nunc eget. Et netus et malesuada fames ac turpis egestas. Id eu nisl nunc mi ipsum faucibus vitae aliquet. Amet risus nullam eget felis eget nunc lobortis mattis aliquam. Aliquet bibendum enim facilisis gravida neque convallis."
                    imageAlt="Placeholder image"
                    handleClick={goToFlights} image={placeholder}/>

                {/* Flight Crew Info Card */}
                    <Info_Card_Left header="Flight Crew Management" 
                    para1="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed vulputate mi sit amet. Sollicitudin nibh sit amet commodo nulla facilisi nullam vehicula. Volutpat maecenas volutpat blandit aliquam etiam. Dictum varius duis at consectetur lorem. Tellus orci ac auctor augue mauris augue neque gravida in. Risus nec feugiat in fermentum posuere urna nec tincidunt. Proin nibh nisl condimentum id venenatis a. Consequat semper viverra nam libero justo laoreet sit amet. Id interdum velit laoreet id donec ultrices. Id donec ultrices tincidunt arcu non sodales. Elit ut aliquam purus sit amet luctus venenatis lectus."
                    para2="Feugiat nibh sed pulvinar proin gravida hendrerit. Egestas dui id ornare arcu odio ut sem nulla pharetra. Sed adipiscing diam donec adipiscing. Id velit ut tortor pretium. Sollicitudin aliquam ultrices sagittis orci a scelerisque purus. Aliquet enim tortor at auctor urna nunc id cursus metus. Nisi lacus sed viverra tellus in hac habitasse platea dictumst. Senectus et netus et malesuada fames. At varius vel pharetra vel turpis nunc eget. Et netus et malesuada fames ac turpis egestas. Id eu nisl nunc mi ipsum faucibus vitae aliquet. Amet risus nullam eget felis eget nunc lobortis mattis aliquam. Aliquet bibendum enim facilisis gravida neque convallis."
                    imageAlt="Placeholder image"
                    handleClick={goToFlightCrew} image={placeholder}/>

                {/* Passengers Info Card */}
                    <Info_Card_Right header="Passenger Management" 
                    para1="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed vulputate mi sit amet. Sollicitudin nibh sit amet commodo nulla facilisi nullam vehicula. Volutpat maecenas volutpat blandit aliquam etiam. Dictum varius duis at consectetur lorem. Tellus orci ac auctor augue mauris augue neque gravida in. Risus nec feugiat in fermentum posuere urna nec tincidunt. Proin nibh nisl condimentum id venenatis a. Consequat semper viverra nam libero justo laoreet sit amet. Id interdum velit laoreet id donec ultrices. Id donec ultrices tincidunt arcu non sodales. Elit ut aliquam purus sit amet luctus venenatis lectus."
                    para2="Feugiat nibh sed pulvinar proin gravida hendrerit. Egestas dui id ornare arcu odio ut sem nulla pharetra. Sed adipiscing diam donec adipiscing. Id velit ut tortor pretium. Sollicitudin aliquam ultrices sagittis orci a scelerisque purus. Aliquet enim tortor at auctor urna nunc id cursus metus. Nisi lacus sed viverra tellus in hac habitasse platea dictumst. Senectus et netus et malesuada fames. At varius vel pharetra vel turpis nunc eget. Et netus et malesuada fames ac turpis egestas. Id eu nisl nunc mi ipsum faucibus vitae aliquet. Amet risus nullam eget felis eget nunc lobortis mattis aliquam. Aliquet bibendum enim facilisis gravida neque convallis."
                    imageAlt="Placeholder image"
                    handleClick={goToPassengers} image={placeholder}/>

            </div>

            <div>
                {/* Benefits Header */}
                <h2>Benefits</h2>
                    {/* 3-Column Description */}
                    <Three_Column_Card image1={placeholder} image2={placeholder} image3={placeholder}
                    imageAlt1="Placeholder image" imageAlt2="Placeholder image" imageAlt3="Placeholder image"
                    head1="Header 1" head2="Header 2" head3="Header 3"
                    par1="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mi tempus imperdiet nulla malesuada pellentesque elit eget gravida cum."
                    par2="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mi tempus imperdiet nulla malesuada pellentesque elit eget gravida cum."
                    par3="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mi tempus imperdiet nulla malesuada pellentesque elit eget gravida cum."/>
                    
            </div>

        </>
        
    );
}