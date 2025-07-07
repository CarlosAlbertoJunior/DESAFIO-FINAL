import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Coslovers } from './coslovers';

describe('Coslovers', () => {
  let component: Coslovers;
  let fixture: ComponentFixture<Coslovers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Coslovers]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Coslovers);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
