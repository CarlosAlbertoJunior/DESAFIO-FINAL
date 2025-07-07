import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Agencia } from './agencia';

describe('Agencia', () => {
  let component: Agencia;
  let fixture: ComponentFixture<Agencia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Agencia]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Agencia);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
