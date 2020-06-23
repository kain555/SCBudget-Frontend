import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IListComponent } from './i-list.component';

describe('IListComponent', () => {
  let component: IListComponent;
  let fixture: ComponentFixture<IListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
