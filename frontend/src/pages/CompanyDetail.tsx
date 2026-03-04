import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { companyService } from '../services/api';
import { Company, ApiError } from '../types';
import CompanyDetails from '../components/companies/CompanyDetails';
import LoadingSpinner from '../components/common/LoadingSpinner';
import toast from 'react-hot-toast';

const CompanyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchCompany();
    }
  }, [id]);

  const fetchCompany = async () => {
    try {
      const response = await companyService.getCompany(id as string);
      if (response.success && response.data) {
        setCompany(response.data);
      }
    } catch (error: any) {
      const apiError = error as ApiError;
      toast.error(apiError.message || 'Failed to fetch company details');
      navigate('/companies');
    } finally {
      setLoading(false);
    }
  };

  const handleAddShareholders = () => {
    navigate(`/companies/${id}/shareholders`);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!company) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Company not found</p>
        <button
          onClick={() => navigate('/companies')}
          className="mt-4 inline-block px-4 py-2 bg-[#0a1929] text-white rounded-md hover:bg-[#132f4c] border border-[#1e3a6b]"
        >
          Back to Companies
        </button>
      </div>
    );
  }

  return (
    <CompanyDetails company={company} onAddShareholders={handleAddShareholders} />
  );
};

export default CompanyDetail;