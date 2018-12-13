import { IShoppingListItem } from './IShoppingListItem';

export interface IShoppingList {
  uuid: string;
  name: string;
  items: IShoppingListItem[];
}