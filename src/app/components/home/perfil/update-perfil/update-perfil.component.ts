import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiResponse } from 'src/app/interfaces/ApiResponse';
import { User } from 'src/app/interfaces/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-update-perfil',
  templateUrl: './update-perfil.component.html',
  styleUrls: ['./update-perfil.component.css']
})
export class UpdatePerfilComponent implements OnInit{

  user: any;
  profile = {
    nombre: '',
    apellido: '',
    telefono: ''
  }

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private _snackBar: MatSnackBar,
  ) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
    });
    
  }
  
  ngOnInit(): void {
    this.getProfile()
  }


  updateProfile(){
    const data = {
      Name: this.form.value.name,
      LastName: this.form.value.lastName,
      PhoneNumber: this.form.value.phoneNumber,
    }
    this.userService.updateProfile(data).subscribe((result: ApiResponse) => {
      this.snackBar(result.message);
      this.form.reset();
      setTimeout(() => {
        window.location.reload();
      },1000)
    })
  }

  getProfile() {
    this.userService.getProfile().subscribe((result: ApiResponse) => {
      if (result.succeded){
        this.profile.nombre = result.message.name;
        this.profile.apellido = result.message.lastName;
        this.profile.telefono = result.message.phoneNumber;
        console.log(this.profile);
        return result.message;
      }
    })
  }

  snackBar(message: string){
    this._snackBar.open(message,"close", {
      horizontalPosition: "center",
      verticalPosition: "top",
      duration: 4000
    })
  }
}
