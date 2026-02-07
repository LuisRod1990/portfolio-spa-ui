import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AptitudesCard } from './skills-card';

describe('AptitudesSkillsCard', () => {
  let component: AptitudesCard;
  let fixture: ComponentFixture<AptitudesCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AptitudesCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AptitudesCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
