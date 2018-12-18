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
      service.getDefaultList().then((response: any) => this.setState({ list: response }));
    }
  }

  private renderList() {
    if (!this.state.list) {
      return null;
    }
    return (
      <React.Fragment>
        <h2>{this.state.list.name}</h2>
        <ul>
          {this.state.list.items.map(item => (
            <li key={item.name}>{item.name}</li>
          ))}
        </ul>
      </React.Fragment>
    );
  }

  public render() {
    return (
      <section className={styles['ShoppingList']}>
        {this.renderList()}
      </section>
    );
  }
}
