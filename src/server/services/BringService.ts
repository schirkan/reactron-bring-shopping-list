import { IReactronServiceContext } from '@schirkan/reactron-interfaces';
import * as request from 'request-promise-native';
import { IBringService } from '../../../src/common/interfaces/IBringService';
import { IBringServiceOptions } from '../../../src/common/interfaces/IBringServiceOptions';

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

    public async getLists(): Promise<any> {
        const response = await request.get('', { json: true, resolveWithFullResponse: true }) as request.FullResponse;
        return response;
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
}