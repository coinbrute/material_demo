import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  platform: string;
  region: string;
  sourcePlayer: string;
  targetPlayer: string;
  sourcePid: string;
  targetPid: string;
  attackMethod: string;
  damageAmt: number;
  targetTotalHealth: number = Math.floor(Math.random()*100)
  gif: string;
  gif2: string;
  survivable: string;
  remainingHP: number;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getPlayerData().subscribe(
      result => {
        if(result.reason == "OK") {
          window.alert(`Successfully gathered player info: STATUS...${result.reason}`)
          this.platform = result.payload[0].platform;
          this.region = result.payload[0].region;
          this.sourcePlayer = /[^#]*/.exec(result.payload[0].source_player_id)[0];
          this.targetPlayer = /[^#]*/.exec(result.payload[0].target_player_id)[0];
          this.sourcePid = result.payload[0].source_player_id.split('#')[1];
          this.targetPid = result.payload[0].target_player_id.split('#')[1];
          this.attackMethod = result.payload[0].method;
          this.damageAmt = result.payload[0].damage;
          this.dataService.getGif().subscribe(result => {
            this.gif = result.data.fixed_height_downsampled_url;
          })
          this.dataService.getGif().subscribe(result => {
            this.gif2 = result.data.fixed_height_downsampled_url;
          })
          this.targetTotalHealth - this.damageAmt > 0 ? 
            this.survivable = "survivable" 
            : this.survivable = "unsurvivable";
          this.remainingHP = this.targetTotalHealth - this.damageAmt;
        }
      },
      err => {
        console.error(err);
      }
    );
  }

}
