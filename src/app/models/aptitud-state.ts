import { Aptitud } from './aptitud';
import { Skill } from './skills';
import { Experiencia } from './experiencia-total';

export interface AptitudState {
  loading: boolean;
  error: string | null;
  aptitudes: Aptitud[];
  skills: Skill[];
  experiencias: Experiencia[];
  currentIndex: number;
  groupSize: number;
  menuOpen: boolean;
  selectedLayout: 'two-top-one-bottom' | 'two-columns' | 'two-right-one-left';
  isDarkTheme: boolean;
}