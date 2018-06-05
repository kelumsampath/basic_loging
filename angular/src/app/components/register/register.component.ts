import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { NgFlashMessageService } from 'ng-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name:String;
  username:String;
  email:String;
  password:String;

  constructor(
    private authservice:AuthService,
    private ngFlashMessageService: NgFlashMessageService,
    private router:Router,
  ) { }

  ngOnInit() {
  }

registerData(){
  const user={
    name:this.name,
    username:this.username,
    email:this.email,
    password:this.password,
  }
  this.authservice.registerUser(user).subscribe(res=>{
    if(res.state){
    this.ngFlashMessageService.showFlashMessage({messages: ["You are registered!"],dismissible: true,timeout: 4000,type: 'success'});
    this.router.navigate(['/login']);}
    else{
    this.ngFlashMessageService.showFlashMessage({messages: ["Something went wrong!"],dismissible: false,timeout: 4000,type: 'danger'});
    this.router.navigate(['/register']);
    }
  });
  
}

}
