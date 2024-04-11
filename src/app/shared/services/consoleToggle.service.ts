/* eslint-disable no-console */
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConsoleToggleService {

  constructor() {

  }

  disableConsoleInProduction(): void {
    if (environment.production) {
      console.warn('🚨 Console output is disabled on production!');
      console.log = () => {};
      console.debug = () => {};
      console.warn = () => {};
      console.info = () => {};
      console.table = () => {};
    }
  }
}
