import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiResponse } from 'src/app/interfaces/ApiResponse';
import { PasswordUpdate } from 'src/app/interfaces/PasswordUpdate';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.css']
})
export class SetPasswordComponent {

  hide: boolean = true;
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private _snackBar: MatSnackBar,
  ) {
    this.form = this.formBuilder.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
    });
    
  }


  setPassword(){
    const password: PasswordUpdate = {
      CurrentPassword: this.form.value.currentPassword,
      NewPassword: this.form.value.newPassword
    }
    this.userService.updatePassword(password).subscribe((result: ApiResponse) => {
      this.snackBar(result.message);
      setTimeout(() => {
        window.location.reload();
      }, 1000 )
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
