import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessRegComponent } from './process-reg.component';

describe('ProcessRegComponent', () => {
  let component: ProcessRegComponent;
  let fixture: ComponentFixture<ProcessRegComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessRegComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
