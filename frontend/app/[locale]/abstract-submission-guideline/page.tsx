'use client'
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { useTranslations } from 'next-intl'
import AbstractTimeline from "@/components/sections/abstracts/AbstractTimeline"
import AbstractGuidelineInstructions from "@/components/sections/abstracts/AbstractGuidelineInstructions"
import AbstractStructure from "@/components/sections/abstracts/AbstractStructure"
import AbstractSubmissionProcess from "@/components/sections/abstracts/AbstractSubmissionProcess"

export default function AbstractSubmissionGuideline() {
    const t = useTranslations('abstractGuideline')
    const tCommon = useTranslations('common')

    return (
        <>
            <Layout headerStyle={1} footerStyle={1}>
                <div>
                    {/* Header */}
                    <div className="inner-page-header" style={{ backgroundImage: 'url(/assets/img/bg/header-bg16.png)' }}>
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-10 m-auto">
                                    <div className="heading1 text-center">
                                        <h1 style={{ fontSize: '42px' }}>{t('pageTitle')}</h1>
                                        <div className="space20" />
                                        <Link href="/">{tCommon('home')} <i className="fa-solid fa-angle-right" /> <span>{tCommon('callForAbstracts')}</span> <i className="fa-solid fa-angle-right" /> <span>{tCommon('abstractGuideline')}</span></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="sp1">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-8 m-auto">
                                    <div className="heading2 text-center space-margin60">
                                        <h5 data-aos="fade-up" data-aos-duration={800}>{t('importantDates')}</h5>
                                        <div className="space16" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <AbstractTimeline />
                    <AbstractGuidelineInstructions />
                    <AbstractStructure />
                    <AbstractSubmissionProcess />

                    {/* CTA Section */}
                    <div className="cta2-section-area" style={{ background: 'linear-gradient(135deg, #1a237e 0%, #283593 100%)', padding: '80px 0' }}>
                        <div className="container">
                            <div className="row align-items-center">
                                <div className="col-lg-8" data-aos="fade-right" data-aos-duration={800}>
                                    <div className="cta-header heading4">
                                        <h3 style={{ color: 'white' }}>{t('ctaTitle')}</h3>
                                        <div className="space10" />
                                        <p style={{ color: '#c5cae9' }}>{t('ctaDesc')}</p>
                                    </div>
                                </div>
                                <div className="col-lg-4 text-lg-end" data-aos="fade-left" data-aos-duration={800}>
                                    <div className="btn-area1">
                                        <Link href="/call-for-abstracts" className="vl-btn1">{tCommon('callForAbstracts')}</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}
