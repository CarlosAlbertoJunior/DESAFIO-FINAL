import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Apoiar } from './apoiar';

describe('Apoiar', () => {
  let component: Apoiar;
  let fixture: ComponentFixture<Apoiar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Apoiar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Apoiar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
