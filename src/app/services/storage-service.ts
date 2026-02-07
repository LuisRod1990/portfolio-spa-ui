import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StorageService {
  private isAvailable(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  set(key: string, value: unknown): void {
    if (this.isAvailable()) {
      const serialized = typeof value === 'string' ? value : JSON.stringify(value);
      localStorage.setItem(key, serialized);
    }
  }

  get<T>(key: string): T | null {
    if (this.isAvailable()) {
      const item = localStorage.getItem(key);
      if (!item) return null;
      try {
        return JSON.parse(item) as T;
      } catch {
        return item as unknown as T;
      }
    }
    return null;
  }

  remove(key: string): void {
    if (this.isAvailable()) localStorage.removeItem(key);
  }

  clear(): void {
    if (this.isAvailable()) localStorage.clear();
  }
}