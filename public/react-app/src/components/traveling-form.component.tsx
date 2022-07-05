import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Traveling from '../models/travelings.model';
import travelingService from '../services/traveling.service';
import Authentication from '../services/authentication.service';

export default function TravelingForm() {
  const navigate = useNavigate();
  const params = useParams();
  const { register, handleSubmit, setValue, formState:{ errors }} = useForm<Traveling>();

  useEffect(() => {
    let travelingId = params.travelingId;
    if(travelingId){
      travelingService.getOne(travelingId)
      .then((response) => {
        const traveling:Traveling = response.data;
        setValue('destination',traveling.destination);
        setValue('length',traveling.length);
        setValue('stayAt',traveling.stayAt);
      });
    }
  });

  const onSubmit = (traveling:any) =>{
    let id = params.id;
    
    if(id && id != ''){
      //update
      travelingService.updateOne(id,traveling)
      .then((response) => {
        navigate('/travelings');
      })
      .catch((err) => console.log(err));
    }else{
      //create
      travelingService.createOne(traveling)
      .then((response) => {
        navigate('/travelings');
      })
      .catch((err) => console.log(err));
    }
  }
//travelings/:travelingId/transportations
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Destination</label>
      <input type="text" id="destination" {...register('destination',{required:true})} 
      className="form-control"  />
      {errors.destination && <span>Destination is required</span>}

      <label>Stay at</label>
      <input type="text" {...register('stayAt')} className="form-control"  />

      <label>Length</label>
      <input type="text" {...register('length')} className="form-control"  />

      <button className="btn btn-secondary" onClick={() => navigate('/travelings/'+params.travelingId+'/transportations')}>Transportions</button>

      <div className="form-group">
        {
          Authentication.getInstance().token !== null &&
          <button className="btn btn-primary" type="submit" >
          Save
        </button>
        }

      </div>
    </form>
  );
}
