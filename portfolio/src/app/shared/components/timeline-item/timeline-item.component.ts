import { Component, Input } from '@angular/core';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-timeline-item',
  standalone: true,
  imports: [NgForOf],
  template: `
    <div class="timeline-item">
      <div class="timeline-head">
        <div class="timeline-role">{{ role }} — {{ company }}</div>
        <div class="timeline-meta">
          <span class="timeline-years">{{ start }} – {{ end }}</span>
          <span *ngIf="location" class="timeline-location">{{ location }}</span>
        </div>
      </div>
      <ul class="timeline-bullets">
        <li *ngFor="let b of bullets">{{ b }}</li>
      </ul>
    </div>
  `,
  styleUrl: './timeline-item.component.scss',
})
export class TimelineItemComponent {
  @Input() role = '';
  @Input() company = '';
  @Input() start = '';
  @Input() end = '';
  @Input() location = '';
  @Input() bullets: string[] = [];
}
