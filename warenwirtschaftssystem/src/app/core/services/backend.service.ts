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

  /*private mockItems: InventoryItem[] = [
    { id: 1, name: 'Kunde A', shelf: 'Regal 1', qty: 10 },
    { id: 2, name: 'Kunde B', shelf: 'Regal 2', qty: 5 },
    { id: 3, name: 'Kunde C', shelf: 'Regal 3', qty: 20 },
  ];

  constructor() { }

  async getProductData(): Promise<InventoryItem[]> {
    return [...this.mockItems]; // Kopie zurückgeben
  }

  async addProductData(item: InventoryItem): Promise<InventoryItem> {
    const newItem = { ...item, id: this.generateMockId() };
    this.mockItems.push(newItem);
    return newItem;
  }

  async updateProductData(item: InventoryItem): Promise<InventoryItem> {
    const index = this.mockItems.findIndex(i => i.id === item.id);
    if (index !== -1) {
      this.mockItems[index] = { ...item };
    }
    return { ...item };
  }

  async updateShelf(id: number, shelf: string): Promise<InventoryItem> {
    const item = this.mockItems.find(i => i.id === id);
    if (item) {
      item.shelf = shelf;
    }
    return item ? { ...item } : this.createEmptyMockItem(id);
  }

  async updateQty(id: number, qty: number): Promise<InventoryItem> {
    const item = this.mockItems.find(i => i.id === id);
    if (item) {
      item.qty = qty;
    }
    return item ? { ...item } : this.createEmptyMockItem(id);
  }

  async updateName(id: number, name: string): Promise<InventoryItem> {
    const item = this.mockItems.find(i => i.id === id);
    if (item) {
      item.name = name;
    }
    return item ? { ...item } : this.createEmptyMockItem(id);
  }

  async deleteProductData(id: number): Promise<void> {
    this.mockItems = this.mockItems.filter(i => i.id !== id);
  }

  private generateMockId(): number {
    return Math.max(0, ...this.mockItems.map(i => i.id)) + 1;
  }

  private createEmptyMockItem(id: number): InventoryItem {
    return { id, name: 'Unbekannt', shelf: '', qty: 0 };
  }


  */
  private baseUrl = 'http://142.132.177.88:4000'; // URL des Backends

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

