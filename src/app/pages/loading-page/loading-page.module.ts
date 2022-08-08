import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingPageRoutingModule } from './loading-page-routing.module';
import { LoadingPageComponent } from './loading-page.component';


@NgModule({
  declarations: [
    LoadingPageComponent
  ],
  imports: [
    CommonModule,
    LoadingPageRoutingModule
  ]
})
export class LoadingPageModule { }
