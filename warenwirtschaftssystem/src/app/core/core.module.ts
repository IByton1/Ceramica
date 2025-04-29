import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../../material.module';
import { AppRoutingModule } from '../app-routing.module';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ToastrModule } from 'ngx-toastr';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SettingsComponent } from './components/settings/settings.component';



@NgModule({
  declarations: [NavBarComponent, ConfirmDialogComponent, SettingsComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({}),
    ReactiveFormsModule,
  ],
  exports: [
    NavBarComponent,
    ConfirmDialogComponent
  ]
})
export class CoreModule { }
