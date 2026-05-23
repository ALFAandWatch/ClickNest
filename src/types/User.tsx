export type User = {
   name: string;
   email: string;
   address: string;
   phone: string;
   password: string;
};

export type AuthenticatedUser = {
   id: number;
   name: string;
   email: string;
   address: string;
   phone: string;
   password: string;
   orders: [];
};
