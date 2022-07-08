import './3_Column_Card.css';
import {useState} from 'react';

export const Three_Column_Card = (props) => {
    return (
        <>
        <div className="Card">
            <div className="row">
                <div className="col-sm-4">
                    <img className="Card_Image" src={props.image1} alt={props.imageAlt1}/>
                    <br/>
                    <h4 >{props.head1}</h4>
                    <p className='Para'>{props.par1}</p>
                </div>

                <div className="col-sm-4">
                    <img className="Card_Image" src={props.image2} alt={props.imageAlt2}/>
                    <br/>
                    <h4 >{props.head2}</h4>
                    <p className='Para'>{props.par2}</p>
                </div>

                <div className="col-sm-4">
                    <img className="Card_Image" src={props.image3} alt={props.imageAlt3}/>
                    <br/>
                    <h4 >{props.head3}</h4>
                    <p className='Para'>{props.par3}</p>
                </div>
            </div>
        </div>
        </>
    );
}

export default Three_Column_Card;