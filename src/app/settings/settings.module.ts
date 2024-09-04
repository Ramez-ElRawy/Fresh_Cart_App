import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { UserAddressesComponent } from './user-addresses/user-addresses.component';
import { UserDataComponent } from './user-data/user-data.component';
import { UpdateUserPasswordComponent } from './update-user-password/update-user-password.component';
import { UpdateUserDataComponent } from './update-user-data/update-user-data.component';


@NgModule({
  declarations: [
    UserAddressesComponent,
    UserDataComponent,
    UpdateUserPasswordComponent,
    UpdateUserDataComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule
  ]
})
export class SettingsModule { }
