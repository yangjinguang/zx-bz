import {Directive, ElementRef, Input, HostListener, Output, EventEmitter} from '@angular/core';

@Directive({selector: '[infiniteScroll]'})
export class InfiniteScrollDirective {
    @Output() toRefresh = new EventEmitter();

    constructor(private el: ElementRef) {
    }

    @HostListener('scroll') onScroll() {
        let scrollTop = this.el.nativeElement.scrollTop;
        let scrollHeight = this.el.nativeElement.scrollHeight;
        let clientHeight = this.el.nativeElement.clientHeight;
        if (scrollTop + clientHeight >= scrollHeight) {
            this.toRefresh.emit()
        }
    }
}