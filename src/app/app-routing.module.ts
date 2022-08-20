import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePageComponent } from './pages/home-page/home-page.component';
import { UserManagementComponent } from './pages/user-management/user-management.component';
import { RoleManagementComponent } from './pages/role-management/role-management.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AuthGuard } from './services/auth.guard';
import { LoginLayoutComponent } from './shares/login-layout/login-layout.component';
import { MaterialLayoutComponent } from './shares/material-layout/material-layout.component';
import { LoadingLayoutComponent } from './shares/loading-layout/loading-layout.component';

const routes: Routes = [
  {
    path: '',
    component: MaterialLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: '/',
        pathMatch: 'full',
      },
      {
        path: '',
        loadChildren: () => import('./pages/home-page/home-page.module').then(m=>m.HomePageModule)
      },
      {
        path: 'user-management',
        loadChildren: () => import('./pages/user-management/user-management.module').then(m=>m.UserManagementModule)
      },
      {
        path: 'role-management',
        loadChildren: () => import('./pages/role-management/role-management.module').then(m=>m.RoleManagementModule)
      }
    ]
  },
  {
    path: '',
    component: LoginLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        loadChildren: () => import('./pages/login-page/login-page.module').then(m=>m.LoginPageModule)
      }
    ]
  },
  {
    path: '',
    component: LoadingLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: '/loading',
        pathMatch: 'full',
      },
      {
        path: 'loading',
        loadChildren: () => import('./pages/loading-page/loading-page.module').then(m=>m.LoadingPageModule)
      }
    ]
  }
];

// const routes: Routes = [
//   {
//     path: '',
//     component: HomePageComponent,
//   },
//   {
//     path: 'login',
//     component: LoginPageComponent
//   },
//   {
//     path: 'user-management',
//     component: UserManagementComponent,
//     canActivate: [AuthGuard],
//   },
//   {
//     path: 'role-management',
//     component: RoleManagementComponent,
//     canActivate: [AuthGuard],
//   },

// ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
