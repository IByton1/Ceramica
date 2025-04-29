import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

const LS_KEY = 'appScale';          // localStorage-Key
const DEFAULT_SIZE = 1;               // px

@Component({
  selector: 'app-settings',
  standalone: false,
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {

  /** Zweiweg-gebundene Font-Size (px) */
  fontSize = new FormControl<number>(DEFAULT_SIZE, { nonNullable: true });

  ngOnInit(): void {
    // beim Start gespeicherte Größe laden
    const saved = Number(localStorage.getItem(LS_KEY));
    if (saved && saved >= 0.1 && saved <= 3) {
      this.fontSize.setValue(saved, { emitEvent: false });
      this.applyFontSize(saved);
    }

    // Änderungen live anwenden & speichern
    this.fontSize.valueChanges.subscribe(size => {
      this.applyFontSize(size);
      localStorage.setItem(LS_KEY, String(size));
    });
  }

  /** setzt --base-font-size am <html>-Element */
  private applyFontSize(scale: number): void {
    document.documentElement.style.setProperty('--ui-scale', `${scale}`);
  }
}
