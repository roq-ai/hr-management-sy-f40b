import { UserInterface } from 'interfaces/user';
import { FamilyInterface } from 'interfaces/family';
import { GetQueryInterface } from 'interfaces';

export interface BudgetInterface {
  id?: string;
  amount: number;
  start_date: any;
  end_date: any;
  user_id: string;
  family_id: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  family?: FamilyInterface;
  _count?: {};
}

export interface BudgetGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  family_id?: string;
}
