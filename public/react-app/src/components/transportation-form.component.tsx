import React, {ChangeEvent, useEffect, useState} from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Transportation from '../models/transportation.model';
import transportationService from '../services/transportation.service';

type Props = {
  travelingId:string,
  transId:string,
  isUpdated:Function
}
export default function({travelingId,transId,isUpdated}:Props) {
  const { register, handleSubmit, setValue, formState:{ errors }} = useForm<Transportation>();

  useEffect(()=>{
    if(transId && transId != ''){
      transportationService.getOne(travelingId, transId)
      .then((response) => populateTrans(response.data))
      .catch( err => console.log(err));
    }
  });

  const populateTrans = (trans:Transportation) => {
    setValue('type',trans.type);
    setValue('duration',trans.duration);
  }

  const onAddNew = (e:React.MouseEvent<HTMLButtonElement>) =>{
    e.preventDefault();
    clearForm();
  }

  const clearForm = () => {
    transId='';
    setValue('type','');
    setValue('duration',0);
  }

  const onSubmit = (trans:Transportation) => {
    if(transId != ''){
      transportationService.updateOne(travelingId,transId,trans)
      .then(response =>afterSubmit())
      .catch(err=>console.log(err));
    }else{
      transportationService.createOne(travelingId,trans)
      .then(response => afterSubmit())
      .catch(err=>console.log(err));
    }
  }

  const afterSubmit = () => {
    isUpdated(true);
    clearForm();
  }
  
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Type</label>
      <input
        type="text"
        placeholder="type"
        className="form-control"
        {...register('type',{required:true})}
      />
      <label className="col-sm-2 col-form-label">Duration</label>
      <input type="text" className="form-control" placeholder="duration"   {...register('duration',{required:true})}/>
      
      <button className="btn btn-secondary" onClick={(e) => onAddNew(e)}>Add New</button>
      <button className="btn btn-primary" type="submit">Save</button>
    </form>
  );
}
