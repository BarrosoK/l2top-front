import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {formatDate} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DicomService {

  constructor(private http: HttpClient) {
  }

  parseDicom(img: File, receiveImage: boolean)  {
    const formData = new FormData();

    formData.append('dicom', img, img.name);
    formData.append('response', receiveImage ? 'png' : 'infos');
    const resType = receiveImage ? 'blob' : 'json';
    // @ts-ignore
    return this.http.post(`${environment.apiUrl}`, formData, {responseType: resType});
  }
}
