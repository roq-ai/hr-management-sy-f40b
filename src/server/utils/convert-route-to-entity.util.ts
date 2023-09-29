const mapping: Record<string, string> = {
  budgets: 'budget',
  expenses: 'expense',
  families: 'family',
  incomes: 'income',
  savings: 'savings',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
