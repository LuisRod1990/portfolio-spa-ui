import { Routes } from '@angular/router';
import { ContactCardComponent } from './pages/contacto/contact-card/contact-card';
import { LoginComponent } from './pages/login/login.component';
import { AptitudesCard } from './pages/aptitudes/skills-card/skills-card';
import { ExperienciaLaboralCard } from './pages/experiencia/experience-card';
import { AuthGuard } from './core/auth/auth.guard';

export const routes: Routes = [
  { path: '', component: ContactCardComponent, canActivate: [AuthGuard] }, // 🔹 aquí se muestra algo
  { path: 'contacto', component: ContactCardComponent, canActivate: [AuthGuard] },
  { path: 'experiencia', component: ExperienciaLaboralCard },
  { path: 'aptitudes', component: AptitudesCard },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' }
];
