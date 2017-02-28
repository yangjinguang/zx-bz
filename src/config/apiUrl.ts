'use strict';
export const ApiHost = 'http://localhost:3000';
export const ApiUrl = {
    login: ApiHost + '/user/login',
    logout: ApiHost + '/user/logout',
    getCertItems: ApiHost + '/cert',
    apply: ApiHost + '/apply',
    applySearch: ApiHost + '/apply/search',
    applyStatus: ApiHost + '/apply/status',
    question: ApiHost + '/question',
};