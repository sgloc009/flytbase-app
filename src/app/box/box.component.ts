import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BoxService } from '../services/box.service';

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.css']
})
export class BoxComponent implements OnInit {
  @Input() public x: number = 0;
  @Input() public y: number = 0;
  @Input() public focused:boolean = false;
  @Input() public name:string = "";
  @Input() public zIndex: number = 0;
  @Input() public index:number = 0;
  @Output() public focusedEvent:EventEmitter<number> = new EventEmitter();

  constructor(public boxSvc: BoxService) { }
  onFocus(i:number){
    this.focusedEvent.emit(this.index);
  }
  ngOnInit(): void {
    console.log(this.index);
  }

}
