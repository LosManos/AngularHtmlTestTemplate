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

  //  Very simple test, as it comes out-of-the-box.
  //  It only tests that the component can be created at all.
  //  The test is important though as makes sure
  //  the component can load without any inital data;
  //  which happens in the beginning of the life cycle.
  it('should create', () => {

    //  Assert.
    expect(component).toBeTruthy();
  });

  //  This test connects to the outputed DOM
  //  and makes possible to look for and assert. HTML elemets.
  it('should set standard title', () => {
    const fixture = TestBed.createComponent(ProjectComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;

    //  Assert.
    expect(getTitleElement(compiled).textContent).toContain('My Project');
  });

  //  This test updates data set through 
  //  @Input()
  //  or
  //  updating "data" during run time.
  //  <app-project [dataSource]="data"></app-project>
  //
  //  To make Angular detect the change we force a `detectChanges()`.
  it('should show settable title', () => {
    const indata = {
      title: 'Any new title'
    } as ProjectDataSource;
    const fixture = TestBed.createComponent(ProjectComponent);

    //  Act.
    fixture.componentRef.instance.dataSource = indata;
    
    //  Assert.
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(getTitleElement(compiled).textContent).toContain('Any new title');
  });

  //  This test updates data set through 
  //  @Input()
  //  or
  //  updating "data" during run time.
  //  <app-project [dataSource]="data"></app-project>
  //
  //  To make Angular detect the change we force a `detectChanges()`.
  it('should show settable title, tested more thoroughly', () => {
    const originalTitle = 'My Project';
    const indata = {
      title: 'Any new title'
    } as ProjectDataSource;
    const fixture = TestBed.createComponent(ProjectComponent);
    fixture.detectChanges();
    let  compiled = fixture.nativeElement;
    //  Here we check we know the original value, so we know
    //  that we really are changing something.
    //  If the test had been data driven, or more complex, we might check
    //  that the original value and updated value differs.
    expect(getTitleElement(compiled).textContent).toContain(originalTitle, 
      'Sanity check the base line is known.');


    //  Act.
    fixture.componentRef.instance.dataSource = indata;
    
    //  Assert.
    fixture.detectChanges();
    compiled = fixture.nativeElement;
    expect(getTitleElement(compiled).textContent).toContain('Any new title');
  });

  //  This is a helper function to get data out of the DOM.
  //  It is not a full [page object](https://martinfowler.com/bliki/PageObject.html)
  //  but the embryo to one.
  function getTitleElement(compiled: any): HTMLElement {
    return compiled.querySelector('label + div');
  }
});
