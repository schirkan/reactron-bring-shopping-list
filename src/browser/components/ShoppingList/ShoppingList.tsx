import { IReactronComponentContext } from '@schirkan/reactron-interfaces';
import * as React from 'react';

import styles from './ShoppingList.scss';
// tslint:disable:no-string-literal

export interface IShoppingListProps {

}

interface IShoppingListState {

}

export class ShoppingList extends React.Component<IShoppingListProps, IShoppingListState> {
  public context: IReactronComponentContext;

  constructor(props: IShoppingListProps) {
    super(props);

    this.state = {};
  }

  public componentDidMount() {
    // const service = this.context.getService<IWeatherService>('WeatherService', 'reactron-openweathermap');
    // if (service) {
    //   service.getFiveDaysForecast({ zip: this.props.location.zip, cityName: this.props.location.cityName })
    //     .then((response: any) => {
    //       this.setState({
    //         weatherForecast: response,
    //         units: service.getOptions && service.getOptions().units
    //       });
    //     });
    // }
  }

  public render() {
    return (
      <section className={styles['ShoppingList']}>
        TEST
      </section>
    );
  }
}
