import { IReactronComponentDefinition } from '@schirkan/reactron-interfaces';
import { ShoppingList } from './components/ShoppingList/ShoppingList';
import { IBringService } from '../common/interfaces/IBringService';

export const components: IReactronComponentDefinition[] = [{
  component: ShoppingList,
  name: 'ShoppingList',
  description: 'ShoppingList',
  displayName: 'ShoppingList',
  type: 'content',
  fields: [{
    name: 'listUuid',
    defaultValue: 'default',
    displayName: 'List',
    valueType: 'string',
    values: async (context) => {
      const values = [{ text: 'Default', value: 'default' }];
      const service = await context.getService<IBringService>('BringService', 'reactron-bring-shopping-list');
      if (service) {
        const lists = await service.getLists();
        values.push(...lists.map(x => ({ value: x.uuid, text: x.name })));
      }
      return values;
    }
  }]
}];

export * from './components/ShoppingList/ShoppingList';