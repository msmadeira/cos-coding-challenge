import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        HeaderComponent,
      ],
      schemas: [
        NO_ERRORS_SCHEMA,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show logout button when is logged in', () => {
    component.isLoggedIn = true;
    fixture.detectChanges();

    const logoutBtn = fixture.debugElement.query(By.css('button'));

    expect(logoutBtn).toBeTruthy();
  });

  it('should hide logout button when is not logged in', () => {
    component.isLoggedIn = false;
    fixture.detectChanges();

    const logoutBtn = fixture.debugElement.query(By.css('button'));

    expect(logoutBtn).toBeFalsy();
  });
});
