import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectComponent, ProjectDataSource } from './project.component';

describe('ProjectComponent', () => {
  let component: ProjectComponent;
  let fixture: ComponentFixture<ProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set standard title', () => {
    const fixture = TestBed.createComponent(ProjectComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;

    //  Assert.
    expect(getTitleElement(compiled).textContent).toContain('My Project');
  });

  it('should show settable title', () => {
    const indata = {
      title: 'Any new title'
    } as ProjectDataSource;
    const fixture = TestBed.createComponent(ProjectComponent);
    fixture.detectChanges();

    //  Act.
    fixture.componentRef.instance.dataSource = indata;
    fixture.detectChanges();

    //  Assert.
    const compiled = fixture.nativeElement;
    expect(getTitleElement(compiled).textContent).toContain('Any new title');
  });

  function getTitleElement(compiled: any): HTMLElement {
    return compiled.querySelector('label + div');
  }
});
