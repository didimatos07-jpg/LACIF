import React, { useState, useEffect } from 'react';
import { Shield, Activity, Radio, Cpu, CheckCircle } from 'lucide-react';
import LacifEmblem from './LacifEmblem.tsx';

export default function ScannerHUD() {
  const [scanStatus, setScanStatus] = useState<'idle' | 'scanning' | 'analyzed'>('idle');
  const [progress, setProgress] = useState(0);
  const [scannedType, setScannedType] = useState('Nenhum');
  const [matchedProfile, setMatchedProfile] = useState('');

  useEffect(() => {
    let interval: any;
    if (scanStatus === 'scanning') {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setScanStatus('analyzed');
            const samples = ['Epithelial Cell DNA Matching', 'Residue Chemical Gunshot (GSR)', 'Fingerprint Minutiae match'];
            const profiles = ['Ambigüidade Elucidada', 'Fator de Correspondência: 99.8%', 'Análise Confirmada pela Cadeia de Custódia'];
            setScannedType(samples[Math.floor(Math.random() * samples.length)]);
            setMatchedProfile(profiles[Math.floor(Math.random() * profiles.length)]);
            return 100;
          }
          return prev + 5;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [scanStatus]);

  const handleStartScan = () => {
    setProgress(0);
    setScanStatus('scanning');
  };

  return (
    <div className="glassmorphism p-6 rounded-2xl relative overflow-hidden border border-blue-500/30 text-white w-full max-w-md mx-auto">
      {/* Decorative scanner line */}
      {scanStatus === 'scanning' && (
        <div className="absolute left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-laser shadow-[0_0_10px_#007BFF]" />
      )}

      {/* Header telemetry info */}
      <div className="flex justify-between items-center border-b border-blue-500/20 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <Activity className="text-blue-500 animate-pulse-glow h-5 w-5" />
          <span className="font-mono text-xs tracking-wider text-blue-400">HUD: SECURE_SCANNER_v4.2</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-blue-500 animate-ping" />
          <span className="font-mono text-[9px] uppercase text-gray-400">Conexão UFF</span>
        </div>
      </div>

      <div className="flex flex-col items-center py-4">
        {/* Biometric Interactive Core */}
        <button
          onClick={handleStartScan}
          disabled={scanStatus === 'scanning'}
          className={`relative group h-32 w-32 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
            scanStatus === 'scanning'
              ? 'border-yellow-400 bg-yellow-950/20 shadow-[0_0_20px_rgba(255,208,0,0.3)]'
              : scanStatus === 'analyzed'
              ? 'border-green-500 bg-green-950/20 shadow-[0_0_20px_rgba(34,197,94,0.3)]'
              : 'border-blue-500/40 hover:border-blue-400 bg-blue-950/10 hover:shadow-[0_0_15px_rgba(0,123,255,0.2)]'
          }`}
        >
          {scanStatus === 'scanning' ? (
            <div className="text-center animate-pulse">
              <Radio className="h-10 w-10 text-yellow-400 mx-auto mb-1 animate-spin" />
              <span className="font-mono text-xs text-yellow-400 font-bold">{progress}%</span>
            </div>
          ) : scanStatus === 'analyzed' ? (
            <div className="text-center">
              <CheckCircle className="h-12 w-12 text-green-400 mx-auto" />
              <span className="font-mono text-[10px] text-green-400 uppercase mt-1 block">Aprovado</span>
            </div>
          ) : (
            <div className="text-center flex flex-col items-center">
              <LacifEmblem className="h-20 w-20 group-hover:scale-110 transition-transform duration-300" />
              <span className="font-mono text-[10px] text-blue-300 mt-2 block">Toque para Escanear</span>
            </div>
          )}
        </button>

        {/* Dynamic Scan Info Display */}
        <div className="w-full mt-6 bg-[#030a12] rounded-lg p-3 border border-blue-500/10 font-mono text-xs text-gray-300 leading-relaxed space-y-1">
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Status do Sistema:</span>
            <span className={scanStatus === 'scanning' ? 'text-yellow-400' : scanStatus === 'analyzed' ? 'text-green-400' : 'text-blue-400'}>
              {scanStatus === 'scanning' ? 'ANALISANDO AMOSTRA...' : scanStatus === 'analyzed' ? 'COMPLETO' : 'DISPONÍVEL'}
            </span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Amostra Biológica:</span>
            <span className="text-white text-right break-words max-w-[200px]">{scannedType}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500 font-medium font-mono">Confiabilidade Técnica:</span>
            <span className="text-white">{scanStatus === 'analyzed' ? '99.8%' : '---'}</span>
          </div>

          {matchedProfile && (
            <div className="mt-2 pt-2 border-t border-blue-500/10 text-center text-yellow-400 font-semibold uppercase tracking-wider text-[11px]">
              {matchedProfile}
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between text-[10px] font-mono text-gray-500 mt-2">
        <span className="flex items-center gap-1"><Shield className="h-3 w-3" /> Criptografia Vucetich</span>
        <span className="flex items-center gap-1"><Cpu className="h-3 w-3" /> LACIF AI-Core</span>
      </div>
    </div>
  );
}
