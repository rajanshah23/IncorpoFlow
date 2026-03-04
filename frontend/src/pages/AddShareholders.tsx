import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ShareholderForm from '../components/companies/ShareholderForm';
import { companyService } from '../services/api';
import { Company, Shareholder, ApiError } from '../types';
import LoadingSpinner from '../components/common/LoadingSpinner';
import toast from 'react-hot-toast';

const AddShareholders: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

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
        
        // Check if shareholders already exist
        if (response.data.shareholders && response.data.shareholders.length > 0) {
          toast.error('Shareholders already exist for this company');
          navigate(`/companies/${id}`);
        }
      }
    } catch (error: any) {
      const apiError = error as ApiError;
      toast.error(apiError.message || 'Failed to fetch company');
      navigate('/companies');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (shareholders: Omit<Shareholder, 'id'>[]) => {
    setSubmitting(true);
    try {
      const response = await companyService.addShareholders(id as string, { shareholders });
      if (response.success) {
        toast.success('Shareholders added successfully');
        navigate(`/companies/${id}`);
      }
    } catch (error: any) {
      const apiError = error as ApiError;
      if (apiError.errors) {
        apiError.errors.forEach((err) => {
          toast.error(`${err.field}: ${err.message}`);
        });
      } else {
        toast.error(apiError.message || 'Failed to add shareholders');
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!company) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-[#0a1929] mb-6">
        Add Shareholders for {company.name}
      </h1>
      <p className="text-[#1e3a6b] mb-4">
        Please add information for all {company.numberOfShareholders} shareholders.
      </p>
      <div className="bg-white rounded-lg shadow-md p-6 border border-[#1e3a6b]">
        <ShareholderForm
          numberOfShareholders={company.numberOfShareholders}
          onSubmit={handleSubmit}
          isLoading={submitting}
        />
      </div>
    </div>
  );
};

export default AddShareholders;