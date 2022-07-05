import axios from 'axios';
import Traveling from '../models/travelings.model';

const getAll = (offset:number,count:number,destination:string) => {
  return axios.get(`${process.env.REACT_APP_BASED_URL}/travelings?offset=${offset}&count=${count}&destination=${destination}`);
};

const createOne = (traveling: Traveling) => {
  return axios.post(`${process.env.REACT_APP_BASED_URL}/travelings`, traveling);
};

const updateOne = (id:string,traveling:Traveling) => {
  return axios.put(`${process.env.REACT_APP_BASED_URL}/travelings/${id}`,traveling);
}

const deleteOne = (id:string) => {
  return axios.delete(`${process.env.REACT_APP_BASED_URL}/travelings/${id}`);
}

const getOne = (id: string) => {
  return axios.get(`${process.env.REACT_APP_BASED_URL}/travelings/${id}`);
};

const getTotalDocs = (destination:string) => {
  return axios.get(`${process.env.REACT_APP_BASED_URL}/travelings/totalDocs?destination=${destination}`);
}

export default {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
  getTotalDocs
};
