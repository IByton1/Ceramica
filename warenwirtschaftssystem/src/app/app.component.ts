import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InventoryTableComponent } from './inventory/components/inventory-table/inventory-table.component';

const LS_KEY = 'appScale';          // localStorage-Key

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: false,
})
export class AppComponent {
  title = 'warenwirtschaftssystem';

  ngOnInit(): void {
    // beim Start gespeicherte Größe laden
    const saved = Number(localStorage.getItem(LS_KEY));
    if (saved) {
      this.applyFontSize(saved);
    }
  }

  /** setzt --base-font-size am <html>-Element */
  private applyFontSize(scale: number): void {
    document.documentElement.style.setProperty('--ui-scale', `${scale}`);
  }
}
