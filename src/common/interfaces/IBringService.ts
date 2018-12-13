import { IReactronService } from "@schirkan/reactron-interfaces";
import { IBringServiceOptions } from "./IBringServiceOptions";

export interface IBringService extends IReactronService<IBringServiceOptions> {    
    getLists(): Promise<any>;
}