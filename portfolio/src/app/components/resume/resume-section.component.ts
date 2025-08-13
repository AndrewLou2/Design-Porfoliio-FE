import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { TimelineItemComponent } from '../../shared/components/timeline-item/timeline-item.component';
import { Component, inject } from '@angular/core';
import { ContentService } from '../../shared/services/content.service';

@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [AsyncPipe, NgForOf, NgIf, TimelineItemComponent],
  template: `
    <section class="pt-12 md:pt-16 lg:pt-20 pb-12 md:pb-16 lg:pb-20 border-t border-line" *ngIf="vm$ | async as vm">
      <div class="grid grid-cols-12 gap-8">
        <div class="col-span-12 md:col-span-4 lg:col-span-4">
          <h2 class="font-display text-3xl md:text-4xl tracking-tightish mb-4">Résumé</h2>
          <p class="text-sub">{{ vm.summary }}</p>
          <button class="mt-4 text-xs font-smallcaps underline underline-offset-4 focus:outline-2 focus:outline-ink" (click)="print()">Download PDF</button>
        </div>
        <div class="col-span-12 md:col-span-8 lg:col-span-8">
          <h3 class="text-sm font-smallcaps text-ink/80 mb-2">Experience</h3>
          <div class="space-y-6">
            <app-timeline-item *ngFor="let e of vm.experience" [role]="e.role" [company]="e.company" [start]="e.start" [end]="e.end" [bullets]="e.bullets"></app-timeline-item>
          </div>
          <div class="grid grid-cols-2 md:grid-cols-3 gap-2 mt-6">
            <span class="text-[11px] px-2 py-0.5 rounded-full bg-gray-50 border border-line" *ngFor="let s of vm.skills">{{ s }}</span>
          </div>
          <div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 class="text-sm font-smallcaps text-ink/80 mb-2">Education</h3>
              <ul class="text-sm text-sub space-y-1">
                <li *ngFor="let ed of vm.education">{{ ed.degree }}, {{ ed.school }} ({{ ed.year }})</li>
              </ul>
            </div>
            <div>
              <h3 class="text-sm font-smallcaps text-ink/80 mb-2">Awards</h3>
              <ul class="text-sm text-sub space-y-1">
                <li *ngFor="let aw of vm.awards">{{ aw.title }} ({{ aw.year }})</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
})
export class ResumeSectionComponent {
  private content = inject(ContentService);
  vm$ = this.content.resume$;

  print() {
    window.print();
  }
}


