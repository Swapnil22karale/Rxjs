import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetConfirmComponent } from './get-confirm.component';

describe('GetConfirmComponent', () => {
  let component: GetConfirmComponent;
  let fixture: ComponentFixture<GetConfirmComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetConfirmComponent]
    });
    fixture = TestBed.createComponent(GetConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
