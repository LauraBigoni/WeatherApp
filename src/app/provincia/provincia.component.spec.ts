import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvinciaComponent } from './provincia.component';

describe('ProvinciaComponent', () => {
  let component: ProvinciaComponent;
  let fixture: ComponentFixture<ProvinciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProvinciaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProvinciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
