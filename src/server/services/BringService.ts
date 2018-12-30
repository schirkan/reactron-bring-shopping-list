import { BringApi, IBringApiOptions, IBringList, IShoppingList } from "@schirkan/bring-api";
import { IReactronServiceContext } from '@schirkan/reactron-interfaces';
import { IBringService } from '../../../src/common/interfaces/IBringService';

// Service to access the bring API
export class BringService implements IBringService {
  private context: IReactronServiceContext;
  private bringApi: BringApi;

  public async setOptions(options: IBringApiOptions): Promise<void> {
    console.log('BringService.setOptions()');
    this.bringApi = new BringApi(options);
  }

  public async start(context: IReactronServiceContext): Promise<void> {
    this.context = context;
    console.log('BringService.start()');
  }

  public async stop(): Promise<void> {
    console.log('BringService.stop()');
  }

  public getOptions(): Readonly<IBringApiOptions> {
    return this.bringApi.options;
  }

  public getDefaultList(): Promise<IShoppingList> {
    return this.bringApi.getDefaultList();
  }

  public getList(listUuid: string): Promise<IShoppingList | undefined> {
    return this.bringApi.getList(listUuid);
  }

  public getLists(): Promise<IBringList[]> {
    return this.bringApi.getLists();
  }
}