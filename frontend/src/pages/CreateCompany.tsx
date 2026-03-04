import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CompanyForm from '../components/companies/CompanyForm';
import { companyService } from '../services/api';
import { CompanyFormData, ApiError } from '../types';
import toast from 'react-hot-toast';

const CreateCompany: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: CompanyFormData) => {
    setLoading(true);
    try {
      const response = await companyService.createCompany(data);
      if (response.success && response.data) {
        toast.success('Company created successfully');
        
        // If shareholders need to be added, redirect to add shareholders page
        if (data.numberOfShareholders > 0) {
          navigate(`/companies/${response.data.id}/shareholders`);
        } else {
          navigate('/companies');
        }
      }
    } catch (error: any) {
      const apiError = error as ApiError;
      if (apiError.errors) {
        apiError.errors.forEach((err) => {
          toast.error(`${err.field}: ${err.message}`);
        });
      } else {
        toast.error(apiError.message || 'Failed to create company');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-[#0a1929] mb-6">Create New Company</h1>
      <div className="bg-white rounded-lg shadow-md p-6 border border-[#1e3a6b]">
        <CompanyForm onSubmit={handleSubmit} isLoading={loading} />
      </div>
    </div>
  );
};

export default CreateCompany;