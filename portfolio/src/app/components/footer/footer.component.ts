import { Component, inject } from '@angular/core';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { ContentService } from '../../shared/services/content.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [AsyncPipe, NgForOf, NgIf],
  template: `
    <footer class="site-footer" *ngIf="vm$ | async as vm">
      <div class="footer-grid">
        <div class="footer-left">
          <a class="footer-email" [href]="'mailto:' + vm.email">{{ vm.email }}</a>
          <div class="footer-social">
            <a class="footer-social-link" *ngFor="let s of vm.social" [href]="s.href" target="_blank" rel="noopener">{{ s.label }}</a>
          </div>
        </div>
        <div class="footer-right">
          <div class="footer-meta">© {{ year }} — <button class="footer-top" (click)="toTop()">Back to top</button></div>
        </div>
      </div>
    </footer>
  `,
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  private content = inject(ContentService);
  vm$ = this.content.profile$;
  year = new Date().getFullYear();

  toTop() {
    document.querySelector('header')?.scrollIntoView({ behavior: 'smooth' });
  }
}


