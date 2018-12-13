import { IReactronComponentContext } from '@schirkan/reactron-interfaces';
import * as React from 'react';
import { IBringService } from '../../../../src/common/interfaces/IBringService';
import { IShoppingList } from '../../../../src/common/interfaces/IShoppingList';

import styles from './ShoppingList.scss';

// tslint:disable:no-string-literal

export interface IShoppingListProps {

}

interface IShoppingListState {
  list?: IShoppingList;
}

export class ShoppingList extends React.Component<IShoppingListProps, IShoppingListState> {
  public context: IReactronComponentContext;

  constructor(props: IShoppingListProps) {
    super(props);

    this.state = {};
  }

  public componentDidMount() {
    const service = this.context.getService<IBringService>('BringService');
    if (service) {
      service.getList().then((response: any) => this.setState({ list: response }));
    }
  }

  public render() {
    return (
      <section className={styles['ShoppingList']}>
        <ul>
          {this.state.list && this.state.list.items.map(item => (
            <li>{item.name}</li>
          ))}
        </ul>
      </section>
    );
  }
}
