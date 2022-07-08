import React, { useState, useEffect, useMemo, useRef } from "react";
import Multiselect from "multiselect-react-dropdown";

import 'bootstrap/dist/css/bootstrap.min.css';
import BTable from 'react-bootstrap/Table';

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
                  <div>{column.canFilter && column.Header == 'Team Number' || column.Header == 'Airline' ? column.render('Filter') : null}</div>

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

export function FlightCrew_View() {
  const [flightCrews, setFlightCrews] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [flightCrew, setFlightCrew] = useState({
    _id: "",
    captain: "",
    first_officer : "",
    second_officer : "",
    flight_engineer : "",
    navigator : "",
    purser : "",
    flight_attendants : "",
    load_masters : "",
    flightMedic : "",
  });

  // Any time state changes, this callback function is executed
  useEffect(() => {
  });

  // componentDidUpdate equivalent
  // this useEffect only runs the callback on mount and whenever the count state changes
  useEffect(() => {
  }, [flightCrew]);

  useEffect(() => {
      axios.get('http://localhost:8085/flight-crew')
          .then(res => setFlightCrews(res.data));
      axios.get('http://localhost:8085/employees')
        .then(res => setEmployees(res.data));
    }, []);

  const openFlightCrew = (rowIndex) => {
    console.log(`RI ${rowIndex}: ${typeof rowIndex}`);
    axios.get(`http://localhost:8085/flight-crew/${rowIndex}`)
      .then(res => setFlightCrew(res.data));
  }
  
  const deleteFlightCrew = (rowIndex) => {
    console.log(`Row Index: ${rowIndex}`);
    const res = axios.delete(`http://localhost:8085/flight-crew/${rowIndex}`);
    axios.get('http://localhost:8085/flight-crew')
      .then(res => setFlightCrews(res.data));
    window.location.reload(false);
  }

  const clear = () => {
    setFlightCrew("");
  }

  const columns = React.useMemo(
    () => [
        {
            Header: 'Flight Crews',
            columns: [
                {
                Header: 'Airline',
                accessor: `airline`,
                },
                {
                    Header: 'Team Number',
                    accessor: 'teamNumber',
                },
            ],
        },
        {

          /* flightEngineer : "",
    navigator : "",
    purser : "",
    flightAttendants : "",
    loadMasters : "",
    flightMedic : "", */
    
            Header: 'Employees',
            columns: [
              {
                  Header: 'Captain',
                  accessor: 'captain',
              },
              {
                  Header: 'First Officer',
                  accessor: 'first_officer',
              },
              {
                Header: 'Second Officer',
                accessor: 'second_officer',
              },                
              {
              Header: 'Flight Engineer',
              accessor: 'flight_engineer',
              },                
              {
              Header: 'Navigator',
              accessor: 'navigator',
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
                        <button className="btn btn-primary" onClick={() => openFlightCrew(rowIdx)}>Edit</button>
                        <button className="btn btn-primary" onClick={() => deleteFlightCrew(rowIdx)}>Delete</button>
                        </div>
                    );
                    },
                },
            ]
        }
     
        ],
    []
  )

  const AIRLINES = ["Emirates", "Singapore Airlines", "Quatar Airways", "All Nippon Airways", "Cathay Pacific Airways", "EVA Air", "Delta Airlines", "Southwest Airlines", "Quantas Airways", "Japan Airlines"];
  const airlineRef = useRef();
  const teamNumberRef = useRef();
  const captainRef = useRef();
  const firstOfficerRef = useRef();
  const secondOfficerRef = useRef();
  const flightEngineerRef = useRef();
  const navigatorRef = useRef();
  const purserRef = useRef();
  const flightAttendantsRef = useRef();
  const loadMasterRef = useRef();
  const flightMedicRef = useRef();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (flightCrew._id != ""){
        await axios.put(`http://localhost:8085/flight-crew/${flightCrew._id}`, {
          airline: airlineRef.current.getSelectedItems()[0],
               teamNumber: teamNumberRef.current.value,
               captain: captainRef.current.getSelectedItems()[0],
               first_officer: firstOfficerRef.current.getSelectedItems()[0],
               second_officer: secondOfficerRef.current.getSelectedItems()[0],
               flight_engineer: flightEngineerRef.current.getSelectedItems()[0],
               navigator: navigatorRef.current.getSelectedItems()[0],
               purser: purserRef.current.getSelectedItems()[0],
               flight_attendants: flightAttendantsRef.current.getSelectedItems(), 
               load_master: loadMasterRef.current.getSelectedItems()[0],
               flight_medic: flightMedicRef.current.getSelectedItems()[0],
        });
      } else {
        await axios.post('http://localhost:8085/flight-crew', 
        { 
          airline: airlineRef.current.getSelectedItems()[0],
            teamNumber: teamNumberRef.current.value,
            captain: captainRef.current.getSelectedItems()[0],
            first_officer: firstOfficerRef.current.getSelectedItems()[0],
            second_officer: secondOfficerRef.current.getSelectedItems()[0],
            flight_engineer: flightEngineerRef.current.getSelectedItems()[0],
            navigator: navigatorRef.current.getSelectedItems()[0],
            purser: purserRef.current.getSelectedItems()[0],
            flight_attendants: flightAttendantsRef.current.getSelectedItems(), 
            load_master: loadMasterRef.current.getSelectedItems()[0],
            flight_medic: flightMedicRef.current.getSelectedItems()[0],
        }); 
      }
    } catch (error) {
        console.log('Something Went Wrong' + error);
    }

    window.location.reload(false); 
  }

  const isCaptain = (value) => value.occupation === "Captain";
  const isFirstOfficer = (value) => value.occupation === "First Officer";
  const isSecondOfficer = (value) => value.occupation === "Second Officer";
  const isFlightEngineer = (value) => value.occupation === "Flight Engineer";
  const isNavigator = (value) => value.occupation === "Navigator";
  const isPurser = (value) => value.occupation === "Purser";
  const isFlightAttendant = (value) => value.occupation === "Flight Attendant";
  const isLoadMaster = (value) => value.occupation === "Load Master";
  const isFlightMedic = (value) => value.occupation === "Flight Medic";

  const updateAirline = (value) => {setFlightCrew(previousState => {return {...previousState, airline: value}});}
  const updateTeamNumber = (value) => {setFlightCrew(previousState => {return {...previousState, teamNumber: value}});}
  const updateCaptain = (value) => {setFlightCrew(previousState => {return {...previousState, captain: value}});}
  const updateFirstOfficer = (value) => {setFlightCrew(previousState => {return {...previousState, firstOfficer: value}});}
  const updateSecondOfficer = (value) => {setFlightCrew(previousState => {return {...previousState, secondOfficer: value}});}
  const updateFlightEngineer = (value) => {setFlightCrew(previousState => {return {...previousState, flightEngineer: value}});}
  const updateNavigator = (value) => {setFlightCrew(previousState => {return {...previousState, navigator: value}});}
  const updatePurser = (value) => {setFlightCrew(previousState => {return {...previousState, purser: value}});}
  const updateFlightAttendant = (value) => {setFlightCrew(previousState => {return {...previousState, flightAttendants: value}});}
  const updateLoadMaster = (value) => {setFlightCrew(previousState => {return {...previousState, loadMaster: value}});}
  const updateFlightMedic = (value) => {setFlightCrew(previousState => {return {...previousState, flightMedic: value}});}

  const findAirline = (value) => {
    for (let i = 0; i < AIRLINES.length; i++){
      if(AIRLINES[i] == value.airline){
        return i;
      }
    }
  }


  return (
    <>
      <div>
      <form className="needs-validation container FlightCrewForm" onSubmit={handleSubmit} >
                <div className="row form-row">
                    {/** Airline */}
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
                        selectedValues={[flightCrew != null || undefined ? AIRLINES[findAirline(flightCrew)]: ""]} 
                        onChange={e => updateAirline(e.target.value)}
                        />
                    </div>

                    {/** Team Number */}
                    <div className="form-group col-sm-6">
                        <label htmlFor="teamNumber">Team Number</label>
                        <input type="number" ref={teamNumberRef} className="form-control" id="teamNumber" placeholder="Enter a team number" required
                        value={flightCrew != null || undefined ? flightCrew.teamNumber : ""} onChange={e => updateTeamNumber(e.target.value)}
                        />
                    </div>
                </div>
                <br/>
                <div className="row form-row">
                    {/** Captain */}
                    <div className="form-group col-sm-4">
                        <label htmlFor="captain">Captain</label>
                        <Multiselect id="captain" 
                        ref={captainRef}
                        placeholder="Choose the captain"
                        isObject={false}
                        onRemove={(event) => {console.log(event);}}
                        onSelect={(event) => {console.log(event);}}
                        options={employees.filter(isCaptain).map((employee, index) =>{
                            return `${employee.firstName} ${employee.lastName}`;
                        })}
                        showCheckbox={true}
                        singleSelect={true}
                        selectedValues={[flightCrew.captain]}
                        onChange={e => updateCaptain(e.target.value)}
                        />
                    </div>
                    {/** First Officer */}
                    <div className="form-group col-sm-4">
                        <label htmlFor="firstOfficer">First Officer</label>
                        <Multiselect id="firstOfficer" 
                        ref={firstOfficerRef}
                        placeholder="Choose the first officer"
                        isObject={false}
                        onRemove={(event) => {console.log(event);}}
                        onSelect={(event) => {console.log(event);}}
                        options={employees.filter(isFirstOfficer).map((employee, index) =>{
                            return `${employee.firstName} ${employee.lastName}`;
                        })}
                        showCheckbox={true}
                        singleSelect={true}
                        selectedValues={[flightCrew.first_officer]}
                        onChange={e => updateFirstOfficer(e.target.value)}
                        />
                    </div>
                    {/** Second Officer */}
                    <div className="form-group col-sm-4">
                        <label htmlFor="secondOfficer">Second Officer</label>
                        <Multiselect id="secondOfficer" 
                        ref={secondOfficerRef}
                        placeholder="Choose the second officer"
                        isObject={false}
                        onRemove={(event) => {console.log(event);}}
                        onSelect={(event) => {console.log(event);}}
                        options={employees.filter(isSecondOfficer).map((employee, index) =>{
                            return `${employee.firstName} ${employee.lastName}`;
                        })}
                        showCheckbox={true}
                        singleSelect={true}
                        selectedValues={[flightCrew.second_officer]}
                        onChange={e => updateSecondOfficer(e.target.value)}
                        />
                    </div>
                </div>
                <br/>
                <div className="row form-row">
                    {/** Flight Engineer */}
                    <div className="form-group col-sm-4">
                        <label htmlFor="flightEngineer">Flight Engineer</label>
                        <Multiselect id="flightEngineer" 
                        ref={flightEngineerRef}
                        placeholder="Choose the flight engineer"
                        isObject={false}
                        onRemove={(event) => {console.log(event);}}
                        onSelect={(event) => {console.log(event);}}
                        options={employees.filter(isFlightEngineer).map((employee, index) =>{
                            return `${employee.firstName} ${employee.lastName}`;
                        })}
                        showCheckbox={true}
                        singleSelect={true}
                        selectedValues={[flightCrew.flight_engineer]}
                        onChange={e => updateFlightEngineer(e.target.value)}
                        />
                    </div>

                    {/** Navigator */}
                    <div className="form-group col-sm-4">
                        <label htmlFor="navigator">Navigator</label>
                        <Multiselect id="navigator" 
                        ref={navigatorRef}
                        placeholder="Choose the navigator"
                        isObject={false}
                        onRemove={(event) => {console.log(event);}}
                        onSelect={(event) => {console.log(event);}}
                        options={employees.filter(isNavigator).map((employee, index) =>{
                            return `${employee.firstName} ${employee.lastName}`;
                        })}
                        showCheckbox={true}
                        singleSelect={true}
                        selectedValues={[flightCrew.navigator]}
                        onChange={e => updateNavigator(e.target.value)}
                        />
                    </div>

                    {/** Purser */}
                    <div className="form-group col-sm-4">
                    <label htmlFor="purser">Purser</label>
                        <Multiselect id="purser" 
                        ref={purserRef}
                        placeholder="Choose the purser"
                        isObject={false}
                        onRemove={(event) => {console.log(event);}}
                        onSelect={(event) => {console.log(event);}}
                        options={employees.filter(isPurser).map((employee, index) =>{
                            return `${employee.firstName} ${employee.lastName}`;
                        })}
                        showCheckbox={true}
                        singleSelect={true}
                        selectedValues={[flightCrew.purser]}
                        onChange={e => updatePurser(e.target.value)}
                        />
                    </div>
                </div>
                <br/>
                <div className="row form-row">
                    {/** Flight Attendants */}
                    <div className="form-group col-sm-4">
                        <label htmlFor="flightAttendants">Flight Attendants</label>
                        <Multiselect id="flightAttendants" 
                        ref={flightAttendantsRef}
                        placeholder="Choose flight attendants"
                        isObject={false}
                        onRemove={(event) => {console.log(event);}}
                        onSelect={(event) => {console.log(event);}}
                        options={employees.filter(isFlightAttendant).map((employee, index) =>{
                            return `${employee.firstName} ${employee.lastName}`;
                        })}
                        showCheckbox={true}
                        selectedValues={[flightCrew.flight_attendants]}
                        onChange={e => updateFlightAttendant(e.target.value)}
                        />
                    </div>

                    {/** Load Master */}
                    <div className="form-group col-sm-4">
                        <label htmlFor="loadMaster">Load Master</label>
                        <Multiselect id="loadMaster" 
                        ref={loadMasterRef}
                        placeholder="Choose the load master"
                        isObject={false}
                        onRemove={(event) => {console.log(event);}}
                        onSelect={(event) => {console.log(event);}}
                        options={employees.filter(isLoadMaster).map((employee, index) =>{
                            return `${employee.firstName} ${employee.lastName}`;
                        })}
                        showCheckbox={true}
                        singleSelect={true}
                        selectedValues={[flightCrew.load_master]}
                        onChange={e => updateLoadMaster(e.target.value)}
                        />
                    </div>

                    {/** Flight Medic */}
                    <div className="form-group col-sm-4">
                        <label htmlFor="flightMedic">Flight Medic</label>
                        <Multiselect id="flightMedic" 
                        ref={flightMedicRef}
                        placeholder="Choose the flight medic"
                        isObject={false}
                        onRemove={(event) => {console.log(event);}}
                        onSelect={(event) => {console.log(event);}}
                        options={employees.filter(isFlightMedic).map((employee, index) =>{
                            return `${employee.firstName} ${employee.lastName}`;
                        })}
                        showCheckbox={true}
                        singleSelect={true}
                        selectedValues={[flightCrew.flight_medic]}
                        onChange={e => updateFlightMedic(e.target.value)}
                        />
                    </div>
                </div>
                <br/>
                <div className="row form-row">
                    {/** Submit */}
                    <div className="form-group col-sm-6">
                    <input type="submit" className="btn btn-primary" value={flightCrew._id != "" ? "Edit FlightCrew" : "Create FlightCrew"}/>
                    </div>

                    {/** Reset */}
                    <div className="form-group col-sm-6">
                        <button type="reset" className="btn btn-primary">Reset</button> 
                    </div>
                </div>
            </form>
      </div>
      <div>
        <Table columns={columns} data={flightCrews} />
      </div>
    </>
  )
}

export default FlightCrew_View;