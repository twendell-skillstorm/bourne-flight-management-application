import {useState} from "react";
import './Info_Card_Right.css';
import {Button} from '../Button';

export const Info_Card_Right = (props) => {
    return (
        <>
        <div className="Info">
            <div>
                <h3 style={{textAlign: "left"}}>{props.header}</h3>
            </div>

            <br></br><br></br>

            <div class="row">
                <div class="col-sm-6">
                    <img className="Info_Image" src={props.image} alt={props.imageAlt}/>
                </div>

                <div class="col-sm-6">
                    <p>{props.para1}</p>
                    <p>{props.para2}</p>
                    <Button className="button-sm" onClick={props.handleClick} buttonName="Get Started"/>
                </div>
            </div>
        </div>
        </>
        
    );
}

export default Info_Card_Right;