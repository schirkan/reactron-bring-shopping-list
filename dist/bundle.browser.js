System.register(['react'], function (exports, module) {
    'use strict';
    var createElement, Fragment, Component;
    return {
        setters: [function (module) {
            createElement = module.createElement;
            Fragment = module.Fragment;
            Component = module.Component;
        }],
        execute: function () {

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
            /* global Reflect, Promise */

            var extendStatics = function(d, b) {
                extendStatics = Object.setPrototypeOf ||
                    ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                    function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
                return extendStatics(d, b);
            };

            function __extends(d, b) {
                extendStatics(d, b);
                function __() { this.constructor = d; }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            }

            function styleInject(css, ref) {
              if ( ref === void 0 ) ref = {};
              var insertAt = ref.insertAt;

              if (!css || typeof document === 'undefined') { return; }

              var head = document.head || document.getElementsByTagName('head')[0];
              var style = document.createElement('style');
              style.type = 'text/css';

              if (insertAt === 'top') {
                if (head.firstChild) {
                  head.insertBefore(style, head.firstChild);
                } else {
                  head.appendChild(style);
                }
              } else {
                head.appendChild(style);
              }

              if (style.styleSheet) {
                style.styleSheet.cssText = css;
              } else {
                style.appendChild(document.createTextNode(css));
              }
            }

            var css = "";
            var styles = {};
            styleInject(css);

            var ShoppingList = exports('ShoppingList', /** @class */ (function (_super) {
                __extends(ShoppingList, _super);
                function ShoppingList(props) {
                    var _this = _super.call(this, props) || this;
                    _this.state = {};
                    return _this;
                }
                ShoppingList.prototype.componentDidMount = function () {
                    var _this = this;
                    var service = this.context.getService('BringService');
                    if (service) {
                        service.getDefaultList().then(function (response) { return _this.setState({ list: response }); });
                    }
                };
                ShoppingList.prototype.renderList = function () {
                    if (!this.state.list) {
                        return null;
                    }
                    return (createElement(Fragment, null,
                        createElement("h2", null, this.state.list.name),
                        createElement("ul", null, this.state.list.items.map(function (item) { return (createElement("li", { key: item.name }, item.name)); }))));
                };
                ShoppingList.prototype.render = function () {
                    return (createElement("section", { className: styles['ShoppingList'] }, this.renderList()));
                };
                return ShoppingList;
            }(Component)));

            var components = exports('components', [{
                    component: ShoppingList,
                    name: 'ShoppingList',
                    description: 'ShoppingList',
                    displayName: 'ShoppingList',
                    type: 'content',
                    fields: []
                }]);

        }
    };
});
//# sourceMappingURL=bundle.browser.js.map
