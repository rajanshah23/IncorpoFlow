import axios, { AxiosError } from 'axios';
import { ApiResponse, ApiError, Company, Shareholder, CompanyFormData, ShareholderFormData } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: `${API_BASE_URL}/api/v1`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiError>) => {
    if (error.response?.data) {
      return Promise.reject(error.response.data);
    }
    return Promise.reject({
      success: false,
      message: 'Network error. Please try again.',
    } as ApiError);
  }
);

export const companyService = {
  // Create a new company
  async createCompany(data: CompanyFormData): Promise<ApiResponse<Company>> {
    const response = await api.post<ApiResponse<Company>>('/companies', data);
    return response.data;
  },

  // Get all companies
  async getAllCompanies(): Promise<ApiResponse<Company[]>> {
    const response = await api.get<ApiResponse<Company[]>>('/companies');
    return response.data;
  },

  // Get single company
  async getCompany(id: string): Promise<ApiResponse<Company>> {
    const response = await api.get<ApiResponse<Company>>(`/companies/${id}`);
    return response.data;
  },

  // Update company
  async updateCompany(id: string, data: CompanyFormData): Promise<ApiResponse<Company>> {
    const response = await api.put<ApiResponse<Company>>(`/companies/${id}`, data);
    return response.data;
  },

  // Add shareholders
  async addShareholders(companyId: string, data: ShareholderFormData): Promise<ApiResponse<Shareholder[]>> {
    const response = await api.post<ApiResponse<Shareholder[]>>(`/companies/${companyId}/shareholders`, data);
    return response.data;
  },

  // Delete company
  async deleteCompany(id: string): Promise<ApiResponse<null>> {
    const response = await api.delete<ApiResponse<null>>(`/companies/${id}`);
    return response.data;
  },

  // Delete company with cascade
  async deleteCompanyWithCascade(id: string): Promise<ApiResponse<null>> {
    const response = await api.delete<ApiResponse<null>>(`/companies/${id}/cascade`);
    return response.data;
  },

  // Delete all shareholders of a company
  async deleteAllShareholders(companyId: string): Promise<ApiResponse<null>> {
    const response = await api.delete<ApiResponse<null>>(`/companies/${companyId}/shareholders`);
    return response.data;
  },
};