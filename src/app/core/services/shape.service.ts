import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ShapeService {

  constructor(private http: HttpClient) {
  }

  detectShape(imgOriginal: string, imgMask: string) {
    const formData = new FormData();

    formData.append('original', imgOriginal);
    formData.append('mask', imgMask);
    return this.http.post(`http://localhost:4254/`, {
      original: imgOriginal,
      mask: imgMask
    });
  }
}
