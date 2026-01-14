'use client'
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { useTranslations } from 'next-intl'

export default function AbstractSubmissionGuideline() {
    const tCommon = useTranslations('common')
    const t = useTranslations('abstractGuideline')

    return (
        <>
            <Layout headerStyle={1} footerStyle={1}>
                {/* Header with Background */}
                <div className="inner-page-header" style={{ backgroundImage: 'url(/assets/img/bg/header-bg16.png)' }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-10 m-auto">
                                <div className="heading1 text-center">
                                    <h1>{t('pageTitle').toUpperCase()}</h1>
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
                            <div className="col-lg-10 m-auto">

                                {/* Main Content Area */}
                                <div style={{
                                    backgroundColor: 'white',
                                    padding: '40px',
                                    borderRadius: '8px',
                                    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                                    fontSize: '16px',
                                    lineHeight: '1.8',
                                    color: '#333'
                                }}>

                                    {/* Main Title */}
                                    <h2 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '30px' }}>
                                        • {t('mainTitle')}
                                    </h2>

                                    {/* 1. General Information */}
                                    <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '20px' }}>
                                        {t('generalInformation')}
                                    </h3>

                                    <div style={{ paddingLeft: '30px', marginBottom: '25px' }}>
                                        <ul style={{ listStyleType: 'disc', paddingLeft: '20px', marginBottom: '15px' }}>
                                            <li style={{ marginBottom: '10px' }}>
                                                <strong>{t('presentationType')}</strong>
                                                <div style={{ paddingLeft: '20px', marginTop: '5px' }}>
                                                    {t('posterPresentation')}<br />
                                                    {t('oralPresentation')}
                                                </div>
                                            </li>
                                            <li style={{ marginBottom: '10px' }}>
                                                <strong>{t('language')}</strong> {t('english')}
                                            </li>
                                            <li style={{ marginBottom: '10px' }}>
                                                <strong>{t('submissionMethod')}</strong> {t('onlineSubmissionSystem')}
                                            </li>
                                        </ul>
                                    </div>

                                    {/* ABSTRACT TOPICS */}
                                    <div style={{ marginBottom: '35px' }}>
                                        <p style={{ fontWeight: 'bold', marginBottom: '10px' }}>
                                            • {t('abstractTopicsTitle')}
                                        </p>
                                        <ul style={{ listStyleType: 'circle', paddingLeft: '50px', margin: 0 }}>
                                            <li>{t('topic1')}</li>
                                            <li>{t('topic2')}</li>
                                            <li>{t('topic3')}</li>
                                            <li>{t('topic4')}</li>
                                            <li>{t('topic5')}</li>
                                            <li>{t('topic6')}</li>
                                        </ul>
                                    </div>

                                    {/* 2. Abstract Structure */}
                                    <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '15px' }}>
                                        {t('abstractStructure')}
                                    </h3>

                                    <div style={{ paddingLeft: '30px', marginBottom: '20px' }}>
                                        <p style={{ marginBottom: '15px' }}>
                                            {t('structureIntro')}
                                        </p>

                                        {/* 2.1 Title */}
                                        <p style={{ marginBottom: '15px' }}>
                                            <strong>{t('structure21')}</strong> {t('structure21Desc')}
                                        </p>

                                        {/* 2.2 Authors */}
                                        <div style={{ marginBottom: '15px' }}>
                                            <p style={{ fontWeight: 'bold', marginBottom: '8px' }}>{t('structure22')}</p>
                                            <ul style={{ listStyleType: 'disc', paddingLeft: '30px', margin: 0 }}>
                                                <li>{t('structure22Item1')}</li>
                                                <li>{t('structure22Item2')}</li>
                                                <li>{t('structure22Item3')}</li>
                                            </ul>
                                        </div>

                                        {/* 2.3 Background */}
                                        <div style={{ marginBottom: '15px' }}>
                                            <p style={{ fontWeight: 'bold', marginBottom: '8px' }}>{t('structure23')}</p>
                                            <ul style={{ listStyleType: 'disc', paddingLeft: '30px', margin: 0 }}>
                                                <li>{t('structure23Item1')}</li>
                                                <li>{t('structure23Item2')}</li>
                                            </ul>
                                        </div>

                                        {/* 2.4 Objectives */}
                                        <p style={{ marginBottom: '15px' }}>
                                            <strong>{t('structure24')}</strong> {t('structure24Desc')}
                                        </p>

                                        {/* 2.5 Methods */}
                                        <div style={{ marginBottom: '15px' }}>
                                            <p style={{ fontWeight: 'bold', marginBottom: '8px' }}>{t('structure25')}</p>
                                            <ul style={{ listStyleType: 'disc', paddingLeft: '30px', margin: 0 }}>
                                                <li>{t('structure25Item1')}</li>
                                                <li>{t('structure25Item2')}</li>
                                                <li>{t('structure25Item3')}</li>
                                                <li>{t('structure25Item4')}</li>
                                            </ul>
                                        </div>

                                        {/* 2.6 Results */}
                                        <p style={{ marginBottom: '15px' }}>
                                            <strong>{t('structure26')}</strong> {t('structure26Desc')}
                                        </p>

                                        {/* 2.7 Conclusions */}
                                        <p style={{ marginBottom: '0' }}>
                                            <strong>{t('structure27')}</strong> {t('structure27Desc')}
                                        </p>
                                    </div>

                                    {/* Divider */}
                                    <hr style={{ border: 'none', borderTop: '1px solid #ddd', margin: '30px 0' }} />

                                    {/* 3. Maximum Word Limit */}
                                    <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '15px' }}>
                                        {t('maxWordLimit')}
                                    </h3>
                                    <p style={{ paddingLeft: '30px', marginBottom: '0' }}>
                                        {t('wordLimit')}
                                    </p>

                                    {/* Divider */}
                                    <hr style={{ border: 'none', borderTop: '1px solid #ddd', margin: '30px 0' }} />

                                    {/* 4. Formatting Requirements */}
                                    <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '15px' }}>
                                        {t('formattingRequirements')}
                                    </h3>

                                    <ul style={{ listStyleType: 'disc', paddingLeft: '50px', margin: 0 }}>
                                        <li>{t('formatFont')}</li>
                                        <li>{t('formatFontSize')}</li>
                                        <li>{t('formatLineSpacing')}</li>
                                        <li>{t('formatAbbreviations')}</li>
                                        <li>{t('formatNoTables')}</li>
                                    </ul>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}
