import { AsyncPipe, NgClass, NgForOf, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { HeaderComponent } from '../../components/header/header.component';
import { IntroSectionComponent } from '../../components/intro/intro-section.component';
import { ProjectsSectionComponent } from '../../components/projects/projects-section.component';
import { ResumeSectionComponent } from '../../components/resume/resume-section.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, AsyncPipe, NgIf, NgForOf, NgClass, HeaderComponent, IntroSectionComponent, ProjectsSectionComponent, ResumeSectionComponent, FooterComponent],
  template: `
    <a class="sr-only focus:not-sr-only focus:outline-ink focus:outline-2" href="#intro">Skip to content</a>
    <div class="bg-watermark" style="background-image:url('assets/images/bg-watermark.jpg')"></div>
    <app-header></app-header>
    <main class="px-5 md:px-10 lg:px-16 py-10">
      <div class="canvas px-5 md:px-10 lg:px-16" [@pageFade]>
        <app-intro id="intro"></app-intro>
        <app-projects id="projects"></app-projects>
        <app-resume id="resume"></app-resume>
        <app-footer id="footer"></app-footer>
      </div>
    </main>
  `,
  animations: [
    trigger('pageFade', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(8px)' }),
        animate('500ms cubic-bezier(0.22, 1, 0.36, 1)', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {
  ngOnInit(): void {
    if (window && 'scrollBehavior' in document.documentElement.style) {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!prefersReduced) {
        document.documentElement.style.scrollBehavior = 'smooth';
      }
    }
  }
}


