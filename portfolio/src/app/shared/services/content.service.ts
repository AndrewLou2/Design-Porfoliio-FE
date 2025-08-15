import { Injectable, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface Profile {
  name: string;
  tagline: string;
  locationsNote: string;
  portrait: string;
  email: string;
  phone?: string;
  social: { label: string; href: string }[];
}

export interface ProjectItem {
  title: string;
  summary: string;
  tags: string[];
  year: string;
  image: string;
  link?: string;
  organization?: string;
  duration?: string;
}

export interface ResumeData {
  summary: string;
  experience: {
    company: string;
    role: string;
    location?: string;
    start: string;
    end: string;
    bullets: string[];
  }[];
  skills: string[];
  education: {
    school: string;
    degree: string;
    location?: string;
    year: string;
    gpa?: string;
    details?: string;
  }[];
  awards: {
    title: string;
    year: string;
    description?: string;
  }[];
  relevantCoursework?: string[];
}

@Injectable({ providedIn: 'root' })
export class ContentService {
  private http = inject(HttpClient);

  profile$: Observable<Profile> = this.http
    .get<Profile>('assets/content/profile.json')
    .pipe(shareReplay(1));
  projects$: Observable<ProjectItem[]> = this.http
    .get<ProjectItem[]>('assets/content/projects.json')
    .pipe(shareReplay(1));
  resume$: Observable<ResumeData> = this.http
    .get<ResumeData>('assets/content/resume.json')
    .pipe(shareReplay(1));
}
