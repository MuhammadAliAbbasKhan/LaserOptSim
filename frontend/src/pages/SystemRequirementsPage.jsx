import React from 'react';
import { Cpu, HardDrive, Zap, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const SystemRequirementsPage = () => {
  const { t } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 space-y-8">
      <div className="border-b border-slate-200 pb-4">
        <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          HARDWARE & OS SPECS
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
          {t('subSysReqs')} (v2026.1)
        </h1>
        <p className="text-xs text-slate-500 mt-1">Recommended Operating Systems, Hardware & GPU Specifications</p>
      </div>

      <div className="laser-card p-8 bg-white border border-slate-200 rounded-2xl space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-700">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <h4 className="font-bold text-slate-900 text-sm">Operating Systems</h4>
            <ul className="space-y-1 text-slate-600">
              <li>• Windows 11 / 10 (64-bit Enterprise / Pro)</li>
              <li>• Ubuntu Linux 24.04 LTS / 22.04 LTS (64-bit)</li>
              <li>• Red Hat Enterprise Linux 9 / Rocky Linux 9</li>
            </ul>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <h4 className="font-bold text-slate-900 text-sm">CPU & Memory</h4>
            <ul className="space-y-1 text-slate-600">
              <li>• Processor: Intel Core i7 / i9 or AMD Ryzen 7 / 9</li>
              <li>• Instruction Set: AVX2 / FMA3 supported</li>
              <li>• System RAM: 16 GB minimum (32 GB recommended)</li>
            </ul>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <h4 className="font-bold text-slate-900 text-sm">GPU Acceleration</h4>
            <ul className="space-y-1 text-slate-600">
              <li>• Graphics Card: NVIDIA GeForce RTX 3060+ / RTX 4080</li>
              <li>• CUDA Compatibility: Compute Capability 6.0+</li>
              <li>• VRAM: 8 GB GDDR6 dedicated VRAM</li>
            </ul>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <h4 className="font-bold text-slate-900 text-sm">Storage & License Manager</h4>
            <ul className="space-y-1 text-slate-600">
              <li>• Disk Space: 5 GB available NVMe SSD storage</li>
              <li>• License Keys: FlexLM floating network or USB Dongle</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
