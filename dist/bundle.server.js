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

var bringApiUrl = "https://api.getbring.com/rest/";
// Service to access the WUnderground API
var BringService = /** @class */ (function () {
    function BringService() {
        this.cache = {};
        this.bringUUID = "";
        this.bringListUUID = "";
    }
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
    BringService.prototype.setOptions = function (options) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                console.log('BringService.setOptions()');
                this.options = options;
                return [2 /*return*/];
            });
        });
    };
    BringService.prototype.getOptions = function () {
        return this.options;
    };
    BringService.prototype.getList = function () {
        return __awaiter(this, void 0, Promise, function () {
            var loginReponse, itemsResponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.login()];
                    case 1:
                        loginReponse = _a.sent();
                        this.bringUUID = loginReponse.uuid;
                        this.bringListUUID = loginReponse.bringListUUID;
                        console.log('bringUUID', this.bringUUID);
                        console.log('bringListUUID', this.bringListUUID);
                        if (!this.bringUUID) {
                            return [2 /*return*/, {
                                    uuid: 'test',
                                    name: 'Liste 1',
                                    items: [
                                        { name: 'Salami' },
                                        { name: 'Käse' },
                                    ]
                                }];
                        }
                        return [4 /*yield*/, this.getItems()];
                    case 2:
                        itemsResponse = _a.sent();
                        return [2 /*return*/, itemsResponse.body];
                }
            });
        });
    };
    // public __construct(UUID,listUUID, useLogin = false)
    // {
    //   if(useLogin) {
    //     login = json_decode(this.login(UUID,listUUID),true);
    //     if(this.answerHttpStatus == 200 && login != "") {
    //       this.bringUUID = login['uuid'];
    //       this.bringListUUID = login['bringListUUID'];
    //     } else {
    //       die("Wrong Login!");
    //     }
    //   } else {
    //     this.bringUUID = UUID;
    //     this.bringListUUID = listUUID;
    //   }
    // }
    BringService.prototype.login = function () {
        return this.getResponse('get', "bringlists/", "?email=" + this.options.username + "&password=" + this.options.password, false);
    };
    // Get all items from the current selected shopping list
    BringService.prototype.getItems = function () {
        return this.getResponse('get', "bringlists/" + this.bringListUUID);
    };
    // Save an item to your current shopping list
    BringService.prototype.saveItem = function (itemName, specification) {
        return this.getResponse('put', "bringlists/" + this.bringListUUID, "purchase=" + itemName + "&recently=&specification=" + specification + "&remove=&sender=null");
    };
    // remove an item from your current shopping list
    BringService.prototype.removeItem = function (itemName) {
        return this.getResponse('put', "bringlists/" + this.bringListUUID, "purchase=&recently=&specification=&remove=" + itemName + "&sender=null");
    };
    // Search for an item
    BringService.prototype.searchItem = function (search) {
        return this.getResponse('get', "bringlistitemdetails/", "?listUuid=" + this.bringListUUID + "&itemId=" + search);
    };
    // Hidden Icons? Don't know what this is used for
    BringService.prototype.loadProducts = function () {
        return this.getResponse('get', "bringproducts");
    };
    // Found Icons? Don't know what this is used for
    BringService.prototype.loadFeatures = function () {
        return this.getResponse('get', "bringusers/" + this.bringUUID + "/features");
    };
    // Loads all shopping lists
    BringService.prototype.loadLists = function () {
        return this.getResponse('get', "bringusers/" + this.bringUUID + "/lists");
    };
    // Get all users from a shopping list
    BringService.prototype.getAllUsersFromList = function (listUUID) {
        return this.getResponse('get', "bringlists/" + listUUID + "/users");
    };
    BringService.prototype.getUserSettings = function () {
        return this.getResponse('get', "bringusersettings/" + this.bringUUID);
    };
    // Handles the request to the server
    // private request(method: string, url: string, parameter: string, customHeader = false) {
    // ch = curl_init();
    // additionalHeaderInfo = "";
    // switch (method) {
    //   case 'get':
    //     curl_setopt(ch, CURLOPT_URL, this.bringRestURL.request.parameter);
    //     break;
    //   case 'post':
    //     curl_setopt(ch, CURLOPT_URL, this.bringRestURL.request);
    //     curl_setopt(ch, CURLOPT_POST, true);
    //     curl_setopt(ch, CURLOPT_POSTFIELDS, parameter);
    //     break;
    //   case 'put':
    //     fh = tmpfile();
    //     fwrite(fh, parameter);
    //     fseek(fh, 0);
    //     curl_setopt(ch, CURLOPT_URL, this.bringRestURL.request);
    //     curl_setopt(ch, CURLOPT_PUT, true);
    //     curl_setopt(ch, CURLOPT_INFILE, fh);
    //     curl_setopt(ch, CURLOPT_INFILESIZE, strlen(parameter));
    //     additionalHeaderInfo = 'Content-Type: application/x-www-form-urlencoded; charset=UTF-8';
    //     break;
    // }
    // curl_setopt(ch, CURLOPT_RETURNTRANSFER, true);
    // if (customHeader) {
    //   curl_setopt(ch, CURLOPT_HTTPHEADER, this.getHeader((additionalHeaderInfo != "") ? additionalHeaderInfo : null));
    // }
    // server_output = curl_exec(ch);
    // this.answerHttpStatus = curl_getinfo(ch, CURLINFO_HTTP_CODE);
    // curl_close(ch);
    // return server_output;
    // }
    BringService.prototype.getHeader = function () {
        var header = {
            'X-BRING-API-KEY': 'cof4Nc6D8saplXjE3h3HXqHH8m7VU2i1Gs0g85Sp',
            'X-BRING-CLIENT': 'android',
            'X-BRING-USER-UUID': this.bringUUID,
            'X-BRING-VERSION': '303070050',
            'X-BRING-COUNTRY': 'de',
        };
        return header;
    };
    BringService.prototype.getResponse = function (method, url, parameter, sendHeader) {
        if (sendHeader === void 0) { sendHeader = true; }
        return __awaiter(this, void 0, Promise, function () {
            var now, validCacheTime, requestOptions, response, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        console.log('BringService.' + method + '(' + url + ')');
                        now = Date.now();
                        validCacheTime = now - (this.options.cacheDuration * 60 * 1000);
                        url = bringApiUrl + url;
                        if (method === 'get') {
                            url += parameter;
                        }
                        // check timestamp - only cache get requests
                        if (method !== 'get' || this.cache[url] && this.cache[url].timestamp < validCacheTime) {
                            delete (this.cache[url]);
                        }
                        if (!!this.cache[url]) return [3 /*break*/, 8];
                        requestOptions = {
                            json: true,
                            resolveWithFullResponse: true,
                            rejectUnauthorized: false,
                            headers: sendHeader ? this.getHeader() : {},
                            body: method !== 'get' ? parameter : undefined
                        };
                        response = void 0;
                        _a = method;
                        switch (_a) {
                            case 'get': return [3 /*break*/, 1];
                            case 'put': return [3 /*break*/, 3];
                            case 'post': return [3 /*break*/, 5];
                        }
                        return [3 /*break*/, 7];
                    case 1: return [4 /*yield*/, request.get(url, requestOptions)];
                    case 2:
                        response = _b.sent();
                        return [3 /*break*/, 7];
                    case 3: return [4 /*yield*/, request.put(url, requestOptions)];
                    case 4:
                        response = _b.sent();
                        return [3 /*break*/, 7];
                    case 5: return [4 /*yield*/, request.post(url, requestOptions)];
                    case 6:
                        response = _b.sent();
                        return [3 /*break*/, 7];
                    case 7:
                        console.log(response && response.body);
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
                        _b.label = 8;
                    case 8: return [2 /*return*/, this.cache[url].result];
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
