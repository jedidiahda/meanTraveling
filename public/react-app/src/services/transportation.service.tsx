import axios from 'axios';
import Transportation from '../models/transportation.model';

const getAll = (offset:number,count:number,travelingId:string) => {
  return axios.get(`${process.env.REACT_APP_BASED_URL}/travelings/${travelingId}/transportations?offset=${offset}&count=${count}`);
}

const getOne = (travelingId:string,transId:string) => {
  return axios.get(`${process.env.REACT_APP_BASED_URL}/travelings/${travelingId}/transportations/${transId}`);
}

const createOne = (travelingId:string,trans:Transportation) => {
  return axios.post(`${process.env.REACT_APP_BASED_URL}/travelings/${travelingId}/transportations`,trans);
}

const updateOne = (travelingId:string,transId:string,trans:Transportation) => {
  return axios.put(`${process.env.REACT_APP_BASED_URL}/travelings/${travelingId}/transportations/${transId}`,trans);
}

const deleteOne = (travelingId:string,transId:string) =>{
  return axios.delete(`${process.env.REACT_APP_BASED_URL}/travelings/${travelingId}/transportations/${transId}`);
}

const getTotalDocs = (travelingId:string) => {
  return axios.get(`${process.env.REACT_APP_BASED_URL}/travelings/${travelingId}/transportations/totalDocs`);
}

export default {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
  getTotalDocs
}