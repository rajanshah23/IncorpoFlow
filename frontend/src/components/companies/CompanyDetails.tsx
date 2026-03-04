import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Company } from '../../types';
import { format } from 'date-fns';

interface CompanyDetailsProps {
  company: Company;
  onAddShareholders?: () => void;
}

const CompanyDetails: React.FC<CompanyDetailsProps> = ({
  company,
  onAddShareholders,
}) => {
  const navigate = useNavigate();
  const hasShareholders = company.shareholders && company.shareholders.length > 0;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-[#1e3a6b]">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-[#0a1929] mb-4">{company.name}</h1>
        
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-[#0a1929]">
            <p className="text-sm text-gray-600">Number of Shareholders</p>
            <p className="text-2xl font-semibold text-[#0a1929]">
              {company.shareholders?.length || 0} / {company.numberOfShareholders}
            </p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-[#0a1929]">
            <p className="text-sm text-gray-600">Total Capital Invested</p>
            <p className="text-2xl font-semibold text-[#0a1929]">
              ${company.totalCapitalInvested.toLocaleString()}
            </p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-[#0a1929]">
            <p className="text-sm text-gray-600">Created</p>
            <p className="text-lg text-[#0a1929]">
              {format(new Date(company.createdAt), 'MMM dd, yyyy')}
            </p>
          </div>
        </div>

        {!hasShareholders && company.numberOfShareholders > 0 && onAddShareholders && (
          <div className="mb-6 p-4 bg-[#f0f4f8] border border-[#1e3a6b] rounded-lg">
            <p className="text-[#0a1929] mb-4">
              This company has {company.numberOfShareholders} shareholders to add.
            </p>
            <button
              onClick={onAddShareholders}
              className="px-4 py-2 bg-[#0a1929] text-white rounded-md hover:bg-[#132f4c] border border-[#1e3a6b]"
            >
              Add Shareholders
            </button>
          </div>
        )}

        {hasShareholders && (
          <div>
            <h2 className="text-xl font-semibold text-[#0a1929] mb-4">Shareholders</h2>
            <div className="space-y-3">
              {company.shareholders?.map((shareholder) => (
                <div
                  key={shareholder.id}
                  className="bg-gray-50 p-4 rounded-lg flex justify-between items-center border-l-4 border-[#0a1929]"
                >
                  <div>
                    <p className="font-medium text-[#0a1929]">
                      {shareholder.firstName} {shareholder.lastName}
                    </p>
                    <p className="text-sm text-gray-600">
                      Nationality: {shareholder.nationality}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-6">
          <button
            onClick={() => navigate('/companies')}
            className="text-[#0a1929] hover:text-[#132f4c] font-medium"
          >
            ← Back to Companies
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetails;