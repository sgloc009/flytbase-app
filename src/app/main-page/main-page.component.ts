import { AfterViewInit, Component, ElementRef, HostListener, ViewChild, ComponentFactoryResolver, ComponentFactory, ViewContainerRef, ComponentRef} from '@angular/core';
import { BoxComponent } from '../box/box.component';
import { KEY_CODES } from '../constants';
import { BoxService } from '../services/box.service';


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
  public index = -1;
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
      console.log(this.currentFocused);
      switch(event.keyCode){
        case KEY_CODES.a:
          if(this.boxSvc.getComponent(this.currentFocused).instance.x>0 && !this.moving){
            this.boxSvc.getComponent(this.currentFocused).instance.x -= this.moveSpeed;
            //this.container.element.nativeElement.children[this.currentFocused].style.transform="translate("+this.listBoxes[this.currentFocused].instance.x+"px,"+this.listBoxes[this.currentFocused].instance.y+"px)";
            this.startMoving()
          }
          break;
        case KEY_CODES.d:
          if((this.boxSvc.getComponent(this.currentFocused).instance.x+this.box.width+10)<this.boxContainer.width  && !this.moving){
            this.boxSvc.getComponent(this.currentFocused).instance.x += this.moveSpeed;
            // this.container.element.nativeElement.children[this.currentFocused].style.transform="translate("+this.listBoxes[this.currentFocused].instance.x+"px,"+this.listBoxes[this.currentFocused].instance.y+"px)";
            this.startMoving()
          }
          break;
        case KEY_CODES.w:
          if(this.boxSvc.getComponent(this.currentFocused).instance.y>0  && !this.moving){
            this.boxSvc.getComponent(this.currentFocused).instance.y -= this.moveSpeed;
            //this.container.element.nativeElement.children[this.currentFocused].style.transform="translate("+this.listBoxes[this.currentFocused].x+"px,"+this.listBoxes[this.currentFocused].instance.y+"px)";
            this.startMoving()
          }
          break;
        case KEY_CODES.s:
          if((this.boxSvc.getComponent(this.currentFocused).instance.y + this.box.height+10)<this.boxContainer.height  && !this.moving){
            this.boxSvc.getComponent(this.currentFocused).instance.y += this.moveSpeed;
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
    boxInstance.instance.focusedEvent.subscribe((i:number)=>{
      console.log(i);
      console.log(this.boxSvc.getComponent(i));
      if(i==this.currentFocused){
        this.boxSvc.getComponent(i).instance.focused = false;
        this.currentFocused = -1;
        return
      }
      if(this.currentFocused>=0){
        this.boxSvc.getComponent(this.currentFocused).instance.focused = false;
      }
      this.currentFocused = i;
      this.boxSvc.getComponent(i).instance.focused = !this.boxSvc.getComponent(i).instance.focused;
    });
    console.log(boxInstance);
    this.boxSvc.addComponent(boxInstance);
    console.log(this.listBoxes);
  }

  constructor(public boxCFResolver: ComponentFactoryResolver, public boxSvc: BoxService){
  }
  ngAfterViewInit(){
    this.boxFactory = this.boxCFResolver.resolveComponentFactory(BoxComponent);
  }

}
