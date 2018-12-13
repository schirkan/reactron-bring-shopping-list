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
    return {
      uuid: 'test',
      name: 'Liste 1',
      items: [
        { name: 'Salami' },
        { name: 'Käse' },
      ]
    };

    // const response = await request.get('', { json: true, resolveWithFullResponse: true }) as request.FullResponse;
    // return response;
  }

  private bringRestURL = "https://api.getbring.com/rest/";
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

  private login(email: string, password: string) {
    return this.request('get', "bringlists", "?email=" + email + "&password=" + password);
  }

  // Get all items from the current selected shopping list
  public getItems() {
    return this.request('get', "bringlists/" + this.bringListUUID, "", true);
  }

  // Save an item to your current shopping list
  public saveItem(itemName: string, specification?: string) {
    return this.request('put', "bringlists/" + this.bringListUUID, "purchase=" + itemName + "&recently=&specification=" + specification + "&remove=&sender=null", true);
  }

  // remove an item from your current shopping list
  public removeItem(itemName: string) {
    return this.request('put', "bringlists/" + this.bringListUUID, "purchase=&recently=&specification=&remove=" + itemName + "&sender=null", true);
  }

  // Search for an item
  public searchItem(search: string) {
    return this.request('get', "bringlistitemdetails/", "?listUuid=" + this.bringListUUID + "&itemId=" + search, true);
  }

  // Hidden Icons? Don't know what this is used for
  public loadProducts() {
    return this.request('get', "bringproducts", "", true);
  }

  // Found Icons? Don't know what this is used for
  public loadFeatures() {
    return this.request('get', "bringusers/" + this.bringUUID + "/features", "", true);
  }

  // Loads all shopping lists
  public loadLists() {
    return this.request('get', "bringusers/" + this.bringUUID + "/lists", "", true);
  }

  // Get all users from a shopping list
  public getAllUsersFromList(listUUID: string) {
    return this.request('get', "bringlists/" + listUUID + "/users", "", true);
  }

  public getUserSettings() {
    return this.request('get', "bringusersettings/" + this.bringUUID, "", true);
  }

  // Handles the request to the server
  private request(type: string, url: string, parameter: string, customHeader = false) {
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

    // return server_output;
  }

  private getHeader() {
    const header = [
      'X-BRING-API-KEY: cof4Nc6D8saplXjE3h3HXqHH8m7VU2i1Gs0g85Sp',
      'X-BRING-CLIENT: android',
      'X-BRING-USER-UUID: ' + this.bringUUID,
      'X-BRING-VERSION: 303070050',
      'X-BRING-COUNTRY: de',
    ];
    return header;
  }

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