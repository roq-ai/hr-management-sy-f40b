import { UserInterface } from 'interfaces/user';
import { FamilyInterface } from 'interfaces/family';
import { GetQueryInterface } from 'interfaces';

export interface ExpenseInterface {
  id?: string;
  amount: number;
  reason: string;
  expense_date: any;
  user_id: string;
  family_id: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  family?: FamilyInterface;
  _count?: {};
}

export interface ExpenseGetQueryInterface extends GetQueryInterface {
  id?: string;
  reason?: string;
  user_id?: string;
  family_id?: string;
}
