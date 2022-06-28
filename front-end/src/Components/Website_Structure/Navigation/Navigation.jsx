import './Navigation.css';
import icon from './favicon.ico';

export const Navigation = () => {
    return (
        <>
        <div className="Navigation">
            <ul>
                <li style={{float: "left"}}><img className="Icon" src={icon} alt="Bourne Flight Management Icon"/></li>
                <li style={{float: "left"}}><a  href='/'><h5 className="noHover">Bourne Flight Management</h5></a></li>
                
                <li><a className="Hover" href='/passengers'>Passengers</a></li>
                <li><a className="Hover" href='/flight-crew'>Flight Crews</a></li>
                <li><a className="Hover" href='/flights'>Flights</a></li>
                <li><a className="Hover" href='/employees'>Employees</a></li>
                <li><a className="Hover" href='/airports'>Airports</a></li>
                <li><a className="Hover" href='/about'>About</a></li>
                <li><a className="Hover" href='/'>Home</a></li>
            </ul>
        </div>
        </>
    );
}