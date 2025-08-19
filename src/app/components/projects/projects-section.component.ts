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

      <div class="projects-grid">
        <a
          *ngFor="
            let p of content.projects$ | async | filterProjects : [] : [];
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
            <div class="project-meta" *ngIf="p.organization || p.duration">
              <span class="project-organization" *ngIf="p.organization">{{
                p.organization
              }}</span>
              <span class="project-duration" *ngIf="p.duration">{{
                p.duration
              }}</span>
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

  track = (_: number, p: ProjectItem) => p.title;
}
