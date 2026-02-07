import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LayoutSelectorComponent } from './layout-selector';

describe('LayoutSelector', () => {
  let component: LayoutSelectorComponent;
  let fixture: ComponentFixture<LayoutSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutSelectorComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
