import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-timeline-item',
  standalone: true,
  template: `
    <div class="timeline-item">
      <div class="timeline-head">
        <div class="timeline-role">{{ role }} — {{ company }}</div>
        <div class="timeline-years">{{ start }} – {{ end }}</div>
      </div>
      <ul class="timeline-bullets">
        <li *ngFor="let b of bullets">{{ b }}</li>
      </ul>
    </div>
  `,
  styleUrl: './timeline-item.component.scss'
})
export class TimelineItemComponent {
  @Input() role = '';
  @Input() company = '';
  @Input() start = '';
  @Input() end = '';
  @Input() bullets: string[] = [];
}


