import { LOCALE_ID, NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import { MatDialogModule } from '@angular/material/dialog';

// Registriere die deutschen Locale-Daten
registerLocaleData(localeDe, 'de-DE');

// Definiere eigene Datumsformate
export const MY_DATE_FORMATS = {
    parse: {
        dateInput: 'DD.MM.YYYY',
    },
    display: {
        dateInput: 'DD.MM.YYYY',          // Eingabe- und Anzeigeformat im Input-Feld
        monthYearLabel: 'MMM YYYY',       // Format für den Label im Kalender (Monat + Jahr)
        dateA11yLabel: 'LL',              // Zugänglichkeitsformat für Datum
        monthYearA11yLabel: 'MMMM YYYY',  // Zugänglichkeitsformat für Monat und Jahr
    },
};

@NgModule({
    exports: [
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatInputModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatSelectModule,
        MatDialogModule,
    ],

    providers: [
        { provide: LOCALE_ID, useValue: 'de-DE' },
        { provide: MAT_DATE_LOCALE, useValue: 'de-DE' },
        { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    ],
})
export class MaterialModule { }
