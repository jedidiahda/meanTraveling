import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Traveling } from '../../models/traveling.model';
import { TravelingDataService } from '../../services/traveling-data.service';

@Component({
  selector: 'app-traveling-form',
  templateUrl: './traveling-form.component.html',
  styleUrls: ['./traveling-form.component.css']
})
export class TravelingFormComponent implements OnInit {
  title:string='';
  travelingForm!: FormGroup;
  travelingId!:string;

  constructor(private travelingService:TravelingDataService,
    private activatedRoute:ActivatedRoute,
    private router:Router,
    public authService:AuthenticationService) { }

  ngOnInit(): void {
    this.travelingId = this.activatedRoute.snapshot.params['travelingId'];

    this.travelingForm = new FormGroup({
      destination: new FormControl(''),
      stayAt: new FormControl(''),
      length: new FormControl(0)
    })

    if(this.travelingId){
      this.getOne();
    }
  }

  onSubmit(){
    if(this.travelingId){
      this.travelingService.updateOne(this.travelingId, this.travelingForm.value).subscribe(traveling => this.router.navigate(['/travelings']));
    }else{
      this.travelingService.createOne(this.travelingForm.value).subscribe(traveling => this.router.navigate(['/travelings']));
    }
  }

  getOne(){
    this.travelingService.getOne(this.travelingId).subscribe(traveling => this.populateDataToControl(traveling));
  }

  populateDataToControl(traveling:Traveling){
    this.travelingForm = new FormGroup({
      destination: new FormControl(traveling.destination),
      stayAt: new FormControl(traveling.stayAt),
      length: new FormControl(traveling.length)
    })
  }

  onTransportClick(){
    this.router.navigate([`/travelings/${this.travelingId}/transportations`]);
  }

}
