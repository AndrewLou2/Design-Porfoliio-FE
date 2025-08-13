import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { ContentService } from '../../shared/services/content.service';

@Component({
  selector: 'app-intro',
  standalone: true,
  imports: [AsyncPipe, NgIf],
  template: `
    <section class="grid grid-cols-12 gap-6 pt-24 md:pt-28 lg:pt-32 pb-16 md:pb-20 lg:pb-24">
      <div class="col-span-12 md:col-span-4 lg:col-span-3 mt-6" [@fadeUp] *ngIf="vm$ | async as vm">
        <p class="text-sm text-sub max-w-[320px] leading-relaxed">{{ vm.tagline }}</p>
      </div>
      <div class="col-span-12 md:col-span-5 lg:col-span-5"></div>
      <div class="col-span-12 md:col-span-3 lg:col-span-4 md:row-span-2 flex md:justify-end" [@fade] *ngIf="vm$ | async as vm2">
        <img [src]="vm2.portrait" alt="Portrait" class="w-full max-w-sm aspect-[4/5] object-cover rounded-[16px] shadow-soft" loading="lazy" />
      </div>
      <div class="col-span-12 md:col-span-6 lg:col-span-5" [@fadeUp] *ngIf="vm$ | async as vm3">
        <p class="text-xs text-sub font-smallcaps">{{ vm3.locationsNote }}</p>
      </div>
      <div class="col-span-12 md:col-span-6 lg:col-span-7" [@fadeUp] *ngIf="vm$ | async as vm4">
        <h1 class="display-clamp font-display uppercase tracking-tightish text-ink">{{ vm4.name }}</h1>
      </div>
    </section>
  `,
  animations: [
    trigger('fadeUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(8px)' }),
        animate('450ms cubic-bezier(0.22, 1, 0.36, 1)', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms 100ms cubic-bezier(0.22, 1, 0.36, 1)', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class IntroSectionComponent {
  private content = inject(ContentService);
  vm$ = this.content.profile$;
}


