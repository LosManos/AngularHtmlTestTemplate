import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TeamComponent } from '../team/team.component';

import { ProjectComponent, ProjectDataSource } from './project.component';

describe('ProjectComponent', () => {
  let component: Proxy;
  let fixture: ComponentFixture<Proxy>;
  let compiled: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        Proxy,
        ProjectComponent,
        TeamComponent,  //  A component used by the SUT.
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
  });

  //  Very simple test.
  //  It tests that the component can be created at all.
  //  The test is important though as makes sure
  //  the component can load without any inital data;
  //  which happens in the beginning of the life cycle.
  it('should create', () => {
    const indata = createIndata();
    setup(indata);

    //  Assert.
    expect(component).toBeTruthy();
  });
  
  fit('should have a title', () => {
    const indata = createIndata();
    setup(indata);

    //  Assert.
    expect(component.getTitle()).toBe('Any title');
  });

  //  This is a helper function for creating the startup data.
  //  It sets up the startup data with reasonable defaults.
  function createIndata(): ProjectDataSource {
    return {
      title: 'Any title',
    } as ProjectDataSource;
  }

  //  Setup is explicitly moved out of the beforeEach 
  //  so every test can add its on startup data.
  function setup(indata: ProjectDataSource): void {
    fixture = TestBed.createComponent(Proxy);
    component = fixture.componentInstance;
    component.data = indata;

    //  Can one use `ComponentFixtureAutoDetect` to run automatic detectChanges?
    //  According to https://angular.io/guide/testing-components-scenarios#automatic-change-detection one can.
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
  }

  //  Here is a proxy compnent to hold the SUT.
  @Component({
    selector: `app-proxy`,  // Can be anything.
    template: `<app-project [dataSource]="data"></app-project>` // Is the selctor of the SUT.
  })
  class Proxy {
    //  As can be seen in the template above, the code has a child component, this, the SUT>
    @ViewChild(ProjectComponent)
    public component!: ProjectComponent;

    //  This is the property to get data into the SUT.
    //  Initally data/dataSource is null as that is how the life cycle is.
    public data: ProjectDataSource | null = null;

    //  This is a helper function for a [page object](https://martinfowler.com/bliki/PageObject.html).
    //  By using a page object the page can change without breaking every
    //  test that touches it. Instead only the page object methods must
    //  be changed.
    //  
    //  Here is another method, possibly better:
    //  https://angular.io/guide/testing-components-scenarios#use-a-page-object
    //
    public getTitle = (): string => this.getTitleElement()?.innerHTML || '';

    //  Next layer of abstraction. 
    //  As you are not an architect if you don't have at least 3 levels of abtractions.
    private getTitleElement = (): HTMLElement | null =>
      (compiled as Element).querySelector('label+div');
  }
});
