import { Injectable } from '@angular/core';

@Injectable()
export class Spinner {
  isActive: boolean;

  toggle() {
    this.isActive = !this.isActive;
  }
}
