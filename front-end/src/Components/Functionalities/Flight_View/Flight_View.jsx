import React, { useState, useEffect, useMemo, useRef } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import BTable from 'react-bootstrap/Table';
import Multiselect from "multiselect-react-dropdown";
import { useTable, useFilters, usePagination } from 'react-table'
// A great library for fuzzy filtering/sorting items
import {matchSorter} from 'match-sorter'

import axios from 'axios'



// Define a default UI for filtering
function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length

  return (
    <input
      value={filterValue || ''}
      onChange={e => {
        setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${count} records...`}
    />
  )
}

function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [row => row.values[id]] })
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = val => !val

// Our table component
function Table({ columns, data }) {
  const filterTypes = React.useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter(row => {
          const rowValue = row.values[id]
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true
        })
      },
    }),
    []
  )

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state,
    visibleColumns,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize=10 },
  } = useTable(
    {
      columns,
      data,
      defaultColumn, // Be sure to pass the defaultColumn option
      filterTypes,
      initialState: { pageIndex: 0 },
    },
    useFilters, // useFilters!
    usePagination
  )

  // We don't want to render all of the rows for this example, so cap
  // it for this use case

  return (
    <>
      <BTable striped hover size="sm" {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>
                  {column.render('Header')}
                  {/* Render the columns filter UI */}
                  <div>{column.canFilter && column.Header != 'Actions' && column.Header != 'Date & Time' && column.Header != 'Terminal' && column.Header != 'Flight Number' ? column.render('Filter') : null}</div>

                </th>
              ))}
            </tr>
          ))}
          <tr>
            <th
              colSpan={visibleColumns.length}
              style={{
                textAlign: 'left',
              }}
            >
            </th>
          </tr>
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </BTable>
      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
            }}
            style={{ width: '100px' }}
          />
        </span>{' '}
      </div>

      <br />
    </>
  )
}

export function Flight_View() {
  const AIRLINES = ["Emirates", "Singapore Airlines", "Quatar Airways", "All Nippon Airways", "Cathay Pacific Airways", "EVA Air", "Delta Airlines", "Southwest Airlines", "Quantas Airways", "Japan Airlines"];
  const airlineRef = useRef();
  const flightNumberRef = useRef();
  const departureAirportRef = useRef();
  const departureDateTimeRef = useRef();
  const arrivalDateTimeRef = useRef();
  const arrivalAirportRef = useRef();
  const flightCrewRef = useRef();
  const passengerLimitRef = useRef();
  const passengerListRef = useRef();

  const [flights, setFlights] = useState([]);
  const [flight, setFlight] = useState({
    _id : "",
    airline : "",
    flightNumber : "",
    departureDateTime : "",
    departureAirport : "",
    arrivalDateTime: "",
    arrivalAirport: "",
    flightCrew: "",
    passengerLimit: "",
    currentPassengers: "",
    passengerList: "",
  });

  const [passengers, setPassengers] = useState([]);
  const [airports, setAirports] = useState([]);
  const [flightCrews, setFlightCrews] = useState([]);

  // Any time state changes, this callback function is executed
  useEffect(() => {
  });

  // componentDidUpdate equivalent
  // this useEffect only runs the callback on mount and whenever the count state changes
  useEffect(() => {
  }, [flight]);

  useEffect(() => {
      axios.get('http://localhost:8085/flights')
          .then(res => setFlights(res.data));
      axios.get('http://localhost:8085/passengers')
      .then(res => setPassengers(res.data));
      axios.get('http://localhost:8085/airports')
      .then(res => setAirports(res.data));
      axios.get('http://localhost:8085/flight-crew')
      .then(res => setFlightCrews(res.data));
    }, []);

  const openFlight = (rowIndex) => {
    console.log(`RI ${rowIndex}: ${typeof rowIndex}`);
    axios.get(`http://localhost:8085/flights/${rowIndex}`)
      .then(res => setFlight(res.data));
  }
  
  const deleteFlight = (rowIndex) => {
    console.log(`Row Index: ${rowIndex}`);
    const res = axios.delete(`http://localhost:8085/flights/${rowIndex}`);
    axios.get('http://localhost:8085/flights')
      .then(res => setFlights(res.data));
    window.location.reload(false);
  }

  const clear = () => {
    setFlight(null);
  }


  const columns = React.useMemo(
    () => [
      {
        Header: 'Flights',
        columns: [
            {
            Header: 'Airline',
            accessor: 'airline',
            },
            {
                Header: 'Flight Number',
                accessor: 'flightNumber',
            },
        ],},
        {
            Header: 'Depatures',
            columns: [
                {
                    Header: 'Airport',
                    accessor: 'departureAirport',
                },
                {
                    Header: 'Date & Time',
                    accessor: 'departureDateTime',
                },
            ],
        },
        {
            Header: 'Arrivals',
            columns: [
                {
                    Header: 'Airport',
                    accessor: 'arrivalAirport',
                },
                {
                    Header: 'Date & Time',
                    accessor: 'arrivalDateTime',
                },
            ],
        },
        {
            Header: ' ',
            columns: [
                {
                    Header: "Actions",
                    accessor: "actions",
                    Cell: (props) => {
                      let rowIdx = props.row.original._id.toString();
                    return (
                        <div>
                        <button className="btn btn-primary" onClick={() => openFlight(rowIdx)}>Edit</button>
                        <button className="btn btn-primary" onClick={() => deleteFlight(rowIdx)}>Delete</button>
                        </div>
                    );
                    },
                },
            ]
        }
     
        ],
    []
  )

  const updateAirline = (value) => {setFlight(previousState => {return {...previousState, airline: value}});}
  const updateFlightNumber = (value) => {setFlight(previousState => {return {...previousState, flightNumber: value}});}
  const updateDepartureAirport = (value) => {setFlight(previousState => {return {...previousState, departureAirport: value}});}
  const updateDepartureDateTime = (value) => {setFlight(previousState => {return {...previousState, departureDateTime: value}});}
  const updateArrivalAirport = (value) => {setFlight(previousState => {return {...previousState, arrivalAirport: value}});}
  const updateArrivalDateTime = (value) => {setFlight(previousState => {return {...previousState, arrivalDateTime: value}});}
  const updateFlightCrew = (value) => {setFlight(previousState => {return {...previousState, flightCrew: value}});}
  const updatePassengerLimit = (value) => {setFlight(previousState => {return {...previousState, passengerLimit: value}});}
  const updatePassengerList = (value) => {setFlight(previousState => {return {...previousState, passengerList: value}});}


  const findAirline = (value) => {
    for (let i = 0; i < AIRLINES.length; i++){
      if(AIRLINES[i] == value.airline){
        return i;
      }
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(flight._id);

      if (flight._id != ""){
        await axios.put(`http://localhost:8085/flights/${flight._id}`, 
            { 
                airline: airlineRef.current.getSelectedItems()[0],
                flightNumber: flightNumberRef.current.value,
                departureDateTime: departureDateTimeRef.current.value,
                departureAirport: departureAirportRef.current.getSelectedItems()[0],
                arrivalDateTime: arrivalDateTimeRef.current.value,
                arrivalAirport: arrivalAirportRef.current.getSelectedItems()[0],
                flightCrew: flightCrewRef.current.getSelectedItems()[0],
                passengerLimit: passengerLimitRef.current.value,
                currentPassengers: passengerListRef.current.getSelectedItemsCount(),
                passengerList: passengerListRef.current.getSelectedItems()[0],
        });
      } else {
        await axios.post('http://localhost:8085/flights', 
            { 
                airline: airlineRef.current.getSelectedItems()[0],
                flightNumber: flightNumberRef.current.value,
                departureDateTime: departureDateTimeRef.current.value,
                departureAirport: departureAirportRef.current.getSelectedItems()[0],
                arrivalDateTime: arrivalDateTimeRef.current.value,
                arrivalAirport: arrivalAirportRef.current.getSelectedItems()[0],
                flightCrew: flightCrewRef.current.getSelectedItems()[0],
                passengerLimit: passengerLimitRef.current.value,
                currentPassengers: passengerListRef.current.getSelectedItemsCount(),
                passengerList: passengerListRef.current.getSelectedItems()[0],
            });
      }
    } catch (error) {
        console.log('Something Went Wrong' + error);
    }
    
    window.location.reload(false);
}
  return (
    <>
      <div>
      <form className="needs-validation container FlightCrewForm" onSubmit={handleSubmit} >
                <div className="row form-row">
                    <div className="form-group col-sm-6">
                        <label htmlFor="airlines">Airline</label>
                        <Multiselect id="airline"
                        placeholder="Please select the airline" 
                        ref={airlineRef}
                        isObject={false}
                        onRemove={(event) => {console.log(event);}}
                        onSelect={(event) => {console.log(event);}}
                        options={AIRLINES}
                        showCheckbox={true}
                        singleSelect={true}
                        selectedValues={[flight != null || undefined ? AIRLINES[findAirline(flight)]: ""]} 
                        onChange={e => updateAirline(e.target.value)}
                        />
                    </div>
                    <div className="form-group col-sm-6">
                        <label htmlFor="flightNumber">Flight Number</label>
                        <input type="number" ref={flightNumberRef} className="form-control" id="flightNumber" placeholder="Enter a flight number" required
                        value={flight != null || undefined ? flight.flightNumber : ""} onChange={e => updateFlightNumber(e.target.value)}
                        />
                    </div>
                </div>
                <br/><br/>
                <div className="row form-row">
                    <h5 style={{textAlign: "left"}}>Departures</h5>
                    <div className="form-group col-sm-4">
                        <label htmlFor="departureAirport">Departure Airport</label>
                        <Multiselect id="departureAirport" 
                        ref={departureAirportRef}
                        placeholder="Choose an airport"
                        isObject={false}
                        onRemove={(event) => {console.log(event);}}
                        onSelect={(event) => {console.log(event);}}
                        options={airports.map((airport, index) =>{
                            return `${airport.name}`;
                        })}
                        showCheckbox={true}
                        singleSelect={true}
                        selectedValues={[flight.departureAirport]}
                        onChange={e => updateDepartureAirport(e.target.value)}
                        />
                    </div>
                    <div className="form-group col-sm-4">
                        <label htmlFor="departureDateTime">Departure Date & Time</label>
                        <input type="datetime-local" ref={departureDateTimeRef} className="form-control" id="departureDateTime" required
                        value={flight != null || undefined ? flight.departureDateTime.substring(0,16) : ""} onChange={e => updateDepartureDateTime(e.target.value)}
                        />
                    </div>
                </div>
                <br/><br/>
                <div className="row form-row">
                    <h5 style={{textAlign: "left"}}>Arrivals</h5>
                    <div className="form-group col-sm-4">
                        <label htmlFor="arrivalAirport">Arrival Airport</label>
                        <Multiselect id="arrivalAirport" 
                        ref={arrivalAirportRef}
                        placeholder="Choose an airport"
                        isObject={false}
                        onRemove={(event) => {console.log(event);}}
                        onSelect={(event) => {console.log(event);}}
                        options={airports.map((airport, index) =>{
                            return `${airport.name}`;
                        })}
                        showCheckbox={true}
                        singleSelect={true}
                        selectedValues={[flight.arrivalAirport]}
                        onChange={e => updateArrivalAirport(e.target.value)}
                        />
                    </div>
                    <div className="form-group col-sm-4">
                        <label htmlFor="arrivalDateTime">Arrival Date & Time</label>
                        <input type="datetime-local" ref={arrivalDateTimeRef} className="form-control" id="arrivalDateTime" required value={flight != null || undefined ? flight.arrivalDateTime.substring(0,16) : ""} onChange={e => updateArrivalDateTime(e.target.value)}/>
                    </div>
                </div>
                
                <br/><br/>
                <div className="row form-row">
                    <h5 style={{textAlign: "left"}}>Flight Crew & Passengers</h5>
                    <div className="form-group col-sm-4">
                        <label htmlFor="flightCrew">Flight Crew</label>
                        <Multiselect id="flightCrew" 
                        ref={flightCrewRef}
                        placeholder="Choose a flight crew"
                        isObject={false}
                        onRemove={(event) => {console.log(event);}}
                        onSelect={(event) => {console.log(event);}}
                        options={flightCrews.map((crew, index) =>{
                            return `${crew.airline} ${crew.teamNumber}`;
                        })}
                        showCheckbox={true}
                        singleSelect={true}
                        selectedValues={[flight.flightCrew]}
                        onChange={e => updateFlightCrew(e.target.value)}
                        />
                    </div>
                    <div className="form-group col-sm-4">
                      <label htmlFor="passengerLimit">Max Passengers</label>
                      <input type="number" ref={passengerLimitRef} className="form-control" id="passengerLimit" placeholder="Enter the number of max passengers" required
                      value={flight.passengerLimit != "" ? flight.passengerLimit : 8}
                      onChange={e => updatePassengerLimit(e.target.value)}
                      />
                    </div>
                    <div className="form-group col-sm-4">
                        <label htmlFor="passengerList">Passengers</label>
                        <Multiselect id="passengerList" 
                        ref={passengerListRef}
                        isObject={false}
                        onRemove={(event) => {console.log(event);}}
                        onSelect={(event) => {console.log(event);}}
                        selectionLimit={passengerLimitRef.current != null || undefined ? passengerLimitRef.current.value : 8}
                        options={passengers.map((passenger, index) =>{
                            return (`${passenger.firstName} ${passenger.lastName}`
                            );
                        })}
                        selectedValues={[flight.passengerList]}
                        onChange={e => updatePassengerList(e.target.value)}
                        showCheckbox={true}
                        />
                    </div>
                    
                </div>            
                <br/> <br/>
                <div className="row form-row">
                    <div className="form-group col-sm-6">
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                    <div className="form-group col-sm-6">
                        <button type="reset" className="btn btn-primary">Reset</button>
                    </div>
                </div>
            </form>
      </div>
      <div>
        <Table columns={columns} data={flights} />
      </div>
    </>
  )
}

export default Flight_View;