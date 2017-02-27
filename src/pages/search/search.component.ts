'use strict';

import {Component, OnInit} from '@angular/core';
import {Api} from "../../services/api.service";

@Component({
    selector: 'search-page',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
})
export class SearchPage implements OnInit {
    public data: any;
    public searchData: any;

    constructor(private api: Api) {
        this.data = {
            applies: {}
        };
        this.searchData = {
            name: '',
            phoneNumber: ''
        }
    }

    ngOnInit(): void {
    }

    public toSearch(): void {
        this.api.applySearch(this.searchData).then((result) => {
            this.data.applies = result;
            console.log(this.data.applies)
        })
    }
}