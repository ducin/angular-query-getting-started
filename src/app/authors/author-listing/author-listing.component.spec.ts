import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorListingComponent } from './author-listing.component';

describe('AuthorListingComponent', () => {
  let component: AuthorListingComponent;
  let fixture: ComponentFixture<AuthorListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthorListingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AuthorListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
