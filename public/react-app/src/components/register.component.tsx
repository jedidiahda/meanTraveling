import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Credentials from '../models/credentials.model';
import authenticationService from '../services/authentication.service';

export default function() {
  const naviage = useNavigate();
  const { register, handleSubmit, watch, formState:{errors}} = useForm();

  const onSubmit = (credentials:any) => {
    authenticationService.getInstance()
    .register(credentials)
    .then((response) => naviage('/login'))
    .catch(err => console.log(err));

  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1 className="h6 mb-3 font-weight-normal">Please register</h1>
      <label>Name</label>
      <input
        type="text"
        className="form-control"
        placeholder="name"
        required
        {...register('name',{required:true})}
      />

      <label>User name</label>
      <input
        type="text"
        className="form-control"
        placeholder="user name"
        required
        {...register('username',{required:true})}
      />

      <label>Password</label>
      <input
        type="password"
        className="form-control"
        placeholder="password"
        required
        {...register('password',{required:true})}
      />

      <label>Confirm Password</label>
      <input
        type="password"
        className="form-control"
        placeholder="Confirm password"
        required
        {...register('confirmPassword',{required:true})}
      />

      <button className="btn btn-primary btn-block" type="submit">
        Register
      </button>
    </form>
  );
}
