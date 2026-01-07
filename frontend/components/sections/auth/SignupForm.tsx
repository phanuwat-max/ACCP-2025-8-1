'use client'
import { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function SignupForm() {
    const t = useTranslations('signup');
    const tLogin = useTranslations('login');
    const [activeTab, setActiveTab] = useState<'member' | 'pharmacist'>('member');

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

            {/* Logo */}
            <div className="text-center" style={{ marginBottom: '25px' }}>
                <img
                    src="/assets/img/logo/accp_logo.svg"
                    alt="ACCP 2026"
                    style={{ height: '70px', marginBottom: '15px' }}
                />
            </div>

            {/* Tab Selector */}
            <div style={{
                display: 'flex',
                gap: '10px',
                marginBottom: '30px',
                background: '#f5f5f5',
                padding: '6px',
                borderRadius: '12px'
            }}>
                <button
                    onClick={() => setActiveTab('member')}
                    style={{
                        flex: 1,
                        padding: '14px 16px',
                        border: 'none',
                        borderRadius: '10px',
                        background: activeTab === 'member' ? '#1a237e' : 'transparent',
                        color: activeTab === 'member' ? '#fff' : '#666',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px'
                    }}
                >
                    <i className="fa-solid fa-user" style={{ fontSize: '16px' }} />
                    Member
                </button>
                <button
                    onClick={() => setActiveTab('pharmacist')}
                    style={{
                        flex: 1,
                        padding: '14px 16px',
                        border: 'none',
                        borderRadius: '10px',
                        background: activeTab === 'pharmacist' ? '#00695c' : 'transparent',
                        color: activeTab === 'pharmacist' ? '#fff' : '#666',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px'
                    }}
                >
                    <i className="fa-solid fa-user-doctor" style={{ fontSize: '16px' }} />
                    {tLogin('pharmacistLogin').replace('Login', '').replace('เข้าสู่ระบบ', '').trim()}
                </button>
            </div>

            {/* Member Sign Up Form */}
            {activeTab === 'member' && (
                <form>
                    <h3 style={{
                        fontSize: '20px',
                        fontWeight: '700',
                        color: '#1a237e',
                        marginBottom: '20px',
                        textAlign: 'center'
                    }}>
                        {t('createAccount')}
                    </h3>

                    <div className="row">
                        <div className="col-md-6">
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{
                                    display: 'block',
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    color: '#333',
                                    marginBottom: '8px'
                                }}>
                                    <i className="fa-solid fa-user" style={{ marginRight: '8px', color: '#FFBA00' }} />
                                    {t('firstName')} *
                                </label>
                                <input
                                    type="text"
                                    placeholder={t('firstName')}
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '14px 18px',
                                        fontSize: '15px',
                                        border: '2px solid #e8e8e8',
                                        borderRadius: '10px',
                                        outline: 'none',
                                        background: '#fafafa'
                                    }}
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{
                                    display: 'block',
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    color: '#333',
                                    marginBottom: '8px'
                                }}>
                                    <i className="fa-solid fa-user" style={{ marginRight: '8px', color: '#FFBA00' }} />
                                    {t('lastName')} *
                                </label>
                                <input
                                    type="text"
                                    placeholder={t('lastName')}
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '14px 18px',
                                        fontSize: '15px',
                                        border: '2px solid #e8e8e8',
                                        borderRadius: '10px',
                                        outline: 'none',
                                        background: '#fafafa'
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label style={{
                            display: 'block',
                            fontSize: '14px',
                            fontWeight: '600',
                            color: '#333',
                            marginBottom: '8px'
                        }}>
                            <i className="fa-solid fa-envelope" style={{ marginRight: '8px', color: '#FFBA00' }} />
                            {t('email')} *
                        </label>
                        <input
                            type="email"
                            placeholder={t('email')}
                            required
                            style={{
                                width: '100%',
                                padding: '14px 18px',
                                fontSize: '15px',
                                border: '2px solid #e8e8e8',
                                borderRadius: '10px',
                                outline: 'none',
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
                            <i className="fa-solid fa-building" style={{ marginRight: '8px', color: '#FFBA00' }} />
                            {t('organization')}
                        </label>
                        <input
                            type="text"
                            placeholder={t('organization')}
                            style={{
                                width: '100%',
                                padding: '14px 18px',
                                fontSize: '15px',
                                border: '2px solid #e8e8e8',
                                borderRadius: '10px',
                                outline: 'none',
                                background: '#fafafa'
                            }}
                        />
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{
                                    display: 'block',
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    color: '#333',
                                    marginBottom: '8px'
                                }}>
                                    <i className="fa-solid fa-lock" style={{ marginRight: '8px', color: '#FFBA00' }} />
                                    {t('password')} *
                                </label>
                                <input
                                    type="password"
                                    placeholder={t('password')}
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '14px 18px',
                                        fontSize: '15px',
                                        border: '2px solid #e8e8e8',
                                        borderRadius: '10px',
                                        outline: 'none',
                                        background: '#fafafa'
                                    }}
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{
                                    display: 'block',
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    color: '#333',
                                    marginBottom: '8px'
                                }}>
                                    <i className="fa-solid fa-lock" style={{ marginRight: '8px', color: '#FFBA00' }} />
                                    {t('confirmPassword')} *
                                </label>
                                <input
                                    type="password"
                                    placeholder={t('confirmPassword')}
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '14px 18px',
                                        fontSize: '15px',
                                        border: '2px solid #e8e8e8',
                                        borderRadius: '10px',
                                        outline: 'none',
                                        background: '#fafafa'
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', cursor: 'pointer' }}>
                            <input type="checkbox" required style={{ width: '18px', height: '18px', marginTop: '2px' }} />
                            <span style={{ fontSize: '13px', color: '#666', lineHeight: '1.5' }}>
                                {t('agreeTerms')} <Link href="/terms" style={{ color: '#1a237e' }}>{t('terms')}</Link> {t('and')} <Link href="/privacy" style={{ color: '#1a237e' }}>{t('privacy')}</Link>
                            </span>
                        </label>
                    </div>

                    <button
                        type="submit"
                        style={{
                            width: '100%',
                            padding: '16px',
                            background: 'linear-gradient(135deg, #00C853 0%, #69F0AE 100%)',
                            border: 'none',
                            borderRadius: '10px',
                            color: '#fff',
                            fontSize: '16px',
                            fontWeight: '700',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 8px 25px rgba(0, 200, 83, 0.3)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '10px'
                        }}
                    >
                        <i className="fa-solid fa-user-plus" />
                        {t('createAccount')}
                    </button>
                </form>
            )}

            {/* Pharmacist Sign Up Form */}
            {activeTab === 'pharmacist' && (
                <form>
                    <h3 style={{
                        fontSize: '20px',
                        fontWeight: '700',
                        color: '#00695c',
                        marginBottom: '8px',
                        textAlign: 'center'
                    }}>
                        {tLogin('pharmacistLogin').replace('เข้าสู่ระบบ', 'สมัครสมาชิก สำหรับ').replace('Login', 'Registration')}
                    </h3>
                    <p style={{
                        textAlign: 'center',
                        color: '#666',
                        fontSize: '13px',
                        marginBottom: '20px'
                    }}>
                        Register with your pharmacist license for CPE credits
                    </p>

                    <div className="row">
                        <div className="col-md-6">
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{
                                    display: 'block',
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    color: '#333',
                                    marginBottom: '8px'
                                }}>
                                    <i className="fa-solid fa-user" style={{ marginRight: '8px', color: '#00897b' }} />
                                    {t('firstNameThai')} *
                                </label>
                                <input
                                    type="text"
                                    placeholder={t('firstNameThai')}
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '14px 18px',
                                        fontSize: '15px',
                                        border: '2px solid #e8e8e8',
                                        borderRadius: '10px',
                                        outline: 'none',
                                        background: '#fafafa'
                                    }}
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{
                                    display: 'block',
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    color: '#333',
                                    marginBottom: '8px'
                                }}>
                                    <i className="fa-solid fa-user" style={{ marginRight: '8px', color: '#00897b' }} />
                                    {t('lastNameThai')} *
                                </label>
                                <input
                                    type="text"
                                    placeholder={t('lastNameThai')}
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '14px 18px',
                                        fontSize: '15px',
                                        border: '2px solid #e8e8e8',
                                        borderRadius: '10px',
                                        outline: 'none',
                                        background: '#fafafa'
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label style={{
                            display: 'block',
                            fontSize: '14px',
                            fontWeight: '600',
                            color: '#333',
                            marginBottom: '8px'
                        }}>
                            <i className="fa-solid fa-id-card" style={{ marginRight: '8px', color: '#00897b' }} />
                            {tLogin('licenseId')} *
                        </label>
                        <input
                            type="text"
                            placeholder={tLogin('licenseExample')}
                            required
                            style={{
                                width: '100%',
                                padding: '14px 18px',
                                fontSize: '15px',
                                border: '2px solid #e8e8e8',
                                borderRadius: '10px',
                                outline: 'none',
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
                            {tLogin('idCard')} *
                        </label>
                        <input
                            type="text"
                            placeholder={tLogin('idCardExample')}
                            maxLength={13}
                            required
                            style={{
                                width: '100%',
                                padding: '14px 18px',
                                fontSize: '15px',
                                border: '2px solid #e8e8e8',
                                borderRadius: '10px',
                                outline: 'none',
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
                            <i className="fa-solid fa-envelope" style={{ marginRight: '8px', color: '#00897b' }} />
                            {t('email')} *
                        </label>
                        <input
                            type="email"
                            placeholder={t('email')}
                            required
                            style={{
                                width: '100%',
                                padding: '14px 18px',
                                fontSize: '15px',
                                border: '2px solid #e8e8e8',
                                borderRadius: '10px',
                                outline: 'none',
                                background: '#fafafa'
                            }}
                        />
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{
                                    display: 'block',
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    color: '#333',
                                    marginBottom: '8px'
                                }}>
                                    <i className="fa-solid fa-lock" style={{ marginRight: '8px', color: '#00897b' }} />
                                    {t('password')} *
                                </label>
                                <input
                                    type="password"
                                    placeholder={t('password')}
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '14px 18px',
                                        fontSize: '15px',
                                        border: '2px solid #e8e8e8',
                                        borderRadius: '10px',
                                        outline: 'none',
                                        background: '#fafafa'
                                    }}
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{
                                    display: 'block',
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    color: '#333',
                                    marginBottom: '8px'
                                }}>
                                    <i className="fa-solid fa-lock" style={{ marginRight: '8px', color: '#00897b' }} />
                                    {t('confirmPassword')} *
                                </label>
                                <input
                                    type="password"
                                    placeholder={t('confirmPassword')}
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '14px 18px',
                                        fontSize: '15px',
                                        border: '2px solid #e8e8e8',
                                        borderRadius: '10px',
                                        outline: 'none',
                                        background: '#fafafa'
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* CPE Info */}
                    <div style={{
                        marginBottom: '20px',
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
                                {tLogin('cpeInfo')}
                            </span>
                        </p>
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', cursor: 'pointer' }}>
                            <input type="checkbox" required style={{ width: '18px', height: '18px', marginTop: '2px' }} />
                            <span style={{ fontSize: '13px', color: '#666', lineHeight: '1.5' }}>
                                {t('agreeTerms')} <Link href="/terms" style={{ color: '#00695c' }}>{t('terms')}</Link> {t('and')} <Link href="/privacy" style={{ color: '#00695c' }}>{t('privacy')}</Link>
                            </span>
                        </label>
                    </div>

                    <button
                        type="submit"
                        style={{
                            width: '100%',
                            padding: '16px',
                            background: 'linear-gradient(135deg, #00695c 0%, #00897b 100%)',
                            border: 'none',
                            borderRadius: '10px',
                            color: '#fff',
                            fontSize: '16px',
                            fontWeight: '700',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 8px 25px rgba(0, 105, 92, 0.3)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '10px'
                        }}
                    >
                        <i className="fa-solid fa-user-plus" />
                        {t('createAccount')}
                    </button>
                </form>
            )}

            {/* Divider and Login Link */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                margin: '25px 0 20px',
                gap: '15px'
            }}>
                <div style={{ flex: 1, height: '1px', background: '#e8e8e8' }} />
                <span style={{ color: '#999', fontSize: '13px' }}>{tLogin('or')}</span>
                <div style={{ flex: 1, height: '1px', background: '#e8e8e8' }} />
            </div>

            <div className="text-center">
                <p style={{ color: '#666', fontSize: '14px', margin: 0 }}>
                    {t('haveAccount')}{' '}
                    <Link
                        href="/login"
                        style={{
                            color: '#1a237e',
                            fontWeight: '700',
                            textDecoration: 'none'
                        }}
                    >
                        {t('signIn')}
                    </Link>
                </p>
            </div>

            <div style={{
                marginTop: '25px',
                textAlign: 'center'
            }}>
                <p style={{ color: '#999', fontSize: '13px' }}>
                    {tLogin('needHelp')} <Link href="/contact" style={{ color: '#1a237e', textDecoration: 'none' }}>{tLogin('contactSupport')}</Link>
                </p>
            </div>
        </div>
    )
}
