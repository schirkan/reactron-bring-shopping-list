'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var bringApi = require('@schirkan/bring-api');

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

// Service to access the bring API
class BringService {
    setOptions(options) {
        return __awaiter(this, void 0, void 0, function* () {
            this.bringApi = new bringApi.BringApi(options);
        });
    }
    getOptions() {
        return this.bringApi.options;
    }
    getDefaultList() {
        return this.bringApi.getDefaultList();
    }
    getList(listUuid) {
        return this.bringApi.getList(listUuid);
    }
    getLists() {
        return this.bringApi.getLists();
    }
}

// export reactron service definition
const services = [{
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

exports.IBringApiOptions = bringApi.IBringApiOptions;
exports.IBringList = bringApi.IBringList;
exports.IShoppingList = bringApi.IShoppingList;
exports.IShoppingListItem = bringApi.IShoppingListItem;
exports.services = services;
//# sourceMappingURL=bundle.server.js.map
