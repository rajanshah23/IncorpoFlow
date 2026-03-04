import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Company } from '../../types';
import { format } from 'date-fns';

interface CompanyListProps {
  companies: Company[];
  onDelete: (id: string) => void;
  onDeleteWithCascade: (id: string) => void;
}

const CompanyList: React.FC<CompanyListProps> = ({
  companies,
  onDelete,
  onDeleteWithCascade,
}) => {
  const navigate = useNavigate();

  if (companies.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No companies found.</p>
        <button
          onClick={() => navigate('/companies/new')}
          className="mt-4 inline-block px-4 py-2 bg-[#0a1929] text-white rounded-md hover:bg-[#132f4c] border border-[#1e3a6b]"
        >
          Create your first company
        </button>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {companies.map((company) => (
        <div
          key={company.id}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-[#1e3a6b]"
        >
          <div className="p-6">
            <h3 className="text-xl font-semibold text-[#0a1929] mb-2">
              {company.name}
            </h3>
            
            <div className="space-y-2 text-sm text-gray-600">
              <p>
                <span className="font-medium">Shareholders:</span>{' '}
                {company.shareholders?.length || 0} / {company.numberOfShareholders}
              </p>
              <p>
                <span className="font-medium">Total Capital:</span> $
                {company.totalCapitalInvested.toLocaleString()}
              </p>
              <p>
                <span className="font-medium">Created:</span>{' '}
                {format(new Date(company.createdAt), 'MMM dd, yyyy')}
              </p>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <button
                onClick={() => navigate(`/companies/${company.id}`)}
                className="px-3 py-1 bg-[#0a1929] text-white rounded-md hover:bg-[#132f4c] text-sm border border-[#1e3a6b]"
              >
                View Details
              </button>
              
              {(!company.shareholders || company.shareholders.length === 0) && (
                <button
                  onClick={() => onDelete(company.id)}
                  className="px-3 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200 text-sm"
                >
                  Delete
                </button>
              )}

              {company.shareholders && company.shareholders.length > 0 && (
                <button
                  onClick={() => onDeleteWithCascade(company.id)}
                  className="px-3 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200 text-sm"
                >
                  Delete All
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CompanyList;