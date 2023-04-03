import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.css']
})
export class DeleteAccountComponent {

  hide: boolean = true;
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      password: ['', Validators.required],
    });
    
  }


  deleteAccount() {
    if(confirm('Su cuenta será eliminada de forma definitiva. ¿Estás seguro?')){
      this.userService.deleteAccount().subscribe((result: any) => {
        
      });

      setTimeout(()=>{
        localStorage.clear();
        this.router.navigate(['/login']);
      }, 1500)
    }
  }
}
