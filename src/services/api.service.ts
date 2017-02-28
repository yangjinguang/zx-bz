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
        return Promise.reject(error);
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

    public getApplies(page = 1, limit = 20): Promise<any> {
        let headers = new Headers({'Authorization': localStorage['token']});
        let options = new RequestOptions({headers: headers, search: this.queryMk({page: page, limit: limit})});
        return this.http.get(ApiUrl.apply, options)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    public updateAppliesStatus(id, status): Promise<any> {
        let headers = new Headers({'Authorization': localStorage['token']});
        let options = new RequestOptions({headers: headers});
        return this.http.put(ApiUrl.applyStatus + '/' + id, {status: status}, options)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    public deleteApply(id): Promise<any> {
        let headers = new Headers({'Authorization': localStorage['token']});
        let options = new RequestOptions({headers: headers});
        return this.http.delete(ApiUrl.apply + '/' + id, options)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    public login(loginData): Promise<any> {
        return this.http.post(ApiUrl.login, loginData)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    public logout(): Promise<any> {
        let headers = new Headers({'Authorization': localStorage['token']});
        let options = new RequestOptions({headers: headers});
        return this.http.get(ApiUrl.logout, options)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }
}