import { ComponentRef, Injectable } from '@angular/core';
import { BoxComponent } from '../box/box.component';

@Injectable({
  providedIn: 'root'
})
export class BoxService {
  private _listBoxes: Array<ComponentRef<BoxComponent>> = []
  constructor() { }
  addComponent(component:ComponentRef<BoxComponent>){
    this._listBoxes.push(component);
  }
  getComponent(index:number) { 
    return this._listBoxes[index];
  }
}
