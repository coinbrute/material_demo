import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { DataService } from '../data.service';
import { PayloadResponse } from '../models/PayloadResponse';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ListComponent implements OnInit {

  dataSource: TableElement[] = [];
  columnsToDisplay = ['Source Player', 'Attack Method', 'Damage Amount', 'Target Player', 'Total Health'];
  expandedElement: TableElement | null;
  status = '';
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    for (let i = 0; i < 10; i++){
      this.callPlayerData();
    }
    console.log(this.dataSource);
  }

  async callPlayerData(): Promise<void> {

    const data = this.dataService.getPlayerAsync();
    data.then(result => {
      const el: TableElement = {
        sourcePlayer: /[^#]*/.exec(result.payload[0].source_player_id)[0],
        attackMethod: result.payload[0].method,
        damageAmount: result.payload[0].damage,
        targetPlayer: /[^#]*/.exec(result.payload[0].target_player_id)[0],
        totalHealth: Math.floor(Math.random() * 100),
        description: ''
      };

      el.description = `${el.sourcePlayer}'s attack of ${el.attackMethod} would deal ${el.damageAmount} total hit points against ${el.targetPlayer}.
      ${el.targetPlayer} has ${el.totalHealth} hit points which would make this ${el.totalHealth - el.damageAmount > 0 ? 'survivable' : 'unsurvivable'} for ${el.targetPlayer} to withstand
      and continue playing against. After taking damage ${el.targetPlayer} would be left with ${el.totalHealth - el.damageAmount}`;

      this.dataSource.push(el);
    });
  }

  goHome(): void {
    window.location.href = '/';
  }

}

export interface TableElement {
  sourcePlayer: string;
  attackMethod: string;
  damageAmount: number;
  targetPlayer: string;
  totalHealth: number;
  description: string;
}
