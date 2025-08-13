import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import {
  ContentService,
  ProjectItem,
} from '../../shared/services/content.service';
import { FilterProjectsPipe } from '../../shared/pipes/filter-projects.pipe';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [AsyncPipe, NgForOf, NgIf, FilterProjectsPipe],
  template: `
    <section class="projects">
      <h2 class="projects-title">Projects</h2>
      <div class="projects-filters">
        <button class="filter-pill" (click)="clearFilters()">All</button>
        <ng-container *ngFor="let tag of tags">
          <button class="filter-pill" (click)="toggleTag(tag)">
            {{ tag }}
          </button>
        </ng-container>
        <ng-container *ngFor="let year of years">
          <button class="filter-pill" (click)="toggleYear(year)">
            {{ year }}
          </button>
        </ng-container>
      </div>

      <div class="projects-grid">
        <a
          *ngFor="
            let p of content.projects$
              | async
              | filterProjects : activeTags : activeYears;
            trackBy: track
          "
          [href]="p.link || '#'"
          target="_blank"
          rel="noopener"
          class="project-card"
        >
          <div class="project-media">
            <img [src]="p.image" alt="" class="project-img" loading="lazy" />
          </div>
          <div class="project-body">
            <div class="project-head">
              <h3 class="project-title">{{ p.title }}</h3>
              <span class="project-year">{{ p.year }}</span>
            </div>
            <p class="project-summary">{{ p.summary }}</p>
            <div class="project-tags">
              <span class="project-tag" *ngFor="let t of p.tags">{{ t }}</span>
            </div>
          </div>
        </a>
      </div>
    </section>
  `,
  styleUrl: './projects-section.component.scss',
})
export class ProjectsSectionComponent {
  content = inject(ContentService);

  tags: string[] = [];
  years: string[] = [];
  activeTags = signal<string[]>([]);
  activeYears = signal<string[]>([]);

  constructor() {
    this.content.projects$.subscribe((list) => {
      const tagSet = new Set<string>();
      const yearSet = new Set<string>();
      list.forEach((p) => {
        p.tags?.forEach((t) => tagSet.add(t));
        if (p.year) yearSet.add(p.year);
      });
      this.tags = Array.from(tagSet);
      this.years = Array.from(yearSet).sort((a, b) => b.localeCompare(a));
    });
  }

  toggleTag(tag: string) {
    const next = new Set(this.activeTags());
    if (next.has(tag)) next.delete(tag);
    else next.add(tag);
    this.activeTags.set(Array.from(next));
  }

  toggleYear(year: string) {
    const next = new Set(this.activeYears());
    if (next.has(year)) next.delete(year);
    else next.add(year);
    this.activeYears.set(Array.from(next));
  }

  clearFilters() {
    this.activeTags.set([]);
    this.activeYears.set([]);
  }

  track = (_: number, p: ProjectItem) => p.title;
}
