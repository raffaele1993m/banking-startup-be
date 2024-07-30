export interface GetQueryResult {
  amount: number;
  id: string;
}

export interface CreateQueryResult {
  id: string;
  amount: number;
  firstName?: string;
  lastName?: string;
}