import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UsersDataService } from 'src/app/services/users-data.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  @ViewChild('loginForm')
  loginForm!:NgForm;
  errorMsg:string='';

  constructor(private router:Router,
    private authService:AuthenticationService) { }

  ngOnInit(): void {
    setTimeout(()=>{
      this.loginForm.setValue({
        username:'',
        password:''
      })
    });
  }

  onSubmit():void{
    this.authService.login(this.loginForm.value).then(response =>{
      this.authService.setToken(response.token);
      this.router.navigate(['/travelings']);
    }).catch(err => this.errorMsg = err);
  }

}
