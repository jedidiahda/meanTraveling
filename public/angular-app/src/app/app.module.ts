import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppComponent } from './app.component';
import { TravelingsComponent } from './components/travelings/travelings.component';
import { TravelingFormComponent } from './components/traveling-form/traveling-form.component';
import { TransportationsComponent } from './components/transportations/transportations.component';
import { TransportationsFormComponent } from './components/transportations-form/transportations-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { FooterComponent } from './components/footer/footer.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PageErrorComponent } from './components/page-error/page-error.component';
import { PagingComponent } from './components/paging/paging.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginBarComponent } from './components/login-bar/login-bar.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { AuthenticationService } from './services/authentication.service';
import { JwtModule } from '@auth0/angular-jwt';
import { JwtInterceptor } from './helpers/JwtInterceptor';
import { ErrorInterceptor } from './helpers/ErrorInterceptor';

@NgModule({
  declarations: [
    AppComponent,
    TravelingsComponent,
    TravelingFormComponent,
    TransportationsComponent,
    TransportationsFormComponent,
    HomeComponent,
    NavigationComponent,
    FooterComponent,
    PageErrorComponent,
    PagingComponent,
    RegisterComponent,
    LoginBarComponent,
    LoginFormComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    JwtModule.forRoot({
      config:{
      }
    }),
    HttpClientModule,
    RouterModule.forRoot([
      {path:'',component:HomeComponent},
      {path:'travelings',component:TravelingsComponent},
      {path:'travelings/add', component:TravelingFormComponent},
      {path:'travelings/:travelingId',component:TravelingFormComponent},
      {path:'travelings/:travelingId/transportations',component:TransportationsComponent},
      {path:'register',component:RegisterComponent},
      {path:'login',component:LoginFormComponent},
      {path:'**',component:PageErrorComponent}
    ])
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor,multi:true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
