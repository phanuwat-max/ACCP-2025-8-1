'use client'
import { useState } from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

type TabType = 'thaiStudent' | 'internationalStudent' | 'internationalPharmacist';

const internationalCountries = [
    "Afghanistan", "Albania", "Algeria", "Argentina", "Australia", "Austria", "Bangladesh",
    "Belgium", "Brazil", "Cambodia", "Canada", "China", "Colombia", "Denmark", "Egypt",
    "Finland", "France", "Germany", "Greece", "Hong Kong", "India", "Indonesia", "Iran",
    "Iraq", "Ireland", "Israel", "Italy", "Japan", "Jordan", "Kenya", "Korea (South)",
    "Kuwait", "Laos", "Lebanon", "Malaysia", "Mexico", "Myanmar", "Nepal", "Netherlands",
    "New Zealand", "Nigeria", "Norway", "Pakistan", "Philippines", "Poland", "Portugal",
    "Qatar", "Romania", "Russia", "Saudi Arabia", "Singapore", "South Africa", "Spain",
    "Sri Lanka", "Sweden", "Switzerland", "Taiwan", "Turkey", "UAE", "UK", "USA",
    "Vietnam", "Other"
];

export default function SignupForm() {
    const t = useTranslations('signup');
    const tLogin = useTranslations('login');
    const locale = useLocale();
    const router = useRouter();
    const { login } = useAuth();

    const [activeTab, setActiveTab] = useState<TabType>('thaiStudent');
    const [isLoading, setIsLoading] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [organization, setOrganization] = useState('');
    const [idCard, setIdCard] = useState('');
    const [country, setCountry] = useState('');
    const [agreeTerms, setAgreeTerms] = useState(false);

    const validateThaiId = (id: string): boolean => {
        if (id.length !== 13 || !/^\d{13}$/.test(id)) return false;
        let sum = 0;
        for (let i = 0; i < 12; i++) sum += parseInt(id[i]) * (13 - i);
        return (11 - (sum % 11)) % 10 === parseInt(id[12]);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            if (!firstName || !lastName || !email || !password || !confirmPassword) {
                alert(locale === 'th' ? 'กรุณากรอกข้อมูลให้ครบถ้วน' : 'Please fill all required fields');
                setIsLoading(false);
                return;
            }
            if (password !== confirmPassword) {
                alert(locale === 'th' ? 'รหัสผ่านไม่ตรงกัน' : 'Passwords do not match');
                setIsLoading(false);
                return;
            }
            if (!agreeTerms) {
                alert(locale === 'th' ? 'กรุณายอมรับข้อกำหนดการใช้งาน' : 'Please agree to terms');
                setIsLoading(false);
                return;
            }
            if (activeTab === 'thaiStudent') {
                if (!idCard) {
                    alert(locale === 'th' ? 'กรุณากรอกเลขบัตรประชาชน' : 'Please enter Thai ID card');
                    setIsLoading(false);
                    return;
                }
                // TODO: Re-enable validation for production
                // if (!validateThaiId(idCard)) {
                //     alert(locale === 'th' ? 'เลขบัตรประชาชนไม่ถูกต้อง' : 'Invalid Thai ID card number');
                //     setIsLoading(false);
                //     return;
                // }
            } else if (!country) {
                alert(locale === 'th' ? 'กรุณาเลือกประเทศ' : 'Please select country');
                setIsLoading(false);
                return;
            }

            await new Promise(resolve => setTimeout(resolve, 1000));

            const userData = {
                firstName, lastName, email,
                country: activeTab === 'thaiStudent' ? 'Thailand' : country,
                idCard: activeTab === 'thaiStudent' ? idCard : undefined,
                isThai: activeTab === 'thaiStudent',
                delegateType: activeTab === 'thaiStudent' ? 'thai_student' as const
                    : activeTab === 'internationalStudent' ? 'international_student' as const
                        : 'international_pharmacist' as const
            };

            login(userData);
            await new Promise(resolve => setTimeout(resolve, 100));
            router.push(`/${locale}`);
        } catch (error) {
            console.error('Signup error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const tabs: { id: TabType; label: string; labelTh: string }[] = [
        { id: 'thaiStudent', label: 'Thai Student', labelTh: 'นักศึกษาไทย' },
        { id: 'internationalStudent', label: "Int'l Student", labelTh: 'นศ.ต่างชาติ' },
        { id: 'internationalPharmacist', label: "Int'l Pharmacist", labelTh: 'ภก.ต่างชาติ' }
    ];

    const isThai = activeTab === 'thaiStudent';

    const inputStyle = {
        width: '100%',
        padding: '12px 14px',
        fontSize: '15px',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        outline: 'none'
    };

    return (
        <div style={{
            background: '#fff',
            borderRadius: '16px',
            padding: '40px',
            boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
            maxWidth: '480px',
            margin: '0 auto'
        }}>
            {/* Logo */}
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <Link href={`/${locale}`}>
                    <img src="/assets/img/logo/accp_logo_main.png" alt="ACCP 2026"
                        style={{ height: '80px', width: 'auto' }} />
                </Link>
            </div>

            {/* Title */}
            <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#1a1a1a', textAlign: 'center', marginBottom: '8px' }}>
                {locale === 'th' ? 'สร้างบัญชี' : 'Create Account'}
            </h2>
            <p style={{ textAlign: 'center', color: '#666', fontSize: '14px', marginBottom: '24px' }}>
                {locale === 'th' ? 'เลือกประเภทผู้ใช้งาน' : 'Select your account type'}
            </p>

            {/* Tab Selector */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveTab(tab.id)}
                        style={{
                            flex: 1,
                            padding: '12px 8px',
                            border: activeTab === tab.id ? '2px solid #1a237e' : '1px solid #e0e0e0',
                            borderRadius: '8px',
                            background: activeTab === tab.id ? '#f5f5ff' : '#fff',
                            color: activeTab === tab.id ? '#1a237e' : '#666',
                            fontSize: '12px',
                            fontWeight: activeTab === tab.id ? '600' : '400',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        {locale === 'th' ? tab.labelTh : tab.label}
                    </button>
                ))}
            </div>

            {/* Note for Thai Pharmacist */}
            <div style={{
                marginBottom: '20px',
                padding: '12px',
                background: '#f5f5f5',
                borderRadius: '8px',
                fontSize: '13px',
                color: '#666'
            }}>
                ℹ️ {locale === 'th'
                    ? 'เภสัชกรไทย: ไม่ต้องสมัครสมาชิก สามารถเข้าสู่ระบบด้วยเลขใบประกอบวิชาชีพได้เลย'
                    : 'Thai Pharmacists: No registration required. Login directly with your license ID.'}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
                {/* Name Fields */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                    <div>
                        <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#333', marginBottom: '6px' }}>
                            {t('firstName')} <span style={{ color: '#e53935' }}>*</span>
                        </label>
                        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)}
                            placeholder={t('firstName')} required style={inputStyle} />
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#333', marginBottom: '6px' }}>
                            {t('lastName')} <span style={{ color: '#e53935' }}>*</span>
                        </label>
                        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)}
                            placeholder={t('lastName')} required style={inputStyle} />
                    </div>
                </div>

                {/* Thai Student: ID Card */}
                {activeTab === 'thaiStudent' && (
                    <div style={{ marginBottom: '16px' }}>
                        <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#333', marginBottom: '6px' }}>
                            {locale === 'th' ? 'เลขบัตรประชาชน' : 'Thai ID Card'} <span style={{ color: '#e53935' }}>*</span>
                        </label>
                        <input type="text" value={idCard}
                            onChange={(e) => setIdCard(e.target.value.replace(/\D/g, '').slice(0, 13))}
                            placeholder={locale === 'th' ? 'เลข 13 หลัก' : '13-digit number'}
                            maxLength={13} required style={inputStyle} />
                        <p style={{ fontSize: '12px', color: '#888', marginTop: '4px' }}>
                            {locale === 'th' ? 'ยืนยันสัญชาติไทยเพื่อรับราคาพิเศษ' : 'Verify Thai nationality for THB pricing'}
                        </p>
                    </div>
                )}

                {/* International: Country */}
                {activeTab !== 'thaiStudent' && (
                    <div style={{ marginBottom: '16px' }}>
                        <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#333', marginBottom: '6px' }}>
                            {locale === 'th' ? 'ประเทศ' : 'Country'} <span style={{ color: '#e53935' }}>*</span>
                        </label>
                        <select value={country} onChange={(e) => setCountry(e.target.value)} required
                            style={{ ...inputStyle, appearance: 'none', background: '#fff url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6 9 12 15 18 9\'%3e%3c/polyline%3e%3c/svg%3e") no-repeat right 12px center', backgroundSize: '16px' }}>
                            <option value="">{locale === 'th' ? 'เลือกประเทศ' : 'Select country'}</option>
                            {internationalCountries.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>
                )}

                {/* Email */}
                <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#333', marginBottom: '6px' }}>
                        {t('email')} <span style={{ color: '#e53935' }}>*</span>
                    </label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                        placeholder="email@example.com" required style={inputStyle} />
                </div>

                {/* Organization */}
                <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#333', marginBottom: '6px' }}>
                        {t('organization')}
                    </label>
                    <input type="text" value={organization} onChange={(e) => setOrganization(e.target.value)}
                        placeholder={t('organization')} style={inputStyle} />
                </div>

                {/* Password Fields */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                    <div>
                        <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#333', marginBottom: '6px' }}>
                            {t('password')} <span style={{ color: '#e53935' }}>*</span>
                        </label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••" required style={inputStyle} />
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#333', marginBottom: '6px' }}>
                            {t('confirmPassword')} <span style={{ color: '#e53935' }}>*</span>
                        </label>
                        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="••••••••" required style={inputStyle} />
                    </div>
                </div>

                {/* Terms */}
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', cursor: 'pointer' }}>
                        <input type="checkbox" checked={agreeTerms} onChange={(e) => setAgreeTerms(e.target.checked)}
                            required style={{ width: '18px', height: '18px', marginTop: '2px' }} />
                        <span style={{ fontSize: '13px', color: '#666', lineHeight: '1.5' }}>
                            {t('agreeTerms')} <Link href="/terms" style={{ color: '#1a237e' }}>{t('terms')}</Link> {t('and')} <Link href="/privacy" style={{ color: '#1a237e' }}>{t('privacy')}</Link>
                        </span>
                    </label>
                </div>

                {/* Submit Button */}
                <button type="submit" disabled={isLoading}
                    style={{
                        width: '100%',
                        padding: '14px',
                        background: '#1a237e',
                        border: 'none',
                        borderRadius: '8px',
                        color: '#fff',
                        fontSize: '16px',
                        fontWeight: '600',
                        cursor: isLoading ? 'not-allowed' : 'pointer',
                        opacity: isLoading ? 0.7 : 1
                    }}>
                    {isLoading ? (locale === 'th' ? 'กำลังสร้างบัญชี...' : 'Creating...') : t('createAccount')}
                </button>
            </form>

            {/* Login Link */}
            <div style={{ textAlign: 'center', marginTop: '24px' }}>
                <p style={{ fontSize: '14px', color: '#666' }}>
                    {t('haveAccount')}{' '}
                    <Link href={`/${locale}/login`} style={{ color: '#1a237e', fontWeight: '600', textDecoration: 'none' }}>
                        {t('signIn')}
                    </Link>
                </p>
            </div>
        </div>
    );
}
