'use strict';
import {Injectable} from "@angular/core";
import {Http, Response, Headers, RequestOptions, URLSearchParams} from "@angular/http";
import {ApiUrl} from "../config/apiUrl";
import 'rxjs/add/operator/toPromise';

@Injectable()
export class Api {
    constructor(private http: Http) {

    }

    private extractData(res: Response) {
        let body = res.json();
        return body.data || {};
    }

    private queryMk(paramsData) {
        let params = new URLSearchParams();
        for (let k in paramsData) {
            if (paramsData[k] !== '') {
                params.set(k, paramsData[k])
            }
        }
        return params
    }

    private handleError(error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Promise.reject(errMsg);
    }

    public getCertItems(type: Number): Promise<any> {
        return this.http.get(ApiUrl.getCertItems + '/' + type)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    public saveApply(applyData): Promise<any> {
        return this.http.post(ApiUrl.apply, applyData)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    public applySearch(searchData): Promise<any> {

        return this.http.get(ApiUrl.applySearch, {search: this.queryMk(searchData)})
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    public getQuestion(): Promise<any> {
        return this.http.get(ApiUrl.question)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }
}