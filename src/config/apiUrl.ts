'use strict';
let ApiHost = 'http://localhost:3000';
if (process.env.ENV === 'production') {
    ApiHost = 'http://211.98.143.246:3000';
}
const ApiUrl = {
    login: ApiHost + '/user/login',
    logout: ApiHost + '/user/logout',
    getCertItems: ApiHost + '/cert',
    apply: ApiHost + '/apply',
    applySearch: ApiHost + '/apply/search',
    applyStatus: ApiHost + '/apply/status',
    question: ApiHost + '/question',
};
export {
    ApiHost,
    ApiUrl
}