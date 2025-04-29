import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

export interface InventoryItem {
  id: number;      // ID
  name: string;      // Kunden Name
  shelf: string;     // Regal/Fach
  qty: number;       // Anzahl
}

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private baseUrl = 'http://localhost:3000'; // URL des Backends

  constructor(private http: HttpClient) { }

  async getProductData(): Promise<InventoryItem[]> {
    return await firstValueFrom(this.http.get(`${this.baseUrl}/api/getItems`)) as InventoryItem[];
  }

  async addProductData(item: InventoryItem): Promise<InventoryItem> {
    return await firstValueFrom(this.http.post(`${this.baseUrl}/api/addItem`, item)) as InventoryItem;
  }

  async updateProductData(item: InventoryItem): Promise<InventoryItem> {
    return await firstValueFrom(this.http.put(`${this.baseUrl}/api/updateItem`, item)) as InventoryItem;
  }

  async updateShelf(id: number, shelf: string): Promise<InventoryItem> {
    return firstValueFrom(
      this.http.patch<InventoryItem>(
        `${this.baseUrl}/api/items/${id}/shelf`,
        { shelf }
      )
    );
  }

  async updateQty(id: number, qty: number): Promise<InventoryItem> {
    return firstValueFrom(
      this.http.patch<InventoryItem>(
        `${this.baseUrl}/api/items/${id}/qty`,
        { qty }
      )
    );
  }

  async updateName(id: number, name: string): Promise<InventoryItem> {
    return firstValueFrom(
      this.http.patch<InventoryItem>(
        `${this.baseUrl}/api/items/${id}/name`,
        { name }
      )
    );
  }

  async deleteProductData(id: number): Promise<void> {
    return await firstValueFrom(this.http.delete(`${this.baseUrl}/api/deleteItem/${id}`)) as unknown as void;
  }
}

