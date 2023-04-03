import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { TooltipPosition } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { ApiResponse } from 'src/app/interfaces/ApiResponse';
import { Credentials } from 'src/app/interfaces/Credentials';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  credentials: Credentials;
  positionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];
  position = new FormControl(this.positionOptions[2]);


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private _authService: AuthService
  ) 
  {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required]
    });
    this.credentials = {
      email: '',
      password: ''
    }
  }

  ngOnInit(): void {
  }

  register(){
    const password = this.form.value.password;
    const passwordTwo = this.form.value.repeatPassword;
    
    if(password != passwordTwo){
      this.swal("Las contraseñas no coinciden!", 'error')
      return;
    }
    this.credentials = {
      email: this.form.value.email,
      password: this.form.value.password
    }

    this._authService.register(this.credentials).subscribe((result: ApiResponse ) => {
      if(!result.succeded){
        this.swal(result.message, 'error')
        this.form.reset();
        return;
      }
      this.swal(result.message, 'success')
      setTimeout(() => {
        this.router.navigate(['/']); 
      }, 1500);
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
}
