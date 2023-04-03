import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiResponse } from 'src/app/interfaces/ApiResponse';
import { ProductRequest } from 'src/app/interfaces/ProductRequest';
import { BrandService } from 'src/app/services/brand.service';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})

export class CrearProductoComponent implements OnInit {
  
  form: FormGroup;
  producto: any;
  categorias: any[] = [];
  marcas: any[] = [];
  id = 0;
  btnSave = '';
  categoria: any = {
    id: 0,
    name: ''
  }
  marca: any = {
    id: 0,
    name: ''
  }
  x = 1;
  y = 1;


  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private _snackBar: MatSnackBar,
    private categoryService: CategoryService,
    private brandService: BrandService,
    private router: Router,
    private _route: ActivatedRoute
  ) {
    this.form = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      category: ['', Validators.required],
      brand: ['', Validators.required],
      price: ['', Validators.required],
      stock: ['', Validators.required],
    })



    this.producto = {
      id: 0,
      name: '',
      categoryId: 0,
      brandId: 0,
      price: 0,
      stock: 0
    }
    
  }

  ngOnInit(): void {
    this.getCategorias();
    this.getMarcas();
    
    this.getUserData();
    if (this.id == 0){
      this.btnSave = 'Registrar';
    } else {
      this.btnSave = 'Actualizar'
    }
  }


  getUserData(){
    if(this._route.snapshot.paramMap.get('id')){
      this.id = Number.parseInt(this._route.snapshot.paramMap.get('id') ?? '');
      console.log(this.id);
      if (this.id != 0){
        this.productService.getById(this.id).subscribe((result: any) => {
          this.form.value.id = this.id;
          console.log(this.form.value.id)
          this.producto.id = this.id;
          console.log(this.producto.id)
          console.log(this.producto);
          console.log('result',result);
          this.categoria = this.categorias.filter(categoria => categoria.name == result.message[0].categoryName)
          console.log('categoria', this.categoria);
          this.marca = this.marcas.filter(marca => marca.name == result.message[0].brandName)
          console.log('marca',this.marca);

          this.x = this.categoria[0].id;
          console.log('x',this.x)
          this.y = this.marca[0].id;
          console.log('x',this.y)
          this.producto = result.message[0];
        })
      }
    }
  }


  formProducto() {
    this.producto = {
      id: this.form.value.id,
      Name: this.form.value.name,
      CategoryId: this.form.value.category,
      BrandId: this.form.value.brand,
      Price: this.form.value.price,
      Stock: this.form.value.stock
    }
    console.log('desde formulario',this.producto)
    if(this.producto.Price == 0){
      this.snackBar("El precio debe ser mayor a cero!")
      return;
    }
    if(this.producto.Stock == 0){
      this.snackBar("La cantidad debe ser mayor a cero!")
      return;
    }
    
    if (this.producto.Id == 0 || this.producto.Id == ''){
      console.log(this.id)
      this.crearProducto(this.producto);
      return;
    }
    if(this.id != 0 || this.id != null || this.producto.id != undefined){
      this.updateProducto(this.producto.id, this.producto);
      return;
    }
    this.snackBar("Error inesperado!");
  }

  getCategorias(){
    this.categoryService.getAll().subscribe((result: any) => {
        result.map((categoria: any) => {
          this.categorias.push(categoria)
        })
    })
  }

  getMarcas(){
    this.brandService.getAll().subscribe((result: any) => {
      result.map((brand: any) => {
        this.marcas.push(brand)
      })
    })
  }

  crearProducto(producto: ProductRequest){
    this.productService.create(producto).subscribe((result: ApiResponse) => {
      this.snackBar(result.message);
      this.form.reset();
      this.router.navigate(['/home/productos']);
    }); 
  }

  updateProducto(id: number, producto: ProductRequest){
    this.productService.update(id, producto).subscribe((result: ApiResponse) => {
      this.snackBar(result.message);
      this.router.navigate(['/home/productos']);
    }); 
  }


  snackBar(message: string){
    this._snackBar.open(message,"close", {
      horizontalPosition: "center",
      verticalPosition: "top",
      duration: 4000
    })
  }
}
