import { BringApi, IBringApiOptions, IBringList, IShoppingList } from "@schirkan/bring-api";
import { IBringService } from '../../../src/common/interfaces/IBringService';

// Service to access the bring API
export class BringService implements IBringService {
  private bringApi: BringApi;

  public async setOptions(options: IBringApiOptions): Promise<void> {
    this.bringApi = new BringApi(options);
  }

  public async getOptions(): Promise<Readonly<IBringApiOptions>> {
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