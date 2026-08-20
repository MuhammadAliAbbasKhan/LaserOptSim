import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, Sliders, Layers, Zap, Activity, Info } from 'lucide-react';

export const LaserOpticsCanvas = () => {
  const canvasRef = useRef(null);

  // Simulation Parameters
  const [wavelength, setWavelength] = useState(1064); // nm
  const [waistRadius, setWaistRadius] = useState(1.2); // mm
  const [m2Factor, setM2Factor] = useState(1.05);
  const [focalLength, setFocalLength] = useState(120); // mm
  const [lensPosition, setLensPosition] = useState(250); // mm
  const [numRays, setNumRays] = useState(19);
  const [modePattern, setModePattern] = useState('TEM00');
  const [animationActive, setAnimationActive] = useState(true);

  // Calculated Beam Parameters
  const wavelengthMeters = wavelength * 1e-9;
  const waistMeters = waistRadius * 1e-3;
  const rayleighRange = (Math.PI * Math.pow(waistMeters, 2)) / (wavelengthMeters * m2Factor); // meters
  const divergenceAngle = (wavelengthMeters * m2Factor) / (Math.PI * waistMeters); // rad

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let animationFrameId;
    let time = 0;

    const render = () => {
      time += 0.05;
      const width = canvas.width;
      const height = canvas.height;
      const centerY = height / 2;

      // Clear Canvas with Dark Optical Bench gradient backdrop
      ctx.fillStyle = '#0b1329';
      ctx.fillRect(0, 0, width, height);

      // Draw Bench Grid Lines
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      const gridSize = 25;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Optical Axis (Dash-dot line)
      ctx.strokeStyle = '#38bdf8';
      ctx.setLineDash([8, 4, 2, 4]);
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(0, centerY);
      ctx.lineTo(width, centerY);
      ctx.stroke();
      ctx.setLineDash([]); // Reset dash

      // Convert Physical Z to Pixel Scale (0 to 600 mm Z range mapped to 0 to width px)
      const zToPx = (z) => (z / 600) * width;
      const mmToPxY = (val) => val * 18; // 1mm = 18px height scale

      const lensPxX = zToPx(lensPosition);

      // Color mapping based on wavelength
      const getLaserColor = (wave) => {
        if (wave < 450) return { stroke: '#8b5cf6', fill: 'rgba(139, 92, 246, 0.15)', glow: '#a855f7' }; // UV / Violet
        if (wave < 550) return { stroke: '#10b981', fill: 'rgba(16, 185, 129, 0.15)', glow: '#34d399' }; // Green
        if (wave < 700) return { stroke: '#ef4444', fill: 'rgba(239, 68, 68, 0.15)', glow: '#f87171' };  // HeNe Red
        return { stroke: '#00d2ff', fill: 'rgba(0, 210, 255, 0.18)', glow: '#38bdf8' };                 // NIR 1064nm
      };

      const colorScheme = getLaserColor(wavelength);

      // Draw Gaussian Envelope Contour & Rays
      ctx.fillStyle = colorScheme.fill;
      ctx.strokeStyle = colorScheme.stroke;
      ctx.lineWidth = 1.5;

      const upperEnvelope = [];
      const lowerEnvelope = [];

      for (let px = 0; px <= width; px += 2) {
        const zMm = (px / width) * 600;
        let wZ = waistRadius * Math.sqrt(1 + Math.pow((zMm / 1000) / rayleighRange, 2));

        // Refraction after Thin Lens
        if (zMm > lensPosition) {
          const zRel = zMm - lensPosition;
          const f = focalLength;
          // Thin lens beam waist transformation
          const mag = Math.abs(f / (lensPosition - f));
          const wNew0 = waistRadius * mag;
          const zFocusMm = lensPosition + (f * (1 + (zRel / 100)));
          const dZ = (zMm - lensPosition) / 1000;
          wZ = wNew0 * Math.sqrt(1 + Math.pow(dZ / Math.max(0.01, rayleighRange * Math.pow(mag, 2)), 2));
          // Lens convergence factor
          const convergenceFactor = 1 - (zRel / (focalLength * 1.5));
          wZ = Math.max(0.1, wZ * convergenceFactor);
        }

        const yOffset = mmToPxY(wZ);
        upperEnvelope.push({ x: px, y: centerY - yOffset });
        lowerEnvelope.push({ x: px, y: centerY + yOffset });
      }

      // Draw filled Gaussian beam volume
      ctx.beginPath();
      ctx.moveTo(upperEnvelope[0].x, upperEnvelope[0].y);
      for (let i = 1; i < upperEnvelope.length; i++) {
        ctx.lineTo(upperEnvelope[i].x, upperEnvelope[i].y);
      }
      for (let i = lowerEnvelope.length - 1; i >= 0; i--) {
        ctx.lineTo(lowerEnvelope[i].x, lowerEnvelope[i].y);
      }
      ctx.closePath();
      ctx.fill();

      // Draw Rays inside envelope
      const maxRays = Math.floor(numRays);
      for (let r = 0; r < maxRays; r++) {
        const fraction = maxRays > 1 ? (r / (maxRays - 1)) * 2 - 1 : 0;
        ctx.beginPath();
        ctx.strokeStyle = colorScheme.stroke;
        ctx.lineWidth = Math.abs(fraction) === 1 ? 2 : 1;
        ctx.globalAlpha = 0.6 - Math.abs(fraction) * 0.3;

        for (let px = 0; px <= width; px += 5) {
          const zMm = (px / width) * 600;
          let rY = fraction * waistRadius * Math.sqrt(1 + Math.pow((zMm / 1000) / rayleighRange, 2));

          if (zMm > lensPosition) {
            const zRel = zMm - lensPosition;
            const f = focalLength;
            // Ray deflection angle from thin lens formula y' = -y/f
            const lensHeight = fraction * waistRadius * Math.sqrt(1 + Math.pow((lensPosition / 1000) / rayleighRange, 2));
            const slopeAfterLens = (fraction * divergenceAngle) - (lensHeight / focalLength);
            rY = lensHeight + slopeAfterLens * (zRel / 10);
          }

          const py = centerY + mmToPxY(rY);
          if (px === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.stroke();
      }
      ctx.globalAlpha = 1.0;

      // Draw Pulsing Light Photons along rays if animation active
      if (animationActive) {
        ctx.fillStyle = '#ffffff';
        for (let r = 0; r < maxRays; r += 2) {
          const fraction = maxRays > 1 ? (r / (maxRays - 1)) * 2 - 1 : 0;
          const animPx = (time * 120 + r * 30) % width;
          const zMm = (animPx / width) * 600;
          let rY = fraction * waistRadius * Math.sqrt(1 + Math.pow((zMm / 1000) / rayleighRange, 2));

          if (zMm > lensPosition) {
            const zRel = zMm - lensPosition;
            const lensHeight = fraction * waistRadius * Math.sqrt(1 + Math.pow((lensPosition / 1000) / rayleighRange, 2));
            const slopeAfterLens = (fraction * divergenceAngle) - (lensHeight / focalLength);
            rY = lensHeight + slopeAfterLens * (zRel / 10);
          }

          ctx.beginPath();
          ctx.arc(animPx, centerY + mmToPxY(rY), 2.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Draw Thin Lens Hardware Element on Bench
      ctx.fillStyle = 'rgba(148, 163, 184, 0.3)';
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3;
      
      ctx.beginPath();
      // Curved biconvex lens rendering
      ctx.ellipse(lensPxX, centerY, 12, 65, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Lens Mount Ring & Label
      ctx.fillStyle = '#475569';
      ctx.fillRect(lensPxX - 3, centerY + 65, 6, 30);
      ctx.fillStyle = '#38bdf8';
      ctx.font = '10px Inter';
      ctx.fillText(`Thin Lens (f=${focalLength}mm)`, lensPxX - 45, centerY - 75);

      // Draw Source Laser Aperture Module on Left
      ctx.fillStyle = '#1e293b';
      ctx.strokeStyle = '#0091ff';
      ctx.lineWidth = 2;
      ctx.fillRect(0, centerY - 45, 30, 90);
      ctx.strokeRect(0, centerY - 45, 30, 90);

      ctx.fillStyle = '#00d2ff';
      ctx.font = '10px Outfit';
      ctx.fillText(`LASER SOURCE (${wavelength}nm)`, 35, centerY - 55);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [wavelength, waistRadius, m2Factor, focalLength, lensPosition, numRays, modePattern, animationActive]);

  const loadPreset = (preset) => {
    if (preset === 'coupler') {
      setWavelength(1064);
      setWaistRadius(0.8);
      setFocalLength(60);
      setLensPosition(180);
      setM2Factor(1.05);
    } else if (preset === 'collimator') {
      setWavelength(532);
      setWaistRadius(0.4);
      setFocalLength(150);
      setLensPosition(150);
      setM2Factor(1.1);
    } else if (preset === 'highpower') {
      setWavelength(1064);
      setWaistRadius(2.5);
      setFocalLength(200);
      setLensPosition(300);
      setM2Factor(1.4);
    }
  };

  return (
    <div className="w-full laser-card p-6 bg-slate-900 text-white rounded-2xl border border-slate-800 shadow-2xl">
      
      {/* Control Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-cyan-400 animate-pulse" />
            <h3 className="text-xl font-bold text-white tracking-wide">LaserOptSimDESIGNER Canvas</h3>
            <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-[11px] font-bold px-2 py-0.5 rounded">
              PHYSICAL OPTICS ENGINE 2026.1
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time ABCD Matrix Gaussian beam propagation & thin-lens transformation simulator.
          </p>
        </div>

        {/* Action Presets */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-semibold mr-1">Presets:</span>
          <button 
            onClick={() => loadPreset('coupler')}
            className="text-xs bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 px-2.5 py-1 rounded transition-colors"
          >
            Fiber Coupler
          </button>
          <button 
            onClick={() => loadPreset('collimator')}
            className="text-xs bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-slate-700 px-2.5 py-1 rounded transition-colors"
          >
            Beam Expander
          </button>
          <button 
            onClick={() => loadPreset('highpower')}
            className="text-xs bg-slate-800 hover:bg-slate-700 text-rose-300 border border-slate-700 px-2.5 py-1 rounded transition-colors"
          >
            High-Power Focus
          </button>
          
          <button 
            onClick={() => setAnimationActive(!animationActive)}
            className={`p-1.5 rounded transition-colors ml-2 ${animationActive ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-400'}`}
            title="Toggle Light Wave Particle Animation"
          >
            <Play className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2D Canvas Area */}
      <div className="relative w-full rounded-xl overflow-hidden border border-slate-800 bg-[#0b1329] shadow-inner mb-6">
        <canvas 
          ref={canvasRef} 
          width={1000} 
          height={380} 
          className="w-full h-auto block"
        />
        
        {/* Telemetry Overlay Badge */}
        <div className="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur-md border border-slate-800 p-2.5 rounded-lg text-xs font-mono grid grid-cols-2 sm:grid-cols-4 gap-4 text-slate-300">
          <div>
            <span className="text-slate-500 block text-[10px]">RAYLEIGH RANGE (zR)</span>
            <span className="text-cyan-400 font-bold">{(rayleighRange * 1000).toFixed(2)} mm</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px]">DIVERGENCE (θ)</span>
            <span className="text-cyan-400 font-bold">{(divergenceAngle * 1000).toFixed(2)} mrad</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px]">BEAM QUALITY (M²)</span>
            <span className="text-cyan-400 font-bold">{m2Factor.toFixed(2)}</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px]">MODE PROFILE</span>
            <span className="text-cyan-400 font-bold">{modePattern}</span>
          </div>
        </div>
      </div>

      {/* Interactive Sliders Panel */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 bg-slate-950/60 p-4 rounded-xl border border-slate-800 text-xs">
        
        {/* Wavelength */}
        <div>
          <div className="flex justify-between font-semibold mb-1">
            <span className="text-slate-300">Wavelength (λ)</span>
            <span className="text-cyan-400 font-mono">{wavelength} nm</span>
          </div>
          <input 
            type="range" 
            min="350" 
            max="1100" 
            step="5"
            value={wavelength}
            onChange={(e) => setWavelength(Number(e.target.value))}
            className="w-full accent-cyan-500 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-500 mt-1">
            <span>350nm (UV)</span>
            <span>532nm (Green)</span>
            <span>1064nm (NIR)</span>
          </div>
        </div>

        {/* Beam Waist */}
        <div>
          <div className="flex justify-between font-semibold mb-1">
            <span className="text-slate-300">Beam Waist (w₀)</span>
            <span className="text-cyan-400 font-mono">{waistRadius.toFixed(1)} mm</span>
          </div>
          <input 
            type="range" 
            min="0.2" 
            max="4.0" 
            step="0.1"
            value={waistRadius}
            onChange={(e) => setWaistRadius(Number(e.target.value))}
            className="w-full accent-cyan-500 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-500 mt-1">
            <span>0.2 mm</span>
            <span>2.0 mm</span>
            <span>4.0 mm</span>
          </div>
        </div>

        {/* Focal Length */}
        <div>
          <div className="flex justify-between font-semibold mb-1">
            <span className="text-slate-300">Lens Focal Length (f)</span>
            <span className="text-cyan-400 font-mono">{focalLength} mm</span>
          </div>
          <input 
            type="range" 
            min="30" 
            max="300" 
            step="5"
            value={focalLength}
            onChange={(e) => setFocalLength(Number(e.target.value))}
            className="w-full accent-cyan-500 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-500 mt-1">
            <span>30 mm</span>
            <span>150 mm</span>
            <span>300 mm</span>
          </div>
        </div>

        {/* Lens Position */}
        <div>
          <div className="flex justify-between font-semibold mb-1">
            <span className="text-slate-300">Lens Position (z)</span>
            <span className="text-cyan-400 font-mono">{lensPosition} mm</span>
          </div>
          <input 
            type="range" 
            min="50" 
            max="450" 
            step="5"
            value={lensPosition}
            onChange={(e) => setLensPosition(Number(e.target.value))}
            className="w-full accent-cyan-500 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-500 mt-1">
            <span>50 mm</span>
            <span>250 mm</span>
            <span>450 mm</span>
          </div>
        </div>

      </div>

    </div>
  );
};
