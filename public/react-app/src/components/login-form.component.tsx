import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import authenticationService from '../services/authentication.service';

export default function() {
  const navigate = useNavigate();
  const [errMsg,setErrMsg] = useState<string>('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (credentials: any) => {
    authenticationService.getInstance().login(credentials)
    .then((response:any) =>{
      authenticationService.getInstance().setToken(response.data.token);
      navigate('/travelings');
    })
    .catch((err:any) => {
      // console.log(err)
      setErrMsg(err.response.data);
    })
  };
  return (
    <form className="form-signin" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="h6 mb-3 font-weight-normal">Please sign in</h1>

      <label className="sr-only">User name</label>
      <input type="text" className="form-control" placeholder="username" {...register('username',{required:true})}/>

      <label className="sr-only">Password</label>
      <input type="password" className="form-control" placeholder='password' {...register('password',{required:true})} />
      {
        errMsg != '' && <div className="alert alert-danger">{errMsg}</div>
      }
      <div className="form-group">
        <button className="btn btn-primary btn-block" type="submit">
          Sign in
        </button>
      </div>

      <div className="mb-3">
        <label>Not a memeber?</label>
        <span>&nbsp;</span>
        <Link to="/register">Register</Link>
      </div>

    </form>
  );
}
