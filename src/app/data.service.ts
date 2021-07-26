import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PayloadResponse } from './models/PayloadResponse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  BASE_URL = "http://interview.wptdev.com/api/killfeed";

  constructor(private http: HttpClient) { }

  getPlayerData(): Observable<PayloadResponse> {
    return this.http.get<PayloadResponse>(this.BASE_URL);
  }

  getGif(): Observable<any> {
    return this.http.get(`https://api.giphy.com/v1/gifs/random?api_key=0UTRbFtkMxAplrohufYco5IY74U8hOes&rating=g`);
  }

}
