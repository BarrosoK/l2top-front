import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SyncService {

  constructor(private http: HttpClient) {
  }

  syncOrder(startDate: string, onlyNew: boolean) {
    return this.http.post(`${environment.apiUrl}/sync/order`, {
      start_date: startDate,
      onlyNew
    });
  }

  syncProspects(prospects: object) {
    return this.http.post(`${environment.apiUrl}/sync/prospect`, {
      prospects,
    });
  }

  getLastestExecution() {
    return this.http.get(`${environment.apiUrl}/sync/order`);
  }
}
