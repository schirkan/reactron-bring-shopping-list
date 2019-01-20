System.register(['react'], function (exports, module) {
    'use strict';
    var Component, createElement, Fragment;
    return {
        setters: [function (module) {
            Component = module.Component;
            createElement = module.createElement;
            Fragment = module.Fragment;
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

            function __awaiter(thisArg, _arguments, P, generator) {
                return new (P || (P = Promise))(function (resolve, reject) {
                    function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
                    function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
                    function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
                    step((generator = generator.apply(thisArg, _arguments || [])).next());
                });
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

            class ShoppingList extends Component {
                constructor(props) {
                    super(props);
                    this.state = {};
                }
                componentDidMount() {
                    const service = this.context.getService('BringService');
                    if (service) {
                        if (this.props.listUuid && this.props.listUuid !== 'default') {
                            service.getList(this.props.listUuid).then((response) => this.setState({ list: response }));
                        }
                        else {
                            service.getDefaultList().then((response) => this.setState({ list: response }));
                        }
                    }
                }
                renderList() {
                    if (!this.state.list) {
                        return null;
                    }
                    return (createElement(Fragment, null,
                        createElement("h2", null, this.state.list.name),
                        createElement("ul", null, this.state.list.items.map(item => (createElement("li", { key: item.name }, item.name))))));
                }
                render() {
                    return (createElement("section", { className: styles['ShoppingList'] }, this.renderList()));
                }
            } exports('ShoppingList', ShoppingList);

            const components = exports('components', [{
                    component: ShoppingList,
                    name: 'ShoppingList',
                    description: 'ShoppingList',
                    displayName: 'ShoppingList',
                    type: 'content',
                    fields: [{
                            name: 'listUuid',
                            defaultValue: 'default',
                            displayName: 'List',
                            valueType: 'string',
                            values: (context) => __awaiter(undefined, void 0, void 0, function* () {
                                const values = [{ text: 'Default', value: 'default' }];
                                const service = context.getService('BringService', 'reactron-bring-shopping-list');
                                if (service) {
                                    const lists = yield service.getLists();
                                    values.push(...lists.map(x => ({ value: x.uuid, text: x.name })));
                                }
                                return values;
                            })
                        }]
                }]);

        }
    };
});
//# sourceMappingURL=bundle.browser.js.map
