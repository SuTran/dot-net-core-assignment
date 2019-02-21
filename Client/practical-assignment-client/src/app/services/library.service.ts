import { Injectable } from '@angular/core';
import { Urls } from '../../API/api';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Library } from '../models/libraryModel';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {
  constructor(private http: HttpClient) { }

  getDataList = () => {
    return this.http.get(Urls.LibraryApi.GetListAsync);
  }

  insertData = (library: Library): Observable<Library> => {
    return this.http.post<Library>(Urls.LibraryApi.InsertAsync, library);
  }
}
