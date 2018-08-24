import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  AppHeaderModule
} from '@coreui/angular';

import { LayoutRoutingModule } from './layout.routing';
import { LayoutComponent } from './layout.component';
import { WishesComponent } from '../../routes/wishes';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    LayoutRoutingModule,
    AppHeaderModule,
  ],
  declarations: [
    LayoutComponent,
    WishesComponent
  ]
})
export class LayoutModule { }
