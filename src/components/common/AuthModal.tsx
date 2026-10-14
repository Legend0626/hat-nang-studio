import React, { useEffect, useState } from 'react';
import { X, Lock, Mail, Phone, User, CheckCircle2, AlertCircle, ArrowLeft } from 'lucide-react';
import { StudioLogo } from './StudioLogo';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register' | 'forgot';
  onLoginSuccess: (user: { name: string; phone: string; email: string }) => void;
}

interface RegisteredAccount {
  name: string;
  phone: string;
  email: string;
  passwordHash: string;
  passwordSalt: string;
}

const ACCOUNTS_STORAGE_KEY = 'hatnang_accounts';

const readRegisteredAccounts = (): RegisteredAccount[] | null => {
  const saved = localStorage.getItem(ACCOUNTS_STORAGE_KEY);
  if (!saved) return [];

  try {
    const accounts = JSON.parse(saved);
    return Array.isArray(accounts) ? accounts : null;
  } catch {
    return null;
  }
};

const hashPassword = async (password: string, salt: string) => {
  const data = new TextEncoder().encode(`${salt}:${password}`);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('');
};

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'login',
  onLoginSuccess,
}) => {
  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>(initialMode);

  // Form states
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setError(null);
      setSuccessMsg(null);
    }
  }, [initialMode, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    // Validation
    if (mode === 'register') {
      if (!name.trim()) {
        setError('Vui lòng nhập họ và tên của bạn.');
        return;
      }
      if (!phone.trim() || !/^(0|\+84)[3|5|7|8|9][0-9]{8}$/.test(phone.replace(/\s+/g, ''))) {
        setError('Số điện thoại không hợp lệ (Vui lòng nhập 10 chữ số, VD: 0908123456).');
        return;
      }
      if (!email.trim() || !email.includes('@')) {
        setError('Vui lòng nhập địa chỉ email hợp lệ.');
        return;
      }
      if (!password || password.length < 6) {
        setError('Mật khẩu cần tối thiểu 6 ký tự để đảm bảo an toàn.');
        return;
      }

      const accounts = readRegisteredAccounts();
      if (!accounts) {
        setError('Không thể đọc dữ liệu tài khoản. Vui lòng tải lại trang và thử lại.');
        return;
      }
      const normalizedEmail = email.trim().toLowerCase();
      if (accounts.some((account) => account.email.toLowerCase() === normalizedEmail)) {
        setError('Email này đã được đăng ký. Vui lòng đăng nhập hoặc sử dụng email khác.');
        return;
      }
      if (accounts.some((account) => account.phone.replace(/\s+/g, '') === phone.replace(/\s+/g, ''))) {
        setError('Số điện thoại này đã được đăng ký bằng tài khoản khác.');
        return;
      }

      try {
        const passwordSalt = Array.from(crypto.getRandomValues(new Uint8Array(16)), (byte) =>
          byte.toString(16).padStart(2, '0')
        ).join('');
        const passwordHash = await hashPassword(password, passwordSalt);
        const newAccount: RegisteredAccount = {
          name: name.trim(),
          phone: phone.trim(),
          email: normalizedEmail,
          passwordHash,
          passwordSalt,
        };
        localStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify([...accounts, newAccount]));
      } catch {
        setError('Không thể tạo tài khoản trên trình duyệt này. Vui lòng thử lại sau.');
        return;
      }
      setEmail(normalizedEmail);
      setPassword('');
      setSuccessMsg('Đăng ký thành công! Vui lòng đăng nhập bằng email và mật khẩu vừa tạo.');
      setTimeout(() => {
        setMode('login');
        setSuccessMsg(null);
      }, 1200);
    } else if (mode === 'login') {
      if (!email.trim()) {
        setError('Vui lòng nhập email hoặc số điện thoại đã đăng ký.');
        return;
      }
      if (!password) {
        setError('Vui lòng nhập mật khẩu.');
        return;
      }

      const accounts = readRegisteredAccounts();
      if (!accounts) {
        setError('Không thể đọc dữ liệu tài khoản. Vui lòng tải lại trang và thử lại.');
        return;
      }
      const registeredAccount = accounts.find(
        (account) => account.email.toLowerCase() === email.trim().toLowerCase()
      );
      if (!registeredAccount) {
        setError('Chưa tìm thấy tài khoản với email này. Vui lòng đăng ký trước khi đăng nhập.');
        return;
      }
      let passwordHash: string;
      try {
        passwordHash = await hashPassword(password, registeredAccount.passwordSalt);
      } catch {
        setError('Không thể xác minh mật khẩu trên trình duyệt này. Vui lòng thử lại sau.');
        return;
      }
      if (passwordHash !== registeredAccount.passwordHash) {
        setError('Mật khẩu không chính xác. Vui lòng thử lại.');
        return;
      }

      onLoginSuccess({
        name: registeredAccount.name,
        phone: registeredAccount.phone,
        email: registeredAccount.email,
      });
      setSuccessMsg('Đăng nhập thành công! Chào mừng bạn quay trở lại.');
      setTimeout(() => {
        onClose();
      }, 800);
    } else if (mode === 'forgot') {
      if (!email.trim() || !email.includes('@')) {
        setError('Vui lòng nhập email chính xác để nhận liên kết khôi phục mật khẩu.');
        return;
      }
      setSuccessMsg('Liên kết khôi phục mật khẩu đã được gửi đến email của bạn. Vui lòng kiểm tra hòm thư!');
      setTimeout(() => {
        setMode('login');
        setSuccessMsg(null);
      }, 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-[#FFF9EE] rounded-2xl border border-[#ECDBC0] shadow-2xl p-6 md:p-8 text-[#3A0F0F]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 text-[#4D0202]/70 hover:text-[#4D0202] rounded-full hover:bg-[#ECDBC0]/50 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Studio Brand Header */}
        <div className="flex flex-col items-center mb-6">
          <StudioLogo size="sm" showSlogan={false} />
          <h3 className="font-serif text-xl font-bold text-[#4D0202] mt-3">
            {mode === 'login' && 'Đăng Nhập Tài Khoản'}
            {mode === 'register' && 'Tạo Tài Khoản Khách Hàng'}
            {mode === 'forgot' && 'Khôi Phục Mật Khẩu'}
          </h3>
          <p className="text-xs text-[#4D0202]/70 text-center mt-1">
            {mode === 'login' && 'Quản lý lịch chụp, xem tiến độ nhận ảnh và ưu đãi cá nhân'}
            {mode === 'register' && 'Chỉ mất 30 giây để lưu giữ lịch sử đặt lịch và nhận ưu đãi độc quyền'}
            {mode === 'forgot' && 'Nhập email đã đăng ký để nhận mã xác nhận đổi mật khẩu'}
          </p>
        </div>

        {/* Feedback Messages */}
        {error && (
          <div className="flex items-center gap-2 p-3 mb-4 text-xs text-red-800 bg-red-50 border border-red-200 rounded-lg">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}
        {successMsg && (
          <div className="flex items-center gap-2 p-3 mb-4 text-xs text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-lg">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          {mode === 'register' && (
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#4D0202] mb-1">
                Họ và tên *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4D0202]/40" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ví dụ: Nguyễn Mai Phương"
                  className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-[#ECDBC0] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#4D0202]"
                />
              </div>
            </div>
          )}

          {mode === 'register' && (
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#4D0202] mb-1">
                Số điện thoại *
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4D0202]/40" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Ví dụ: 0908 123 456"
                  className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-[#ECDBC0] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#4D0202]"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#4D0202] mb-1">
              Email đăng nhập *
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4D0202]/40" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tenban@gmail.com"
                className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-[#ECDBC0] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#4D0202]"
              />
            </div>
          </div>

          {mode !== 'forgot' && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#4D0202]">
                  Mật khẩu *
                </label>
                {mode === 'login' && (
                  <button
                    type="button"
                    onClick={() => {
                      setMode('forgot');
                      setError(null);
                    }}
                    className="text-[11px] text-[#4D0202]/70 hover:text-[#4D0202] underline"
                  >
                    Quên mật khẩu?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4D0202]/40" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Tối thiểu 6 ký tự"
                  className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-[#ECDBC0] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#4D0202]"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full mt-4 py-2.5 px-4 bg-[#4D0202] hover:bg-[#380101] text-[#FFF3DD] font-semibold text-sm rounded-lg transition-colors shadow-sm"
          >
            {mode === 'login' && 'Đăng Nhập'}
            {mode === 'register' && 'Đăng Ký Tài Khoản'}
            {mode === 'forgot' && 'Gửi Email Khôi Phục'}
          </button>
        </form>

        {/* Bottom Mode Switch */}
        <div className="mt-5 pt-4 border-t border-[#ECDBC0] text-center text-xs text-[#4D0202]/80">
          {mode === 'login' && (
            <p>
              Chưa có tài khoản?{' '}
              <button
                onClick={() => {
                  setMode('register');
                  setError(null);
                }}
                className="font-bold text-[#4D0202] hover:underline"
              >
                Đăng ký ngay
              </button>
            </p>
          )}

          {mode === 'register' && (
            <p>
              Đã có tài khoản?{' '}
              <button
                onClick={() => {
                  setMode('login');
                  setError(null);
                }}
                className="font-bold text-[#4D0202] hover:underline"
              >
                Đăng nhập tại đây
              </button>
            </p>
          )}

          {mode === 'forgot' && (
            <button
              onClick={() => {
                setMode('login');
                setError(null);
              }}
              className="inline-flex items-center gap-1 font-semibold text-[#4D0202] hover:underline"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Quay lại đăng nhập
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
