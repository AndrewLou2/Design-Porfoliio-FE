import { Pipe, PipeTransform } from '@angular/core';
import { ProjectItem } from '../services/content.service';

@Pipe({ name: 'filterProjects', standalone: true })
export class FilterProjectsPipe implements PipeTransform {
  transform(
    list: ProjectItem[] | null,
    tags: string[] | (() => string[]),
    years: string[] | (() => string[])
  ): ProjectItem[] {
    if (!list) return [];
    const tagArr = typeof tags === 'function' ? tags() : tags;
    const yearArr = typeof years === 'function' ? years() : years;
    return list.filter((p) => {
      const tagOk =
        tagArr.length === 0 || p.tags?.some((t) => tagArr.includes(t));
      const yearOk =
        yearArr.length === 0 || (p.year && yearArr.includes(p.year));
      return tagOk && yearOk;
    });
  }
}
