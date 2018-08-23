import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LayoutRoutingModule } from './layout.routing';
import { LayoutComponent } from './layout.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    LayoutRoutingModule,
  ],
  declarations: [
    LayoutComponent,
  ]
})
export class LayoutModule { }
