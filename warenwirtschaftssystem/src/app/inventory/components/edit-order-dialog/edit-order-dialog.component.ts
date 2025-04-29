import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BackendService, InventoryItem } from '../../../core/services/backend.service';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-edit-order-dialog',
  templateUrl: './edit-order-dialog.component.html',
  styleUrl: './edit-order-dialog.component.scss',
  standalone: false,
})
export class EditOrderDialogComponent {
  produktForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private backendService: BackendService,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<EditOrderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: InventoryItem
  ) {
    this.produktForm = this.fb.group({
      name: [data.name || '', Validators.required],
      shelf: [data.shelf || '', [Validators.required, Validators.maxLength(255)]],
      qty: [data.qty || 1, [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit(): void { }


  async onSubmit(): Promise<void> {
    if (this.produktForm.valid) {
      const updatedProduct = { ...this.data, ...this.produktForm.value };
      this.dialogRef.close(updatedProduct);
    }
  }
}
