export interface Company {
  id: string;
  name: string;
  numberOfShareholders: number;
  totalCapitalInvested: number;
  shareholders?: Shareholder[];
  createdAt: string;
  updatedAt: string;
}

export interface Shareholder {
  id: string;
  firstName: string;
  lastName: string;
  nationality: string;
}

export interface CompanyFormData {
  name: string;
  numberOfShareholders: number;
  totalCapitalInvested: number;
}

export interface ShareholderFormData {
  shareholders: Omit<Shareholder, 'id'>[];
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: Array<{
    field: string;
    message: string;
  }>;
  count?: number;
}

export interface ApiError {
  success: false;
  message: string;
  errors?: Array<{
    field: string;
    message: string;
  }>;
}