import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'cert-page',
    templateUrl: './cert.component.html',
    styleUrls: ['./cert.component.scss'],
})
export class CertPage implements OnInit {
    public data: any;

    constructor(private route: ActivatedRoute) {
        this.data = {
            type: Number(route.snapshot.params['type']),
            items: []
        }
    }

    ngOnInit(): void {
        let items = [];
        switch (this.data.type) {
            case 1:
                items = [
                    {
                        id: 1,
                        name: '海员证'
                    },
                    {
                        id: 2,
                        name: '服务薄'
                    },
                    {
                        id: 3,
                        name: '合格证'
                    },
                    {
                        id: 4,
                        name: '信任证'
                    },
                    {
                        id: 5,
                        name: '实习记录薄开封'
                    }
                ];
                break;
            case 2:
                items = [
                    {
                        id: 6,
                        name: '美国'
                    },
                    {
                        id: 7,
                        name: '新加坡'
                    },
                    {
                        id: 8,
                        name: '马来西亚'
                    },

                ];
                break;
            case 3:
                items = [
                    {
                        id: 4,
                        name: '香港证书'
                    },
                    {
                        id: 5,
                        name: '巴拿马证书'
                    }
                ]
        }
        this.data.items = items;
    }

}