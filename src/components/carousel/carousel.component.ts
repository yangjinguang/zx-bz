import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'carousel',
    templateUrl: './carousel.component.html',
    styleUrls: ['./carousel.component.scss']
})
export class Carousel implements OnInit {
    @Input() images: Array<string>;
    @Input() delay: Number;

    public data: any;

    constructor() {
        this.data = {};
        this.data.tab = 0;
    }

    ngOnInit(): void {
        let timer = setInterval(() => {
            if (this.data.tab < this.images.length - 1) {
                this.data.tab += 1;
            } else {
                this.data.tab = 0;
            }
        }, this.delay || 2500)
    }
}