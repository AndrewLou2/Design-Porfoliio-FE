import { Component } from '@angular/core';

@Component({
  selector: 'app-pill',
  standalone: true,
  template: `<span class="text-[11px] px-2 py-0.5 rounded-full bg-gray-50 border border-line"><ng-content></ng-content></span>`
})
export class PillComponent {}


