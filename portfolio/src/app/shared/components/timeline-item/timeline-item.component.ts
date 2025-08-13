import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-timeline-item',
  standalone: true,
  template: `
    <div class="border-b border-line pb-4">
      <div class="flex items-center justify-between">
        <div class="font-medium">{{ role }} — {{ company }}</div>
        <div class="text-xs text-sub">{{ start }} – {{ end }}</div>
      </div>
      <ul class="list-disc pl-5 mt-2 text-sm text-sub">
        <li *ngFor="let b of bullets">{{ b }}</li>
      </ul>
    </div>
  `
})
export class TimelineItemComponent {
  @Input() role = '';
  @Input() company = '';
  @Input() start = '';
  @Input() end = '';
  @Input() bullets: string[] = [];
}


