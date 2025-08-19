import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { TimelineItemComponent } from '../../shared/components/timeline-item/timeline-item.component';
import { Component, inject } from '@angular/core';
import { ContentService } from '../../shared/services/content.service';

@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [AsyncPipe, NgForOf, NgIf, TimelineItemComponent],
  template: `
    <section class="resume" *ngIf="vm$ | async as vm">
      <div class="resume-grid">
        <div class="resume-left">
          <h2 class="resume-title">Resume</h2>
          <p class="resume-summary">{{ vm.summary }}</p>
          <button class="resume-print" (click)="print()">Download PDF</button>
        </div>
        <div class="resume-right">
          <h3 class="resume-subtitle">Experience</h3>
          <div class="resume-timeline">
            <app-timeline-item
              *ngFor="let e of vm.experience"
              [role]="e.role"
              [company]="e.company"
              [start]="e.start"
              [end]="e.end"
              [location]="e.location ?? ''"
              [bullets]="e.bullets"
            ></app-timeline-item>
          </div>
          <div class="resume-skills">
            <span class="skill-pill" *ngFor="let s of vm.skills">{{ s }}</span>
          </div>
          <div class="resume-lists">
            <div>
              <h3 class="resume-subtitle">Education</h3>
              <ul class="resume-list">
                <li *ngFor="let ed of vm.education">
                  <div class="education-item">
                    <div class="education-main">
                      {{ ed.degree }}, {{ ed.school }}
                    </div>
                    <div class="education-meta">
                      <span *ngIf="ed.location">{{ ed.location }}</span>
                      <span>{{ ed.year }}</span>
                      <span *ngIf="ed.gpa">GPA: {{ ed.gpa }}</span>
                    </div>
                    <div *ngIf="ed.details" class="education-details">
                      {{ ed.details }}
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div>
              <h3 class="resume-subtitle">Awards</h3>
              <ul class="resume-list">
                <li *ngFor="let aw of vm.awards">
                  <div class="award-item">
                    <div class="award-main">{{ aw.title }} ({{ aw.year }})</div>
                    <div *ngIf="aw.description" class="award-description">
                      {{ aw.description }}
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrl: './resume-section.component.scss',
})
export class ResumeSectionComponent {
  private content = inject(ContentService);
  vm$ = this.content.resume$;

  print() {
    window.print();
  }
}
