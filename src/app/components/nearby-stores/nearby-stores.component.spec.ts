import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NearbyStoresComponent } from './nearby-stores.component';

describe('NearbyStoresComponent', () => {
  let component: NearbyStoresComponent;
  let fixture: ComponentFixture<NearbyStoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NearbyStoresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NearbyStoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
