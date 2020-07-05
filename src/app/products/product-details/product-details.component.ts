import {
  Component,
  OnInit,
  OnDestroy,
  TemplateRef,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { BackendApiService } from '../../services/backend-api/backend-api.service';
import { ProfileService } from '../../profile/profile.service'; // new
import { Subscription, BehaviorSubject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NotificationToastService } from 'src/app/shared/notification-toast.service';
import { CartService } from 'src/app/services/backend-api/cart.service';
import { CartItem } from '../../shared/cart/cartItem.modal';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  submittedProduct: boolean = false;
  unsubscribeProduct: Subscription;
  productInterface: any = {};
  productId: any;
  // message : string = '' ;
  updatedImg = false;
  quanOrderd = 1;
  quanAvilabel = 0;
  unsubscribeCategory: Subscription;
  categoryList: any = [];

  imgList: any = [];
  @ViewChild('quantity', { static: false }) quantityInputRef: ElementRef;
  categoryInterface: any = {};
  supplierInterface: any = {
    id: null,
    user: {
      id: null,
      first_name: '',
      last_name: '',
      username: '',
      email: '',
    },
    address: '',
    phone: '',
  }; //modify
  supplierName: string = null;

  //new
  current_user: any = {
    id: null,
    user: {
      id: null,
      first_name: '',
      last_name: '',
      username: '',
      email: '',
    },
    address: '',
    phone: '',
  }; //modify
  fullname: string;
  // new

  // new imgs
  images: any = [];
  imgListView: any = [];
  coverView: any;
  coverImg: any;
  closeResult = '';
  // productId : any;
  modalRef: BsModalRef;
  constructor(
    public backendApi: BackendApiService,
    private profileService: ProfileService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: BsModalService,
    private notitfication: NotificationToastService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    if (!localStorage.getItem('id')) {
      this.router.navigate(['/login']);
    }
    this.profileService.getCurrentUser().subscribe((response) => {
      this.current_user = response;
      this.fullname =
        this.current_user['user']['first_name'] +
        ' ' +
        this.current_user['user']['last_name'];
      // console.log(this.current_user)   // new modify comment
    });

    this.unsubscribeProduct = this.route.params.subscribe((data) => {
      this.productId = parseInt(data['id'], 10);
      // console.log(data['id'])    // modify comment
    });
    this.unsubscribeCategory = this.backendApi
      .getAllCategory()
      .subscribe((data: []) => {
        this.categoryList = data;
      });
    this.getOneProduct(this.productId);
  }

  ngOnDestroy(): void {
    this.unsubscribeProduct.unsubscribe();
    this.unsubscribeCategory.unsubscribe();
  }

  getOneProduct(id) {
    this.backendApi.getOneProduct(id).subscribe(
      (data) => {
        this.productInterface = data;
        // console.log(data);  // modify comment
        // console.log(this.productInterface.photo); //modify comment
        this.coverView = this.productInterface.photo;
        this.coverImg = this.productInterface.photo;
        this.getOneCategory(this.productInterface.category);
        this.getOneSupplier(this.productInterface.supplier);
      },
      (error) => {
        // console.log(this.productInterface);  //modify comment
        console.log(error);
      }
    );
    this.backendApi.findByProductImgs(id).subscribe(
      (data) => {
        this.imgList = data;
        // console.log(data); //modify comment
        // console.log(data[0].photos)
        // console.log(this.imgList[0].id)
      },
      (error) => {
        console.log(error);
      }
    );
    // this.imgList = [{m:'m'}]
    // console.log(this.imgList)  //modify comment
  }

  deleteProduct() {
    if (confirm('Are you sure to delete this Product ? ')) {
      this.backendApi.deleteProduct(this.productInterface.id).subscribe(
        (response) => {
          // console.log(this.productInterface.id); //modify comment
          // console.log(this.productInterface);    //modify comment
          // console.log(response);                //modify comment
          alert('The Product was deleted successfully!');
          this.router.navigate(['/products']);
        },
        (error) => {
          // console.log(this.productInterface.id);   //modify comment
          console.log(error);
        }
      );
    }
  }

  onImgChanged(event: any) {
    this.productInterface.photo = event.target.files[0];
    // new
    let reader = new FileReader();
    reader.onload = (event: any) => {
      // console.log(event.target.result); //modify comment
      this.coverView = event.target.result;
    };
    reader.readAsDataURL(event.target.files[0]);
    // new

    this.updatedImg = true;
  }

  updateProduct() {
    this.productInterface.supplier = this.current_user.id;
    const fd = new FormData();

    if (this.updatedImg === true) {
      fd.append(
        'photo',
        this.productInterface.photo,
        this.productInterface.photo.name
      );
    }
    if (this.productInterface.desc !== '') {
      fd.append('desc', this.productInterface.desc);
    }
    fd.append('name', this.productInterface.name);
    fd.append('quantity', this.productInterface.quantity);
    fd.append('price', this.productInterface.price);
    // fd.append('created_date',this.productInterface.created_date)
    fd.append('in_stock', this.productInterface.in_stock);
    fd.append('supplier', this.productInterface.supplier);
    fd.append('category', this.productInterface.category);

    this.backendApi.updateProduct(this.productInterface.id, fd).subscribe(
      (response) => {
        // console.log(response);    //modify comment
        this.newProductImgs();
        this.submittedProduct = false;
        alert('The Product was updated successfully!');
        // this.message = 'The Product was updated successfully!';
        this.refreshPage();
      },
      (error) => {
        console.log(error);
        alert('( InValid-Input ) Please Try Again ... ');
      }
    );
  }

  refreshPage() {
    // this.router.navigate(['/productList']);
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/product/' + this.productId]);
    });
  }

  editProduct() {
    if (this.current_user.id === this.productInterface.supplier) {
      this.submittedProduct = true;
    } else {
      alert(this.fullname + 'has No-Permition to Edit this Product');
    }
  }

  getOneCategory(id) {
    this.backendApi.getOneCategory(id).subscribe(
      (data) => {
        this.categoryInterface = data;
        // console.log(data);     //modify comment
        // console.log(this.categoryInterface.name);    //modify comment
      },
      (error) => {
        // console.log(this.categoryInterface);    //modify comment
        console.log(error);
      }
    );
  }
  getOneSupplier(id) {
    this.backendApi.getOneSupplier(id).subscribe(
      (data) => {
        this.supplierInterface = data;
        this.supplierName =
          this.supplierInterface['user']['first_name'] +
          ' ' +
          this.supplierInterface['user']['last_name'];
        // console.log(data);        //modify comment
        // console.log(this.supplierName);       //modify comment
      },
      (error) => {
        // console.log(this.supplierInterface);   //modify comment
        console.log(error);
      }
    );
  }

  //Product Imgs Create

  onProductImgChange(event) {
    this.images = [];
    this.imgListView = [];
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        this.images.push(event.target.files[i]);
        let reader = new FileReader();

        reader.onload = (event: any) => {
          // console.log(event.target.result);       //modify comment
          this.imgListView.push(event.target.result);
        };
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }

  newProductImgs() {
    const productImgsForm = new FormData();
    // this.productId = 1;
    for (let i = 0; i < this.images.length; i++) {
      productImgsForm.append('product', this.productId);
      productImgsForm.append('photos', this.images[i]);
      // console.log(productImgsForm);        //modify comment
      this.backendApi.createProductImg(productImgsForm).subscribe(
        (res) => {
          // console.log(res);  //modify comment
          // console.log('Uploaded Successfully.');  //modify comment
          productImgsForm.delete('product');
          productImgsForm.delete('photos');
          if (i === 0) {
            this.deleteProductImgs();
            // console.log("true delete old"); //modify comment
            this.refreshPage();
          }
        },
        (error) => {
          console.log(error);
          productImgsForm.delete('product');
          productImgsForm.delete('photos');
        }
      );
    }
  }

  deleteProductImgs() {
    for (let i = 0; i < this.imgList.length; i++) {
      this.backendApi.deleteProductImg(this.imgList[i].id).subscribe(
        (response) => {
          // console.log(this.productInterface.id);
          // console.log(this.productInterface);
          // console.log(response);                   //modify comment
          // console.log("The Product Img was deleted successfully!")   //modify comment
          // this.router.navigate(['/products']);
        },
        (error) => {
          // console.log(this.productInterface.id);
          console.log(error);
        }
      );
    }
  }

  openModal(template: TemplateRef<any>) {
    console.log(template);
    this.modalRef = this.modalService.show(template);
  }

  showToaster() {
    this.notitfication.showInfo('well done', 'success');
  }

  confirmAddToCart(quantity) {
    this.quanOrderd = +quantity.value;
    this.quanAvilabel = +this.productInterface.quantity;

    if (this.quanOrderd > this.quanAvilabel) {
      this.modalRef.hide();
      this.notitfication.showError(
        'there is no enough products',
        'Orderd canceled'
      );
      return false;
    } else {
      this.CreateCart();
      this.modalRef.hide();
      // this.createCartItem(1,2);
      // this.updateOrder()
      // this.CreateCart();
    }
  }

  updateOrder() {
    //this.productInterface.supplier = this.current_user.id ;

    this.productInterface.quantity = this.quanAvilabel - this.quanOrderd;
    if (this.quanOrderd == this.quanAvilabel) {
      this.productInterface.in_stock = false;
    }

    const newProduct = {
      name: this.productInterface.name,
      quantity: this.productInterface.quantity,
      price: this.productInterface.price,
      in_stock: this.productInterface.in_stock,
      supplier: this.productInterface.supplier,
      category: this.productInterface.category,
      desc: this.productInterface.desc,

      created_date: this.productInterface.created_date,
    };

    this.backendApi
      .updateProduct(
        this.productInterface.id,
        JSON.parse(JSON.stringify(newProduct))
      )
      .subscribe(
        (response) => {},
        (error) => {
          console.log(error);
          this.notitfication.showError(
            "can't order this product ",
            'orderd Error'
          );
        }
      );
  }
  CreateCart() {
    let cartID = 0;
    this.cartService
      .getunorderdCartByuser(+this.current_user.id)
      .subscribe((data) => {
        if (Object.keys(data).length == 0) {
          const newcart = new FormData();
          newcart.append('user', this.current_user.id);
          this.cartService.CreateCart(newcart).subscribe((response) => {
            cartID = response['id'];
            this.createCartItem(cartID, +this.productInterface.id);
          });
        } else {
          this.createCartItem(data[0]['id'], +this.productInterface.id);
        }
      });
  }

  createCartItem(cartId, productId) {
    this.cartService
      .getCartItemByProductId(this.productInterface.id, cartId)
      .subscribe((product) => {
        if (Object.keys(product).length == 0) {
          const totalPrice = +this.quanOrderd * +this.productInterface.price;
          const newCartItem = new CartItem(
            this.quanOrderd,
            totalPrice,
            productId,
            cartId
          );
          this.cartService
            .CreateCartItem(JSON.parse(JSON.stringify(newCartItem)))
            .subscribe((response) => {
              this.notitfication.showSuccess(
                'this product orderd successfuly',
                'order product'
              );
              this.updateOrder();
            });
        } else {
          this.notitfication.showError(
            'this product already exist in your Cart',
            'Product Exist'
          );
        }
      });
  }
}
