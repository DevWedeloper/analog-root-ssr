import { isPlatformServer } from '@angular/common';
import {
  Component,
  inject,
  makeStateKey,
  PLATFORM_ID,
  TransferState,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';

const STATE_KEY = makeStateKey<string>('exampleKey');

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `<router-outlet />`,
})
export class AppComponent {
  private PLATFORM_ID = inject(PLATFORM_ID);
  private transferState = inject(TransferState);

  constructor() {
    if (isPlatformServer(this.PLATFORM_ID)) {
      this.transferState.set(STATE_KEY, 'Server-side rendered data');
      console.log('Data set in TransferState on the server.');
    } else {
      const data = this.transferState.get(STATE_KEY, null);
      if (data) {
        console.log('Retrieved data from TransferState on the client:', data);
        this.transferState.remove(STATE_KEY);
      } else {
        console.log('No data found in TransferState on the client.');
      }
    }
  }
}
