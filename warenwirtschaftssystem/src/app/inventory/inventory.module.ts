import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryTableComponent } from './components/inventory-table/inventory-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AddDataDialogComponent } from './components/add-data-dialog/add-data-dialog.component';
import { MaterialModule } from '../../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { EditDialogComponent } from './components/edit-dialog/edit-dialog.component';
import { EditOrderDialogComponent } from './components/edit-order-dialog/edit-order-dialog.component';



@NgModule({
  declarations: [
    InventoryTableComponent,
    AddDataDialogComponent,
    EditDialogComponent,
    EditOrderDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class InventoryModule { }
