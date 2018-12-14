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

const bringApiUrl = "https://api.getbring.com/rest/";

// Service to access the WUnderground API
export class BringService implements IBringService {
  private options: IBringServiceOptions;
  private context: IReactronServiceContext
  private cache: { [url: string]: ICacheItem } = {};

  public async start(context: IReactronServiceContext): Promise<void> {
    this.context = context;
    console.log('BringService.start()');
  }

  public async stop(): Promise<void> {
    console.log('BringService.stop()');
  }

  public async setOptions(options: IBringServiceOptions): Promise<void> {
    console.log('BringService.setOptions()');
    this.options = options;
  }

  public getOptions(): Readonly<IBringServiceOptions> {
    return this.options;
  }

  public async getList(): Promise<IShoppingList> {
    const loginReponse = await this.login();

    this.bringUUID = loginReponse.uuid;
    this.bringListUUID = loginReponse.bringListUUID;

    console.log('bringUUID', this.bringUUID);
    console.log('bringListUUID', this.bringListUUID);

    if (!this.bringUUID) {
      return {
        uuid: 'test',
        name: 'Liste 1',
        items: [
          { name: 'Salami' },
          { name: 'Käse' },
        ]
      };
    }

    const itemsResponse = await this.getItems();
    return itemsResponse.body;


    // const response = await request.get('', { json: true, resolveWithFullResponse: true }) as request.FullResponse;
    // return response;
  }

  private bringUUID = "";
  private bringListUUID = "";

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

  private login() {
    return this.getResponse('get', "bringlists/", "?email=" + this.options.username + "&password=" + this.options.password, false);
  }

  // Get all items from the current selected shopping list
  public getItems() {
    return this.getResponse('get', "bringlists/" + this.bringListUUID);
  }

  // Save an item to your current shopping list
  public saveItem(itemName: string, specification?: string) {
    return this.getResponse('put', "bringlists/" + this.bringListUUID, "purchase=" + itemName + "&recently=&specification=" + specification + "&remove=&sender=null");
  }

  // remove an item from your current shopping list
  public removeItem(itemName: string) {
    return this.getResponse('put', "bringlists/" + this.bringListUUID, "purchase=&recently=&specification=&remove=" + itemName + "&sender=null");
  }

  // Search for an item
  public searchItem(search: string) {
    return this.getResponse('get', "bringlistitemdetails/", "?listUuid=" + this.bringListUUID + "&itemId=" + search);
  }

  // Hidden Icons? Don't know what this is used for
  public loadProducts() {
    return this.getResponse('get', "bringproducts");
  }

  // Found Icons? Don't know what this is used for
  public loadFeatures() {
    return this.getResponse('get', "bringusers/" + this.bringUUID + "/features");
  }

  // Loads all shopping lists
  public loadLists() {
    return this.getResponse('get', "bringusers/" + this.bringUUID + "/lists");
  }

  // Get all users from a shopping list
  public getAllUsersFromList(listUUID: string) {
    return this.getResponse('get', "bringlists/" + listUUID + "/users");
  }

  public getUserSettings() {
    return this.getResponse('get', "bringusersettings/" + this.bringUUID);
  }

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

  private getHeader() {
    const header = {
      'X-BRING-API-KEY': 'cof4Nc6D8saplXjE3h3HXqHH8m7VU2i1Gs0g85Sp',
      'X-BRING-CLIENT': 'android',
      'X-BRING-USER-UUID': this.bringUUID,
      'X-BRING-VERSION': '303070050',
      'X-BRING-COUNTRY': 'de',
    };
    return header;
  }

  private async getResponse(method: 'get' | 'put' | 'post', url: string, parameter?: string, sendHeader: boolean = true): Promise<any> {
    console.log('BringService.' + method + '(' + url + ')');
    const now = Date.now();
    const validCacheTime = now - (this.options.cacheDuration * 60 * 1000);

    url = bringApiUrl + url;
    if (method === 'get') {
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
        body: method !== 'get' ? parameter : undefined
      };
      let response: request.FullResponse | undefined;

      switch (method) {
        case 'get':
          response = await request.get(url, requestOptions);
          break;
        case 'put':
          response = await request.put(url, requestOptions);
          break;
        case 'post':
          response = await request.post(url, requestOptions);
          break;
      }

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
        url
      };
    }

    return this.cache[url].result;
  }
}