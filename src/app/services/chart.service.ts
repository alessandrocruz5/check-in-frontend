import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Checkin } from '../model/checkin';

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  private apiUrl = 'http://localhost:1217/api';

  constructor(private http: HttpClient) {}

  getCheckIns() {
    return this.http.get<Checkin[]>(`${this.apiUrl}/forms`);
  }

  deleteCheckIn(checkInId: string) {
    return this.http.delete<Checkin>(`${this.apiUrl}/check-ins/${checkInId}`);
  }

  getTagData() {
    return this.http.get<Checkin[]>(`${this.apiUrl}/forms`);
  }
}
