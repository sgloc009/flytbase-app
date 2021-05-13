import { AfterViewInit, Component, ElementRef, HostListener, ViewChild, ComponentFactoryResolver, ComponentFactory, ViewContainerRef, ComponentRef} from '@angular/core';
import { BoxComponent } from '../box/box.component';
import { KEY_CODES, box, boxContainer, moveSpeed } from '../constants';
import { BoxService } from '../services/box.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements AfterViewInit {

  public listBoxes:Array<ComponentRef<BoxComponent>>=[];
  public index = -1;
  public currentFocused:number = -1;
  public listenerActive = true;
  @ViewChild('container',{read: ViewContainerRef}) public container: ViewContainerRef;
  public boxes:Array<Element> = [];
  // public boxList: Array<Component>
  public moving = false;


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
          if(this.boxSvc.getFocusedBox().x>0 && !this.moving){
            this.boxSvc.getFocusedBox().x -= moveSpeed;
            //this.container.element.nativeElement.children[this.currentFocused].style.transform="translate("+this.listBoxes[this.currentFocused].instance.x+"px,"+this.listBoxes[this.currentFocused].instance.y+"px)";
            this.startMoving()
          }
          break;
        case KEY_CODES.d:
          if((this.boxSvc.getFocusedBox().x+box.width+10)<boxContainer.width  && !this.moving){
            this.boxSvc.getFocusedBox().x += moveSpeed;
            // this.container.element.nativeElement.children[this.currentFocused].style.transform="translate("+this.listBoxes[this.currentFocused].instance.x+"px,"+this.listBoxes[this.currentFocused].instance.y+"px)";
            this.startMoving()
          }
          break;
        case KEY_CODES.w:
          if(this.boxSvc.getFocusedBox().y>0  && !this.moving){
            this.boxSvc.getFocusedBox().y -= moveSpeed;
            //this.container.element.nativeElement.children[this.currentFocused].style.transform="translate("+this.listBoxes[this.currentFocused].x+"px,"+this.listBoxes[this.currentFocused].instance.y+"px)";
            this.startMoving()
          }
          break;
        case KEY_CODES.s:
          if((this.boxSvc.getFocusedBox().y + box.height+10)<boxContainer.height  && !this.moving){
            this.boxSvc.getFocusedBox().y += moveSpeed;
            //this.container.element.nativeElement.children[this.currentFocused].style.transform="translate("+this.listBoxes[this.currentFocused].instance.x+"px,"+this.listBoxes[this.currentFocused].instance.y+"px)";
            this.startMoving()
          }
          break;
        case KEY_CODES.del:
          this.boxSvc.deleteBox()
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
    this.boxSvc.addBox(this.container);
  }

  constructor(public boxCFResolver: ComponentFactoryResolver, public boxSvc: BoxService){
  }
  ngAfterViewInit(){
  }

}
