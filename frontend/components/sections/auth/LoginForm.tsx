'use client'
import { useState } from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import FormInput from '@/components/common/FormInput';
import Button from '@/components/common/Button';

export default function LoginForm() {
    const t = useTranslations('login');
    const [activeTab, setActiveTab] = useState<'member' | 'pharmacist' | 'international'>('member');
    const locale = useLocale();
    const router = useRouter();
    const { login } = useAuth();
    
    // Form states
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [licenseId, setLicenseId] = useState('');
    const [idCard, setIdCard] = useState('');
    const [pharmacistPassword, setPharmacistPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Validate form fields based on active tab
            if (activeTab === 'member') {
                if (!email || !password) {
                    alert('Please fill in all fields');
                    setIsLoading(false);
                    return;
                }
            } else if (activeTab === 'pharmacist') {
                if (!licenseId || !idCard || !pharmacistPassword) {
                    alert('Please fill in all fields');
                    setIsLoading(false);
                    return;
                }
            } else if (activeTab === 'international') {
                if (!email || !password) {
                    alert('Please fill in all fields');
                    setIsLoading(false);
                    return;
                }
            }

            // Simulating API call for now (demo without backend)
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // For demo purposes, use hardcoded data
            // In production, this should come from API response
            const userData = {
                firstName: activeTab === 'member' ? 'John' : 'Pharmacist',
                lastName: activeTab === 'member' ? 'Doe' : 'User',
                email: activeTab === 'member' || activeTab === 'international' ? email : `pharmacist_${licenseId}@accp.local`,
                delegateType: activeTab === 'member' ? 'pharmacy_students' as const : (activeTab === 'international' ? 'foreign_delegates' as const : 'all_delegate' as const)
            };
            
            login(userData);
            
            // Add a small delay to ensure state updates before navigation
            await new Promise(resolve => setTimeout(resolve, 100));
            router.push(`/${locale}`);
        } catch (error) {
            console.error('Login error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{
            background: '#fff',
            borderRadius: '20px',
            padding: '40px',
            boxShadow: '0 20px 60px rgba(26, 35, 126, 0.1)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Decorative Element */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '5px',
                background: 'linear-gradient(90deg, #00C853 0%, #69F0AE 50%, #00C853 100%)'
            }} />

            <div className="login-header text-center mb-4">
                <Link href={`/${locale}`}>
                    <img 
                        src="/assets/img/logo/accp_logo_main.png" 
                        alt="ACCP 2026" 
                        style={{ height: '100px', width: 'auto', marginBottom: '20px' }} 
                    />
                </Link>
                <h3>{t('pageTitle')}</h3>
                <p style={{ color: '#666', fontSize: '14px' }}>{t('subtitle')}</p>
            </div>

            {/* Tab Selector */}
            <div style={{
                display: 'flex',
                gap: '10px',
                marginBottom: '30px',
                background: '#f5f5f5',
                padding: '6px',
                borderRadius: '12px',
                flexWrap: 'wrap'
            }}>
                <button
                    onClick={() => setActiveTab('member')}
                    style={{
                        flex: 1,
                        padding: '12px 10px',
                        border: 'none',
                        borderRadius: '10px',
                        background: activeTab === 'member' ? '#1a237e' : 'transparent',
                        color: activeTab === 'member' ? '#fff' : '#666',
                        fontSize: '13px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        minWidth: '100px'
                    }}
                >
                    <i className="fa-solid fa-user" style={{ fontSize: '14px' }} />
                    Member
                </button>
                <button
                    onClick={() => setActiveTab('pharmacist')}
                    style={{
                        flex: 1,
                        padding: '12px 10px',
                        border: 'none',
                        borderRadius: '10px',
                        background: activeTab === 'pharmacist' ? '#00695c' : 'transparent',
                        color: activeTab === 'pharmacist' ? '#fff' : '#666',
                        fontSize: '13px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                         minWidth: '100px'
                    }}
                >
                    <i className="fa-solid fa-user-doctor" style={{ fontSize: '14px' }} />
                    {t('tabs.thaiPharmacist')}
                </button>
                <button
                    onClick={() => setActiveTab('international')}
                    style={{
                        flex: 1,
                        padding: '12px 10px',
                        border: 'none',
                        borderRadius: '10px',
                        background: activeTab === 'international' ? '#FF6F00' : 'transparent',
                        color: activeTab === 'international' ? '#fff' : '#666',
                        fontSize: '13px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                         minWidth: '140px'
                    }}
                >
                    <i className="fa-solid fa-earth-americas" style={{ fontSize: '14px' }} />
                     {t('tabs.internationalPharmacist')}
                </button>
            </div>

            {/* Member Login Form */}
            {activeTab === 'member' && (
                <form onSubmit={handleSubmit}>
                    <h3 style={{
                        fontSize: '20px',
                        fontWeight: '700',
                        color: '#1a237e',
                        marginBottom: '20px',
                        textAlign: 'center'
                    }}>
                        {t('memberLogin')}
                    </h3>

                    <FormInput
                        label={t('email')}
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={t('email')}
                        required
                        icon="fa-solid fa-envelope"
                        iconColor="#FFBA00"
                    />

                    <FormInput
                        label={t('password')}
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder={t('password')}
                        required
                        icon="fa-solid fa-lock"
                        iconColor="#FFBA00"
                    />

                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '20px'
                    }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                            <input type="checkbox" style={{ width: '16px', height: '16px' }} />
                            <span style={{ fontSize: '13px', color: '#666' }}>{t('rememberMe')}</span>
                        </label>
                        <Link
                            href="/forgot-password"
                            style={{
                                color: '#1a237e',
                                fontSize: '13px',
                                fontWeight: '500',
                                textDecoration: 'none'
                            }}
                        >
                            {t('forgotPassword')}
                        </Link>
                    </div>

                    <Button
                        type="submit"
                        variant="primary"
                        loading={isLoading}
                        fullWidth
                        icon="fa-solid fa-right-to-bracket"
                    >
                        {t('signIn')}
                    </Button>
                </form>
            )}

            {/* Pharmacist Login Form */}
            {activeTab === 'pharmacist' && (
                <form onSubmit={handleSubmit}>
                    <h3 style={{
                        fontSize: '20px',
                        fontWeight: '700',
                        color: '#00695c',
                        marginBottom: '8px',
                        textAlign: 'center'
                    }}>
                        {t('pharmacistLogin')}
                    </h3>
                    <p style={{
                        textAlign: 'center',
                        color: '#666',
                        fontSize: '13px',
                        marginBottom: '20px'
                    }}>
                        Login with your pharmacist license
                    </p>

                    <div style={{ marginBottom: '20px' }}>
                        <label style={{
                            display: 'block',
                            fontSize: '14px',
                            fontWeight: '600',
                            color: '#333',
                            marginBottom: '8px'
                        }}>
                            <i className="fa-solid fa-id-card" style={{ marginRight: '8px', color: '#00897b' }} />
                            {t('licenseId')}
                        </label>
                        <input
                            type="text"
                            placeholder={t('licenseExample')}
                            value={licenseId}
                            onChange={(e) => setLicenseId(e.target.value)}
                            required
                            style={{
                                width: '100%',
                                padding: '14px 18px',
                                fontSize: '15px',
                                border: '2px solid #e8e8e8',
                                borderRadius: '10px',
                                outline: 'none',
                                transition: 'all 0.3s ease',
                                background: '#fafafa'
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label style={{
                            display: 'block',
                            fontSize: '14px',
                            fontWeight: '600',
                            color: '#333',
                            marginBottom: '8px'
                        }}>
                            <i className="fa-solid fa-id-badge" style={{ marginRight: '8px', color: '#00897b' }} />
                            {t('idCard')}
                        </label>
                        <input
                            type="text"
                            placeholder={t('idCardExample')}
                            value={idCard}
                            onChange={(e) => setIdCard(e.target.value)}
                            maxLength={13}
                            required
                            style={{
                                width: '100%',
                                padding: '14px 18px',
                                fontSize: '15px',
                                border: '2px solid #e8e8e8',
                                borderRadius: '10px',
                                outline: 'none',
                                transition: 'all 0.3s ease',
                                background: '#fafafa'
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                        <label style={{
                            display: 'block',
                            fontSize: '14px',
                            fontWeight: '600',
                            color: '#333',
                            marginBottom: '8px'
                        }}>
                            <i className="fa-solid fa-lock" style={{ marginRight: '8px', color: '#00897b' }} />
                            {t('password')}
                        </label>
                        <input
                            type="password"
                            placeholder={t('password')}
                            value={pharmacistPassword}
                            onChange={(e) => setPharmacistPassword(e.target.value)}
                            required
                            style={{
                                width: '100%',
                                padding: '14px 18px',
                                fontSize: '15px',
                                border: '2px solid #e8e8e8',
                                borderRadius: '10px',
                                outline: 'none',
                                transition: 'all 0.3s ease',
                                background: '#fafafa'
                            }}
                        />
                    </div>

                    <div style={{
                        textAlign: 'right',
                        marginBottom: '20px'
                    }}>
                        <Link
                            href="/forgot-password"
                            style={{
                                color: '#00695c',
                                fontSize: '13px',
                                fontWeight: '500',
                                textDecoration: 'none'
                            }}
                        >
                            {t('forgotPassword')}
                        </Link>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        style={{
                            width: '100%',
                            padding: '16px',
                            background: isLoading ? '#ccc' : 'linear-gradient(135deg, #00695c 0%, #00897b 100%)',
                            border: 'none',
                            borderRadius: '10px',
                            color: '#fff',
                            fontSize: '16px',
                            fontWeight: '700',
                            cursor: isLoading ? 'not-allowed' : 'pointer',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 8px 25px rgba(0, 105, 92, 0.3)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '10px'
                        }}
                    >
                        <i className="fa-solid fa-user-doctor" />
                        {isLoading ? 'Loading...' : t('signIn')}
                    </button>

                    {/* CPE Info */}
                    <div style={{
                        marginTop: '20px',
                        padding: '15px',
                        background: 'rgba(0, 105, 92, 0.08)',
                        borderRadius: '10px',
                        borderLeft: '4px solid #00897b'
                    }}>
                        <p style={{
                            margin: 0,
                            fontSize: '13px',
                            color: '#00695c',
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '10px'
                        }}>
                            <i className="fa-solid fa-graduation-cap" style={{ marginTop: '2px' }} />
                            <span>
                                {t('cpeInfo')}
                            </span>
                        </p>
                    </div>
                </form>
            )}

            {/* International Pharmacist Login Form */}
            {activeTab === 'international' && (
                <form onSubmit={handleSubmit}>
                    <h3 style={{
                        fontSize: '20px',
                        fontWeight: '700',
                        color: '#FF6F00',
                        marginBottom: '20px',
                        textAlign: 'center'
                    }}>
                        {t('internationalLogin')}
                    </h3>
                    <p style={{
                        textAlign: 'center',
                        color: '#666',
                        fontSize: '13px',
                        marginBottom: '20px'
                    }}>
                       Sign in with your email and password
                    </p>

                    <div style={{ marginBottom: '20px' }}>
                        <label style={{
                            display: 'block',
                            fontSize: '14px',
                            fontWeight: '600',
                            color: '#333',
                            marginBottom: '8px'
                        }}>
                            <i className="fa-solid fa-envelope" style={{ marginRight: '8px', color: '#FF6F00' }} />
                            {t('email')}
                        </label>
                        <input
                            type="email"
                            placeholder={t('email')}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{
                                width: '100%',
                                padding: '14px 18px',
                                fontSize: '15px',
                                border: '2px solid #e8e8e8',
                                borderRadius: '10px',
                                outline: 'none',
                                transition: 'all 0.3s ease',
                                background: '#fafafa'
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                        <label style={{
                            display: 'block',
                            fontSize: '14px',
                            fontWeight: '600',
                            color: '#333',
                            marginBottom: '8px'
                        }}>
                            <i className="fa-solid fa-lock" style={{ marginRight: '8px', color: '#FF6F00' }} />
                            {t('password')}
                        </label>
                        <input
                            type="password"
                            placeholder={t('password')}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{
                                width: '100%',
                                padding: '14px 18px',
                                fontSize: '15px',
                                border: '2px solid #e8e8e8',
                                borderRadius: '10px',
                                outline: 'none',
                                transition: 'all 0.3s ease',
                                background: '#fafafa'
                            }}
                        />
                    </div>

                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '20px'
                    }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                            <input type="checkbox" style={{ width: '16px', height: '16px' }} />
                            <span style={{ fontSize: '13px', color: '#666' }}>{t('rememberMe')}</span>
                        </label>
                        <Link
                            href="/forgot-password"
                            style={{
                                color: '#1a237e',
                                fontSize: '13px',
                                fontWeight: '500',
                                textDecoration: 'none'
                            }}
                        >
                            {t('forgotPassword')}
                        </Link>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        style={{
                            width: '100%',
                            padding: '16px',
                            background: isLoading ? '#ccc' : 'linear-gradient(135deg, #FF6F00 0%, #FFA000 100%)',
                            border: 'none',
                            borderRadius: '10px',
                            color: '#fff',
                            fontSize: '16px',
                            fontWeight: '700',
                            cursor: isLoading ? 'not-allowed' : 'pointer',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 8px 25px rgba(255, 111, 0, 0.3)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '10px'
                        }}
                    >
                        <i className="fa-solid fa-right-to-bracket" />
                        {isLoading ? 'Loading...' : t('signIn')}
                    </button>
                </form>
            )}

            {/* Divider and Register Link */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                margin: '25px 0 20px',
                gap: '15px'
            }}>
                <div style={{ flex: 1, height: '1px', background: '#e8e8e8' }} />
                <span style={{ color: '#999', fontSize: '13px' }}>{t('or')}</span>
                <div style={{ flex: 1, height: '1px', background: '#e8e8e8' }} />
            </div>

            <div className="text-center">
                <p style={{ color: '#666', fontSize: '14px', margin: 0 }}>
                    {t('noAccount')}{' '}
                    <Link
                        href="/signup"
                        style={{
                            color: '#FFBA00',
                            fontWeight: '700',
                            textDecoration: 'none'
                        }}
                    >
                        {t('signUp')}
                    </Link>
                </p>
            </div>

            <div style={{
                marginTop: '25px',
                textAlign: 'center'
            }}>
                <p style={{ color: '#999', fontSize: '13px' }}>
                    {t('needHelp')} <Link href="/contact" style={{ color: '#1a237e', textDecoration: 'none' }}>{t('contactSupport')}</Link>
                </p>
            </div>
        </div>
    )
}
