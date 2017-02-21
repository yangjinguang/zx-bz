'use strict';

import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Api} from "../../services/api.service";

@Component({
    selector: 'cert-form-page',
    templateUrl: './cert-form.component.html',
    styleUrls: ['./cert-form.component.scss'],
})
export class CertFormPage implements OnInit {
    public data: any;
    public applyData: Object;
    public phoneCodeList = ['+86', '+65'];

    constructor(private route: ActivatedRoute, private api: Api) {
        this.data = {
            type: Number(route.snapshot.params['type']),
        };
        this.applyData = {
            name: '',
            shipType: '',
            post: '',
            phoneCode: '+86',
            phoneNumber: ''
        }
    }

    ngOnInit(): void {

    }

    public saveApply(): void {
        console.log(this.applyData);
        this.data.success = true;
    }

}