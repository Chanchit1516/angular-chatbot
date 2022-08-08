import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleManagementComponent } from './role-management.component';

const routes: Routes = [
  {
    path: '',
    component: RoleManagementComponent,
    children:[
      {
        path: 'role-management',
        component: RoleManagementComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleManagementRoutingModule { }
