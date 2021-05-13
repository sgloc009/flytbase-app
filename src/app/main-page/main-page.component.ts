import { AfterViewInit, Component, ElementRef, HostListener, ViewChild, ViewContainerRef } from '@angular/core';


export interface boxProps{
  name: string;
  zIndex: number;
  focused: boolean;
  x: number;
  y: number;
}


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements AfterViewInit {

  public listBoxes:Array<boxProps>=[];
  public defaultBoxProps:boxProps = {"name": "","zIndex":0,"focused": false, x: 0, y: 0}
  public index = 0;
  public currentFocused:number = -1;
  public listenerActive = true;
  @ViewChild('container') public container: ElementRef;
  public boxes:Array<Element> = [];
  public moving = false;
  private boxContainer = {height: 300, width: 300};
  private box = {height: 50, width: 50}

  private KEY_CODES = {
    a: 65,
    b: 66,
    c: 67,
    d: 68,
    w: 87,
    s: 83,
    del: 46
  }
  public moveSpeed = 50;

  startMoving(){
    this.moving = true;
    setTimeout(()=>{
      this.moving = false;
    },1000)
  }
  @HostListener('window:keydown', ['$event'])
  onKeyUp(event: KeyboardEvent){
    if(this.listenerActive){
      console.log("key");
      console.log(event.key);
      console.log(event.keyCode);
      switch(event.keyCode){
        case this.KEY_CODES.a:
          if(this.listBoxes[this.currentFocused].x>0 && !this.moving){
            this.listBoxes[this.currentFocused].x -= this.moveSpeed;
            this.container.nativeElement.children[this.currentFocused].children[0].style.transform="translate("+this.listBoxes[this.currentFocused].x+"px,"+this.listBoxes[this.currentFocused].y+"px)";
            this.startMoving()
          }
          break;
        case this.KEY_CODES.d:
          if((this.listBoxes[this.currentFocused].x+this.box.width+10)<this.boxContainer.width  && !this.moving){
            this.listBoxes[this.currentFocused].x += this.moveSpeed;
            this.container.nativeElement.children[this.currentFocused].children[0].style.transform="translate("+this.listBoxes[this.currentFocused].x+"px,"+this.listBoxes[this.currentFocused].y+"px)";
            this.startMoving()
          }
          break;
        case this.KEY_CODES.w:
          if(this.listBoxes[this.currentFocused].y>0  && !this.moving){
            this.listBoxes[this.currentFocused].y -= this.moveSpeed;
            this.container.nativeElement.children[this.currentFocused].children[0].style.transform="translate("+this.listBoxes[this.currentFocused].x+"px,"+this.listBoxes[this.currentFocused].y+"px)";
            this.startMoving()
          }
          break;
        case this.KEY_CODES.s:
          if((this.listBoxes[this.currentFocused].y + this.box.height+10)<this.boxContainer.height  && !this.moving){
            this.listBoxes[this.currentFocused].y += this.moveSpeed;
            this.container.nativeElement.children[this.currentFocused].children[0].style.transform="translate("+this.listBoxes[this.currentFocused].x+"px,"+this.listBoxes[this.currentFocused].y+"px)";
            this.startMoving()
          }
          break;
        case this.KEY_CODES.del:
          this.listBoxes.splice(this.currentFocused,1)
          break;
        default:
          console.log("not found");
      }
    }
  }
  public onReset(){
    this.container.nativeElement.children[this.currentFocused].children[0].style.transform = "translate(0,0)"
  }
  public addFunc(){
    this.index++
    let boxProps = {...this.defaultBoxProps};
    boxProps["name"] = "box "+this.index;
    boxProps["zIndex"] = this.index;
    this.listBoxes.push(boxProps);
  }

  public onFocus(i: number){
    
    if(this.listBoxes[i].focused){
      this.listBoxes[i].focused = false;
      this.currentFocused = -1;
    }
    if(this.currentFocused>=0){
      this.listBoxes[this.currentFocused].focused = false;
    }
    this.currentFocused = i;
    this.listBoxes[i].focused = true;
  }
  constructor(){}
  ngAfterViewInit(){
  }

}
