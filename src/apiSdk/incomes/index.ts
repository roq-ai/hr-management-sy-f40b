import queryString from 'query-string';
import { IncomeInterface, IncomeGetQueryInterface } from 'interfaces/income';
import { fetcher } from 'lib/api-fetcher';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getIncomes = async (query?: IncomeGetQueryInterface): Promise<PaginatedInterface<IncomeInterface>> => {
  return fetcher('/api/incomes', {}, query);
};

export const createIncome = async (income: IncomeInterface) => {
  return fetcher('/api/incomes', { method: 'POST', body: JSON.stringify(income) });
};

export const updateIncomeById = async (id: string, income: IncomeInterface) => {
  return fetcher(`/api/incomes/${id}`, { method: 'PUT', body: JSON.stringify(income) });
};

export const getIncomeById = async (id: string, query?: GetQueryInterface) => {
  return fetcher(`/api/incomes/${id}${query ? `?${queryString.stringify(query)}` : ''}`, {});
};

export const deleteIncomeById = async (id: string) => {
  return fetcher(`/api/incomes/${id}`, { method: 'DELETE' });
};
