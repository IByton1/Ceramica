import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface EditDialogData<T = unknown> {
  dialogTitle: string;          // Titel oben
  inputLabel: string;          // Label des Felds
  inputType: 'text' | 'number';
  validators?: ValidatorFn[];   // optionale Validatoren
  initialValue?: T;              // Startwert
}

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss'],
  standalone: false,
})
export class EditDialogComponent<T = unknown> {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EditDialogData<T>
  ) {
    this.form = this.fb.group({
      value: [
        data.initialValue ?? null,
        data.validators ?? [Validators.required]
      ]
    });
  }

  save(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value.value);
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
