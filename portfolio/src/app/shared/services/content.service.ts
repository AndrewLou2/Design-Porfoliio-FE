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
  social: { label: string; href: string }[];
}

export interface ProjectItem {
  title: string;
  summary: string;
  tags: string[];
  year: string;
  image: string;
  link?: string;
}

export interface ResumeData {
  summary: string;
  experience: { company: string; role: string; start: string; end: string; bullets: string[] }[];
  skills: string[];
  education: { school: string; degree: string; year: string }[];
  awards: { title: string; year: string }[];
}

@Injectable({ providedIn: 'root' })
export class ContentService {
  private http = inject(HttpClient);

  profile$: Observable<Profile> = this.http.get<Profile>('assets/content/profile.json').pipe(shareReplay(1));
  projects$: Observable<ProjectItem[]> = this.http.get<ProjectItem[]>('assets/content/projects.json').pipe(shareReplay(1));
  resume$: Observable<ResumeData> = this.http.get<ResumeData>('assets/content/resume.json').pipe(shareReplay(1));
}


