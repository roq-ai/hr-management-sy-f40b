interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
  ownerAbilities: string[];
  customerAbilities: string[];
  getQuoteUrl: string;
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Owner'],
  customerRoles: [],
  tenantRoles: ['Owner', 'Family Member'],
  tenantName: 'Family',
  applicationName: 'HR Management System',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
  customerAbilities: [],
  ownerAbilities: [
    'Manage users',
    'Manage families',
    'Manage incomes',
    'Manage expenses',
    'Manage budgets',
    'Manage savings',
  ],
  getQuoteUrl: 'https://app.roq.ai/proposal/93145b0b-12cb-4228-b03f-30ee2219ef17',
};
