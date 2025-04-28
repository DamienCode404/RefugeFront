import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class SearchBarService {
  private API_URL = `${environment.API_URL}/animal`;

  constructor(private http: HttpClient) {}

  public searchRace(term: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/search?race=${term}`);
  }
}
