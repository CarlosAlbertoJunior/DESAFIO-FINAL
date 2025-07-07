import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Coordenacao } from './coordenacao';

describe('Coordenacao', () => {
  let component: Coordenacao;
  let fixture: ComponentFixture<Coordenacao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Coordenacao]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Coordenacao);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
