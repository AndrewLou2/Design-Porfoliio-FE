import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ContentService, ProjectItem } from '../../shared/services/content.service';
import { FilterProjectsPipe } from '../../shared/pipes/filter-projects.pipe';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [AsyncPipe, NgForOf, NgIf, FilterProjectsPipe],
  template: `
    <section class="pt-12 md:pt-16 lg:pt-20 pb-12 md:pb-16 lg:pb-20 border-t border-line">
      <h2 class="font-display text-3xl md:text-4xl tracking-tightish mb-6">Projects</h2>
      <div class="flex flex-wrap gap-2 mb-6">
        <button class="px-3 py-1 rounded-full border border-line text-xs font-smallcaps text-ink/70 hover:text-ink focus:outline-2 focus:outline-ink" (click)="clearFilters()">All</button>
        <ng-container *ngFor="let tag of tags">
          <button class="px-3 py-1 rounded-full border border-line text-xs font-smallcaps text-ink/70 hover:text-ink focus:outline-2 focus:outline-ink" (click)="toggleTag(tag)">{{ tag }}</button>
        </ng-container>
        <ng-container *ngFor="let year of years">
          <button class="px-3 py-1 rounded-full border border-line text-xs font-smallcaps text-ink/70 hover:text-ink focus:outline-2 focus:outline-ink" (click)="toggleYear(year)">{{ year }}</button>
        </ng-container>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <a *ngFor="let p of (content.projects$ | async) | filterProjects:activeTags:activeYears; trackBy: track" [href]="p.link || '#'" target="_blank" rel="noopener" class="group block bg-white rounded-2xl shadow-soft overflow-hidden border border-line focus:outline-2 focus:outline-ink">
          <div class="overflow-hidden">
            <img [src]="p.image" alt="" class="w-full aspect-[4/3] object-cover transition-transform duration-300 group-hover:scale-[1.02]" loading="lazy" />
          </div>
          <div class="p-4">
            <div class="flex items-center justify-between">
              <h3 class="font-medium underline-offset-4 group-hover:underline">{{ p.title }}</h3>
              <span class="text-xs text-sub">{{ p.year }}</span>
            </div>
            <p class="text-sm text-sub mt-1">{{ p.summary }}</p>
            <div class="flex flex-wrap gap-1 mt-2">
              <span class="text-[11px] px-2 py-0.5 rounded-full bg-gray-50 border border-line" *ngFor="let t of p.tags">{{ t }}</span>
            </div>
          </div>
        </a>
      </div>
    </section>
  `
})
export class ProjectsSectionComponent {
  content = inject(ContentService);

  tags: string[] = [];
  years: string[] = [];
  activeTags = signal<string[]>([]);
  activeYears = signal<string[]>([]);

  constructor() {
    this.content.projects$.subscribe(list => {
      const tagSet = new Set<string>();
      const yearSet = new Set<string>();
      list.forEach(p => {
        p.tags?.forEach(t => tagSet.add(t));
        if (p.year) yearSet.add(p.year);
      });
      this.tags = Array.from(tagSet);
      this.years = Array.from(yearSet).sort((a,b) => b.localeCompare(a));
    });
  }

  toggleTag(tag: string) {
    const next = new Set(this.activeTags());
    if (next.has(tag)) next.delete(tag); else next.add(tag);
    this.activeTags.set(Array.from(next));
  }

  toggleYear(year: string) {
    const next = new Set(this.activeYears());
    if (next.has(year)) next.delete(year); else next.add(year);
    this.activeYears.set(Array.from(next));
  }

  clearFilters() {
    this.activeTags.set([]);
    this.activeYears.set([]);
  }

  track = (_: number, p: ProjectItem) => p.title;
}


