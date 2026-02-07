import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class LayoutDataService {
  constructor(private http: HttpClient) {}

  getSections() {
    return this.http.get<any[]>('/api/sections'); // tu endpoint
  }

  postSection(data: any) {
    return this.http.post('/api/sections', data);
  }
}