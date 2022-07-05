import axios from 'axios';
import {useState} from 'react';


export default ({url,method,body,onSuccess}:{url:string,method:string,body:any,onSuccess:any}):{} => {
  const [errors, setErrors] = useState(null);

    const doRequest = async (props = {}) => {
    try{
      setErrors(null);
      // const response = await axios[method](url,{...body, ...props});
      
      if(onSuccess){
       // onSuccess(response.data);
      }
    }catch(err){
      // setErrors(
      //   <div className="alert alert-danger">
      //     <h2>Ooops...</h2>

      //   </div>
      // )
    }
  }
  return {doRequest, errors};

};

// function userRequest  ({url:string, method:string,body:any, onSuccess:any}) =>{
//   const [errors, setErrors] = useState(null);
//   url = 'abc';
//   const doRequest = async (props = {}) => {
//     // try{
//     //   setErrors(null);
//     //   const response = await axios[method](url,{...body, ...props});
//     //   if(onSuccess){
//     //     onSuccess(response.data);
//     //   }
//     // }catch(err){
//     //   setErrors(
//     //     <div className="alert alert-danger">
//     //       <h2>Ooops...</h2>

//     //     </div>
//     //   )
//     // }
//   }
//   return {doRequest, errors};
// }

// export default userRequest;