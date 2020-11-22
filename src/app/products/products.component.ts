import { Component, OnInit } from '@angular/core';
import { CataloqueService } from '../services/cataloque.service';
import { ActivatedRoute, Route, Router, NavigationEnd } from '@angular/router';
import { url } from 'inspector';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  public products:any;
  public editPhoto:boolean=false;
  public currentProduct:any;
  public selectedFile:any;
  public progress:number=0;
  public currentFileUpload:any;
  public currentRequest:string="";
  private currentTime: number=0;
  private titre:string="";
  constructor(private catalogue: CataloqueService, 
    private route:ActivatedRoute,
    private router: Router) {
     
   }

  ngOnInit(): void {
    this.router.events.subscribe((val)=>{
      if(val instanceof NavigationEnd){
        let url=val.url;
        console.log(url);
        let p1=this.route.snapshot.params.p1;
      if(p1==1){
     this.getProducts("/products/search/selectedProducts");
   }
   else if(p1==2){
     let p2=this.route.snapshot.params.p2;
     this.titre="Produits de la categorie"+" "+p2;
     this.getProducts("/categories/"+p2+"/products");

   }
   else if(p1==3){
    this.titre="Produits en promotion"
    this.getProducts("/products/search/promoProducts");

  }
  else if(p1==4){
    this.titre="Produits disponible"
    this.getProducts("/products/search/dispoProducts");

  }
      }
    });
    let p1=this.route.snapshot.params.p1;
    if(p1==1){
      this.getProducts("/products/search/selectedProducts");
    }
  }

  public getProducts(url:string){
    this.catalogue.getRessource(url)
    .subscribe(data=>{
        this.products=data
    },err=>{
      console.log(err);
    })
  }
  onEditPhoto(p:any){
    this.currentProduct=p;
    this.editPhoto=!this.editPhoto;
  }
  onSelectedFile(event:any){
    this.selectedFile=event.target.files;
  }
  uploadPhoto() {
    this.progress = 0;
    this.currentFileUpload = this.selectedFile.item(0);
    this.catalogue.uploadPhotoProduct(this.currentFileUpload, this.currentProduct.id).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress = Math.round(100 * event.loaded / 100);
      } else if (event instanceof HttpResponse) {
        //console.log(this.router.url);
        //this.getProducts(this.currentRequest);
        //this.refreshUpdatedProduct();
        this.currentTime=Date.now();
      }
    },err=>{
      alert("Problème de chargement");
    })



    this.selectedFile = undefined
  }
}
