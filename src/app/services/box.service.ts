import { ComponentFactory, ComponentFactoryResolver, ComponentRef, Injectable, ViewContainerRef } from '@angular/core';
import { BoxComponent } from '../box/box.component';

@Injectable({
  providedIn: 'root'
})
export class BoxService {
  private _listBoxes: Array<ComponentRef<BoxComponent>> = [];
  public boxNo = -1;
  public currentFocused = -1;
  private _boxList:any = {};
  public boxFactory: ComponentFactory<BoxComponent>;
  constructor(public boxCFResolver: ComponentFactoryResolver) { 
    this.boxFactory = this.boxCFResolver.resolveComponentFactory(BoxComponent);
  }
  addBox(container: ViewContainerRef){
    this.boxNo++
    let boxInstance = container.createComponent(this.boxFactory);
    boxInstance.instance.name = "box"+this.boxNo;
    boxInstance.instance.index = this.boxNo;
    boxInstance.instance.backgroundColor = "rgba("+Math.round(Math.random()*300)+","+Math.round(Math.random()*300)+","+Math.round(Math.random()*300)+","+1+")"
    boxInstance.instance.focusedEvent.subscribe(this.onFocus.bind(this));
    this._boxList[this.boxNo] = boxInstance;
  }
  getBox(index:number) { 
    return this._boxList[index];
  }

  getFocusedBox(){
    return this._boxList[this.currentFocused].instance;
  }

  resetBox(){
    this.getFocusedBox().x = 0;
    this.getFocusedBox().y = 0;
  }

  deleteBox() {
    this.getBox(this.currentFocused).destroy();
    delete this._boxList[this.currentFocused];
    this.currentFocused = -1;
  }

  onFocus(i:number){
    if(i==this.currentFocused){
      this.getBox(i).instance.focused = false;
      this.currentFocused = -1;
      return
    }
    if(this.currentFocused>=0){
      this.getBox(this.currentFocused).instance.focused = false;
    }
    this.currentFocused = i;
    this.getBox(i).instance.focused = !this.getBox(i).instance.focused;
  }
}
