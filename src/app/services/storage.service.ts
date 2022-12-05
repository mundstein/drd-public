import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { 
  }

  public setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public getItem(key: string): any {
    const value = localStorage.getItem(key);
    if (value == "undefined") {
      return null;
    }
    return JSON.parse(value);
  }

  public removeItem(key:string): void {
    localStorage.removeItem(key);
  }

  public clear() {
    localStorage.clear();
  }

}
