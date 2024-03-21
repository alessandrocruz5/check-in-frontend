import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './components/dashboard/form/form.component';
import { CardComponent } from './components/dashboard/card/card.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';

const routes: Routes = [
  {
    path: 'check-in',
    component: FormComponent,
  },
  {
    path: 'view',
    component: CardComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  {
    path: '',
    redirectTo: '/check-in',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: FormComponent,
  }
  ];

const routes: Routes = [
  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
