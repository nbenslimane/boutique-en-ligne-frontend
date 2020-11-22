import { Component, OnInit } from '@angular/core';
import { CataloqueService } from './services/cataloque.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'boutique';
  public categories:any;
  public currentCategorie:any;

  constructor(private catalogue:CataloqueService, private router:Router){}
  ngOnInit():void{
   this.getCategories();
  }

  public getCategories(){
    this.catalogue.getRessource("/categories")
    .subscribe(data=>{
      this.categories=data
    },err=>{
        console.log(err);
      }
    )
  }
  getProductByCategorie(c:any){
   this.currentCategorie=c;
   this.router.navigateByUrl("/products/2/"+c.id);
  }
  onSelectedProduct(){
    this.currentCategorie=undefined;
    this.router.navigateByUrl("/products/1/0")
  }
  onPromoProduct(){
    this.currentCategorie=undefined;
    this.router.navigateByUrl("/products/3/0")

  }
  onDispoProduct(){
    this.currentCategorie=undefined;
    this.router.navigateByUrl("/products/4/0")
  }
}
