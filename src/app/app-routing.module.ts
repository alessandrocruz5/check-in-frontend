import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './components/dashboard/form/form.component';
import { CardComponent } from './components/dashboard/card/card.component';

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
    path: '',
    redirectTo: '/check-in',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: FormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
