import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navigation } from './Components/Website_Structure/Navigation';
import {Footer} from './Components/Website_Structure/Footer';
import { Landing, Error, About, Airports, Flights, Flight_Crew, Passengers, Employees} from './Pages';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// React function based component

const App = () => {

    return (
        <>
            <BrowserRouter>
                <Navigation/>
                <div className='App'>
                <Routes>
                    {/* When the URL in the browser becomes /, toggle on the Landing page */}
                    <Route path="/" element={<Landing />} />
                    <Route path="/about" element={<About/>}/>
                    <Route path="/airports" element={<Airports/>}/>
                    <Route path="/employees" element={<Employees/>}/>
                    <Route path="/flights" element={<Flights />} />
                    <Route path="/flight-crew" element={<Flight_Crew />} />
                    <Route path="/passengers" element={<Passengers />} />
                    <Route path="*" element={<Error />} />
                </Routes>
                </div>
                <Footer/>
            </BrowserRouter> 
        </>   
    );   
}

export const a = 'A'; // This is a regular export. Also sometimes a "named export" since you have to refer to it by variable name

export default App; // Only one default per file
// Default exports can renamed in the other file
