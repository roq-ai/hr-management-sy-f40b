import { UserInterface } from 'interfaces/user';
import { FamilyInterface } from 'interfaces/family';
import { GetQueryInterface } from 'interfaces';

export interface SavingsInterface {
  id?: string;
  amount: number;
  saving_date: any;
  purpose: string;
  user_id: string;
  family_id: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  family?: FamilyInterface;
  _count?: {};
}

export interface SavingsGetQueryInterface extends GetQueryInterface {
  id?: string;
  purpose?: string;
  user_id?: string;
  family_id?: string;
}
