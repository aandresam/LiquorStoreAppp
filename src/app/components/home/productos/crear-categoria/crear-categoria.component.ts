import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiResponse } from 'src/app/interfaces/ApiResponse';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-crear-categoria',
  templateUrl: './crear-categoria.component.html',
  styleUrls: ['./crear-categoria.component.css']
})
export class CrearCategoriaComponent implements OnInit {

  form: FormGroup;
  categoria: any;
  datePipe = new DatePipe('en-US');
  displayedColumns: string[] = ['Id', 'Name', 'RegDate','Actions'];
  dataSource: any[] = [];
  formulario = {
    id: '',
    nombre: ''
  }

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private _snackBar: MatSnackBar,
  ) {
    this.form = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
    })
    this.categoria = {
      Id: 0,
      Name: '',
    }
  }
  
  ngOnInit(): void {
    this.getCategorias()
  }

  formCategoria(){
    this.categoria = {
      Id: this.form.value.id,
      Name: this.form.value.name,
    }
    if(this.categoria.Id == 0 || this.categoria.Id == '' || this.categoria.Id == null){
      this.crearCategoria(this.categoria);
      return;
    }
    this.updateCategoria(this.categoria);
  }

  getCategorias(){
    this.categoryService.getAll().subscribe((result: any) => {
      result.map((category: any) => category.regDate = this.datePipe.transform(category.regDate, 'dd-MM-yyyy hh:mm a') )
      this.dataSource = result;
    })
  }

  crearCategoria(category: any) {
    this.categoryService.create(category).subscribe((result: ApiResponse) => {
      this.snackBar(result.message)
      this.form.reset();
      this.getCategorias();
    })
  }

  updateCategoria(category: any) {
    this.categoryService.update(category).subscribe((result: ApiResponse) => {
      this.snackBar(result.message)
      this.form.reset();
      this.getCategorias();
    })
  }


  edit(id: number){
    this.categoryService.getById(id).subscribe((result: ApiResponse) => {
      console.log(result.message.name)
      if(result.succeded){
        this.formulario.id = result.message.id;
        this.formulario.nombre = result.message.name;
        console.log('editar',this.form)
      }
    })
  }

  deleteById(id: number){
    if(confirm('¿Estás seguro de eliminar ester egistro?')){
      this.categoryService.deleteById(id).subscribe((result: any) =>{
        this.snackBar("Categoria eliminado con exito!");
        this.getCategorias();
      })
  }}

  snackBar(message: string){
    this._snackBar.open(message,"close", {
      horizontalPosition: "center",
      verticalPosition: "top",
      duration: 4000
    })
  }
}
