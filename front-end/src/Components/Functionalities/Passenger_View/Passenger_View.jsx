import React, { useState, useEffect, useMemo, useRef } from "react";
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
                  <div>{column.canFilter && column.Header != 'Actions' && column.Header != 'Birthday' ? column.render('Filter') : null}</div>

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

export function Passenger_View() {
  const [passengers, setPassengers] = useState([]);
  const [passenger, setPassenger] = useState({
    _id : "",
    firstName : "",
    lastName : "",
    birthday : "",
    requireAssistance : "",
  });

  // Any time state changes, this callback function is executed
  useEffect(() => {
  });

  // componentDidUpdate equivalent
  // this useEffect only runs the callback on mount and whenever the count state changes
  useEffect(() => {
  }, [passenger]);

  useEffect(() => {
      axios.get('http://localhost:8085/passengers')
          .then(res => setPassengers(res.data));
    }, []);

  const openPassenger = (rowIndex) => {
    console.log(`RI ${rowIndex}: ${typeof rowIndex}`);
    axios.get(`http://localhost:8085/passengers/${rowIndex}`)
      .then(res => setPassenger(res.data));
  }
  
  const deletePassenger = (rowIndex) => {
    console.log(`Row Index: ${rowIndex}`);
    const res = axios.delete(`http://localhost:8085/passengers/${rowIndex}`);
    axios.get('http://localhost:8085/passengers')
      .then(res => setPassengers(res.data));
    window.location.reload(false);
  }

  const clear = () => {
    setPassenger(null);
  }

  const columns = React.useMemo(
    () => [
        {
            Header: 'Name',
            columns: [
                {
                Header: 'First Name',
                accessor: 'firstName',
                },
                {
                    Header: 'last Name',
                    accessor: 'lastName',
                },
            ],
        },
        {
            Header: ' ',
            columns: [
                {
                    Header: 'Birthday',
                    accessor: 'birthday',
                },
                {
                    Header: "Actions",
                    accessor: "actions",
                    Cell: (props) => {
                      let rowIdx = props.row.original._id.toString();
                      return (
                        <div>
                        <button className="btn btn-primary" onClick={() => openPassenger(rowIdx)}>Edit</button>
                        <button className="btn btn-primary" onClick={() => deletePassenger(rowIdx)}>Delete</button>
                        </div>
                    );
                    },
                },
            ]
        }
     
        ],
    []
  )

  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const birthdayRef = useRef();
  const setFirstName = (value) => {setPassenger(previousState => {return {...previousState, firstName: value}});}
  const setLastName = (value) => {setPassenger(previousState => {return {...previousState, lastName: value}});}
  const setBirthday = (value) => {setPassenger(previousState => {return {...previousState, birthday: value}});}
  const setRequire = (value) => {setPassenger(previousState => {return {...previousState, requireAssistance: value}});}
  const [isChecked, setIsChecked] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(passenger._id);

      if (passenger._id != ""){
        await axios.put(`http://localhost:8085/passengers/${passenger._id}`, {
          firstName: firstNameRef.current.value,
          lastName: lastNameRef.current.value,
          birthday: birthdayRef.current.value,
          requireAssistance: isChecked
        });
      } else {
        await axios.post('http://localhost:8085/passengers', 
        { 
          firstName: firstNameRef.current.value,
          lastName: lastNameRef.current.value,
          birthday: birthdayRef.current.value,
          requireAssistance: isChecked  
        }); 
      }
    } catch (error) {
        console.log('Something Went Wrong' + error);
    }

    window.location.reload(false); 
  }

  const checkHandler = () => {
      setIsChecked(!isChecked)
  }


  return (
    <>
      <div>
      <form className="needs-validation container PassengerForm" onSubmit={handleSubmit} >
                <div className="row form-row">
                    <div className="form-group col-sm-4">
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" className="form-control" id="firstName" placeholder="Enter a first name" ref={firstNameRef} required
                        value={passenger != null || undefined ? passenger.firstName : ""} onChange={e => setFirstName(e.target.value)}/>                    
                    </div>
                    <div className="form-group col-sm-4">
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" className="form-control" id="lastName" placeholder="Enter a last name" ref={lastNameRef} required
                        value={passenger != null || undefined ? passenger.lastName : ""} onChange={e => setLastName(e.target.value)}/>                    
                    </div>
                    <div className="form-group col-sm-4">
                        <label htmlFor="birthday">Birthday</label>
                        <input type="date" className="form-control" id="birthday" placeholder="Enter a birthday" ref={birthdayRef} required
                        value={passenger != null || undefined ? passenger.birthday.substring(0,10) : ""} onChange={e => setBirthday(e.target.value)} />
                    </div>
                </div>
                <br/>
                
                <br/>
                <div className="row form-row">
                    <div className="form-group col-sm-3 custom-control custom-checkbox form-group" style={{textAlign: "left"}}>
                        <input type="checkbox" className="custom-control-input" id="requireAssistance" checked={isChecked} onChange={checkHandler}/>
                        <label style={{padding: "1%"}} className="custom-control-label" htmlFor="requireAssistance">Requires Boarding Assistance</label>
                    </div>
                    <div className="form-group col-sm-1">
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                    <div className="form-group col-sm-1">
                        <button type="reset" className="btn btn-primary">Reset</button>
                    </div>
                </div>
            </form>
      </div>
      <div>
        <Table columns={columns} data={passengers} />
      </div>
    </>
  )
}

export default Passenger_View;