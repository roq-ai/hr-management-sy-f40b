import { BudgetInterface } from 'interfaces/budget';
import { ExpenseInterface } from 'interfaces/expense';
import { IncomeInterface } from 'interfaces/income';
import { SavingsInterface } from 'interfaces/savings';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface FamilyInterface {
  id?: string;
  description?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  budget?: BudgetInterface[];
  expense?: ExpenseInterface[];
  income?: IncomeInterface[];
  savings?: SavingsInterface[];
  user?: UserInterface;
  _count?: {
    budget?: number;
    expense?: number;
    income?: number;
    savings?: number;
  };
}

export interface FamilyGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
