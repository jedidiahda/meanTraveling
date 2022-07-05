import React from 'react';
import Authentication from '../services/authentication.service';

export default function(){
  return (
    <div>
      {
        Authentication.getInstance().errorMsg
      }
    </div>
  )
}