import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StdTableComponent } from './std-table.component';

describe('StdTableComponent', () => {
  let component: StdTableComponent;
  let fixture: ComponentFixture<StdTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StdTableComponent]
    });
    fixture = TestBed.createComponent(StdTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
