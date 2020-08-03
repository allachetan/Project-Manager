import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockConnectorComponent } from './block-connector.component';

describe('BlockConnectorComponent', () => {
  let component: BlockConnectorComponent;
  let fixture: ComponentFixture<BlockConnectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockConnectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockConnectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
