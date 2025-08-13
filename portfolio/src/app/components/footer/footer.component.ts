import { Component, inject } from '@angular/core';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { ContentService } from '../../shared/services/content.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [AsyncPipe, NgForOf, NgIf],
  template: `
    <footer class="pt-12 md:pt-16 lg:pt-20 pb-10 border-t border-line" *ngIf="vm$ | async as vm">
      <div class="grid grid-cols-12 gap-6">
        <div class="col-span-12 md:col-span-6">
          <a class="text-sm underline underline-offset-4 focus:outline-2 focus:outline-ink" [href]="'mailto:' + vm.email">{{ vm.email }}</a>
          <div class="mt-3 flex gap-4">
            <a class="text-xs font-smallcaps text-ink/70 hover:text-ink focus:outline-2 focus:outline-ink" *ngFor="let s of vm.social" [href]="s.href" target="_blank" rel="noopener">{{ s.label }}</a>
          </div>
        </div>
        <div class="col-span-12 md:col-span-6 flex items-end md:justify-end">
          <div class="text-xs text-ink/60">© {{ year }} — <button class="underline underline-offset-4" (click)="toTop()">Back to top</button></div>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {
  private content = inject(ContentService);
  vm$ = this.content.profile$;
  year = new Date().getFullYear();

  toTop() {
    document.querySelector('header')?.scrollIntoView({ behavior: 'smooth' });
  }
}


