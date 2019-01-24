import { IReactronComponentContext } from '@schirkan/reactron-interfaces';
import * as React from 'react';
import { IBringService } from '../../../../src/common/interfaces/IBringService';
import { IShoppingList } from '@schirkan/bring-api';

import styles from './ShoppingList.scss';

// tslint:disable:no-string-literal

export interface IShoppingListProps {
  listUuid?: string;
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

  public async componentDidMount() {
    const service = await this.context.getService<IBringService>('BringService');
    if (service) {
      if (this.props.listUuid && this.props.listUuid !== 'default') {
        const list = await service.getList(this.props.listUuid)
        this.setState({ list });
      } else {
        const list = await service.getDefaultList();
        this.setState({ list });
      }
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
