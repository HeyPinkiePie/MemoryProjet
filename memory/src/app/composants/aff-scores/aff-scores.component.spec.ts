import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffScoresComponent } from './aff-scores.component';

describe('AffScoresComponent', () => {
  let component: AffScoresComponent;
  let fixture: ComponentFixture<AffScoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffScoresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AffScoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
