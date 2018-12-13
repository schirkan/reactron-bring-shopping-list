import { IReactronService } from "@schirkan/reactron-interfaces";
import { IBringServiceOptions } from "./IBringServiceOptions";
import { IShoppingList } from "./IShoppingList";

export interface IBringService extends IReactronService<IBringServiceOptions> {
  getList(): Promise<IShoppingList>;
}