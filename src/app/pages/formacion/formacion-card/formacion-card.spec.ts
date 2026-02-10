import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormacionCard } from './formacion-card';

describe('FormacionCard', () => {
  let component: FormacionCard;
  let fixture: ComponentFixture<FormacionCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormacionCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormacionCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
