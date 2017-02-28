'use strict';

import {Component, OnInit} from '@angular/core';
import {Api} from "../../services/api.service";
import {MdDialogRef, MdDialog} from "@angular/material";

@Component({
    selector: 'admin-page',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss'],
})
export class AdminPage implements OnInit {
    public data: any;

    constructor(private api: Api, private dialog: MdDialog) {
        this.data = {
            applies: [],
            isLogin: false,
            loginData: {
                username: '',
                password: ''
            },
            page: 1,
            pages: 1,
            limit: 20
        }
    }

    ngOnInit(): void {
        if (!localStorage['token']) {
            this.data.isLogin = false
        } else {
            this.data.isLogin = true;
            this.dataInit()
        }

    }

    private dataInit(): void {
        this.api.getApplies(this.data.page, this.data.limit).then((result) => {
            this.data.applies = result.list;
            if (result.total > this.data.limit) {
                if (result.total % this.data.limit == 0) {
                    this.data.pages = result.total / this.data.limit
                } else {
                    this.data.pages = Math.floor(result.total / this.data.limit) + 1
                }
            } else {
                this.data.pages = 1
            }
        }).catch((err) => {
            if (err.status == 401) {
                delete localStorage['token'];
                delete localStorage['userId'];
                delete localStorage['username'];
                this.data.isLogin = false;

            }
            console.log(err)
        })
    }

    public login() {
        this.api.login(this.data.loginData).then((result) => {
            localStorage['token'] = result.token;
            localStorage['userId'] = result.id;
            localStorage['username'] = result.username;
            this.data.isLogin = true;
            this.dataInit()
        }).catch((err) => {
            console.log(err)
        })
    }

    public logout() {
        this.api.logout().then(() => {
            delete localStorage['token'];
            delete localStorage['userId'];
            delete localStorage['username'];
            this.data.isLogin = false;
        })
    }

    public changeStatus(apply) {
        let dialogRef = this.dialog.open(ApplyStatusModal, {
            width: '500px',
            height: '200px',
            data: apply
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result['refresh']) {
                this.dataInit();
            }
        });
    }

    public applyDel(apply) {
        console.log(apply);
        let dialogRef = this.dialog.open(ConfirmModal, {
            width: '400px',
            height: '150px',
            data: {
                msg: '确定要删除此申请?'
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.dataInit()
            }
        });
    }

    public pageChange(page) {
        this.data.page = page;
        this.dataInit();
    }
}

@Component({
    selector: 'apply-status-modal',
    templateUrl: './apply-status-modal.tpl.html',
})
export class ApplyStatusModal {
    public data: any;

    constructor(public dialogRef: MdDialogRef<ApplyStatusModal>, public api: Api) {
        this.data = {
            apply: Object.assign({}, dialogRef.config.data),
            status: [
                {
                    key: 1,
                    value: '审核中'
                },
                {
                    key: 2,
                    value: '审核未通过'
                },
                {
                    key: 3,
                    value: '审核通过'
                },
                {
                    key: 4,
                    value: '办理成功'
                },
                {
                    key: 5,
                    value: '办理失败'
                }
            ]
        }
    }

    public save() {
        console.log(this.data.apply);
        this.api.updateAppliesStatus(this.data.apply.id, this.data.apply.status).then(() => {
            this.dialogRef.close({refresh: true})
        }).catch((err) => {
            this.dialogRef.close({refresh: false})
        })
    }
}

@Component({
    selector: 'confirm-modal',
    templateUrl: './confirm-modal.tpl.html',
})
export class ConfirmModal {
    public data: any;

    constructor(public dialogRef: MdDialogRef<ConfirmModal>) {
        this.data = {
            msg: dialogRef.config.data.msg
        }
    }

    public ok() {
        this.dialogRef.close(true)
    }

    public cancel() {
        this.dialogRef.close(false)
    }
}