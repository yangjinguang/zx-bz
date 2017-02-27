'use strict';

import {Component, OnInit} from '@angular/core';
import {Api} from "../../services/api.service";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
    selector: 'question-page',
    templateUrl: './question.component.html',
    styleUrls: ['./question.component.scss'],
})
export class QuestionPage implements OnInit {
    public data: any;

    constructor(private api: Api, private sanitizer: DomSanitizer) {
        this.data = {
            questions: []
        }
    }

    ngOnInit(): void {
        this.api.getQuestion().then((result: Array<any>) => {
            result.forEach((question) => {
                question.answer = this.sanitizer.bypassSecurityTrustHtml(question.answer);
            });
            this.data.questions = result;
        })
    }

    public showAnswer(question) {
        question.isShow = !question.isShow
    }
}