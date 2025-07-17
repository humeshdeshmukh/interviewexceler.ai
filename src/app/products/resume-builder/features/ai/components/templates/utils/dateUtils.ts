export const formatDate = (dateString: string, format: 'short' | 'medium' | 'long' = 'short'): string => {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
    
    const formatOptions: Record<string, Intl.DateTimeFormatOptions> = {
      short: {
        month: 'short',
        year: 'numeric'
      },
      medium: {
        month: 'long',
        year: 'numeric'
      },
      long: {
        month: 'long',
        year: 'numeric',
        day: 'numeric'
      }
    };

    return new Intl.DateTimeFormat('en-US', formatOptions[format]).format(date);
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
};

export const getDateDuration = (startDate: string, endDate: string, current: boolean = false): string => {
  try {
    const start = new Date(startDate);
    const end = current ? new Date() : new Date(endDate);
    
    const years = end.getFullYear() - start.getFullYear();
    const months = end.getMonth() - start.getMonth();
    
    let duration = '';
    
    if (years > 0) {
      duration += `${years} year${years > 1 ? 's' : ''}`;
    }
    
    if (months > 0 || (years === 0 && months === 0)) {
      if (duration) duration += ' ';
      duration += `${months} month${months !== 1 ? 's' : ''}`;
    }
    
    return duration;
  } catch (error) {
    console.error('Error calculating duration:', error);
    return '';
  }
};

export const isCurrentDate = (date: string): boolean => {
  try {
    const inputDate = new Date(date);
    const now = new Date();
    
    return (
      inputDate.getFullYear() === now.getFullYear() &&
      inputDate.getMonth() === now.getMonth()
    );
  } catch (error) {
    console.error('Error checking current date:', error);
    return false;
  }
};

export const sortDateDescending = (a: string, b: string): number => {
  try {
    const dateA = new Date(a);
    const dateB = new Date(b);
    return dateB.getTime() - dateA.getTime();
  } catch (error) {
    console.error('Error sorting dates:', error);
    return 0;
  }
};

export const getRelativeTimeString = (date: string): string => {
  try {
    const inputDate = new Date(date);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - inputDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 30) return `${diffDays} days ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  } catch (error) {
    console.error('Error calculating relative time:', error);
    return '';
  }
};
