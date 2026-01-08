'use client'
import { useState } from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

type TabType = 'thaiStudent' | 'internationalStudent' | 'thaiPharmacist' | 'internationalPharmacist';

export default function LoginForm() {
    const t = useTranslations('login');
    const locale = useLocale();
    const router = useRouter();
    const { login } = useAuth();

    const [activeTab, setActiveTab] = useState<TabType>('thaiStudent');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [licenseId, setLicenseId] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // validateThaiId removed - no longer needed for login

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Validation
            if (activeTab === 'thaiPharmacist') {
                // Thai Pharmacist: License Number + Password
                if (!licenseId || !password) {
                    alert(locale === 'th' ? 'กรุณากรอกข้อมูลให้ครบถ้วน' : 'Please fill in all fields');
                    setIsLoading(false);
                    return;
                }
            } else {
                // Others: Email + Password
                if (!email || !password) {
                    alert(locale === 'th' ? 'กรุณากรอกข้อมูลให้ครบถ้วน' : 'Please fill in all fields');
                    setIsLoading(false);
                    return;
                }
            }

            await new Promise(resolve => setTimeout(resolve, 1000));

            const userData = {
                thaiStudent: {
                    firstName: 'นักศึกษา', lastName: 'ไทย', email, country: 'Thailand',
                    isThai: true, delegateType: 'thai_student' as const
                },
                internationalStudent: {
                    firstName: 'International', lastName: 'Student', email, country: 'International',
                    isThai: false, delegateType: 'international_student' as const
                },
                thaiPharmacist: {
                    firstName: 'เภสัชกร', lastName: 'ไทย', email: '', licenseId,
                    country: 'Thailand', isThai: true, delegateType: 'thai_pharmacist' as const
                },
                internationalPharmacist: {
                    firstName: 'International', lastName: 'Pharmacist', email, country: 'International',
                    isThai: false, delegateType: 'international_pharmacist' as const
                }
            };

            login(userData[activeTab]);
            await new Promise(resolve => setTimeout(resolve, 100));
            router.push(`/${locale}`);
        } catch (error) {
            console.error('Login error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const tabs: { id: TabType; label: string; labelTh: string }[] = [
        { id: 'thaiStudent', label: 'Thai Student', labelTh: 'นักศึกษาไทย' },
        { id: 'internationalStudent', label: 'International Student', labelTh: 'นศ.ต่างชาติ' },
        { id: 'thaiPharmacist', label: 'Thai Pharmacist', labelTh: 'เภสัชกรไทย' },
        { id: 'internationalPharmacist', label: 'Professional & Academician', labelTh: 'ภก.ต่างชาติ' }
    ];

    const isThai = activeTab === 'thaiStudent' || activeTab === 'thaiPharmacist';

    return (
        <div style={{
            background: '#fff',
            borderRadius: '16px',
            padding: '40px',
            boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
            maxWidth: '440px',
            margin: '0 auto'
        }}>
            {/* Logo */}
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                <Link href={`/${locale}`}>
                    <img src="/assets/img/logo/accp_logo_main.png" alt="ACCP 2026"
                        style={{ height: '80px', width: 'auto' }} />
                </Link>
            </div>

            {/* Title */}
            <h2 style={{
                fontSize: '24px', fontWeight: '600', color: '#1a1a1a',
                textAlign: 'center', marginBottom: '8px'
            }}>
                {locale === 'th' ? 'เข้าสู่ระบบ' : 'Sign In'}
            </h2>
            <p style={{ textAlign: 'center', color: '#666', fontSize: '14px', marginBottom: '24px' }}>
                {locale === 'th' ? 'เลือกประเภทผู้ใช้งาน' : 'Select your account type'}
            </p>

            {/* Tab Selector */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '8px',
                marginBottom: '24px'
            }}>
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveTab(tab.id)}
                        style={{
                            padding: '12px 8px',
                            border: activeTab === tab.id ? '2px solid #1a237e' : '1px solid #e0e0e0',
                            borderRadius: '8px',
                            background: activeTab === tab.id ? '#f5f5ff' : '#fff',
                            color: activeTab === tab.id ? '#1a237e' : '#666',
                            fontSize: '13px',
                            fontWeight: activeTab === tab.id ? '600' : '400',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        {locale === 'th' ? tab.labelTh : tab.label}
                    </button>
                ))}
            </div>
            {/* Form */}
            <form onSubmit={handleSubmit}>
                {/* Email/Password for non-Thai Pharmacist */}
                {activeTab !== 'thaiPharmacist' && (
                    <>
                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#333', marginBottom: '6px' }}>
                                {t('email')} <span style={{ color: '#e53935' }}>*</span>
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="email@example.com"
                                required
                                style={{
                                    width: '100%',
                                    padding: '12px 14px',
                                    fontSize: '15px',
                                    border: '1px solid #e0e0e0',
                                    borderRadius: '8px',
                                    outline: 'none',
                                    transition: 'border-color 0.2s'
                                }}
                            />
                        </div>
                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#333', marginBottom: '6px' }}>
                                {t('password')} <span style={{ color: '#e53935' }}>*</span>
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                                style={{
                                    width: '100%',
                                    padding: '12px 14px',
                                    fontSize: '15px',
                                    border: '1px solid #e0e0e0',
                                    borderRadius: '8px',
                                    outline: 'none',
                                    transition: 'border-color 0.2s'
                                }}
                            />
                        </div>
                    </>
                )}

                {/* Thai Student: No additional fields needed - uses Email + Password */}

                {/* Thai Pharmacist: License ID + Password */}
                {activeTab === 'thaiPharmacist' && (
                    <>
                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#333', marginBottom: '6px' }}>
                                {t('licenseId')} <span style={{ color: '#e53935' }}>*</span>
                            </label>
                            <input
                                type="text"
                                value={licenseId}
                                onChange={(e) => setLicenseId(e.target.value)}
                                placeholder={t('licenseExample')}
                                required
                                style={{
                                    width: '100%',
                                    padding: '12px 14px',
                                    fontSize: '15px',
                                    border: '1px solid #e0e0e0',
                                    borderRadius: '8px',
                                    outline: 'none'
                                }}
                            />
                        </div>
                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#333', marginBottom: '6px' }}>
                                {t('password')} <span style={{ color: '#e53935' }}>*</span>
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                                style={{
                                    width: '100%',
                                    padding: '12px 14px',
                                    fontSize: '15px',
                                    border: '1px solid #e0e0e0',
                                    borderRadius: '8px',
                                    outline: 'none'
                                }}
                            />
                        </div>
                        <div style={{
                            marginBottom: '16px',
                            padding: '12px',
                            background: '#f5f5f5',
                            borderRadius: '8px',
                            fontSize: '13px',
                            color: '#666'
                        }}>
                            ℹ️ {t('cpeInfo')}
                        </div>
                    </>
                )}

                {/* Remember Me */}
                {activeTab !== 'thaiPharmacist' && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px', color: '#666' }}>
                            <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)}
                                style={{ width: '16px', height: '16px' }} />
                            {t('rememberMe')}
                        </label>
                        <Link href={`/${locale}/forgot-password`} style={{ fontSize: '14px', color: '#1a237e', textDecoration: 'none' }}>
                            {t('forgotPassword')}
                        </Link>
                    </div>
                )}

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isLoading}
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
                        opacity: isLoading ? 0.7 : 1,
                        transition: 'opacity 0.2s'
                    }}
                >
                    {isLoading
                        ? (locale === 'th' ? 'กำลังเข้าสู่ระบบ...' : 'Signing in...')
                        : t('signIn')
                    }
                </button>
            </form>

            {/* Sign Up Link */}
            <div style={{ textAlign: 'center', marginTop: '24px' }}>
                <p style={{ fontSize: '14px', color: '#666' }}>
                    {t('noAccount')}{' '}
                    <Link href={`/${locale}/signup`} style={{ color: '#1a237e', fontWeight: '600', textDecoration: 'none' }}>
                        {t('signUp')}
                    </Link>
                </p>
            </div>
        </div>
    );
}
