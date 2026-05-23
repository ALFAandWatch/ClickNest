import { AuthenticatedUser } from './User';
import { OrderType } from './OrderType';

export type AuthContextType = {
   isAuthenticated: boolean;
   setIsAuthenticated: (auth: boolean) => void;
   user: AuthenticatedUser | null;
   setUser: React.Dispatch<React.SetStateAction<AuthenticatedUser | null>>;
   orders: OrderType[];
   setOrders: (orders: OrderType[]) => void;
};
