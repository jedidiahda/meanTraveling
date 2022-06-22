import { Component, Input, OnChanges, OnInit, SimpleChanges,Output, EventEmitter, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TransportationDataService } from '../../services/transportation-data.service';

@Component({
  selector: 'app-transportations-form',
  templateUrl: './transportations-form.component.html',
  styleUrls: ['./transportations-form.component.css']
})
export class TransportationsFormComponent implements OnInit,OnChanges {
  @Input() tranId!:string;
  @Input() travelingId!:string;

  @ViewChild('transForm')
  transForm!:NgForm;

  @Output() onSaveEvent = new EventEmitter<string>();

  constructor(private tranService:TransportationDataService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.travelingId && this.tranId && this.tranId != ''){
      this.tranService.getOne(this.travelingId,this.tranId).subscribe(tran => 
        this.transForm.setValue({
          type:tran.type,
          duration: tran.duration
        }));
    }else{
      if(this.transForm){
        this.newTransForm();
      }
    }
  }

  newTransForm(){
    this.transForm.setValue({
      type:'',
      duration:0
    });
  }

  ngOnInit(): void {
    setTimeout(()=>{
      this.transForm.setValue({
        type:'',
        duration:0
      });
    });
  }

  onSubmit(){
    if(this.tranId){
      this.tranService
      .updateOne(this.travelingId,this.tranId,this.transForm.value)
      .subscribe(response => this.onSaveEvent.emit());
      this.newTransForm();
    }else{
      this.tranService
      .createOne(this.travelingId,this.transForm.value)
      .subscribe(response => this.onSaveEvent.emit());
      this.newTransForm();
    }
    
  }

}
