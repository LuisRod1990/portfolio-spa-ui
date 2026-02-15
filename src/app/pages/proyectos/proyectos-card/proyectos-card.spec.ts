import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectosCard } from './proyectos-card';

describe('ProyectosCard', () => {
  let component: ProyectosCard;
  let fixture: ComponentFixture<ProyectosCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProyectosCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProyectosCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
