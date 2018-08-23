import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginRoutingModule } from './login.routing';
import { LoginComponent } from './login.component';
import { TPipe } from '../../pipes';
import { SpinnerComponent } from '../../components';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    LoginRoutingModule
  ],
  declarations: [
    LoginComponent,

    TPipe,
    SpinnerComponent
  ]
})
export class LoginModule { }
