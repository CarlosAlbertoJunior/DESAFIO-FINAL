import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cncosplay } from './cncosplay';

describe('Cncosplay', () => {
  let component: Cncosplay;
  let fixture: ComponentFixture<Cncosplay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cncosplay]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cncosplay);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
