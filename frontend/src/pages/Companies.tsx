import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { companyService } from '../services/api';
import { Company, ApiError } from '../types';
import CompanyList from '../components/companies/CompanyList';
import LoadingSpinner from '../components/common/LoadingSpinner';
import toast from 'react-hot-toast';

const Companies: React.FC = () => {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const response = await companyService.getAllCompanies();
      if (response.success && response.data) {
        setCompanies(response.data);
      }
    } catch (error: any) {
      const apiError = error as ApiError;
      toast.error(apiError.message || 'Failed to fetch companies');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this company?')) return;

    try {
      const response = await companyService.deleteCompany(id);
      if (response.success) {
        toast.success('Company deleted successfully');
        fetchCompanies();
      }
    } catch (error: any) {
      const apiError = error as ApiError;
      toast.error(apiError.message || 'Failed to delete company');
    }
  };

  const handleDeleteWithCascade = async (id: string) => {
    if (!confirm('Are you sure you want to delete this company and all its shareholders?')) return;

    try {
      const response = await companyService.deleteCompanyWithCascade(id);
      if (response.success) {
        toast.success('Company and shareholders deleted successfully');
        fetchCompanies();
      }
    } catch (error: any) {
      const apiError = error as ApiError;
      toast.error(apiError.message || 'Failed to delete company');
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#0a1929]">Companies</h1>
        <button
          onClick={() => navigate('/companies/new')}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 shadow-lg hover:shadow-xl"
        >
          Create New Company
        </button>
      </div>

      <CompanyList
        companies={companies}
        onDelete={handleDelete}
        onDeleteWithCascade={handleDeleteWithCascade}
      />
    </div>
  );
};

export default Companies;