'use client'
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function ContactInfo() {
    const t = useTranslations('contact');
    const tCommon = useTranslations('common');

    return (
        <div className="contact2-bg-section" style={{ paddingBottom: '100px', background: '#f8f9fa' }}>
            <div className="mapouter" style={{ marginBottom: '60px' }}>
                <div className="gmap_canvas">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.661352496229!2d100.5367613148226!3d13.745480590351532!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e2992f00f074d9%3A0x7d01375757519984!2sCentara%20Grand%20at%20CentralWorld!5e0!3m2!1sen!2sth!4v1714494119854!5m2!1sen!2sth"
                        width="100%"
                        height="500"
                        style={{ border: 0, display: 'block', width: '100%' }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </div>
            </div>

            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-md-6 mb-4">
                        <div className="contact-boxarea" data-aos="zoom-in" data-aos-duration={900} style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center',
                            height: '100%',
                            minHeight: '260px',
                            padding: '40px 20px',
                            backgroundColor: '#fff',
                            borderRadius: '16px',
                            boxShadow: '0 10px 40px rgba(0,0,0,0.08)'
                        }}>
                            <div className="icons" style={{
                                position: 'static',
                                marginBottom: '20px',
                                background: 'transparent',
                                width: 'auto',
                                height: 'auto',
                                borderRadius: '0'
                            }}>
                                <i className="fa-solid fa-envelope" style={{ fontSize: '48px', color: '#EA4335' }} />
                            </div>
                            <div className="text" style={{ paddingLeft: 0 }}>
                                <h5 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '8px', color: '#1a1a2e', textTransform: 'none' }}>{tCommon('email')}</h5>
                                <Link href="mailto:secretariat@accp2026.org" style={{ fontSize: '16px', color: '#4a4a4a', fontWeight: '500', wordBreak: 'break-all' }}>secretariat@accp2026.org</Link>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-6 mb-4">
                        <div className="contact-boxarea" data-aos="zoom-in" data-aos-duration={1000} style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center',
                            height: '100%',
                            minHeight: '260px',
                            padding: '40px 20px',
                            backgroundColor: '#fff',
                            borderRadius: '16px',
                            boxShadow: '0 10px 40px rgba(0,0,0,0.08)'
                        }}>
                            <div className="icons" style={{
                                position: 'static',
                                marginBottom: '20px',
                                background: 'transparent',
                                width: 'auto',
                                height: 'auto',
                                borderRadius: '0'
                            }}>
                                <i className="fa-solid fa-location-dot" style={{ fontSize: '48px', color: '#EA4335' }} />
                            </div>
                            <div className="text" style={{ paddingLeft: 0 }}>
                                <h5 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '8px', color: '#1a1a2e', textTransform: 'none' }}>{t('venue')}</h5>
                                <Link href="#" style={{ fontSize: '16px', color: '#4a4a4a', fontWeight: '500' }}>Centara Grand & Bangkok Convention Centre</Link>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-6 mb-4">
                        <div className="contact-boxarea" data-aos="zoom-in" data-aos-duration={1100} style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center',
                            height: '100%',
                            minHeight: '260px',
                            padding: '40px 20px',
                            backgroundColor: '#fff',
                            borderRadius: '16px',
                            boxShadow: '0 10px 40px rgba(0,0,0,0.08)'
                        }}>
                            <div className="icons" style={{
                                position: 'static',
                                marginBottom: '20px',
                                background: 'transparent',
                                width: 'auto',
                                height: 'auto',
                                borderRadius: '0'
                            }}>
                                <i className="fa-solid fa-phone" style={{ fontSize: '48px', color: '#34A853' }} />
                            </div>
                            <div className="text" style={{ paddingLeft: 0 }}>
                                <h5 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '8px', color: '#1a1a2e', textTransform: 'none' }}>{tCommon('phone')}</h5>
                                <Link href="tel:+6621234567" style={{ fontSize: '16px', color: '#4a4a4a', fontWeight: '500' }}>+66 2 123 4567</Link>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-6 mb-4">
                        <div className="contact-boxarea" data-aos="zoom-in" data-aos-duration={1200} style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center',
                            height: '100%',
                            minHeight: '260px',
                            padding: '40px 20px',
                            backgroundColor: '#fff',
                            borderRadius: '16px',
                            boxShadow: '0 10px 40px rgba(0,0,0,0.08)'
                        }}>
                            <div className="icons" style={{
                                position: 'static',
                                marginBottom: '20px',
                                background: 'transparent',
                                width: 'auto',
                                height: 'auto',
                                borderRadius: '0'
                            }}>
                                <div style={{
                                    fontSize: '48px',
                                    background: 'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    display: 'inline-block'
                                }}>
                                    <i className="fa-brands fa-instagram" />
                                </div>
                            </div>
                            <div className="text" style={{ paddingLeft: 0 }}>
                                <h5 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '8px', color: '#1a1a2e', textTransform: 'none' }}>Instagram</h5>
                                <Link href="#" style={{ fontSize: '16px', color: '#4a4a4a', fontWeight: '500' }}>accp2026</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
