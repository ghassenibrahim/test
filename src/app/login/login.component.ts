import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import { Observable } from 'rxjs';
import {first} from "rxjs/operators";
import {AuthenticationService} from "../service/auth.service";
import { UserService } from '../service/user.service';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8'
   })

};

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  response:any = { "token":""}

  loginForm: FormGroup;
  submitted: boolean = false;
  invalidLogin: boolean = false;

  datas:any;
  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthenticationService,private http: HttpClient, private ser:UserService) { }

  login(credentials): Observable<any> {
    return this.http.post('/wp-json/jwt-auth/v1/token' , {
      username: credentials.username,
      password: credentials.password
    }, httpOptions);
  }



  ngOnInit() {
    this.somefunc();
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
    somefunc(){
      return this.http.get("/wp-json/wc/v3/products")
              .subscribe(data =>{
                  this.datas = data
                  console.log(this.datas)
              })
}
verification(request){
  this.ser.login(request).subscribe(
    data=>{
          this.response=data.body;
          let token=this.response.token;
          localStorage.setItem("token",token)
          //this.ser.saveToken(token);
         // this.route.navigate(['/listerecus'])
    },
    err=> {

    }
  )

}

}

