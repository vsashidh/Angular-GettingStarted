import { Component, OnInit } from "@angular/core";
import { IProduct } from "./products";
import { ProductService } from "./product.service";

@Component({
  selector: 'pm-products',
  templateUrl: './product-list-component.html',
  styleUrls: ['./product-list.component.css']
})
export class productListComponent implements OnInit {

  constructor(private productService: ProductService) {
  }

  onRatingClicked(message: string):void{
    this.pageTitle = 'Product List: ' + message
  }

  performFilter(filterText: string): IProduct[] {
    return this.products.reduce((acc, currentVal): IProduct[] => {
      if (currentVal.productName.toLocaleLowerCase().indexOf(filterText.toLocaleLowerCase()) !== -1)
        acc.push(currentVal);
      return acc;
    }, [])
  }
  pageTitle: string = 'Product List';
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage: boolean = false;

  _listFilter: string;
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value
    this.filteredProducts = this.listFilter ? this.performFilter(this._listFilter) : this.products;
  }

  filteredProducts: IProduct[];

  products: IProduct[] = [];

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  ngOnInit(): void {
    this.products = this.productService.getProducts();
    this.filteredProducts = this.products;
  }
}