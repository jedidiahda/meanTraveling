import Transportation from './transportation.model';

export default class Traveling{
  _id!:string;
  destination!:string;
  length!:number;
  stayAt!:string;
  transportation!:Transportation;

  // constructor(id:string,destination:string,length:number,stayAt:string,transportation:Transportation){
  //   this._id=id;
  //   this.destination=destination;
  //   this.length=length;
  //   this.stayAt=stayAt;
  //   this.transportation=transportation;
  // }
}