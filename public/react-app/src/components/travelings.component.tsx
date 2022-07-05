import React, { ChangeEvent, useEffect, useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import Traveling from '../models/travelings.model';
import Authentication from '../services/authentication.service';
import travelingService from '../services/traveling.service';
import PagingComponent from './paging.component';

export default function Travelings() {
  let [travelings, setTravelings] = useState<Traveling[]>([]);
  // const [pageNo, setPageNo] = useState<number>(0);
  let [destination,setDestination] = useState<string>('');
  let [totalDocs,setTotalDocs] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    // console.log('effect');
    
    getTotalDocs(0);
  },[]);

  const getTotalDocs = (no:number) => {
    travelingService.getTotalDocs(destination)
    .then((response:any) => calculatePagingAndPopulateData(response.data,no))
    .catch((err) => console.log(err));
  }

  const calculatePagingAndPopulateData = (docs: number,no:number) => {
    setTotalDocs(docs);
    // console.log('docs',docs);
    
    let offset = no * parseInt(process.env.REACT_APP_ROWS_PER_PAGE || '',10);
    getAll(offset,parseInt(process.env.REACT_APP_ROWS_PER_PAGE || ''), destination);
  }

  const getAll = (offset:number,count:number,destination:string) => {
    travelingService
      .getAll(offset,count,destination)
      .then((response) =>  setTravelings(response.data))
      .catch((err) => {
        console.log(err);
      });
  }

  const onAddNew = () => {
    navigate('/travelings/add');
  }

  const onEdit = (id:string) =>{
    navigate('/travelings/' + id);
  }

  const reload = (no:number) => {
    // await setPageNo(no);
    getTotalDocs(no);
  }

  const onDelete = (id:string) => {
    if (confirm('Are you sure you want to delete?') === true) {
      travelingService
        .deleteOne(id)
        .then((response) => {
          // setIsReload(true);
          reload(0);
        })
        .catch(err => console.log(err));
    }
  }

  const onView = (id:string)=>{
    navigate('/travelings/' + id);
  }

  const onSearch = () => {
    reload(0);
  }

  const handleDestinationChange = (e:React.FormEvent<HTMLInputElement>) =>{
    setDestination(e.currentTarget.value);
  }

  return (
    <>
    
    <div className="input-group col-md-4">
      <input
        type="text"
        className="form-control mb-3"
        placeholder="destination" onChange={(e) => handleDestinationChange(e)} />

      <span>&nbsp;</span>
      <div className="input-group-append">
        <button className="btn btn-outline-secondary" onClick={() => onSearch()} type="button">
          Search
        </button>
        <span>&nbsp;</span>
        <button className="btn btn-outline-secondary" type="button" onClick={() => onAddNew()}>
          Add new
        </button>
      </div>
    </div>
    
    <table className="table">
        <thead>
          <tr>
            <th>Destination</th>
            <th>Stay At</th>
            <th>Length (Days)</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {travelings.map((item, index) => (
            <tr key={index}>
              <td>{item.destination}</td>
              <td>{item.stayAt}</td>
              <td>{item.length}</td>
              <td>
                { Authentication.getInstance().token == null &&
                  <a onClick={()=> onView(item._id)} className="fa-solid fa-eye"></a>
                }
                { Authentication.getInstance().token !== null &&
                <a
                onClick={()=> onEdit(item._id)}
                className="fa-solid fa-pen-to-square"
              ></a>
                }

              </td>
              <td>
                { Authentication.getInstance().token !== null &&
                  <a className="fa-solid fa-circle-minus" onClick={()=> onDelete(item._id)}></a>
                }
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <div>
        <PagingComponent totalDocs={totalDocs} onPageChange={reload}/>
      </div>

      </>

  );
}
