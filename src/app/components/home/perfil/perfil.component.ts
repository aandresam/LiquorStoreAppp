import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiResponse } from 'src/app/interfaces/ApiResponse';
import { UserService } from 'src/app/services/user.service';
import { DeleteAccountComponent } from './delete-account/delete-account.component';
import { SetPasswordComponent } from './set-password/set-password.component';
import { UpdatePerfilComponent } from './update-perfil/update-perfil.component';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit{

  user: any;
  datePipe = new DatePipe('en-US');


  constructor(
    private userService: UserService,
    private router: Router,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
  ) {
    this.user = {
      id: 0,
      name: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      regDate: ''
    }
  }


  ngOnInit(): void {
    this.getProfile();
  }

  getProfile() {
    this.userService.getProfile().subscribe((result: ApiResponse) => {
      if (result.succeded){
        result.message.regDate = this.datePipe.transform(result.message.regDate, 'dd-MM-yyyy hh:mm a')
        this.user = result.message;
      }
    })
  }

  openUpdateProfile(){
    this.dialog.open(UpdatePerfilComponent);
  }

  openUpdatePassword() {
    this.dialog.open(SetPasswordComponent);
  }

  eliminarCuenta(){
    if(confirm('Su cuenta será eliminada de forma definitiva. ¿Estás seguro?')){
      this.userService.deleteAccount().subscribe((result: any) => {
        this.snackBar(result.message);
      });
      setTimeout(()=>{
        //localStorage.clear();
        //this.router.navigate(['/login']);
      }, 1500)
    }
  }

  snackBar(message: string){
    this._snackBar.open(message,"close", {
      horizontalPosition: "center",
      verticalPosition: "top",
      duration: 4000
    })
  }
}
