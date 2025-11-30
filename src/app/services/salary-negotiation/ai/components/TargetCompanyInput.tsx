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
        <Label className="text-[#f9f4da]/90 font-medium">Target Company</Label>
        <div className="relative">
          <Input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for a company..."
            className="pl-10 bg-[#1a1a1a] border-[#fcba28]/25 text-[#f9f4da] placeholder:text-[#f9f4da]/40 focus:border-[#fcba28] focus:ring-1 focus:ring-[#fcba28]/50 rounded-xl h-11 transition-all"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#fcba28]" />

          {/* Dropdown Results */}
          {companies.length > 0 && !selectedCompany && (
            <div className="absolute z-50 w-full mt-2 max-h-60 overflow-y-auto bg-[#272727] backdrop-blur-xl border border-[#fcba28]/30 rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.4)]">
              {companies.map((company, index) => (
                <div
                  key={company.name}
                  onClick={() => handleCompanySelect(company)}
                  className="flex items-center gap-3 p-3 cursor-pointer hover:bg-[#fcba28]/10 transition-colors first:rounded-t-xl last:rounded-b-xl border-b border-[#fcba28]/10 last:border-b-0"
                >
                  <Building className="h-5 w-5 text-[#fcba28] flex-shrink-0" />
                  <div>
                    <p className="text-[#f9f4da] font-medium">{company.name}</p>
                    <p className="text-xs text-[#f9f4da]/60">
                      {company.industry} • {company.size} • {company.location}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {loading && (
        <div className="text-center text-[#fcba28] text-sm">
          Searching...
        </div>
      )}

      {selectedCompany && (
        <div className="p-4 bg-[#272727]/50 rounded-xl border border-[#fcba28]/30">
          <div className="flex items-center gap-3">
            <Building className="h-5 w-5 text-[#fcba28]" />
            <div>
              <h4 className="text-[#f9f4da] font-medium">{selectedCompany.name}</h4>
              <p className="text-xs text-[#f9f4da]/60">
                {selectedCompany.industry} • {selectedCompany.size} • {selectedCompany.location}
              </p>
              {selectedCompany.salaryRange && (
                <p className="text-xs text-[#fcba28] mt-1">
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
