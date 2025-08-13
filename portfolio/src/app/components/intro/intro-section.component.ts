import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { ContentService } from '../../shared/services/content.service';

@Component({
  selector: 'app-intro',
  standalone: true,
  imports: [AsyncPipe, NgIf],
  template: `
    <section class="intro">
      <div class="intro-col-left" [@fadeUp] *ngIf="vm$ | async as vm">
        <p class="intro-tagline">{{ vm.tagline }}</p>
      </div>
      <div class="intro-spacer"></div>
      <div class="intro-portrait" [@fade] *ngIf="vm$ | async as vm2">
        <img
          [src]="vm2.portrait"
          alt="Portrait"
          class="intro-portrait-img"
          loading="lazy"
        />
      </div>
      <div class="intro-locales" [@fadeUp] *ngIf="vm$ | async as vm3">
        <p class="intro-locales-text">{{ vm3.locationsNote }}</p>
      </div>
      <div class="intro-title" [@fadeUp] *ngIf="vm$ | async as vm4">
        <h1 class="intro-wordmark">{{ vm4.name }}</h1>
      </div>
    </section>
  `,
  styleUrl: './intro-section.component.scss',
  animations: [
    trigger('fadeUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(8px)' }),
        animate(
          '450ms cubic-bezier(0.22, 1, 0.36, 1)',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
    ]),
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(
          '500ms 100ms cubic-bezier(0.22, 1, 0.36, 1)',
          style({ opacity: 1 })
        ),
      ]),
    ]),
  ],
})
export class IntroSectionComponent {
  private content = inject(ContentService);
  vm$ = this.content.profile$;
}
