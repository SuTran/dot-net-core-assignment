import { Injectable } from '@angular/core';
import { Urls } from '../../API/api';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { InputFile } from '../models/inputFileModel';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(private http: HttpClient) { }

  getDataById = (libraryId: string) => {
    return this.http.get(Urls.DocumentApi.GetDataByIdAsync + libraryId);
  }

  UploadFile = (model: any): Observable<InputFile> => {
    return this.http.post<InputFile>(Urls.DocumentApi.UploadFileAsync, model);
  }
}
