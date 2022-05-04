import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IShitpost } from '@shitpost-generator/interfaces';
import { Observable } from 'rxjs';
import { environment as env } from '../../../environments/environment';

const httpOptions = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class ShitpostsService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<IShitpost[]> {
    return this.http.get<IShitpost[]>(
      `${env.apiUrl}/api/shitposts`,
      httpOptions
    );
  }
}
