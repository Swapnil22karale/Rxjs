import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StdFormComponent } from './std-form.component';

describe('StdFormComponent', () => {
  let component: StdFormComponent;
  let fixture: ComponentFixture<StdFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StdFormComponent]
    });
    fixture = TestBed.createComponent(StdFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
