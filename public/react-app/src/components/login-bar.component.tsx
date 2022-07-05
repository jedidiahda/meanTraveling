import React, { useEffect, useState, useSyncExternalStore } from 'react';
import { useNavigate } from 'react-router-dom';
import Authentication from '../services/authentication.service';

export default function() {
  const navigate = useNavigate();

  useEffect(() => {

  });

  console.log(Authentication.getInstance().token);
  

  const onLogin = () => {
    navigate('/login');
  };

  const onLogout = () => {
    Authentication.getInstance().logout();
    navigate('/');
  }

  return (
    <div className="login">
      <label>Hi {Authentication.getInstance().username} !</label>
      {(Authentication.getInstance().token != null) && (
        <a className="btn btn-primary ms-2 me-1" onClick={() => onLogout()}>Logout</a>
      )}
      { Authentication.getInstance().token == null  && (
        <a className="btn btn-primary ms-2 me-1" onClick={() => onLogin()}>
          Login
        </a>
      )}
    </div>
  );
}
