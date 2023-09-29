import queryString from 'query-string';
import { FamilyInterface, FamilyGetQueryInterface } from 'interfaces/family';
import { fetcher } from 'lib/api-fetcher';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getFamilies = async (query?: FamilyGetQueryInterface): Promise<PaginatedInterface<FamilyInterface>> => {
  return fetcher('/api/families', {}, query);
};

export const createFamily = async (family: FamilyInterface) => {
  return fetcher('/api/families', { method: 'POST', body: JSON.stringify(family) });
};

export const updateFamilyById = async (id: string, family: FamilyInterface) => {
  return fetcher(`/api/families/${id}`, { method: 'PUT', body: JSON.stringify(family) });
};

export const getFamilyById = async (id: string, query?: GetQueryInterface) => {
  return fetcher(`/api/families/${id}${query ? `?${queryString.stringify(query)}` : ''}`, {});
};

export const deleteFamilyById = async (id: string) => {
  return fetcher(`/api/families/${id}`, { method: 'DELETE' });
};
