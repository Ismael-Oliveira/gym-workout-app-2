import { TransitiveCompileNgModuleMetadata } from '@angular/compiler';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  hideMessageSuccess(timeHide: number, hideMessage, event: Function): void {
    setTimeout(() => {
      hideMessage.success = false;
    }, timeHide);
  }
}

