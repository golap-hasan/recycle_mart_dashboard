import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { format } from 'date-fns';
import { toast } from 'sonner';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Replace White Background
export const replaceWhiteBackground = (html: string) => {
  if (!html) return '';

  return html.replace(/style="([^"]*)"/g, (match, styleString: string) => {
    const styleProperties = styleString
      .split(';')
      .filter((prop: string) => prop.trim() !== '');

    const filteredProperties = styleProperties.filter((prop: string) => {
      const i = prop.indexOf(':');
      if (i === -1) return true;

      const propName = prop.substring(0, i).trim();
      const propValue = prop.substring(i + 1).trim();

      // Exclude 'background-color' only if it's white
      if (propName === 'background-color') {
        const lowerCaseValue = propValue.toLowerCase().replace(/\s/g, '');
        if (
          lowerCaseValue === 'white' ||
          lowerCaseValue === '#fff' ||
          lowerCaseValue === '#ffffff' ||
          lowerCaseValue === 'rgb(255,255,255)'
        ) {
          return false;
        }
      }

      return true;
    });

    if (filteredProperties.length > 0) {
      const newStyleString = filteredProperties.join('; ');
      return `style="${newStyleString};"`;
    } else {
      return '';
    }
  });
};

// Success Toast
export const SuccessToast = (msg: string) => {
  toast.success(msg);
};

// Error Toast
export const ErrorToast = (msg: string) => {
  toast.error(msg);
};

// Warning Toast
export const WarningToast = (msg: string) => {
  toast.warning(msg);
};

// Info Toast
export const InfoToast = (msg: string) => {
  toast.info(msg);
};

// Get Initials
export const getInitials = (name: string) => {
  if (!name) return 'NA';
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] || 'N';
  const second = parts[1]?.[0] || parts[0]?.[1] || 'A';
  return (first + second).toUpperCase();
};

// Format Date
export const formatDate = (dateString: string) => {
  if (!dateString) return 'N/A';
  return format(new Date(dateString), 'dd MMM yyyy');
};

// Get Image URL
// export const getImageUrl = (imagePath: string) => {
//   if (!imagePath) return '';
//   return imagePath.startsWith('/') ? `${IMAGE_BASE_URL}${imagePath}` : `${IMAGE_BASE_URL}/${imagePath}`;
// };

// Time Ago
export const timeAgo = (createdAt: string) => {
  if (!createdAt) return '';
  const s = Math.floor((Date.now() - new Date(createdAt).getTime()) / 1000);
  if (s < 60) return 'Just now';
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
};
