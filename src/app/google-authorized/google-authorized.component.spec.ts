import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleAuthorizedComponent } from './google-authorized.component';

describe('GoogleAuthorizedComponent', () => {
  let component: GoogleAuthorizedComponent;
  let fixture: ComponentFixture<GoogleAuthorizedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoogleAuthorizedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleAuthorizedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
