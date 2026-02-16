import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectosCardComponent } from './proyectos-card';

describe('ProyectosCard', () => {
  let component: ProyectosCardComponent;
  let fixture: ComponentFixture<ProyectosCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProyectosCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProyectosCardComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
