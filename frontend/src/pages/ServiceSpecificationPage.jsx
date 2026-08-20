import React from 'react';
import { Cpu, HardDrive, Zap, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const ServiceSpecificationPage = () => {
  const { t } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 space-y-8">
      
      {/* Header */}
      <div className="border-b border-slate-200 pb-4">
        <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          TECHNICAL SPECIFICATIONS
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
          {t('footerSpecs')}
        </h1>
        <p className="text-xs text-slate-500 mt-1">LaserOptSimDESIGNER v2026.1 System Requirements & Physics Features</p>
      </div>

      <div className="space-y-6">
        
        {/* Hardware & OS Requirements */}
        <div className="laser-card p-6 bg-white border border-slate-200 rounded-2xl space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Cpu className="w-5 h-5 text-blue-600" />
            <h3 className="font-bold text-slate-900 text-base">Hardware & Operating System Requirements</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
              <span className="font-bold text-slate-900 block">Minimum Operating System</span>
              <p className="text-slate-600">Windows 10 / 11 (64-bit), Linux Ubuntu 22.04 LTS / RHEL 9</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
              <span className="font-bold text-slate-900 block">CPU Hardware</span>
              <p className="text-slate-600">Intel Core i7 / AMD Ryzen 7 (AVX2 instruction set supported)</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
              <span className="font-bold text-slate-900 block">System RAM</span>
              <p className="text-slate-600">16 GB DDR4/DDR5 minimum (32 GB recommended for CAD export)</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
              <span className="font-bold text-slate-900 block">GPU Acceleration Kernel</span>
              <p className="text-slate-600">NVIDIA CUDA 11.x / 12.x Compatible GPU (Compute Capability 6.0+)</p>
            </div>
          </div>
        </div>

        {/* Physics Capabilities */}
        <div className="laser-card p-6 bg-white border border-slate-200 rounded-2xl space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Zap className="w-5 h-5 text-cyan-600" />
            <h3 className="font-bold text-slate-900 text-base">Supported Optical Algorithms & File Formats</h3>
          </div>

          <div className="space-y-3 text-xs text-slate-700">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong>ABCD Matrix Transformation:</strong> 2x2 and 4x4 astigmatic complex beam parameter matrices for paraxial ray optics.
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong>Hermite-Gaussian / Laguerre-Gaussian Modes:</strong> Fundamental TEM₀₀ and higher-order spatial mode propagation.
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong>CAD File Formats:</strong> Export & import STEP AP203/AP214, IGES 5.3, Zemax (.zmx), OSLO (.len).
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
