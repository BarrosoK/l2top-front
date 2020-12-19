import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaskPreviewDialogComponent } from './mask-preview-dialog.component';

describe('MaskPreviewDialogComponent', () => {
  let component: MaskPreviewDialogComponent;
  let fixture: ComponentFixture<MaskPreviewDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaskPreviewDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaskPreviewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
