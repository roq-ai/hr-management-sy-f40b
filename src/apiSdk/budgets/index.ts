import queryString from 'query-string';
import { BudgetInterface, BudgetGetQueryInterface } from 'interfaces/budget';
import { fetcher } from 'lib/api-fetcher';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getBudgets = async (query?: BudgetGetQueryInterface): Promise<PaginatedInterface<BudgetInterface>> => {
  return fetcher('/api/budgets', {}, query);
};

export const createBudget = async (budget: BudgetInterface) => {
  return fetcher('/api/budgets', { method: 'POST', body: JSON.stringify(budget) });
};

export const updateBudgetById = async (id: string, budget: BudgetInterface) => {
  return fetcher(`/api/budgets/${id}`, { method: 'PUT', body: JSON.stringify(budget) });
};

export const getBudgetById = async (id: string, query?: GetQueryInterface) => {
  return fetcher(`/api/budgets/${id}${query ? `?${queryString.stringify(query)}` : ''}`, {});
};

export const deleteBudgetById = async (id: string) => {
  return fetcher(`/api/budgets/${id}`, { method: 'DELETE' });
};
