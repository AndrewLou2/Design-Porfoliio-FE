import { Component, HostBinding, HostListener } from '@angular/core';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, NgIf],
  template: `
    <header class="fixed top-0 inset-x-0 z-50">
      <div class="px-5 md:px-10 lg:px-16 py-4">
        <div class="canvas flex items-center justify-between py-3 backdrop-blur-sm" [class.shadow-soft]="scrolled">
          <div class="text-xs text-ink/80 font-smallcaps tracking-wide select-none px-6">
            DESIGN BY YOUR NAME ©
          </div>
          <nav class="hidden md:flex items-center gap-8 pr-6">
            <a class="text-xs font-smallcaps text-ink/60 hover:text-ink transition-colors focus:outline-2 focus:outline-ink" href="#intro">Accueil</a>
            <a class="text-xs font-smallcaps text-ink/60 hover:text-ink transition-colors focus:outline-2 focus:outline-ink" href="#projects">Portfolio</a>
            <a class="text-xs font-smallcaps text-ink/60 hover:text-ink transition-colors focus:outline-2 focus:outline-ink" href="#resume">À propos</a>
            <a class="text-xs font-smallcaps text-ink/60 hover:text-ink transition-colors focus:outline-2 focus:outline-ink" href="#footer">Contact</a>
          </nav>
          <button class="md:hidden text-xs font-smallcaps px-6 py-2 focus:outline-2 focus:outline-ink" (click)="toggleMobile()">Menu</button>
        </div>
      </div>
      <div *ngIf="mobileOpen" class="fixed inset-0 bg-ink/70 z-40" (click)="toggleMobile()"></div>
      <div *ngIf="mobileOpen" class="fixed inset-0 z-50 flex">
        <div class="ml-auto h-full w-64 bg-white p-6 flex flex-col gap-4">
          <a class="text-sm font-smallcaps text-ink/80" href="#intro" (click)="toggleMobile()">Accueil</a>
          <a class="text-sm font-smallcaps text-ink/80" href="#projects" (click)="toggleMobile()">Portfolio</a>
          <a class="text-sm font-smallcaps text-ink/80" href="#resume" (click)="toggleMobile()">À propos</a>
          <a class="text-sm font-smallcaps text-ink/80" href="#footer" (click)="toggleMobile()">Contact</a>
        </div>
      </div>
    </header>
  `
})
export class HeaderComponent {
  scrolled = false;
  mobileOpen = false;

  @HostListener('window:scroll') onScroll() {
    this.scrolled = window.scrollY > 32;
  }

  toggleMobile() {
    this.mobileOpen = !this.mobileOpen;
  }
}


