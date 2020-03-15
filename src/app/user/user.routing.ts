import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileUpdateComponent } from './profile/profile-update.component';

const routes: Routes = [
  {
    path: 'profile/update', component: ProfileUpdateComponent,
    data: {
      title: 'Modificarea Profilului',
      urls: [{ title: 'Modificarea Profilului' }]
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
