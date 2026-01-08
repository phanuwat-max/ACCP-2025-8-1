'use client'
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { useTranslations } from 'next-intl'

export default function AbstractSubmissionGuideline() {
    const tCommon = useTranslations('common')

    // Hardcoded content based on the user provided image, adapted for ACCP 2026
    return (
        <>
            <Layout headerStyle={1} footerStyle={1}>
                {/* Header with Background */}
                <div className="inner-page-header" style={{ backgroundImage: 'url(/assets/img/bg/header-bg16.png)' }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-10 m-auto">
                                <div className="heading1 text-center">
                                    <h1>ABSTRACT GUIDELINE</h1>
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
                            <div className="col-lg-12">
                                <p className="text-center">Content removed as per request.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}
