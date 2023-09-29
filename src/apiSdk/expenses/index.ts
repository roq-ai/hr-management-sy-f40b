import queryString from 'query-string';
import { ExpenseInterface, ExpenseGetQueryInterface } from 'interfaces/expense';
import { fetcher } from 'lib/api-fetcher';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getExpenses = async (query?: ExpenseGetQueryInterface): Promise<PaginatedInterface<ExpenseInterface>> => {
  return fetcher('/api/expenses', {}, query);
};

export const createExpense = async (expense: ExpenseInterface) => {
  return fetcher('/api/expenses', { method: 'POST', body: JSON.stringify(expense) });
};

export const updateExpenseById = async (id: string, expense: ExpenseInterface) => {
  return fetcher(`/api/expenses/${id}`, { method: 'PUT', body: JSON.stringify(expense) });
};

export const getExpenseById = async (id: string, query?: GetQueryInterface) => {
  return fetcher(`/api/expenses/${id}${query ? `?${queryString.stringify(query)}` : ''}`, {});
};

export const deleteExpenseById = async (id: string) => {
  return fetcher(`/api/expenses/${id}`, { method: 'DELETE' });
};
