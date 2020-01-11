import { IReactronComponentContext, topicNames } from '@schirkan/reactron-interfaces';
import * as React from 'react';
import { IBringService } from '../../../../src/common/interfaces/IBringService';
import { IShoppingList } from '@schirkan/bring-api';

import styles from './ShoppingList.scss';

// tslint:disable:no-string-literal

export interface IShoppingListProps {
  showHeader: boolean;
  listUuid?: string;
}

interface IShoppingListState {
  loading: boolean;
  list?: IShoppingList;
}

export class ShoppingList extends React.Component<IShoppingListProps, IShoppingListState> {
  public context: IReactronComponentContext;

  constructor(props: IShoppingListProps) {
    super(props);
    this.state = { loading: false };
  }

  public componentDidMount() {
    this.context.topics.subscribe(topicNames.refresh, this.loadData);
    this.loadData();
  }

  public componentWillUnmount() {
    this.context.topics.unsubscribe(topicNames.refresh, this.loadData);
  }

  public componentDidUpdate(prevProps: any) {
    if (JSON.stringify(this.props) !== JSON.stringify(prevProps)) {
      this.loadData();
    }
  }

  private loadData = async () => {
    try {
      const service = await this.context.getService<IBringService>('BringService');
      if (service) {
        this.setState({ loading: true });
        let list = await service.getList(this.props.listUuid);
        this.setState({ list, loading: false });
      }
    } catch (error) {
      this.context.log.error(error);
      this.setState({ loading: false });
    }
  }

  private renderHeader() {
    if (!this.props.showHeader) {
      return null;
    }
    return (
      <h2>
        {this.state.list && this.state.list.name}
        {(this.state.loading) && this.context.renderLoading(undefined, '1x', { display: 'inline-block', marginLeft: '8px' })}
      </h2>
    );
  }

  private renderList() {
    if (!this.state.list) {
      return null;
    }
    return (
      <ul>
        {this.state.list.items.map(item => (
          <li key={item.name}>{item.name}</li>
        ))}
      </ul>
    );
  }

  public render() {
    return (
      <section className={styles['ShoppingList']}>
        {this.renderHeader()}
        {this.renderList()}
      </section>
    );
  }
}
