
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BackendService, InventoryItem } from '../../../core/services/backend.service';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from '../../../core/services/notification.service';
import { ConfirmDialogComponent } from '../../../core/components/confirm-dialog/confirm-dialog.component';
import { DialogService } from '../../../core/services/dialog-service.service';
import { EditOrderDialogComponent } from '../edit-order-dialog/edit-order-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-inventory-table',
  templateUrl: './inventory-table.component.html',
  styleUrl: './inventory-table.component.scss',
  standalone: false,
})
export class InventoryTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private backendService: BackendService,
    private dialog: MatDialog,
    private readonly dialogService: DialogService,
    private readonly notificationService: NotificationService
  ) { }

  dataSource = new MatTableDataSource<InventoryItem>([]);

  displayedColumns = ['name', 'shelf', 'qty', 'actions'];

  async ngOnInit(): Promise<void> {
    this.dataSource.data = await this.backendService.getProductData();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  async editShelf(row: InventoryItem): Promise<void> {
    const newShelf = await this.dialogService.openDialog<string>(
      EditDialogComponent,
      {
        dialogTitle: 'Regal/Fach ändern',
        inputLabel: 'Neues Regal/Fach',
        inputType: 'string',
        initialValue: row.shelf,
      }
    );
    if (newShelf != null) {
      try {
        await this.backendService.updateShelf(row.id, newShelf);
        this.notificationService.showSuccess("Regal/Fach gespeichert");
        row.shelf = newShelf;
        this.dataSource.data = [...this.dataSource.data];
      }
      catch (e) {
        console.error(e);
        this.notificationService.showError("Fehler beim Speichern des Regals/Fachs");
        return;
      }
    }
  }

  async editName(row: InventoryItem): Promise<void> {
    const newName = await this.dialogService.openDialog<string>(
      EditDialogComponent,
      {
        dialogTitle: 'Produktname ändern',
        inputLabel: 'Neuer Produktname',
        inputType: 'string',
        initialValue: row.name,
      }
    );

    if (newName != null) {
      try {
        await this.backendService.updateName(row.id, newName);
        this.notificationService.showSuccess("Produktname gespeichert");
        row.name = newName;
        this.dataSource.data = [...this.dataSource.data];
      }
      catch (e) {
        console.error(e);
        this.notificationService.showError("Fehler beim Speichern des Produktnamens");
        return;
      }
    }
  }

  async editQty(row: InventoryItem): Promise<void> {
    const result = await this.dialogService.openDialog<number>(
      EditDialogComponent,
      {
        dialogTitle: 'Bestand ändern',
        inputLabel: 'Neuer Bestand',
        inputType: 'number',
        initialValue: row.qty
      }
    );

    if (result != null) {
      try {
        await this.backendService.updateQty(row.id, result);
        this.notificationService.showSuccess('Bestand gespeichert');
        row.qty = result;
        this.dataSource.data = [...this.dataSource.data];
      } catch (e) {
        console.error(e);
        this.notificationService.showError('Fehler beim Speichern des Bestands');
      }
    }
  }


  async deleteRow(row: InventoryItem): Promise<void> {
    const data = await this.dialogService.confirm('Möchten Sie diese Zeile wirklich löschen?');
    if (data) {
      try {
        await this.backendService.deleteProductData(row.id);
        this.notificationService.showSuccess('Produkt gelöscht');
        const i = this.dataSource.data.indexOf(row);
        if (i > -1) {
          this.dataSource.data.splice(i, 1);
          this.dataSource.data = [...this.dataSource.data];
        }
      }
      catch (e) {
        console.error(e);
        this.notificationService.showError('Fehler beim Löschen des Produkts');
        return;
      }
    }
  }

  async openEditDialog(row: InventoryItem): Promise<void> {
    const result = await this.dialogService.openDialog(
      EditOrderDialogComponent,
      {
        id: row.id,
        name: row.name,
        shelf: row.shelf,
        qty: row.qty
      }
    ) as InventoryItem;

    if (result) {
      try {
        await this.backendService.updateProductData(result);
        this.notificationService.showSuccess('Produkt aktualisiert');
        row.name = result.name;
        row.shelf = result.shelf;
        row.qty = result.qty;
        this.dataSource.data = [...this.dataSource.data];
      }
      catch (e) {
        console.error(e);
        this.notificationService.showError('Fehler beim Aktualisieren des Produkts');
        return;
      }
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}