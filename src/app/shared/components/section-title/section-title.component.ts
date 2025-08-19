import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-section-title',
  standalone: true,
  template: `
    <h2 class="font-display text-3xl md:text-4xl tracking-tightish"><ng-content></ng-content></h2>
  `
})
export class SectionTitleComponent {}


