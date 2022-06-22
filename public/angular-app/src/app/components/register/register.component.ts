import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @ViewChild('registerForm')
  registerForm!:NgForm;
  errorMsg:string='';

  constructor(public authService:AuthenticationService,private router:Router) { }

  ngOnInit(): void {
    setTimeout(()=>{
      this.registerForm.setValue({
        name:'',
        username:'',
        password:'',
        repeatPassword:'',
      });
    });
  }

  onSubmit():void{
    if(this.registerForm.valid){
      this.authService.register(this.registerForm.value)
      .then(response => this.router.navigate(['/']))
      .catch(err => this.errorMsg = err);
    }
  }


}
