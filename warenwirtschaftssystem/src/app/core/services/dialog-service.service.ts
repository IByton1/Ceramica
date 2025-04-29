// dialog.service.ts
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { firstValueFrom, map } from 'rxjs';
import { ConfirmDialogComponent, ConfirmDialogData } from '../components/confirm-dialog/confirm-dialog.component';
import { ComponentType } from '@angular/cdk/overlay';


@Injectable({ providedIn: 'root' })
export class DialogService {
  constructor(private dialog: MatDialog) { }

  /**
   * Öffnet einen Confirm-Dialog und gibt direkt ein Promise<boolean> zurück.
   * usage: const ok = await dialogService.confirm('…');
   */
  confirm(message: string, opts?: Partial<ConfirmDialogData>): Promise<boolean> {
    const data: ConfirmDialogData = { message, ...opts };

    return firstValueFrom(
      this.dialog.open<ConfirmDialogComponent, ConfirmDialogData, boolean>(
        ConfirmDialogComponent,
        { width: '50vw', data }
      ).afterClosed()
    ).then(result => result ?? false);
  }


  /**
   * Öffnet einen Dialog und gibt ein Promise<ReturnType | null> zurück.
   *
   * @param component   Komponente, die als Dialog angezeigt wird
   * @param data        Datenobjekt für MAT_DIALOG_DATA
   * @param width       optionale Breite
   */
  openDialog<ReturnType = unknown, DataType = unknown>(
    component: ComponentType<any>,
    data: DataType,
    width = '50vw'
  ): Promise<ReturnType | null> {
    return firstValueFrom(
      this.dialog
        .open<any, DataType, ReturnType>(component, { width, data })
        .afterClosed()
        .pipe(map(res => res ?? null))           // undefined → null
    );
  }


}
