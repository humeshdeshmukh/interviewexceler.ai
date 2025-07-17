import { FormData } from '../types/salary-negotiation';

export const validateForm = (data: FormData): string | null => {
  if (!data.fullName || data.fullName.trim().length < 2) {
    return 'Please enter a valid full name';
  }

  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return 'Please enter a valid email address';
  }

  if (!data.phone || !/^[\d\s+()-]{10,}$/.test(data.phone)) {
    return 'Please enter a valid phone number';
  }

  if (!data.currentCompany) {
    return 'Please enter your current company';
  }

  if (!data.yearsOfExperience || isNaN(Number(data.yearsOfExperience))) {
    return 'Please enter valid years of experience';
  }

  if (!data.currentSalary || isNaN(Number(data.currentSalary))) {
    return 'Please enter valid current salary';
  }

  if (!data.preferredDate) {
    return 'Please select a preferred date';
  }

  const selectedDate = new Date(data.preferredDate);
  const today = new Date();
  if (selectedDate < today) {
    return 'Please select a future date';
  }

  if (!data.preferredTime) {
    return 'Please select a preferred time';
  }

  return null;
};
