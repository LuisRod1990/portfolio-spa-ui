import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AptitudState } from '../../../../models/aptitud-state';
import { DataService } from '../../../../services/data-service';

@Injectable({ providedIn: 'root' })
export class AptitudesStoreService {
  private stateSubject = new BehaviorSubject<AptitudState>({
    loading: false,
    error: null,
    aptitudes: [],
    skills: [],
    experiencias: [],
    currentIndex: 0,
    groupSize: 1,
    menuOpen: false,
    selectedLayout: 'two-top-one-bottom',
    isDarkTheme: false
  });

  state$ = this.stateSubject.asObservable();

  constructor(private dataService: DataService) {}

  loadData(): void {
    this.loadAptitudes();
    this.loadSkills();
    this.loadExperiencias();
  }

  private loadAptitudes(): void {
    this.stateSubject.next({ ...this.stateSubject.value, loading: true });
    this.dataService.getAptitudes(1).subscribe({
      next: data => {
        this.stateSubject.next({
          ...this.stateSubject.value,
          loading: false,
          aptitudes: data
        });
      },
      error: err => {
        this.stateSubject.next({
          ...this.stateSubject.value,
          loading: false,
          error: 'Error al cargar aptitudes'
        });
      }
    });
  }

  private loadSkills(): void {
    this.stateSubject.next({ ...this.stateSubject.value, loading: true });
    this.dataService.getSkills(1).subscribe({
      next: data => {
        this.stateSubject.next({
          ...this.stateSubject.value,
          loading: false,
          skills: data
        });
      },
      error: err => {
        this.stateSubject.next({
          ...this.stateSubject.value,
          loading: false,
          error: 'Error al cargar skills'
        });
      }
    });
  }

  private loadExperiencias(): void {
    this.stateSubject.next({ ...this.stateSubject.value, loading: true });
    this.dataService.getExperiencias(1).subscribe({
      next: data => {
        this.stateSubject.next({
          ...this.stateSubject.value,
          loading: false,
          experiencias: data
        });
      },
      error: err => {
        this.stateSubject.next({
          ...this.stateSubject.value,
          loading: false,
          error: 'Error al cargar experiencias'
        });
      }
    });
  }

  toggleMenu(): void {
    this.stateSubject.next({
      ...this.stateSubject.value,
      menuOpen: !this.stateSubject.value.menuOpen
    });
  }

  toggleTheme(): void {
    this.stateSubject.next({
      ...this.stateSubject.value,
      isDarkTheme: !this.stateSubject.value.isDarkTheme
    });
  }

  changeLayout(layout: 'two-top-one-bottom' | 'two-columns' | 'two-right-one-left'): void {
    this.stateSubject.next({
      ...this.stateSubject.value,
      selectedLayout: layout
    });
  }

  nextSkillGroup(): void {
    const { currentIndex, groupSize, skills } = this.stateSubject.value;
    this.stateSubject.next({
      ...this.stateSubject.value,
      currentIndex: (currentIndex + groupSize) % skills.length
    });
  }
}