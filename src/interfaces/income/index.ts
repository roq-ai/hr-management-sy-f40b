import { UserInterface } from 'interfaces/user';
import { FamilyInterface } from 'interfaces/family';
import { GetQueryInterface } from 'interfaces';

export interface IncomeInterface {
  id?: string;
  amount: number;
  source: string;
  income_date: any;
  user_id: string;
  family_id: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  family?: FamilyInterface;
  _count?: {};
}

export interface IncomeGetQueryInterface extends GetQueryInterface {
  id?: string;
  source?: string;
  user_id?: string;
  family_id?: string;
}
