import queryString from 'query-string';
import { SavingsInterface, SavingsGetQueryInterface } from 'interfaces/savings';
import { fetcher } from 'lib/api-fetcher';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getSavings = async (query?: SavingsGetQueryInterface): Promise<PaginatedInterface<SavingsInterface>> => {
  return fetcher('/api/savings', {}, query);
};

export const createSavings = async (savings: SavingsInterface) => {
  return fetcher('/api/savings', { method: 'POST', body: JSON.stringify(savings) });
};

export const updateSavingsById = async (id: string, savings: SavingsInterface) => {
  return fetcher(`/api/savings/${id}`, { method: 'PUT', body: JSON.stringify(savings) });
};

export const getSavingsById = async (id: string, query?: GetQueryInterface) => {
  return fetcher(`/api/savings/${id}${query ? `?${queryString.stringify(query)}` : ''}`, {});
};

export const deleteSavingsById = async (id: string) => {
  return fetcher(`/api/savings/${id}`, { method: 'DELETE' });
};
