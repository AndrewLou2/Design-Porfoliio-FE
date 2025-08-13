import { AsyncPipe, NgClass, NgForOf, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger,
} from '@angular/animations';
import { HeaderComponent } from '../../components/header/header.component';
import { IntroSectionComponent } from '../../components/intro/intro-section.component';
import { ProjectsSectionComponent } from '../../components/projects/projects-section.component';
import { ResumeSectionComponent } from '../../components/resume/resume-section.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    AsyncPipe,
    NgIf,
    NgForOf,
    NgClass,
    HeaderComponent,
    IntroSectionComponent,
    ProjectsSectionComponent,
    ResumeSectionComponent,
    FooterComponent,
  ],
  template: `
    <a class="skip-link" href="#intro">Skip to content</a>
    <div
      class="bg-watermark"
      style="background-image:url('assets/images/bg-watermark.jpg')"
    ></div>
    <app-header></app-header>
    <main class="main-wrap">
      <div class="canvas content-wrap" [@pageFade]>
        <app-intro id="intro"></app-intro>
        <app-resume id="resume"></app-resume>
        <app-projects id="projects"></app-projects>
        <app-footer id="footer"></app-footer>
      </div>
    </main>
  `,
  animations: [
    trigger('pageFade', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(8px)' }),
        animate(
          '500ms cubic-bezier(0.22, 1, 0.36, 1)',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
    ]),
  ],
})
export class HomeComponent implements OnInit {
  ngOnInit(): void {
    if (window && 'scrollBehavior' in document.documentElement.style) {
      const prefersReduced = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;
      if (!prefersReduced) {
        document.documentElement.style.scrollBehavior = 'smooth';
      }
    }
  }
}
