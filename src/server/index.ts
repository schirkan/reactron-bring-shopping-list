import { IReactronServiceDefinition } from '@schirkan/reactron-interfaces';
import { BringService } from './services/BringService';

// export interfaces
export * from '../common/interfaces/IBringService';
export * from '../common/interfaces/IBringServiceOptions';

// export reactron service definition
export const services: IReactronServiceDefinition[] = [{
    description: 'Service for getbring.com',
    displayName: 'Shopping List',
    fields: [{
        displayName: 'Username',
        description: 'Username',
        name: 'username',
        valueType: 'string',
    },{
        displayName: 'Password',
        description: 'Password',
        name: 'password',
        valueType: 'string',
    }],
    name: 'BringService',
    service: BringService
}];