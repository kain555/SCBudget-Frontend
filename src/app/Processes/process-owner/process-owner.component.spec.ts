import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessOwnerComponent } from './process-owner.component';

describe('ProcessOwnerComponent', () => {
  let component: ProcessOwnerComponent;
  let fixture: ComponentFixture<ProcessOwnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessOwnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
