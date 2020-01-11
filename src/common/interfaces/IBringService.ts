import { IBringApiOptions, IBringList, IShoppingList } from "@schirkan/bring-api";
import { IReactronService } from "@schirkan/reactron-interfaces";

export interface IBringService extends IReactronService<IBringApiOptions> {
  getDefaultList(): Promise<IShoppingList>;
  getList(listUuid?: string): Promise<IShoppingList | undefined>;
  getLists(): Promise<IBringList[]>;
}