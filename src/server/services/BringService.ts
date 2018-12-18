import { IReactronServiceContext } from '@schirkan/reactron-interfaces';
import * as request from 'request-promise-native';
import { IBringService } from '../../../src/common/interfaces/IBringService';
import { IBringServiceOptions } from '../../../src/common/interfaces/IBringServiceOptions';
import { IShoppingList } from '../../../src/common/interfaces/IShoppingList';

interface ICacheItem {
  url: string;
  timestamp: number;
  result: any;
}

interface IBringUserContext {
  loginTimestamp: number;
  name: string;
  email: string;
  uuid: string;
  bringListUUID: string;
  accessToken: string;
  refreshToken: string;
  photoPath: string;
  publicUuid: string;
  expiresIn: number;
  lists: IBringList[];
}

interface IBringList {
  listUuid: string;
  name: string;
}

const bringApiUrl = "https://api.getbring.com/rest/v2/";

// Service to access the bring API
export class BringService implements IBringService {
  private options: IBringServiceOptions;
  private context: IReactronServiceContext
  private cache: { [url: string]: ICacheItem } = {};
  private userContext?: IBringUserContext;

  public async setOptions(options: IBringServiceOptions): Promise<void> {
    console.log('BringService.setOptions()');
    this.options = options;
    this.userContext = undefined; // reset login
  }

  public async start(context: IReactronServiceContext): Promise<void> {
    this.context = context;
    console.log('BringService.start()');
  }

  public async stop(): Promise<void> {
    console.log('BringService.stop()');
  }

  public getOptions(): Readonly<IBringServiceOptions> {
    return this.options;
  }

  private async initLogin(): Promise<void> {
    if (!this.userContext) {
      // login
      const loginReponse = await this.login();

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

      // load lists
      const getListsResponse = await this.getLists();
      this.userContext.lists = getListsResponse.lists;
    }
  }

  // Get all items from the current selected shopping list
  public async getDefaultList(): Promise<IShoppingList> {
    await this.initLogin();
    if (!this.userContext) {
      throw new Error('login failed');
    }

    return this.getList(this.userContext.bringListUUID);
  }

  public async getList(listUuid: string): Promise<IShoppingList> {
    await this.initLogin();
    if (!this.userContext) {
      throw new Error('login failed');
    }

    const list = await this.getResponse('get', "bringlists/" + listUuid);
    const listDetails = this.userContext.lists.find(x => x.listUuid === listUuid);

    return {
      uuid: list.uuid,
      name: listDetails && listDetails.name || '-',
      items: list.purchase
    }
  }

  private login() {
    if (!this.options.username || !this.options.password) {
      throw new Error('Username/Password missing!');
    }
    return this.getResponse('post', "bringauth", "email=" + this.options.username + "&password=" + this.options.password);
  }

  private getLists() {
    return this.getResponse('get', "bringusers/" + this.userContext!.uuid + "/lists");
  }

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

  private getHeader() {
    // tslint:disable:no-unused-expression
    // tslint:disable:no-string-literal

    const header = {
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
  }

  private async getResponse(method: 'get' | 'put' | 'post', url: string, parameter?: string, sendHeader: boolean = true): Promise<any> {
    console.log('BringService.' + method + '(' + url + ')');
    const now = Date.now();
    const validCacheTime = now - (this.options.cacheDuration * 60 * 1000);

    url = bringApiUrl + url;
    if (method === 'get' && parameter) {
      url += parameter;
    }

    // check timestamp - only cache get requests
    if (method !== 'get' || this.cache[url] && this.cache[url].timestamp < validCacheTime) {
      delete (this.cache[url]);
    }

    if (!this.cache[url]) {
      const requestOptions: request.RequestPromiseOptions = {
        json: true,
        resolveWithFullResponse: true,
        rejectUnauthorized: false,
        headers: sendHeader ? this.getHeader() : {},
        body: method !== 'get' ? encodeURI(parameter || '') : undefined
      };
      let response: request.FullResponse | undefined;

      try {
        switch (method) {
          case 'get':
            response = await request.get(url, requestOptions);
            break;
          case 'put':
            response = await request.put(url, requestOptions);
            break;
          case 'post':
            requestOptions.headers!['Content-Type'] = 'application/x-www-form-urlencoded';
            response = await request.post(url, requestOptions);
            break;
        }
        console.log(response && response.body);
      } catch (error) {
        console.log(error);
        throw new Error(JSON.stringify(error));
      }

      if (!response) {
        throw new Error('no response');
      }

      if (response.statusCode !== 200) {
        throw new Error(response.statusMessage);
      }

      this.cache[url] = {
        timestamp: now,
        result: response.body,
        url
      };
    }

    return this.cache[url].result;
  }
}