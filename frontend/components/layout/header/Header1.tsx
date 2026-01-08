'use client'
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import UserProfileDropdown from './UserProfileDropdown';

export default function Header1({ scroll, isMobileMenu, handleMobileMenu, isSearch, handleSearch }: any) {
    const t = useTranslations('common');
    const locale = useLocale();
    const pathname = usePathname();
    const { isAuthenticated } = useAuth();

    // Function to get the path without locale prefix
    const getPathWithoutLocale = () => {
        const segments = pathname.split('/');
        return '/' + segments.slice(2).join('/') || '/';
    }

    // Function to switch locale
    const switchLocale = (newLocale: string) => {
        const pathWithoutLocale = getPathWithoutLocale();
        return `/${newLocale}${pathWithoutLocale}`;
    }

    // Function to check if link is active
    const isActive = (path: string) => {
        if (path === `/${locale}` || path === `/${locale}/`) {
            return pathname === `/${locale}` || pathname === `/${locale}/`;
        }
        return pathname.startsWith(path);
    }

    return (
        <>
            <header>
                <div className={`header-area homepage1 header header-sticky d-none d-lg-block ${scroll ? 'sticky' : ''}`} id="header">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="header-elements">
                                    <div className="site-logo">
                                        <Link href={`/${locale}`}>
                                            <img
                                                src="/assets/img/logo/accp_logo_main.png"
                                                alt="ACCP 2026"
                                                style={{ height: '140px', width: 'auto', marginLeft: '20px', background: 'white', padding: '8px', borderRadius: '8px' }}
                                            />
                                        </Link>
                                    </div>

                                    <div className="main-menu">
                                        <ul>
                                            <li><Link href={`/${locale}`} style={{ color: isActive(`/${locale}`) ? '#FFBA00' : '#fff', fontWeight: isActive(`/${locale}`) ? '600' : 'normal' }}>{t('home')}</Link></li>
                                            <li>
                                                <Link href={`/${locale}/about`} style={{ color: isActive(`/${locale}/about`) || isActive(`/${locale}/welcome-messages`) ? '#FFBA00' : '#fff', fontWeight: isActive(`/${locale}/about`) || isActive(`/${locale}/welcome-messages`) ? '600' : 'normal' }}>{t('about')} <i className="fa-solid fa-angle-down" /></Link>
                                                <ul className="dropdown-padding">
                                                    <li><Link href={`/${locale}/about`}>{t('aboutACCP')}</Link></li>
                                                    <li><Link href={`/${locale}/welcome-messages`}>{t('welcomeMessages')}</Link></li>
                                                </ul>
                                            </li>
                                            <li>
                                                <Link href={`/${locale}/program`} style={{ color: isActive(`/${locale}/program`) || isActive(`/${locale}/gala-dinner`) || isActive(`/${locale}/preconference-workshops`) ? '#FFBA00' : '#fff', fontWeight: isActive(`/${locale}/program`) || isActive(`/${locale}/gala-dinner`) || isActive(`/${locale}/preconference-workshops`) ? '600' : 'normal' }}>{t('program')} <i className="fa-solid fa-angle-down" /></Link>
                                                <ul className="dropdown-padding">
                                                    <li><Link href={`/${locale}/program`}>{t('programOverview')}</Link></li>
                                                    <li><Link href={`/${locale}/program-plenary`}>{t('plenaryKeynotes')}</Link></li>
                                                    <li><Link href={`/${locale}/program-symposia`}>{t('symposia')}</Link></li>
                                                    <li><Link href={`/${locale}/program-oral-poster`}>{t('oralPoster')}</Link></li>
                                                    <li><Link href={`/${locale}/gala-dinner`}>{t('galaDinner')}</Link></li>
                                                    <li><Link href={`/${locale}/preconference-workshops`}>{t('workshops')}</Link></li>
                                                </ul>
                                            </li>
                                            <li>
                                                <Link href={`/${locale}/call-for-abstracts`} style={{ color: isActive(`/${locale}/call-for-abstracts`) || isActive(`/${locale}/abstract-submission-guideline`) ? '#FFBA00' : '#fff', fontWeight: isActive(`/${locale}/call-for-abstracts`) || isActive(`/${locale}/abstract-submission-guideline`) ? '600' : 'normal' }}>{t('callForAbstracts')} <i className="fa-solid fa-angle-down" /></Link>
                                                <ul className="dropdown-padding">
                                                    <li><Link href={`/${locale}/abstract-submission-guideline`}>{t('abstractGuideline')}</Link></li>
                                                    <li><Link href={`/${locale}/call-for-abstracts`}>{t('callForAbstracts')}</Link></li>
                                                </ul>
                                            </li>
                                            <li>
                                                <Link href={`/${locale}/registration`} style={{ color: isActive(`/${locale}/registration`) ? '#FFBA00' : '#fff', fontWeight: isActive(`/${locale}/registration`) ? '600' : 'normal' }}>{t('registration')} <i className="fa-solid fa-angle-down" /></Link>
                                                <ul className="dropdown-padding">
                                                    <li><Link href={`/${locale}/registration`}>{t('registrationInfo')}</Link></li>
                                                    <li><Link href={`/${locale}/registration-policies`}>{t('policies')}</Link></li>
                                                </ul>
                                            </li>
                                            <li>
                                                <Link href={`/${locale}/accommodation`} style={{ color: isActive(`/${locale}/accommodation`) || isActive(`/${locale}/travel-visa`) ? '#FFBA00' : '#fff', fontWeight: isActive(`/${locale}/accommodation`) || isActive(`/${locale}/travel-visa`) ? '600' : 'normal' }}>{t('travelAccommodation')} <i className="fa-solid fa-angle-down" /></Link>
                                                <ul className="dropdown-padding">
                                                    <li><Link href={`/${locale}/accommodation`}>{t('hotelsRates')}</Link></li>
                                                    <li><Link href={`/${locale}/travel-visa`}>{t('travelVisa')}</Link></li>
                                                </ul>
                                            </li>
                                            <li>
                                                <Link href={`/${locale}/sponsorship`} style={{ color: isActive(`/${locale}/sponsorship`) || isActive(`/${locale}/gallery`) || isActive(`/${locale}/contact`) ? '#FFBA00' : '#fff', fontWeight: isActive(`/${locale}/sponsorship`) || isActive(`/${locale}/gallery`) || isActive(`/${locale}/contact`) ? '600' : 'normal' }}>{t('more')} <i className="fa-solid fa-angle-down" /></Link>
                                                <ul className="dropdown-padding">
                                                    <li><Link href={`/${locale}/sponsorship`}>{t('sponsorship')}</Link></li>
                                                    <li><Link href={`/${locale}/gallery`}>{t('gallery')}</Link></li>
                                                    <li><Link href={`/${locale}/contact`}>{t('contact')}</Link></li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
                                        {/* Language Switcher */}
                                        <div className="d-none d-lg-flex" style={{ alignItems: 'center', gap: '4px', marginRight: '15px', transform: 'translateY(-5px)' }}>
                                            <Link
                                                href={`/th${getPathWithoutLocale()}`}
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    width: '32px',
                                                    height: '32px',
                                                    background: locale === 'th' ? '#FFBA00' : '#E0E0E0',
                                                    color: locale === 'th' ? '#fff' : '#000',
                                                    textDecoration: 'none',
                                                    fontSize: '13px',
                                                    fontWeight: '600',
                                                    transition: 'all 0.3s ease',
                                                    border: 'none',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                TH
                                            </Link>
                                            <Link
                                                href={`/en${getPathWithoutLocale()}`}
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    width: '32px',
                                                    height: '32px',
                                                    background: locale === 'en' ? '#FFBA00' : '#E0E0E0',
                                                    color: locale === 'en' ? '#fff' : '#000',
                                                    textDecoration: 'none',
                                                    fontSize: '13px',
                                                    fontWeight: '600',
                                                    transition: 'all 0.3s ease',
                                                    border: 'none',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                EN
                                            </Link>
                                        </div>

                                        <div className="btn-area" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            {isAuthenticated ? (
                                                <UserProfileDropdown />
                                            ) : (
                                                <>
                                                    <Link href={`/${locale}/login`} className="vl-btn1" style={{
                                                        background: 'transparent',
                                                        border: '2px solid #fff',
                                                        color: '#fff',
                                                        padding: '10px 20px',
                                                        fontSize: '13px'
                                                    }}>
                                                        <i className="fa-solid fa-right-to-bracket" style={{ marginRight: '6px' }} />
                                                        {t('login')}
                                                    </Link>
                                                    <Link href={`/${locale}/signup`} className="vl-btn1" style={{
                                                        background: 'linear-gradient(135deg, #00C853 0%, #69F0AE 100%)',
                                                        border: 'none',
                                                        color: '#fff',
                                                        padding: '10px 20px',
                                                        fontSize: '13px'
                                                    }}>
                                                        <i className="fa-solid fa-user-plus" style={{ marginRight: '6px' }} />
                                                        {t('signUp')}
                                                    </Link>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile Header */}
                <div className="mobile-header mobile-haeder1 d-block d-lg-none">
                    <div className="container-fluid">
                        <div className="col-12">
                            <div className="mobile-header-elements">
                                <div className="mobile-logo">
                                    <Link href={`/${locale}`}>
                                        <img src="/assets/img/logo/accp_logo_main.png" alt="ACCP 2026" style={{ height: '90px', width: 'auto', background: 'white', padding: '8px', borderRadius: '8px' }} />
                                    </Link>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <div className="mobile-nav-icon dots-menu" onClick={handleMobileMenu}>
                                        <i className="fa-solid fa-bars" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}
