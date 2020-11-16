import { Component, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  private _dataSource: TeamDataSource = {members: []} as TeamDataSource;;
  @Input()
  public get dataSource(): TeamDataSource {
    return this._dataSource;
  }
  public set dataSource(value:TeamDataSource){
    this._dataSource = value;
  }

  constructor() { }

  public ngOnInit(): void { }

}

export interface TeamDataSource {
  members: Person[];
}

export interface Person {
  name: string;
}
