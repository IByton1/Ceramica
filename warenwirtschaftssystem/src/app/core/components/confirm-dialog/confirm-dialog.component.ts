import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface ConfirmDialogData {
  message: string;          // Pflicht – Text im Dialog
  title?: string;          // optional – Überschrift
  okText?: string;          // optional – Beschriftung OK-Button
  cancelText?: string;       // optional – Beschriftung Abbrechen-Button
}

@Component({
  selector: 'app-confirm-dialog',
  standalone: false,

  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss'
})
export class ConfirmDialogComponent {

  defaults = {
    title: 'Bitte bestätigen',
    okText: 'Ja',
    cancelText: 'Nein'
  };


  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent, boolean>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData
  ) { }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
