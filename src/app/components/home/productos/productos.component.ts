import { DatePipe } from '@angular/common';
import { Component, OnInit} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApiResponse } from 'src/app/interfaces/ApiResponse';
import { ProductService } from 'src/app/services/product.service';



@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit{
  
  displayedColumns: string[] = ['Id', 'Name', 'UserName', 'CategoryName', 'BrandName', 'Price', 'Stock', 'RegDate', 'Actions'];
  products: any[] = [];
  dataSource: any;
  datePipe = new DatePipe('en-US');

  constructor(
    private productService: ProductService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {
  }
  

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productService.getAll().subscribe((result: ApiResponse ) => {
      result.message.map((product: any) => product.regDate = this.datePipe.transform(product.regDate, 'dd-MM-yyyy hh:mm a'))
      result.message.map((product: any) => {
        this.products.push(product)
      });
      this.dataSource = new MatTableDataSource(this.products);
    })
  }

  editProducto(id: number){
    this.router.navigate([`actualizar-producto/${id}`])
  }

  deleteProduct(id: number){
    let produtId = id;
    if(confirm('¿Estás seguro de eliminar este producto?')){
      this.productService.deleteById(produtId).subscribe((result: any) => {
        if(!result.succeded){
          this.snackBar(result.message);
          return;
        }
        this.snackBar(result.message);
        this.getProducts();
      })
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  snackBar(message: string){
    this._snackBar.open(message,"close", {
      horizontalPosition: "center",
      verticalPosition: "top",
      duration: 4000
    })
  }
}
