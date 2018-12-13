import { IReactronComponentDefinition } from '@schirkan/reactron-interfaces';
import { ShoppingList } from './components/ShoppingList/ShoppingList';

export const components: IReactronComponentDefinition[] = [{
  component: ShoppingList,
  name: 'ShoppingList',
  description: 'ShoppingList',
  displayName: 'ShoppingList',
  type: 'content',
  fields: []
}];

export * from './components/ShoppingList/ShoppingList';