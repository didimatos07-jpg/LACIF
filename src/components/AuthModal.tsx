import React, { useState } from 'react';
import { 
  X, 
  Mail, 
  Lock, 
  User as UserIcon, 
  ShieldAlert, 
  CheckCircle,
  Fingerprint,
  Chrome,
  AlertTriangle,
  Flame,
  ArrowRight
} from 'lucide-react';
import { 
  loginWithEmail, 
  registerWithEmail, 
  signInWithGoogle,
  isSupabaseEnabled
} from '../lib/supabase.ts';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isLoginTab, setIsLoginTab] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  
  // Status states
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    // Client-side quick check
    if (!isSupabaseEnabled) {
      setErrorMsg('Supabase não está configurado ainda. \n\nAcesse o Painel Administrativo (chave mestre "LACIF2026PERICIAL") e insira as credenciais do seu banco de dados na aba de "Sistema" ou defina as variáveis VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY no arquivo .env.');
      setIsLoading(false);
      return;
    }

    if (!email || !password) {
      setErrorMsg('Preencha os campos obrigatórios.');
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setErrorMsg('A senha precisa ter no mínimo 6 caracteres.');
      setIsLoading(false);
      return;
    }

    if (!isLoginTab && !displayName) {
      setErrorMsg('Seu nome completo ou registro é obrigatório.');
      setIsLoading(false);
      return;
    }

    try {
      if (isLoginTab) {
        // Sign in
        await loginWithEmail(email, password);
        setSuccessMsg('Acesso autorizado! Credenciais periciais autenticadas.');
        setTimeout(() => {
          onClose();
          // Reset states
          setEmail('');
          setPassword('');
          setDisplayName('');
          setSuccessMsg('');
        }, 1500);
      } else {
        // Register
        await registerWithEmail(email, password, displayName);
        setSuccessMsg('Cadastro efetuado! Nova credencial de Agente Ativo gerada com sucesso.');
        setTimeout(() => {
          onClose();
          // Reset states
          setEmail('');
          setPassword('');
          setDisplayName('');
          setSuccessMsg('');
        }, 1500);
      }
    } catch (error: any) {
      console.error("Auth Failure on Email/Password flow: ", error);
      let translatedErr = error.message || 'Falha na autenticação. Verifique as informações.';
      
      const errMsgStr = String(translatedErr).toLowerCase();
      if (errMsgStr.includes('user already registered') || error.status === 422 || error.code === '23505') {
        translatedErr = 'Este e-mail já está sendo utilizado.';
      } else if (errMsgStr.includes('invalid login credentials') || errMsgStr.includes('invalid_exception') || errMsgStr.includes('credentials')) {
        translatedErr = 'E-mail ou senha incorretos.';
      } else if (errMsgStr.includes('invalid email') || errMsgStr.includes('invalid_email')) {
        translatedErr = 'Endereço de e-mail inválido ou mal formatado.';
      } else if (errMsgStr.includes('weak_password') || errMsgStr.includes('at least 6 characters') || errMsgStr.includes('should be at least 6')) {
        translatedErr = 'A senha fornecida é muito fraca (precisa ter no mínimo 6 caracteres).';
      } else if (errMsgStr.includes('signup disabled') || errMsgStr.includes('sign_up_disabled')) {
        translatedErr = 'O cadastro por e-mail e senha está temporariamente desativado nas configurações do seu projeto Supabase.';
      }
      
      setErrorMsg(translatedErr);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    try {
      await signInWithGoogle();
      setSuccessMsg('Acesso autenticado via Google com Sucesso!');
      setTimeout(() => {
        onClose();
        setSuccessMsg('');
      }, 1500);
    } catch (error: any) {
      console.error("Google Auth error in Modal:", error);
      if (error.code !== 'auth/popup-closed-by-user') {
        setErrorMsg('Erro ao autenticar com conta Google.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#050505]/95 backdrop-blur-md transition-opacity" 
        onClick={() => !isLoading && onClose()}
      />

      <div className="relative w-full max-w-md rounded-2xl border border-blue-500/20 bg-[#0b0c10]/95 p-6 md:p-8 shadow-[0_0_50px_rgba(0,140,255,0.15)] text-white overflow-hidden z-10 animate-fade-in">
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-500 via-yellow-400 to-red-500" />
        <div className="absolute -top-10 -right-10 h-32 w-32 bg-blue-500/5 rounded-full blur-2xl" />

        {/* Close button */}
        <button
          onClick={onClose}
          disabled={isLoading}
          className="absolute top-4 right-4 p-1.5 rounded-lg border border-white/5 bg-white/5 hover:bg-white/10 hover:text-white text-gray-400 transition-all focus:outline-none"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Header Title */}
        <div className="flex flex-col items-center text-center space-y-2 mb-6">
          <div className="h-12 w-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold shadow-[0_0_15px_rgba(34,211,238,0.15)]">
            <Fingerprint className="h-7 w-7 text-cyan-400 animate-pulse" />
          </div>
          <div>
            <h2 className="font-display font-black text-lg tracking-wider text-white uppercase">
              {isLoginTab ? 'Acesso ao Portal LACiF' : 'Registro de Novo Agente'}
            </h2>
            <p className="font-mono text-[9px] text-[#FFD000] uppercase tracking-widest mt-1">
              {isLoginTab ? 'CONEXÃO CENTRAL DE PERÍCIAS CIÊNTIFICAS' : 'CREDENCIAMENTO ESTUDANTE / ACADÊMICO'}
            </p>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="grid grid-cols-2 gap-1.5 bg-black/60 p-1.5 rounded-xl border border-white/5 mb-6">
          <button
            type="button"
            onClick={() => {
              setIsLoginTab(true);
              setErrorMsg('');
              setSuccessMsg('');
            }}
            disabled={isLoading}
            className={`py-2 rounded-lg font-mono text-[10px] uppercase transition-all tracking-wider font-bold ${
              isLoginTab 
                ? 'bg-blue-600/30 text-cyan-300 border border-blue-400/20' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            🔌 Entrar / Conectar
          </button>
          <button
            type="button"
            onClick={() => {
              setIsLoginTab(false);
              setErrorMsg('');
              setSuccessMsg('');
            }}
            disabled={isLoading}
            className={`py-2 rounded-lg font-mono text-[10px] uppercase transition-all tracking-wider font-bold ${
              !isLoginTab 
                ? 'bg-blue-600/30 text-cyan-300 border border-blue-400/20' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            🔑 Registrar Conta
          </button>
        </div>

        {/* Main form */}
        <form onSubmit={handleAuthSubmit} className="space-y-4">
          
          {/* Output Notifications */}
          {errorMsg && (
            <div className="p-3.5 rounded-xl border border-red-500/20 bg-red-950/20 text-red-300 font-mono text-[10px] leading-relaxed flex items-start gap-2.5 whitespace-pre-line">
              <ShieldAlert className="h-4 w-4 shrink-0 text-red-400 mt-0.5" />
              <div>
                <strong className="block uppercase font-bold text-red-250 mb-1">REJEIÇÃO DE TERMO DE SEGURANÇA:</strong>
                {errorMsg}
              </div>
            </div>
          )}

          {successMsg && (
            <div className="p-3.5 rounded-xl border border-green-500/20 bg-green-950/20 text-green-300 font-mono text-[10px] leading-relaxed flex items-start gap-2.5">
              <CheckCircle className="h-4 w-4 shrink-0 text-green-400 mt-0.5" />
              <div>
                <strong className="block uppercase font-bold text-green-200">AUTORIZAÇÃO DE TERMINAL (+)</strong>
                {successMsg}
              </div>
            </div>
          )}

          {/* Registration Extra Fields */}
          {!isLoginTab && (
            <div className="space-y-1">
              <label className="block text-[9px] font-mono uppercase text-gray-400 tracking-wider">
                Nome Completo / Registro Acadêmico
              </label>
              <div className="relative flex items-center">
                <UserIcon className="absolute left-3.5 h-4 w-4 text-blue-500/50" />
                <input
                  type="text"
                  required
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  disabled={isLoading}
                  placeholder="Ex: Dr. Leandro Santos ou Estudante UFF"
                  className="w-full bg-black/50 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-xs focus:outline-none focus:border-blue-500 font-sans tracking-wide transition-all placeholder:text-gray-600 text-white"
                />
              </div>
            </div>
          )}

          {/* Email input */}
          <div className="space-y-1">
            <label className="block text-[9px] font-mono uppercase text-gray-400 tracking-wider">
              Endereço de E-mail Cadastrado
            </label>
            <div className="relative flex items-center">
              <Mail className="absolute left-3.5 h-4 w-4 text-blue-500/50" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                placeholder="seu-login@lacif.org"
                className="w-full bg-black/50 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-xs focus:outline-none focus:border-blue-500 font-sans tracking-wide transition-all placeholder:text-gray-600 text-white"
              />
            </div>
          </div>

          {/* Password input */}
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label className="block text-[9px] font-mono uppercase text-gray-400 tracking-wider">
                Senha de Acesso
              </label>
              {isLoginTab && (
                <button
                  type="button"
                  onClick={() => alert("Para redefinir a sua senha pericial, entre em contato com o suporte em contato@lacif.org ou use a tela de redefinição direta do console do Firebase.")}
                  className="text-[9px] font-mono text-gray-500 hover:text-white"
                >
                  Esqueceu a senha?
                </button>
              )}
            </div>
            <div className="relative flex items-center">
              <Lock className="absolute left-3.5 h-4 w-4 text-blue-500/50" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                placeholder="••••••"
                className="w-full bg-black/50 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-xs focus:outline-none focus:border-blue-500 font-sans tracking-wide transition-all placeholder:text-gray-600 text-white"
              />
            </div>
          </div>

          {/* Tech Warning */}
          <div className="p-2 bg-zinc-950/40 rounded-lg text-center text-[7.5px] font-mono text-gray-500 uppercase border border-white/[0.02]">
            🔒 Conexão Criptografada SSL Ativa | LACiF Central Security Module.
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-500 font-mono font-bold text-[10px] uppercase tracking-widest rounded-xl transition-all cursor-pointer border border-blue-400/30 text-white shadow-[0_4px_12px_rgba(59,130,246,0.2)] hover:shadow-[0_4px_18px_rgba(59,130,246,0.35)] active:scale-95 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-3.5 w-3.5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                VERIFICANDO REGISTRO...
              </span>
            ) : isLoginTab ? (
              <>
                AUTENTICAR CREDENCIAIS <ArrowRight className="h-3.5 w-3.5 text-yellow-400" />
              </>
            ) : (
              <>
                CADASTRAR E EMITIR CARTEIRA <ArrowRight className="h-3.5 w-3.5 text-yellow-400" />
              </>
            )}
          </button>
        </form>

        {/* Divider separator */}
        <div className="relative my-6 flex items-center">
          <div className="flex-grow border-t border-white/5" />
          <span className="mx-3 shrink-0 font-mono text-[7px] text-gray-500 uppercase">
            Autenticação Unificada Governamental
          </span>
          <div className="flex-grow border-t border-white/5" />
        </div>

        {/* Google Authentication */}
        <button
          type="button"
          disabled={isLoading}
          onClick={handleGoogleSignIn}
          className="w-full py-2.5 bg-black hover:bg-zinc-950 font-mono font-medium text-[9px] uppercase tracking-wider rounded-xl transition-all cursor-pointer border border-white/10 text-gray-300 hover:text-white flex items-center justify-center gap-2"
        >
          <Chrome className="h-4 w-4 text-red-400 shrink-0" />
          Acesso Direto com Conta Google / Gmail
        </button>

      </div>
    </div>
  );
}
