import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RandomQuote {
  private readonly httpClient = inject(HttpClient)
  
  RandomQuote():Observable<any>{
  return this.httpClient.get('https://stoic.tekloon.net/stoic-quote')
  }
}
