import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiResponse } from 'src/app/interfaces/ApiResponse';
import { Credentials } from 'src/app/interfaces/Credentials';
import { AuthService } from 'src/app/services/auth.service';
import { JwtService } from 'src/app/services/jwt.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  loading: boolean = false;
  credentials: Credentials;
  hide: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private _authService: AuthService,
    private _jwtService: JwtService
  ) 
  {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.credentials = {
      email: '',
      password: '',
    }
  }

  ngOnInit(): void {
/*     if (localStorage.getItem('token')){
      this.router.navigate(['/home']);
    } */
  }

  login(){

    this.credentials = {
      email: this.form.value.email,
      password: this.form.value.password
    }
    
    this._authService.authenticate(this.credentials).subscribe((result: ApiResponse) => {

      this.loading = true;
      if(!result.succeded){

        setTimeout(() => {
          this.loading = false;
          this.swal(result.message, 'error');
        }, 800);
        
        this.form.reset();
        return;
      }

      const BEARER_TOKEN = result.message;
      const TOKEN = BEARER_TOKEN.replace('Bearer ', '')
      this._jwtService.saveToken(TOKEN);
      this.redirectToHome();
    })

  }

  swal(message: string, icon: any){
    Swal.fire({
      position: 'center',
      icon: icon,
      title: message,
      showConfirmButton: false,
      timer: 1500
    })
  }

  redirectToHome(){
    this.loading = true;    
    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 1500)
  }
}
