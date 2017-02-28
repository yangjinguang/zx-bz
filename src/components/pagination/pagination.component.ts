import {Component, Input, OnInit, OnChanges, EventEmitter, Output} from '@angular/core';

@Component({
    selector: 'pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss']
})
export class Pagination implements OnInit,OnChanges {
    @Input() pages = 1;
    @Input() page = 1;
    @Output() onPageChange = new EventEmitter();

    public data: any;

    constructor() {
        this.data = {
            pageNumArr: [],
            isIndexPage: true,
            isLastPage: false,
            showMore: true
        };
    }

    ngOnInit(): void {
        console.log(this.pages)
    }

    ngOnChanges(): void {
        this.pageNumRebuild()
    }

    private pageNumRebuild() {
        this.data.pageNumArr = [];
        if (this.pages <= 5) {
            this.data.showMore = false;
            for (let i = 1; i <= this.pages; i++) {
                this.data.pageNumArr.push(i)
            }
        } else if (this.page <= 3) {
            this.data.showMore = true;
            for (let i = 1; i <= 5; i++) {
                this.data.pageNumArr.push(i)
            }
        } else if (this.page + 2 >= this.pages) {
            this.data.showMore = false;
            for (let i = this.pages - 5; i <= this.pages; i++) {
                this.data.pageNumArr.push(i)
            }
        } else {
            this.data.showMore = true;
            for (let i = this.page - 2; i <= this.page + 2; i++) {
                this.data.pageNumArr.push(i)
            }
        }

        this.data.isLastPage = this.page >= this.pages;
        this.data.isIndexPage = this.page <= 1;
    }

    public pageChange(p): void {
        this.onPageChange.emit(p);
    }

    public nextPage(): void {
        if (this.page < this.pages) {
            this.onPageChange.emit(this.page + 1)
        }
    }

    public prePage(): void {
        if (this.page > 1) {
            this.onPageChange.emit(this.page - 1)
        }
    }

    public toIndexPage(): void {
        this.onPageChange.emit(1)
    }

    public toLastPage(): void {
        this.onPageChange.emit(this.pages)
    }
}