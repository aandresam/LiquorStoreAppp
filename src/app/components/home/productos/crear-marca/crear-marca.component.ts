import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiResponse } from 'src/app/interfaces/ApiResponse';
import { Brand } from 'src/app/interfaces/Brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-crear-marca',
  templateUrl: './crear-marca.component.html',
  styleUrls: ['./crear-marca.component.css']
})
export class CrearMarcaComponent implements OnInit{
  
  form: FormGroup;
  marca: Brand;
  datePipe = new DatePipe('en-US');
  displayedColumns: string[] = ['Id', 'Name', 'RegDate','Actions'];
  dataSource: Brand[] = [];
  formulario = {
    id: '',
    nombre: ''
  }

  constructor(
    private formBuilder: FormBuilder,
    private brandService: BrandService,
    private _snackBar: MatSnackBar,
  ) {
    this.form = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
    })

    this.marca = {
      Id: 0,
      Name: ''
    }
  }
  
  ngOnInit(): void {
    this.getMarcas()
  }


  formMarca() {
    this.marca = {
      Id: this.form.value.id,
      Name: this.form.value.name
    }
    console.log('formulario',this.marca)
    if (this.marca.Id == 0 || this.marca.Id == null) {
      this.crearMarca(this.marca);
      return;
    }
    this.actualizarMarca(this.marca);
  }

  crearMarca(marca: Brand){
    this.brandService.create(marca).subscribe((result: ApiResponse) => {
      this.snackBar(result.message);
      this.form.reset();
      this.getMarcas()
    })
  }

  actualizarMarca(marca: Brand){
    this.brandService.update(marca).subscribe((result: ApiResponse) => {
      this.snackBar(result.message);
      this.form.reset();
      this.getMarcas();
    })
  }

  getMarcas() {
    this.brandService.getAll().subscribe((result: any) => {
      result.map((brand: any) => brand.regDate = this.datePipe.transform(brand.regDate, 'dd-MM-yyyy hh:mm a') )
      this.dataSource = result;
    })
  }


  edit(id: number){
    this.brandService.getById(id).subscribe((result: ApiResponse) => {
      console.log(result.message.name)
      if(result.succeded){
        this.formulario.id = result.message.id;
        this.formulario.nombre = result.message.name;
      }
    })
  }

  deleteById(id: number){
    console.log(id)
    if(confirm('¿Estás seguro de eliminar ester egistro?')){
      this.brandService.deleteById(id).subscribe((result: any) =>{
        this.snackBar("Marca eliminado con exito!")
        this.getMarcas();
      })
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
