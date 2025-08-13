import { Component, Input } from '@angular/core';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [NgForOf],
  template: `
    <a
      [href]="href || '#'"
      target="_blank"
      rel="noopener"
      class="group block bg-white rounded-2xl shadow-soft overflow-hidden border border-line focus:outline-2 focus:outline-ink"
    >
      <div class="overflow-hidden">
        <img
          [src]="image"
          alt=""
          class="w-full aspect-[4/3] object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          loading="lazy"
        />
      </div>
      <div class="p-4">
        <div class="flex items-center justify-between">
          <h3 class="font-medium underline-offset-4 group-hover:underline">
            {{ title }}
          </h3>
          <span class="text-xs text-sub">{{ metaRight }}</span>
        </div>
        <p class="text-sm text-sub mt-1">{{ summary }}</p>
        <div class="flex flex-wrap gap-1 mt-2">
          <span
            class="text-[11px] px-2 py-0.5 rounded-full bg-gray-50 border border-line"
            *ngFor="let t of tags"
            >{{ t }}</span
          >
        </div>
      </div>
    </a>
  `,
})
export class ProjectCardComponent {
  @Input() href?: string;
  @Input() image = '';
  @Input() title = '';
  @Input() summary = '';
  @Input() tags: string[] = [];
  @Input() metaRight = '';
}
