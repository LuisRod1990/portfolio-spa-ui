import { Routes } from '@angular/router';
import { ContactCardComponent } from './pages/contacto/contact-card/contact-card';
import { LoginComponent } from './pages/login/login.component';
import { AptitudesCard } from './pages/aptitudes/skills-card/skills-card';
import { FormacionCardComponent } from './pages/formacion/formacion-card/formacion-card';
import { ExperienciaLaboralCard } from './pages/experiencia/experience-card';
import { ProyectosCardComponent } from './pages/proyectos/proyectos-card/proyectos-card';
import { AuthGuard } from './core/auth/auth.guard';
import { FormacionStoreService } from './pages/formacion/formacion-card/state/formacion-store';

export const routes: Routes = [
  { path: '', component: ContactCardComponent, canActivate: [AuthGuard] },
  { path: 'contacto', component: ContactCardComponent, canActivate: [AuthGuard] },
  { path: 'formacion', component: FormacionCardComponent },
  { path: 'experiencia', component: ExperienciaLaboralCard },
  { path: 'aptitudes', component: AptitudesCard },
  { path: 'proyectos', component: ProyectosCardComponent },
  //{ path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' }
];
