'use client'
import Link from "next/link"
import { useTranslations } from 'next-intl';

export default function ProgramNavigation() {
    const t = useTranslations('program');
    const tCommon = useTranslations('common');

    return (
        <div className="service2-section-area sp1">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 m-auto">
                        <div className="heading2 text-center space-margin60">
                            <h5 data-aos="fade-up" data-aos-duration={800}>{t('navigation')}</h5>
                            <div className="space16" />
                            <h2 className="text-anime-style-3">{t('exploreProgram')}</h2>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-duration={800}>
                        <div className="service2-boxarea">
                            <div className="icon-area" style={{ backgroundColor: '#EDE9FE' }}>
                                <i className="fa-solid fa-microphone" style={{ color: '#8B5CF6' }} />
                            </div>
                            <div className="content-area">
                                <Link href="/program-plenary">{tCommon('plenaryKeynotes')}</Link>
                                <div className="space8" />
                                <p>{t('viewDetails')}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-duration={800} data-aos-delay={100}>
                        <div className="service2-boxarea">
                            <div className="icon-area" style={{ backgroundColor: '#DBEAFE' }}>
                                <i className="fa-solid fa-users" style={{ color: '#3B82F6' }} />
                            </div>
                            <div className="content-area">
                                <Link href="/program-symposia">{tCommon('symposia')}</Link>
                                <div className="space8" />
                                <p>{t('viewDetails')}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-duration={800} data-aos-delay={200}>
                        <div className="service2-boxarea">
                            <div className="icon-area" style={{ backgroundColor: '#D1FAE5' }}>
                                <i className="fa-solid fa-image" style={{ color: '#10B981' }} />
                            </div>
                            <div className="content-area">
                                <Link href="/program-oral-poster">{tCommon('oralPoster')}</Link>
                                <div className="space8" />
                                <p>{t('viewDetails')}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-duration={800} data-aos-delay={300}>
                        <div className="service2-boxarea">
                            <div className="icon-area" style={{ backgroundColor: '#FEF3C7' }}>
                                <i className="fa-solid fa-chalkboard-user" style={{ color: '#F59E0B' }} />
                            </div>
                            <div className="content-area">
                                <Link href="/preconference-workshops">{tCommon('workshops')}</Link>
                                <div className="space8" />
                                <p>{t('viewDetails')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
