import { AfterViewInit, Component, ElementRef, HostListener, ViewChild, ComponentFactoryResolver, ComponentFactory, ViewContainerRef, ComponentRef} from '@angular/core';
import { BoxComponent } from '../box/box.component';
import { KEY_CODES } from '../constants';


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

  public listBoxes:Array<ComponentRef<BoxComponent>>=[];
  public defaultBoxProps:boxProps = {"name": "","zIndex":0,"focused": false, x: 0, y: 0}
  public index = 0;
  public boxFactory: ComponentFactory<BoxComponent>;
  public currentFocused:number = -1;
  public listenerActive = true;
  @ViewChild('container',{read: ViewContainerRef}) public container: ViewContainerRef;
  public boxes:Array<Element> = [];
  // public boxList: Array<Component>
  public moving = false;
  private boxContainer = {height: 300, width: 300};
  private box = {height: 50, width: 50}


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
      switch(event.keyCode){
        case KEY_CODES.a:
          if(this.listBoxes[this.currentFocused].instance.x>0 && !this.moving){
            this.listBoxes[this.currentFocused].instance.x -= this.moveSpeed;
            //this.container.element.nativeElement.children[this.currentFocused].style.transform="translate("+this.listBoxes[this.currentFocused].instance.x+"px,"+this.listBoxes[this.currentFocused].instance.y+"px)";
            this.startMoving()
          }
          break;
        case KEY_CODES.d:
          if((this.listBoxes[this.currentFocused].instance.x+this.box.width+10)<this.boxContainer.width  && !this.moving){
            this.listBoxes[this.currentFocused].instance.x += this.moveSpeed;
            // this.container.element.nativeElement.children[this.currentFocused].style.transform="translate("+this.listBoxes[this.currentFocused].instance.x+"px,"+this.listBoxes[this.currentFocused].instance.y+"px)";
            this.startMoving()
          }
          break;
        case KEY_CODES.w:
          if(this.listBoxes[this.currentFocused].instance.y>0  && !this.moving){
            this.listBoxes[this.currentFocused].instance.y -= this.moveSpeed;
            //this.container.element.nativeElement.children[this.currentFocused].style.transform="translate("+this.listBoxes[this.currentFocused].x+"px,"+this.listBoxes[this.currentFocused].instance.y+"px)";
            this.startMoving()
          }
          break;
        case KEY_CODES.s:
          if((this.listBoxes[this.currentFocused].instance.y + this.box.height+10)<this.boxContainer.height  && !this.moving){
            this.listBoxes[this.currentFocused].instance.y += this.moveSpeed;
            //this.container.element.nativeElement.children[this.currentFocused].style.transform="translate("+this.listBoxes[this.currentFocused].instance.x+"px,"+this.listBoxes[this.currentFocused].instance.y+"px)";
            this.startMoving()
          }
          break;
        case KEY_CODES.del:
          this.listBoxes.splice(this.currentFocused,1)[0].destroy();
          break;
        default:
          console.log("not found");
      }
    }
  }
  public onReset(){
    this.listBoxes[this.currentFocused].instance.x, this.listBoxes[this.currentFocused].instance.y = 0;
  }
  public addFunc(){
    this.index++
    let boxInstance = this.container.createComponent(this.boxFactory);
    boxInstance.instance.name = "box"+this.index;
    boxInstance.instance.index = this.index;
    boxInstance.instance.focusedEvent.subscribe(this.onFocus);
    console.log(boxInstance);
    this.listBoxes.push(boxInstance); 
    console.log(this.listBoxes);
  }

  public onFocus(i: number){
    console.log(this.listBoxes);
    if(this.listBoxes[i].instance.focused){
      this.listBoxes[i].instance.focused = false;
      this.currentFocused = -1;
    }
    if(this.currentFocused>=0){
      this.listBoxes[this.currentFocused].instance.focused = false;
    }
    this.currentFocused = i;
    this.listBoxes[i].instance.focused = true;
  }
  constructor(public boxCFResolver: ComponentFactoryResolver){
  }
  ngAfterViewInit(){
    this.boxFactory = this.boxCFResolver.resolveComponentFactory(BoxComponent);
  }

}
