import { Transportation } from './transportation.model';

export class Traveling{
  #_id!:string;
  #destination!:string;
  #length!:number;
  #stayAt!:string;
  #transportation!:Transportation;

  constructor(id:string,destination:string,length:number,stayAt:string,transportation:Transportation){
    this.#_id=id;
    this.#destination=destination;
    this.#length=length;
    this.#stayAt=stayAt;
    this.#transportation=transportation;
  }

  get _id(){ return this.#_id;}
  get destination(){return this.#destination;}
  get length(){ return this.#length;}
  get stayAt(){return this.#stayAt;}
  get transportation(){ return this.#transportation;}
  
}