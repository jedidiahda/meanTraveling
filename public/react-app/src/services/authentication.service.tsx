import axios from 'axios';
import jwt_decode from "jwt-decode";
import Credentials from '../models/credentials.model';

export default class Authentication {
  private static instance: Authentication;
  #_errorMsg:string='';

  constructor(){}

  public static getInstance(): Authentication{
    if(!Authentication.instance){
      Authentication.instance = new Authentication();
    }
    return Authentication.instance;
  }

  register = (user:Credentials) => {
    return axios.post(`${process.env.REACT_APP_BASED_URL}/users`,user);
  }
  
  login = (user:Credentials):any => {
    return axios.put(`${process.env.REACT_APP_BASED_URL}/users`, user);
  }
  
  logout = () => {
    sessionStorage.removeItem(process.env.REACT_APP_TOKEN_STORAGE_NAME || '');
  }
  
  isLoggedIn = () =>{
    const token = sessionStorage.getItem(process.env.REACT_APP_TOKEN_STORAGE_NAME || '');
    return  token == null || token == '' ? false : true;
  }
  
  setToken = (token:any) =>{
    sessionStorage.setItem(process.env.REACT_APP_TOKEN_STORAGE_NAME || '',token);
  }
  
  get token():any{
    const token = sessionStorage.getItem(process.env.REACT_APP_TOKEN_STORAGE_NAME || '');
    return token;
  }
  
  get username ():any {
    const token = this.token;
    const name = token == 'undefined' || token === null 
    ? '' 
    : (jwt_decode(token) as {name:string}).name;  
    return name;
  }

  get errorMsg():string{
    return this.#_errorMsg;
  }

  set errorMsg(msg:string){
    this.#_errorMsg = msg;
  }
}