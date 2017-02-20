import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'home-page',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomePage implements OnInit {
    public data: any;

    constructor() {
        this.data = {
            images: []
        }
    }

    ngOnInit(): void {
        this.data.images = [
            require('../../../assets/img/banner-1.jpg'),
            require('../../../assets/img/banner-2.jpg'),
            require('../../../assets/img/banner-3.jpg')
        ]
    }

}