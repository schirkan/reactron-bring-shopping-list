'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

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

// Service to access the WUnderground API
var BringService = /** @class */ (function () {
    function BringService() {
        this.cache = {};
        this.bringRestURL = "https://api.getbring.com/rest/";
        this.bringUUID = "";
        this.bringListUUID = "";
        // private getApiUrl(endpoint: string, location: ILocationRequest): string {
        //     let url = baseUrl + endpoint
        //         + '?APPID=' + this.options.apiKey
        //         + '&units=' + this.options.units
        //         + '&lang=' + this.context.settings.lang;
        //     if (location) {
        //         if (location.cityName) {
        //             url += '&q=' + location.cityName;
        //         }
        //         if (location.zip) {
        //             url += '&zip=' + location.zip;
        //         }
        //         if (location.coords) {
        //             url += '&lon=' + location.coords.lon + '&lat=' + location.coords.lat;
        //         }
        //         if (location.cityId) {
        //             url += '&id=' + location.cityId;
        //         }
        //     }
        //     return url;
        // }
        // private async getResponse(url: string): Promise<any> {
        //     console.log('BringService.get(' + url + ')');
        //     const now = Date.now();
        //     const validCacheTime = now - (this.options.cacheDuration * 60 * 1000);
        //     // check timestamp
        //     if (this.cache[url] && this.cache[url].timestamp < validCacheTime) {
        //         delete (this.cache[url]);
        //     }
        //     if (!this.cache[url]) {
        //         const response = await request.get(url, { json: true, resolveWithFullResponse: true }) as request.FullResponse;
        //         if (response.statusCode !== 200) {
        //             throw new Error(response.statusMessage);
        //         }
        //         this.cache[url] = {
        //             timestamp: now,
        //             result: response.body,
        //             url
        //         };
        //     }
        //     return this.cache[url].result;
        // }
        // GET /rest/v2/bringlists/b306f2d1-e3fd-4cb7-b700-6f5892582fbf HTTP/1.1
        // Host: api.getbring.com
        // Connection: keep-alive
        // Pragma: no-cache
        // Cache-Control: no-cache
        // X-BRING-CLIENT-INSTANCE-ID: Web-vWfAI9GOTm8rryh0kf2fYMmzRSoDM4eW
        // Origin: https://web.getbring.com
        // X-BRING-API-KEY: cof4Nc6D8saplXjE3h3HXqHH8m7VU2i1Gs0g85Sp
        // Authorization: Bearer eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE1NDUzMjQxMzgsInN1YiI6ImJyaW5nQHNjaGlya2FuLmRlIiwicHJpdmF0ZVV1aWQiOiJmNTNmZDgzNi04ZDkwLTRiZTgtOTFiMy0xYmZmNDE1MTViOTkifQ.A7brBFwODvphbmvJBG-hg-mICwuyR-jPnrnrsy5V-Mcp31iO91jn3_cWYuIh-scv7YYZ6Ma_9nMM9vvvm0Nw8w
        // X-BRING-CLIENT-SOURCE: webApp
        // Accept: application/json, text/plain, */*
        // X-BRING-CLIENT: webApp
        // X-BRING-USER-UUID: f53fd836-8d90-4be8-91b3-1bff41515b99
        // User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36
        // X-BRING-COUNTRY: DE
        // DNT: 1
        // Referer: https://web.getbring.com/app/lists/0
        // Accept-Encoding: gzip, deflate, br
        // Accept-Language: de-DE,de;q=0.9,en-US;q=0.8,en;q=0.7
        // Cookie: _ga=GA1.2.651234461.1536857181; refresh_token=eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjMxMTM2NTcxODIsInByaXZhdGVVdWlkIjoiZjUzZmQ4MzYtOGQ5MC00YmU4LTkxYjMtMWJmZjQxNTE1Yjk5In0.eolIXTK00-SJBQbGJPrUzqzzqG9Mezds4g0xeBtefyGZhtyxzFQWp37zTQGBPSNo_u7KxHLKE1f6BawjMYHt3Q; _gid=GA1.2.1697804451.1544719302; _gat_bringWebAppGeneralTracker=1
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
            return __generator(this, function (_a) {
                return [2 /*return*/, {
                        uuid: 'test',
                        name: 'Liste 1',
                        items: [
                            { name: 'Salami' },
                            { name: 'Käse' },
                        ]
                    }];
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
    BringService.prototype.login = function (email, password) {
        return this.request('get', "bringlists", "?email=" + email + "&password=" + password);
    };
    // Get all items from the current selected shopping list
    BringService.prototype.getItems = function () {
        return this.request('get', "bringlists/" + this.bringListUUID, "", true);
    };
    // Save an item to your current shopping list
    BringService.prototype.saveItem = function (itemName, specification) {
        return this.request('put', "bringlists/" + this.bringListUUID, "purchase=" + itemName + "&recently=&specification=" + specification + "&remove=&sender=null", true);
    };
    // remove an item from your current shopping list
    BringService.prototype.removeItem = function (itemName) {
        return this.request('put', "bringlists/" + this.bringListUUID, "purchase=&recently=&specification=&remove=" + itemName + "&sender=null", true);
    };
    // Search for an item
    BringService.prototype.searchItem = function (search) {
        return this.request('get', "bringlistitemdetails/", "?listUuid=" + this.bringListUUID + "&itemId=" + search, true);
    };
    // Hidden Icons? Don't know what this is used for
    BringService.prototype.loadProducts = function () {
        return this.request('get', "bringproducts", "", true);
    };
    // Found Icons? Don't know what this is used for
    BringService.prototype.loadFeatures = function () {
        return this.request('get', "bringusers/" + this.bringUUID + "/features", "", true);
    };
    // Loads all shopping lists
    BringService.prototype.loadLists = function () {
        return this.request('get', "bringusers/" + this.bringUUID + "/lists", "", true);
    };
    // Get all users from a shopping list
    BringService.prototype.getAllUsersFromList = function (listUUID) {
        return this.request('get', "bringlists/" + listUUID + "/users", "", true);
    };
    BringService.prototype.getUserSettings = function () {
        return this.request('get', "bringusersettings/" + this.bringUUID, "", true);
    };
    // Handles the request to the server
    BringService.prototype.request = function (type, url, parameter, customHeader) {
        // ch = curl_init();
        // additionalHeaderInfo = "";
        // switch (type) {
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
        if (customHeader === void 0) { customHeader = false; }
        // return server_output;
    };
    BringService.prototype.getHeader = function () {
        var header = [
            'X-BRING-API-KEY: cof4Nc6D8saplXjE3h3HXqHH8m7VU2i1Gs0g85Sp',
            'X-BRING-CLIENT: android',
            'X-BRING-USER-UUID: ' + this.bringUUID,
            'X-BRING-VERSION: 303070050',
            'X-BRING-COUNTRY: de',
        ];
        return header;
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
                valueType: 'string',
            }],
        name: 'BringService',
        service: BringService
    }];

exports.services = services;
//# sourceMappingURL=bundle.server.js.map
