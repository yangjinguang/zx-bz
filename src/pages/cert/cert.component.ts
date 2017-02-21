import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Api} from "../../services/api.service";
import {MdDialogRef, MdDialog, MdDialogConfig} from "@angular/material";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
    selector: 'cert-page',
    templateUrl: './cert.component.html',
    styleUrls: ['./cert.component.scss'],
})
export class CertPage implements OnInit,OnDestroy {
    public data: any;

    constructor(private route: ActivatedRoute, private api: Api, private dialog: MdDialog) {
        this.data = {
            type: Number(route.snapshot.params['type']),
            items: []
        }
    }

    ngOnInit(): void {
        this.api.getCertItems(this.data.type).then((result) => {
            this.data.items = result
        });
        // switch (this.data.type) {
        //     case 1:
        //         items = [
        //             {
        //                 id: 1,
        //                 name: '海员证'
        //             },
        //             {
        //                 id: 2,
        //                 name: '服务薄'
        //             },
        //             {
        //                 id: 3,
        //                 name: '合格证'
        //             },
        //             {
        //                 id: 4,
        //                 name: '信任证'
        //             },
        //             {
        //                 id: 5,
        //                 name: '实习记录薄开封'
        //             }
        //         ];
        //         break;
        //     case 2:
        //         items = [
        //             {
        //                 id: 6,
        //                 name: '美国'
        //             },
        //             {
        //                 id: 7,
        //                 name: '新加坡'
        //             },
        //             {
        //                 id: 8,
        //                 name: '马来西亚'
        //             },
        //
        //         ];
        //         break;
        //     case 3:
        //         items = [
        //             {
        //                 id: 4,
        //                 name: '香港证书'
        //             },
        //             {
        //                 id: 5,
        //                 name: '巴拿马证书'
        //             }
        //         ]
        // }
    }

    ngOnDestroy(): void {
        this.dialog.closeAll()
    }

    public openDetail(item) {
        let config = new MdDialogConfig();
        config.data = item;
        config.width = '100%';
        config.height = '100%';
        let dialogRef = this.dialog.open(CertDetailModal, config);

        dialogRef.afterClosed().subscribe(result => {

        });
    }

}

@Component({
    selector: 'cert-detail-modal',
    templateUrl: './cert-detail-modal.tpl.html',
})
export class CertDetailModal {
    public data: any;

    constructor(public dialogRef: MdDialogRef<CertDetailModal>, private sanitizer: DomSanitizer, private router: Router) {
        let item = dialogRef.config.data;
        this.data = {
            id: item.id,
            title: item.type == 2 ? item.name + '签证办理须知' : item.name + '办理须知',
            desc: this.sanitizer.bypassSecurityTrustHtml(dialogRef.config.data.desc)
        };
        console.log(this.data)
    }

    public toCertForm(item): void {
        this.router.navigate(['/cert-form', this.data.id]);
        // this.dialogRef.close()
    }
}