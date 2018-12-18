'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var request = require('request-promise-native');

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var bringApiUrl = "https://api.getbring.com/rest/v2/";
// Service to access the bring API
var BringService = /** @class */ (function () {
    function BringService() {
        this.cache = {};
    }
    BringService.prototype.setOptions = function (options) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                console.log('BringService.setOptions()');
                this.options = options;
                this.userContext = undefined; // reset login
                return [2 /*return*/];
            });
        });
    };
    BringService.prototype.start = function (context) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                this.context = context;
                console.log('BringService.start()');
                return [2 /*return*/];
            });
        });
    };
    BringService.prototype.stop = function () {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                console.log('BringService.stop()');
                return [2 /*return*/];
            });
        });
    };
    BringService.prototype.getOptions = function () {
        return this.options;
    };
    BringService.prototype.initLogin = function () {
        return __awaiter(this, void 0, Promise, function () {
            var loginReponse, getListsResponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.userContext) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.login()];
                    case 1:
                        loginReponse = _a.sent();
                        this.userContext = {
                            loginTimestamp: new Date().getTime(),
                            name: loginReponse.name,
                            email: loginReponse.email,
                            uuid: loginReponse.uuid,
                            bringListUUID: loginReponse.bringListUUID,
                            accessToken: loginReponse.access_token,
                            refreshToken: loginReponse.refresh_token,
                            expiresIn: loginReponse.expires_in,
                            photoPath: loginReponse.photoPath,
                            publicUuid: loginReponse.publicUuid,
                            lists: []
                        };
                        return [4 /*yield*/, this.getLists()];
                    case 2:
                        getListsResponse = _a.sent();
                        this.userContext.lists = getListsResponse.lists;
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Get all items from the current selected shopping list
    BringService.prototype.getDefaultList = function () {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.initLogin()];
                    case 1:
                        _a.sent();
                        if (!this.userContext) {
                            throw new Error('login failed');
                        }
                        return [2 /*return*/, this.getList(this.userContext.bringListUUID)];
                }
            });
        });
    };
    BringService.prototype.getList = function (listUuid) {
        return __awaiter(this, void 0, Promise, function () {
            var list, listDetails;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.initLogin()];
                    case 1:
                        _a.sent();
                        if (!this.userContext) {
                            throw new Error('login failed');
                        }
                        return [4 /*yield*/, this.getResponse('get', "bringlists/" + listUuid)];
                    case 2:
                        list = _a.sent();
                        listDetails = this.userContext.lists.find(function (x) { return x.listUuid === listUuid; });
                        return [2 /*return*/, {
                                uuid: list.uuid,
                                name: listDetails && listDetails.name || '-',
                                items: list.purchase
                            }];
                }
            });
        });
    };
    BringService.prototype.login = function () {
        if (!this.options.username || !this.options.password) {
            throw new Error('Username/Password missing!');
        }
        return this.getResponse('post', "bringauth", "email=" + this.options.username + "&password=" + this.options.password);
    };
    BringService.prototype.getLists = function () {
        return this.getResponse('get', "bringusers/" + this.userContext.uuid + "/lists");
    };
    // Save an item to your current shopping list
    // private saveItem(itemName: string, specification?: string) {
    //   return this.getResponse('put', "bringlists/" + this.bringListUUID, "purchase=" + itemName + "&recently=&specification=" + specification + "&remove=&sender=null");
    // }
    // // remove an item from your current shopping list
    // private removeItem(itemName: string) {
    //   return this.getResponse('put', "bringlists/" + this.bringListUUID, "purchase=&recently=&specification=&remove=" + itemName + "&sender=null");
    // }
    // // Search for an item
    // private searchItem(search: string) {
    //   return this.getResponse('get', "bringlistitemdetails/", "?listUuid=" + this.bringListUUID + "&itemId=" + search);
    // }
    // // Hidden Icons? Don't know what this is used for
    // private loadProducts() {
    //   return this.getResponse('get', "bringproducts");
    // }
    // // Found Icons? Don't know what this is used for
    // private loadFeatures() {
    //   return this.getResponse('get', "bringusers/" + this.bringUUID + "/features");
    // }
    // // Loads all shopping lists
    // private loadLists() {
    //   return this.getResponse('get', "bringusers/" + this.bringUUID + "/lists");
    // }
    // // Get all users from a shopping list
    // private getAllUsersFromList(listUUID: string) {
    //   return this.getResponse('get', "bringlists/" + listUUID + "/users");
    // }
    // private getUserSettings() {
    //   return this.getResponse('get', "bringusersettings/" + this.bringUUID);
    // }
    BringService.prototype.getHeader = function () {
        // tslint:disable:no-unused-expression
        // tslint:disable:no-string-literal
        var header = {
            'Origin': 'https://web.getbring.com',
            'Referer': 'https://web.getbring.com/login',
            // 'X-BRING-CLIENT-INSTANCE-ID': 'Web-xxxxxx',
            'X-BRING-API-KEY': 'cof4Nc6D8saplXjE3h3HXqHH8m7VU2i1Gs0g85Sp',
            'X-BRING-CLIENT': 'webApp',
            'X-BRING-CLIENT-SOURCE': 'webApp',
            'X-BRING-COUNTRY': 'DE',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36',
            'Accept': 'application/json, text/plain, */*'
        };
        if (this.userContext) {
            header['X-BRING-USER-UUID'] = this.userContext.uuid;
            header['Authorization'] = 'Bearer ' + this.userContext.accessToken;
            header['Cookie'] = 'refresh_token=' + this.userContext.refreshToken;
        }
        return header;
    };
    BringService.prototype.getResponse = function (method, url, parameter, sendHeader) {
        if (sendHeader === void 0) { sendHeader = true; }
        return __awaiter(this, void 0, Promise, function () {
            var now, validCacheTime, requestOptions, response, _a, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        console.log('BringService.' + method + '(' + url + ')');
                        now = Date.now();
                        validCacheTime = now - (this.options.cacheDuration * 60 * 1000);
                        url = bringApiUrl + url;
                        if (method === 'get' && parameter) {
                            url += parameter;
                        }
                        // check timestamp - only cache get requests
                        if (method !== 'get' || this.cache[url] && this.cache[url].timestamp < validCacheTime) {
                            delete (this.cache[url]);
                        }
                        if (!!this.cache[url]) return [3 /*break*/, 11];
                        requestOptions = {
                            json: true,
                            resolveWithFullResponse: true,
                            rejectUnauthorized: false,
                            headers: sendHeader ? this.getHeader() : {},
                            body: method !== 'get' ? encodeURI(parameter || '') : undefined
                        };
                        response = void 0;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 9, , 10]);
                        _a = method;
                        switch (_a) {
                            case 'get': return [3 /*break*/, 2];
                            case 'put': return [3 /*break*/, 4];
                            case 'post': return [3 /*break*/, 6];
                        }
                        return [3 /*break*/, 8];
                    case 2: return [4 /*yield*/, request.get(url, requestOptions)];
                    case 3:
                        response = _b.sent();
                        return [3 /*break*/, 8];
                    case 4: return [4 /*yield*/, request.put(url, requestOptions)];
                    case 5:
                        response = _b.sent();
                        return [3 /*break*/, 8];
                    case 6:
                        requestOptions.headers['Content-Type'] = 'application/x-www-form-urlencoded';
                        return [4 /*yield*/, request.post(url, requestOptions)];
                    case 7:
                        response = _b.sent();
                        return [3 /*break*/, 8];
                    case 8:
                        console.log(response && response.body);
                        return [3 /*break*/, 10];
                    case 9:
                        error_1 = _b.sent();
                        console.log(error_1);
                        throw new Error(JSON.stringify(error_1));
                    case 10:
                        if (!response) {
                            throw new Error('no response');
                        }
                        if (response.statusCode !== 200) {
                            throw new Error(response.statusMessage);
                        }
                        this.cache[url] = {
                            timestamp: now,
                            result: response.body,
                            url: url
                        };
                        _b.label = 11;
                    case 11: return [2 /*return*/, this.cache[url].result];
                }
            });
        });
    };
    return BringService;
}());

// export reactron service definition
var services = [{
        description: 'Service for getbring.com',
        displayName: 'Shopping List',
        fields: [{
                displayName: 'Username',
                description: 'Username',
                name: 'username',
                valueType: 'string',
            }, {
                displayName: 'Password',
                description: 'Password',
                name: 'password',
                valueType: 'password',
            }, {
                defaultValue: 5,
                description: 'Cache duration in minutes',
                displayName: 'Cache duration (min)',
                name: 'cacheDuration',
                valueType: 'number',
                minValue: 0,
                maxValue: 120,
                stepSize: 5
            }],
        name: 'BringService',
        service: BringService
    }];

exports.services = services;
//# sourceMappingURL=bundle.server.js.map
