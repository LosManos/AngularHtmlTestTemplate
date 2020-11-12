import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Person, TeamComponent, TeamDataSource } from '../team/team.component';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  @Input()
  public dataSource: ProjectDataSource = {} as ProjectDataSource;

  public team: TeamDataSource = {} as TeamDataSource;

  constructor() {
    this.dataSource = {
      title: 'My Project',
    } as ProjectDataSource;
  }

  public ngOnInit(): void {
  }

  public chooseTeam(id: number): void {
    switch (id) {
      case 1:
        this.team = {
          members: [
            { name: 'a' } as Person,
            { name: 'b' } as Person,
          ]
        } as TeamDataSource;
        break;
      case 2:
        this.team = {
          members: [
            { name: 'g' } as Person,
            { name: 'h' } as Person,
          ]
        } as TeamDataSource;
    }
  }

}

export interface ProjectDataSource {
  title: string;
}