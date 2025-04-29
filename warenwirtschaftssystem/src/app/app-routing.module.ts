import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventoryTableComponent } from './inventory/components/inventory-table/inventory-table.component';
import { AddDataDialogComponent } from './inventory/components/add-data-dialog/add-data-dialog.component';
import { SettingsComponent } from './core/components/settings/settings.component';

const routes: Routes = [
    { path: '', redirectTo: 'produkte', pathMatch: 'full' },
    { path: 'produkte', component: InventoryTableComponent },
    { path: 'produkt-erstellen', component: AddDataDialogComponent },
    { path: 'settings', component: SettingsComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
