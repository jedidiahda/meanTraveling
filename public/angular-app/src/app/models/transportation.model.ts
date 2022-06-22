export class Transportation{
  #_id!:string;
  #duration!:number;
  #type!:string;

  constructor(id:string,duration:number,type:string){
    this.#_id=id;
    this.#duration=duration;
    this.#type=type;
  }

  get _id(){ return this.#_id;}
  get duration(){ return this.#duration;}
  get type() { return this.#type;}

  set duration(duration:number){ this.#duration = duration;}
  set type(type:string) { this.#type=type;}
}