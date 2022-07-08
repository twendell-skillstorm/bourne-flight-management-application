import React, { useState, useEffect, useMemo, useRef } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import BTable from 'react-bootstrap/Table';
import Multiselect from "multiselect-react-dropdown";
import { useTable, useFilters, usePagination} from 'react-table'
// A great library for fuzzy filtering/sorting items
import {matchSorter} from 'match-sorter'

import axios from 'axios'
import './Airport_View.css';


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
    state: { pageIndex, pageSize=10,  selectedRowIds},
  } = useTable(
    {
      columns,
      data,
      defaultColumn, // Be sure to pass the defaultColumn option
      filterTypes,
      initialState: { pageIndex: 0},
    },
    useFilters, // useFilters!
    usePagination
  )

  // We don't want to render all of the rows for this example, so cap
  // it for this use case

  return (
    <>
      <BTable striped bordered hover size="sm" {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>
                  <div>{column.Header != 'ID' ? column.render('Header'): null}</div>
                  {/* Render the columns filter UI */}
                  <div>{column.canFilter && column.Header != 'Actions' ? column.render('Filter') : null}</div>
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

export const Airport_View = () => {
  const [airports, setAirports] = useState([]);
  const [airport, setAirport] = useState({
    _id : "",
    name : "",
    city : "",
    state : "",
    country : "",
  });

  // Any time state changes, this callback function is executed
  useEffect(() => {
  });

  // componentDidUpdate equivalent
  // this useEffect only runs the callback on mount and whenever the count state changes
  useEffect(() => {
  }, [airport]);

  useEffect(() => {
      axios.get('http://localhost:8085/airports')
          .then(res => setAirports(res.data));
    }, []);

  const openAirport = (rowIndex) => {
    console.log(`RI ${rowIndex}: ${typeof rowIndex}`);
    axios.get(`http://localhost:8085/airports/${rowIndex}`)
      .then(res => setAirport(res.data));
  }
  
  const deleteAirport = (rowIndex) => {
    console.log(`Row Index: ${rowIndex}`);
    const res = axios.delete(`http://localhost:8085/airports/${rowIndex}`);
    axios.get('http://localhost:8085/airports')
      .then(res => setAirports(res.data));
    window.location.reload(false);
  }

  const clear = () => {
    setAirport(null);
  }

  const columns = React.useMemo(
    () => [
      {
        Header: 'Airports',
        columns: [
          {
            Header: 'Airport Name',
            accessor: 'name',
          },
          {
            Header: 'City',
            accessor: 'city',
          },
          {
            Header: 'State',
            accessor: 'state',
          },
          {
            Header: 'Country',
            accessor: 'country',
          },

          {
            Header: "Actions",
            accessor: "actions",
            Cell: (props) => {
              
              const rowIdx = props.row.original._id.toString();
              return (
                <div>
                  <button className="btn btn-primary" onClick={() => openAirport(rowIdx)}>Edit</button>
                  <button className="btn btn-primary" onClick={() => deleteAirport(rowIdx)}>Delete</button>
                </div>
              );
            },
          },
        ],
      },
      
    ],
    []
  )

    const airportNameRef = useRef();
    const cityRef = useRef();
    const stateRef = useRef();
    const countryRef = useRef();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          if (airport._id != ""){
            await axios.put(`http://localhost:8085/airports/${airport._id}`, {
              name : airportNameRef.current.value,
              city : cityRef.current.value,
              state: stateRef.current.value,
              country : countryRef.current.value
            });
          } else {
            await axios.post('http://localhost:8085/airports', 
                        { 
                          name : airportNameRef.current.value,
                          city : cityRef.current.value,
                          state: stateRef.current.value,
                          country : countryRef.current.value
            }); 
          }
        } catch (error) {
            console.log('Something Went Wrong' + error);
        }

        window.location.reload(false); 
    }

    const setAirportName = (value) => {setAirport(previousState => {return {...previousState, name: value}});}
    const setAirportCity = (value) => {setAirport(previousState => {return {...previousState, city: value}});}
    const setAirportState = (value) => {setAirport(previousState => {return {...previousState, state: value}});}
    const setAirportCountry = (value) => {setAirport(previousState => {return {...previousState, country: value}});}

  return (
    <>
      <div>
        {/** Airport Form */}
        <form className="needs-validation container FlightCrewForm" onSubmit={handleSubmit}>
              <div className="row form-row">
                <div className="form-group col-sm-6">
                  <label className="sr-only" htmlFor="airportName">Airport Name</label>
                  <input type="text" ref={airportNameRef} className="form-control" id="airportName" placeholder="Enter an airport name" required
                  value={airport != null || undefined ? airport.name : ""} onChange={e => setAirportName(e.target.value)}
                  />
                </div>

                <div className="form-group col-sm-6">
                  <label className="sr-only" htmlFor="city">City</label>
                  <input type="text" ref={cityRef} className="form-control" id="city" required placeholder="Enter a city name" name="city"
                  value={airport != null || undefined ? airport.city : ""} onChange={e => setAirportCity(e.target.value)}/>
                </div>
              </div>

              <div className="row form-row">
                <div className="form-group col-sm-6">
                  <label htmlFor="state">State</label>
                  <input type="text" ref={stateRef} className="form-control" id="state" placeholder="Enter a state name" name="state"
                  value={airport != null || undefined ? airport.state : ""} onChange={e => setAirportState(e.target.value)}/>
                </div>

                <div className="form-group col-sm-6">
                  <label htmlFor="country">Country</label>
                  <input type="text" ref={countryRef} className="form-control" id="country" required placeholder="Enter a country name" name="country"
                   value={airport != null || undefined ? airport.country : ""} onChange={e => setAirportCountry(e.target.value)}
                  />
                </div>
              </div>
              <br/>
              <div className="row form-row">
                <div className="form-group col-sm-6"><input type="submit" className="btn btn-primary" value={airport.name != "" ? "Edit Airport" : "Create Airport"} /></div>
                <div className="form-group col-sm-6"><button type="reset" onClick={clear} className="btn btn-primary">Reset</button></div>
              </div>
            </form>
      </div>
      <br/>
      <div>
        {/** Airport View */}
        <Table columns={columns} data={airports} />
      </div>
    </>
  )

}

export default Airport_View;