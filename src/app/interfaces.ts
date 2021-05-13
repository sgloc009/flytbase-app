import { EventEmitter } from "@angular/core";

export interface boxProps{
    x: number;
    y: number;
    focused: boolean;
    zIndex: string;
    index: number;
    focusedEvent: EventEmitter<number>;
}

export interface boxList{
    
}