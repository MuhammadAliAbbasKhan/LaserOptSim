import React from 'react';
import { useToast } from '../../context/ToastContext';
import { X, CheckCircle, AlertTriangle, Info, AlertOctagon } from 'lucide-react';

export const ToastNotification = () => {
  const { toast, hideToast } = useToast();

  if (!toast) return null;

  const getStyle = () => {
    switch (toast.type) {
      case 'success':
        return {
          bg: 'bg-emerald-600',
          icon: <CheckCircle className="w-5 h-5 text-white flex-shrink-0" />
        };
      case 'error':
        return {
          bg: 'bg-rose-600',
          icon: <AlertOctagon className="w-5 h-5 text-white flex-shrink-0" />
        };
      case 'warning':
        return {
          bg: 'bg-amber-500',
          icon: <AlertTriangle className="w-5 h-5 text-white flex-shrink-0" />
        };
      default:
        return {
          bg: 'bg-blue-600',
          icon: <Info className="w-5 h-5 text-white flex-shrink-0" />
        };
    }
  };

  const style = getStyle();

  return (
    <div className={`fixed top-0 left-0 right-0 z-[10000] ${style.bg} text-white shadow-xl px-6 py-3 transition-all duration-300 flex items-center justify-between`}>
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-sm font-medium">
          {style.icon}
          <span>{toast.message}</span>
        </div>

        <button 
          onClick={hideToast}
          className="p-1 rounded-md hover:bg-white/20 text-white transition-colors"
          title="Dismiss banner"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
