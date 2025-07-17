'use client';

import { useState, useEffect } from 'react';
import { Building, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface CompanyInfo {
  name: string;
  industry: string;
  size: string;
  location: string;
  salaryRange?: {
    min: number;
    max: number;
    currency: string;
  };
}

interface TargetCompanyInputProps {
  onCompanySelect: (company: CompanyInfo) => void;
}

export function TargetCompanyInput({ onCompanySelect }: TargetCompanyInputProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [companies, setCompanies] = useState<CompanyInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<CompanyInfo | null>(null);

  useEffect(() => {
    const searchCompanies = async () => {
      if (searchTerm.length < 2) {
        setCompanies([]);
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(`/api/company-search?q=${encodeURIComponent(searchTerm)}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        if (Array.isArray(data)) {
          setCompanies(data);
        } else {
          console.error('Invalid response format:', data);
          setCompanies([]);
        }
      } catch (error) {
        console.error('Error searching companies:', error);
        setCompanies([]);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(searchCompanies, 300);
    return () => clearTimeout(debounce);
  }, [searchTerm]);

  const handleCompanySelect = (company: CompanyInfo) => {
    setSelectedCompany(company);
    setSearchTerm(company.name);
    setCompanies([]);
    onCompanySelect(company);
  };

  return (
    <div className="space-y-4">
      <div>
        <Label className="text-white">Target Company</Label>
        <div className="relative">
          <Input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for a company..."
            className="pl-10 bg-gray-800/50 border-[#fcba28]/20 text-white placeholder:text-gray-400"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#fcba28]" />
        </div>
      </div>

      {loading && (
        <div className="text-center text-[#fcba28]">
          Searching...
        </div>
      )}

      {companies.length > 0 && !selectedCompany && (
        <div className="absolute z-10 w-full max-h-60 overflow-y-auto bg-gray-900/95 backdrop-blur-xl border border-[#fcba28]/20 rounded-lg shadow-xl">
          {companies.map((company, index) => (
            <div
              key={company.name}
              onClick={() => handleCompanySelect(company)}
              className="flex items-center gap-3 p-3 cursor-pointer hover:bg-[#fcba28]/10"
            >
              <Building className="h-5 w-5 text-[#fcba28]" />
              <div>
                <p className="text-white font-medium">{company.name}</p>
                <p className="text-sm text-gray-400">
                  {company.industry} • {company.size} • {company.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedCompany && (
        <div className="p-4 bg-gray-800/50 rounded-lg border border-[#fcba28]/20">
          <div className="flex items-center gap-3">
            <Building className="h-5 w-5 text-[#fcba28]" />
            <div>
              <h4 className="text-white font-medium">{selectedCompany.name}</h4>
              <p className="text-sm text-gray-400">
                {selectedCompany.industry} • {selectedCompany.size} • {selectedCompany.location}
              </p>
              {selectedCompany.salaryRange && (
                <p className="text-sm text-[#fcba28] mt-1">
                  Salary Range: {selectedCompany.salaryRange.currency}
                  {selectedCompany.salaryRange.min.toLocaleString()} - 
                  {selectedCompany.salaryRange.max.toLocaleString()}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
