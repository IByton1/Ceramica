import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BackendService } from '../../../core/services/backend.service';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-add-data-dialog',
  templateUrl: './add-data-dialog.component.html',
  styleUrl: './add-data-dialog.component.scss',
  standalone: false,
})
export class AddDataDialogComponent {
  produktForm: FormGroup;
  alterBestand: number | null = null; // Alter Bestand

  constructor(
    private fb: FormBuilder,
    private backendService: BackendService,
    public router: Router,
    private readonly notificationService: NotificationService
  ) {
    this.produktForm = this.fb.group({
      name: [null], // Produktname
      shelf: ['', [Validators.required, Validators.maxLength(255)]], // Regal
      qty: [0, [Validators.required, Validators.min(1)]], // Neuer Bestand
    });
  }

  ngOnInit(): void {
  }

  async onSubmit(): Promise<void> {
    if (this.produktForm.valid) {
      const produktData = this.produktForm.value;
      console.log(produktData);
      try {
        await this.backendService.addProductData(produktData)
        this.notificationService.showSuccess("Produkt erstellt")
        this.produktForm.patchValue({
          externalId: null,
          produkt: null,
          preis: null,
          ablaufdatum: null,
          bestand: 0,
        });
        this.alterBestand = null;
        this.router.navigate(['/produkte'])
      } catch (err) {
        this.notificationService.showError("Fehler beim Speichern des Produkts")
      }
    }
  }
}
