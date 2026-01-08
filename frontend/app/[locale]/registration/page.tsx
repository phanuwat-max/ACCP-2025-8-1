'use client'
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { useTranslations, useLocale } from 'next-intl';
import { useAuth } from '@/context/AuthContext';
import RegistrationImportantDates from '@/components/sections/registration/RegistrationImportantDates';
import RegistrationInternationalFees from '@/components/sections/registration/RegistrationInternationalFees';
import RegistrationThaiFees from '@/components/sections/registration/RegistrationThaiFees';

export default function Registration() {
    const t = useTranslations('registration');
    const tCommon = useTranslations('common');
    const locale = useLocale();
    const { user, isAuthenticated } = useAuth();

    // Determine which pricing to show based on user role
    const isThai = user?.isThai === true;
    const isStudent = user?.delegateType === 'thai_student' || user?.delegateType === 'international_student';

    return (
        <>
            <Layout headerStyle={1} footerStyle={1}>
                <div>
                    {/* Header */}
                    <div className="inner-page-header" style={{ backgroundImage: 'url(/assets/img/bg/header-bg16.png)' }}>
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-9 m-auto">
                                    <div className="heading1 text-center">
                                        <h1>{t('pageTitle')}</h1>
                                        <div className="space20" />
                                        <Link href={`/${locale}`}>{tCommon('home')} <i className="fa-solid fa-angle-right" /> <span>{t('pageTitle')}</span></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <RegistrationImportantDates />

                    {/* User-specific pricing banner */}
                    {isAuthenticated && user && (
                        <div className="container" style={{ marginTop: '-40px', marginBottom: '20px' }}>
                            <div style={{
                                background: isThai ? 'linear-gradient(135deg, #1a237e 0%, #3949ab 100%)' : 'linear-gradient(135deg, #FF6F00 0%, #FFB300 100%)',
                                padding: '20px 30px',
                                borderRadius: '15px',
                                color: '#fff !important' as any,
                                textAlign: 'center',
                                boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
                            }}>
                                <p style={{ margin: 0, fontSize: '16px', color: '#fff !important' as any }}>
                                    <i className="fa-solid fa-user-check" style={{ marginRight: '10px' }} />
                                    <strong>
                                        {isThai
                                            ? `สวัสดี ${user.firstName}! คุณกำลังดูราคาสำหรับผู้ลงทะเบียนคนไทย (บาท)`
                                            : `Hello ${user.firstName}! You are viewing prices for International delegates (USD)`
                                        }
                                    </strong>
                                </p>
                                <p style={{ margin: '5px 0 0 0', fontSize: '13px', opacity: 0.9, color: 'rgba(255,255,255,0.9) !important' as any }}>
                                    {isStudent
                                        ? (isThai ? 'ประเภท: นักศึกษาไทย' : 'Type: International Student')
                                        : (isThai ? 'ประเภท: เภสัชกรไทย' : 'Type: International Pharmacist')
                                    }
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Show pricing based on user nationality */}
                    {isAuthenticated && user ? (
                        // Logged in: Show only relevant pricing
                        isThai ? (
                            <RegistrationThaiFees />
                        ) : (
                            <RegistrationInternationalFees />
                        )
                    ) : (
                        // Not logged in: Show both pricing sections
                        <>
                            <RegistrationInternationalFees />
                            <RegistrationThaiFees />
                        </>
                    )}

                </div>
            </Layout>
        </>
    )
}
