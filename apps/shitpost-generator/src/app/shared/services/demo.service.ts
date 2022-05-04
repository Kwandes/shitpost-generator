import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IMessage } from '@shitpost-generator/interfaces';
import { Observable } from 'rxjs';
import { environment as env } from '../../../environments/environment';

const httpOptions = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class DemoService {
  constructor(private http: HttpClient) {}

  /**
   * Fetch users confidential data;
   * @returns observable of the API request
   */
  fetchUserData(): Observable<IMessage> {
    return this.http.get<IMessage>(`${env.apiUrl}/api/user`, httpOptions);
  }
  /**
   * Fetch admins confidential data;
   * @returns observable of the API request
   */
  fetchAdminData(): Observable<IMessage> {
    return this.http.get<IMessage>(`${env.apiUrl}/api/admin`, httpOptions);
  }
}
