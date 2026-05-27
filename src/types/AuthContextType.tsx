import { AuthenticatedUser } from './User';
import { OrderType } from './OrderType';

export type AuthContextType = {
   isAuthenticated: boolean;
   user: AuthenticatedUser | null;
   setUser: React.Dispatch<React.SetStateAction<AuthenticatedUser | null>>;
   orders: OrderType[];
   setOrders: React.Dispatch<React.SetStateAction<OrderType[]>>;
};
