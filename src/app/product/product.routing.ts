import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductCreateComponent } from './components/products/create.component';
import { ProductUpdateComponent } from './components/products/update.component';
import { ProductsComponent } from './components/products/listing.component';

const routes: Routes = [
  {
    path: 'list',
    component: ProductsComponent,
    data: {
      title: 'Manager de produse',
      urls: [{ title: 'Produse', url: '/products/list' }]
    }
  },
  {
    path: 'create',
    component: ProductCreateComponent,
    data: {
      title: 'Manager de produse',
      urls: [{ title: 'Produse', url: '/products/list' }, { title: 'Creare', url: '/products/create' }]
    }
  },
  {
    path: 'update/:id',
    component: ProductUpdateComponent,
    data: {
      title: 'Manager de produse',
      urls: [{ title: 'Produse', url: '/products/list' }, { title: 'Editare', url: '/products/update' }]
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
