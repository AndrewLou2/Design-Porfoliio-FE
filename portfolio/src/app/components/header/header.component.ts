import { Component, HostBinding, HostListener } from '@angular/core';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, NgIf],
  template: `
    <header class="site-header">
      <div class="header-wrap">
        <div class="canvas header-bar" [class.elevated]="scrolled">
          <div class="wordmark">ANDREW LOU</div>
          <nav class="nav">
            <a class="nav-link" href="#intro">Home</a>
            <a class="nav-link" href="#projects">Projects</a>
            <a class="nav-link" href="#resume">About</a>
            <a class="nav-link" href="#footer">Contact</a>
          </nav>
          <button class="menu-button" (click)="toggleMobile()">Menu</button>
        </div>
      </div>
      <div
        *ngIf="mobileOpen"
        class="mobile-overlay"
        (click)="toggleMobile()"
      ></div>
      <div *ngIf="mobileOpen" class="mobile-drawer">
        <a class="drawer-link" href="#intro" (click)="toggleMobile()">Home</a>
        <a class="drawer-link" href="#projects" (click)="toggleMobile()"
          >Projects</a
        >
        <a class="drawer-link" href="#resume" (click)="toggleMobile()">About</a>
        <a class="drawer-link" href="#footer" (click)="toggleMobile()"
          >Contact</a
        >
      </div>
    </header>
  `,
  styleUrl: './header.component.scss',
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
