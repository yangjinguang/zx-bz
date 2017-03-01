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
    public applyData: any;
    public phoneCodeList = ['+86', '+65'];

    constructor(private route: ActivatedRoute, private api: Api) {
        this.data = {
            type: Number(route.snapshot.params['type']),
        };
        this.applyData = {
            certItemId: this.data.type,
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
        if (this.applyData.phoneNumber == '') {
            alert('手机号不能为空');
            return;
        }
        this.api.saveApply(this.applyData).then((result) => {
            this.data.success = true;
        })
    }

}