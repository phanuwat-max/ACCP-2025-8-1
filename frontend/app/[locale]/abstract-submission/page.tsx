'use client'
import { useState } from 'react'
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { useTranslations } from 'next-intl'

export default function AbstractSubmission() {
    const t = useTranslations('abstractSubmission')
    const tCommon = useTranslations('common')

    // Categories for abstract submission
    const categories = [
        t('categories.clinicalPharmacy'),
        t('categories.socialAdministrative'),
        t('categories.pharmacology'),
        t('categories.pharmacoeconomics'),
        t('categories.education'),
        t('categories.pharmaceutics'),
        t('categories.medicinalChemistry'),
        t('categories.pharmacognosy')
    ]

    const presentationTypes = [
        { value: "oral", label: t('presentationTypes.oral') },
        { value: "poster", label: t('presentationTypes.poster') },
        { value: "either", label: t('presentationTypes.either') }
    ]
    const [formData, setFormData] = useState({
        // Author Information
        firstName: '',
        lastName: '',
        email: '',
        affiliation: '',
        country: '',
        phone: '',

        // Abstract Details
        title: '',
        category: '',
        presentationType: '',
        keywords: '',

        // Co-Authors
        coAuthors: '',

        // Abstract Content
        background: '',
        methods: '',
        results: '',
        conclusions: '',

        // File Upload
        abstractFile: null as File | null,

        // Declaration
        coi: 'no',
        coiDetails: '',
        agreeTerms: false,
        confirmOriginal: false
    })

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
    const [wordCount, setWordCount] = useState(0)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target

        if (name === 'phone') {
            const numericValue = value.replace(/[^0-9]/g, '')
            setFormData(prev => ({ ...prev, [name]: numericValue }))
            return
        }

        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked
            setFormData(prev => ({ ...prev, [name]: checked }))
        } else {
            setFormData(prev => ({ ...prev, [name]: value }))
        }

        // Calculate word count for abstract sections
        if (['background', 'methods', 'results', 'conclusions'].includes(name)) {
            // Create updated form data with the new value
            const updatedData = {
                background: name === 'background' ? value : formData.background,
                methods: name === 'methods' ? value : formData.methods,
                results: name === 'results' ? value : formData.results,
                conclusions: name === 'conclusions' ? value : formData.conclusions
            }
            
            // Calculate total words from all sections
            const totalText = [
                updatedData.background,
                updatedData.methods,
                updatedData.results,
                updatedData.conclusions
            ].join(' ')
            
            const words = totalText.trim().split(/\s+/).filter(word => word.length > 0)
            setWordCount(words.length)
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null
        if (file) {
            const validTypes = ['.doc', '.docx']
            const fileExtension = file.name.substring(file.name.lastIndexOf('.'))
            if (!validTypes.includes(fileExtension.toLowerCase())) {
                alert('Please upload only .doc or .docx files')
                return
            }
            setFormData(prev => ({ ...prev, abstractFile: file }))
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        // Validate word count
        if (wordCount < 250 || wordCount > 300) {
            alert(`Abstract word count must be between 250-300 words. Current: ${wordCount} words`)
            setIsSubmitting(false)
            return
        }

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000))

            // Here you would send to your backend API
            console.log('Form Data:', formData)

            setSubmitStatus('success')
        } catch (error) {
            setSubmitStatus('error')
        } finally {
            setIsSubmitting(false)
        }
    }

    const inputStyle = {
        width: '100%',
        padding: '14px 16px',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        fontSize: '15px',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
        outline: 'none'
    }

    const labelStyle = {
        display: 'block',
        marginBottom: '8px',
        fontWeight: '600' as const,
        color: '#1a1a2e',
        fontSize: '14px'
    }

    const sectionStyle = {
        backgroundColor: '#fff',
        padding: '30px',
        borderRadius: '16px',
        marginBottom: '24px',
        boxShadow: '0 2px 12px rgba(0,0,0,0.06)'
    }

    if (submitStatus === 'success') {
        return (
            <Layout headerStyle={1} footerStyle={1}>
                <div>
                    <div className="inner-page-header" style={{ backgroundImage: 'url(/assets/img/bg/header-bg16.png)' }}>
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-8 m-auto">
                                    <div className="heading1 text-center">
                                        <h1>{t('pageTitle')}</h1>
                                        <div className="space20" />
                                        <Link href="/">{tCommon('home')} <i className="fa-solid fa-angle-right" /> <span>{t('breadcrumb')}</span></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="sp1" style={{ backgroundColor: '#f8f9fa' }}>
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-8 m-auto">
                                    <div style={{
                                        backgroundColor: '#fff',
                                        padding: '60px',
                                        borderRadius: '16px',
                                        textAlign: 'center',
                                        boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
                                    }}>
                                        <div style={{
                                            width: '100px',
                                            height: '100px',
                                            backgroundColor: '#e8f5e9',
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            margin: '0 auto 24px'
                                        }}>
                                            <i className="fa-solid fa-check" style={{ fontSize: '48px', color: '#4caf50' }} />
                                        </div>
                                        <h2 style={{ color: '#1a1a2e', marginBottom: '16px' }}>{t('successTitle')}</h2>
                                        <p style={{ color: '#666', fontSize: '16px', marginBottom: '24px' }}>
                                            {t('successMessage')}
                                        </p>
                                        <p style={{ color: '#999', fontSize: '14px', marginBottom: '32px' }}>
                                            {t('trackingId')} <strong style={{ color: '#FFBA00' }}>ACCP2026-{Date.now().toString().slice(-6)}</strong>
                                        </p>
                                        <div className="btn-area1">
                                            <Link href="/" className="vl-btn1">{t('returnHome')}</Link>
                                            <Link href="/call-for-abstracts" className="vl-btn2" style={{ marginLeft: '16px' }}>{t('viewGuidelines')}</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        )
    }

    return (
        <Layout headerStyle={1} footerStyle={1}>
            <div>
                {/* Header */}
                <div className="inner-page-header" style={{ backgroundImage: 'url(/assets/img/bg/header-bg16.png)' }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 m-auto">
                                <div className="heading1 text-center">
                                    <h1>{t('pageTitle')}</h1>
                                    <div className="space20" />
                                    <Link href="/">{tCommon('home')} <i className="fa-solid fa-angle-right" /> <span>{t('breadcrumb')}</span></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form Section */}
                <div className="sp1" style={{ backgroundColor: '#f8f9fa' }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-10 m-auto">
                                {/* Guidelines Link */}
                                <div style={{
                                    backgroundColor: '#e3f2fd',
                                    padding: '20px',
                                    borderRadius: '12px',
                                    marginBottom: '30px',
                                    border: '1px solid #2196F3'
                                }}>
                                    <p style={{ margin: 0, color: '#1565c0' }}>
                                        <i className="fa-solid fa-info-circle" style={{ marginRight: '8px' }} />
                                        {t('guidelineNote')} <Link href="/call-for-abstracts" style={{ color: '#1565c0', fontWeight: '600' }}>{t('guidelineLink')}</Link> {t('guidelineNote2')}
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit}>
                                    {/* Section 1: Author Information */}
                                    <div style={sectionStyle}>
                                        <h3 style={{ marginBottom: '24px', color: '#1a1a2e', borderBottom: '3px solid #FFBA00', paddingBottom: '12px', display: 'inline-block' }}>
                                            <i className="fa-solid fa-user" style={{ marginRight: '12px', color: '#FFBA00' }} />
                                            {t('section1Title')}
                                        </h3>

                                        <div className="row">
                                            <div className="col-md-6">
                                                <div style={{ marginBottom: '20px' }}>
                                                    <label style={labelStyle}>{t('firstName')} *</label>
                                                    <input
                                                        type="text"
                                                        name="firstName"
                                                        value={formData.firstName}
                                                        onChange={handleInputChange}
                                                        style={inputStyle}
                                                        required
                                                        placeholder={t('firstNamePlaceholder')}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div style={{ marginBottom: '20px' }}>
                                                    <label style={labelStyle}>{t('lastName')} *</label>
                                                    <input
                                                        type="text"
                                                        name="lastName"
                                                        value={formData.lastName}
                                                        onChange={handleInputChange}
                                                        style={inputStyle}
                                                        required
                                                        placeholder={t('lastNamePlaceholder')}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6">
                                                <div style={{ marginBottom: '20px' }}>
                                                    <label style={labelStyle}>{t('email')} *</label>
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        value={formData.email}
                                                        onChange={handleInputChange}
                                                        style={inputStyle}
                                                        required
                                                        placeholder={t('emailPlaceholder')}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div style={{ marginBottom: '20px' }}>
                                                    <label style={labelStyle}>{t('phone')}</label>
                                                    <input
                                                        type="tel"
                                                        name="phone"
                                                        value={formData.phone}
                                                        onChange={handleInputChange}
                                                        style={inputStyle}
                                                        placeholder={t('phonePlaceholder')}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-8">
                                                <div style={{ marginBottom: '20px' }}>
                                                    <label style={labelStyle}>{t('affiliation')} *</label>
                                                    <input
                                                        type="text"
                                                        name="affiliation"
                                                        value={formData.affiliation}
                                                        onChange={handleInputChange}
                                                        style={inputStyle}
                                                        required
                                                        placeholder={t('affiliationPlaceholder')}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div style={{ marginBottom: '20px' }}>
                                                    <label style={labelStyle}>{t('country')} *</label>
                                                    <input
                                                        type="text"
                                                        name="country"
                                                        value={formData.country}
                                                        onChange={handleInputChange}
                                                        style={inputStyle}
                                                        required
                                                        placeholder={t('countryPlaceholder')}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Section 2: Co-Authors */}
                                    <div style={sectionStyle}>
                                        <h3 style={{ marginBottom: '24px', color: '#1a1a2e', borderBottom: '3px solid #FFBA00', paddingBottom: '12px', display: 'inline-block' }}>
                                            <i className="fa-solid fa-users" style={{ marginRight: '12px', color: '#FFBA00' }} />
                                            {t('section2Title')}
                                        </h3>

                                        <div style={{ marginBottom: '20px' }}>
                                            <label style={labelStyle}>{t('coAuthors')}</label>
                                            <textarea
                                                name="coAuthors"
                                                value={formData.coAuthors}
                                                onChange={handleInputChange}
                                                style={{ ...inputStyle, minHeight: '100px', resize: 'vertical' }}
                                                placeholder={t('coAuthorsPlaceholder')}
                                            />
                                            <p style={{ marginTop: '8px', fontSize: '13px', color: '#666' }}>
                                                {t('coAuthorsNote')}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Section 3: Abstract Details */}
                                    <div style={sectionStyle}>
                                        <h3 style={{ marginBottom: '24px', color: '#1a1a2e', borderBottom: '3px solid #FFBA00', paddingBottom: '12px', display: 'inline-block' }}>
                                            <i className="fa-solid fa-file-alt" style={{ marginRight: '12px', color: '#FFBA00' }} />
                                            {t('section3Title')}
                                        </h3>

                                        <div style={{ marginBottom: '20px' }}>
                                            <label style={labelStyle}>{t('abstractTitle')} *</label>
                                            <input
                                                type="text"
                                                name="title"
                                                value={formData.title}
                                                onChange={handleInputChange}
                                                style={inputStyle}
                                                required
                                                placeholder={t('abstractTitlePlaceholder')}
                                            />
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6">
                                                <div style={{ marginBottom: '20px' }}>
                                                    <label style={labelStyle}>{t('category')} *</label>
                                                    <select
                                                        name="category"
                                                        value={formData.category}
                                                        onChange={handleInputChange}
                                                        style={inputStyle}
                                                        required
                                                    >
                                                        <option value="">{t('selectCategory')}</option>
                                                        {categories.map((cat, index) => (
                                                            <option key={index} value={cat}>{cat}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div style={{ marginBottom: '20px' }}>
                                                    <label style={labelStyle}>{t('presentationType')} *</label>
                                                    <select
                                                        name="presentationType"
                                                        value={formData.presentationType}
                                                        onChange={handleInputChange}
                                                        style={inputStyle}
                                                        required
                                                    >
                                                        <option value="">{t('selectPresentationType')}</option>
                                                        {presentationTypes.map((type, index) => (
                                                            <option key={index} value={type.value}>{type.label}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        <div style={{ marginBottom: '20px' }}>
                                            <label style={labelStyle}>{t('keywordsLabel')}</label>
                                            <input
                                                type="text"
                                                name="keywords"
                                                value={formData.keywords}
                                                onChange={handleInputChange}
                                                style={inputStyle}
                                                required
                                                placeholder={t('keywordsPlaceholder')}
                                            />
                                        </div>
                                    </div>

                                    {/* Section 4: Abstract Content */}
                                    <div style={sectionStyle}>
                                        <h3 style={{ marginBottom: '12px', color: '#1a1a2e', borderBottom: '3px solid #FFBA00', paddingBottom: '12px', display: 'inline-block' }}>
                                            <i className="fa-solid fa-edit" style={{ marginRight: '12px', color: '#FFBA00' }} />
                                            {t('section4Title')}
                                        </h3>
                                        <p style={{ marginBottom: '24px', color: '#666', fontSize: '14px' }}>
                                            {t('wordCount')} <strong style={{ color: wordCount >= 250 && wordCount <= 300 ? '#4caf50' : '#f44336' }}>{wordCount}</strong> {t('wordCountRange')}
                                        </p>

                                        <div style={{ marginBottom: '20px' }}>
                                            <label style={labelStyle}>{t('background')} *</label>
                                            <textarea
                                                name="background"
                                                value={formData.background}
                                                onChange={handleInputChange}
                                                style={{ ...inputStyle, minHeight: '100px', resize: 'vertical' }}
                                                required
                                                placeholder={t('backgroundPlaceholder')}
                                            />
                                        </div>

                                        <div style={{ marginBottom: '20px' }}>
                                            <label style={labelStyle}>{t('methods')} *</label>
                                            <textarea
                                                name="methods"
                                                value={formData.methods}
                                                onChange={handleInputChange}
                                                style={{ ...inputStyle, minHeight: '100px', resize: 'vertical' }}
                                                required
                                                placeholder={t('methodsPlaceholder')}
                                            />
                                        </div>

                                        <div style={{ marginBottom: '20px' }}>
                                            <label style={labelStyle}>{t('results')} *</label>
                                            <textarea
                                                name="results"
                                                value={formData.results}
                                                onChange={handleInputChange}
                                                style={{ ...inputStyle, minHeight: '100px', resize: 'vertical' }}
                                                required
                                                placeholder={t('resultsPlaceholder')}
                                            />
                                        </div>

                                        <div style={{ marginBottom: '20px' }}>
                                            <label style={labelStyle}>{t('conclusions')} *</label>
                                            <textarea
                                                name="conclusions"
                                                value={formData.conclusions}
                                                onChange={handleInputChange}
                                                style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }}
                                                required
                                                placeholder={t('conclusionsPlaceholder')}
                                            />
                                        </div>
                                    </div>

                                    {/* Section 5: File Upload */}
                                    <div style={sectionStyle}>
                                        <h3 style={{ marginBottom: '24px', color: '#1a1a2e', borderBottom: '3px solid #FFBA00', paddingBottom: '12px', display: 'inline-block' }}>
                                            <i className="fa-solid fa-upload" style={{ marginRight: '12px', color: '#FFBA00' }} />
                                            {t('section5Title')}
                                        </h3>

                                        <div style={{
                                            border: '2px dashed #e0e0e0',
                                            borderRadius: '12px',
                                            padding: '40px',
                                            textAlign: 'center',
                                            backgroundColor: '#fafafa'
                                        }}>
                                            <i className="fa-solid fa-cloud-upload-alt" style={{ fontSize: '48px', color: '#FFBA00', marginBottom: '16px' }} />
                                            <p style={{ marginBottom: '16px', color: '#666' }}>
                                                {t('uploadNote')}
                                            </p>
                                            <input
                                                type="file"
                                                accept=".doc,.docx"
                                                onChange={handleFileChange}
                                                style={{ display: 'none' }}
                                                id="abstractFile"
                                            />
                                            <label
                                                htmlFor="abstractFile"
                                                style={{
                                                    cursor: 'pointer',
                                                    backgroundColor: '#FFBA00',
                                                    color: '#1a1a2e',
                                                    padding: '12px 24px',
                                                    borderRadius: '8px',
                                                    fontWeight: '600',
                                                    display: 'inline-block'
                                                }}
                                            >
                                                {t('chooseFile')}
                                            </label>
                                            {formData.abstractFile && (
                                                <p style={{ marginTop: '16px', color: '#4caf50' }}>
                                                    <i className="fa-solid fa-check-circle" style={{ marginRight: '8px' }} />
                                                    {formData.abstractFile.name}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Section 6: Declaration */}
                                    <div style={sectionStyle}>
                                        <h3 style={{ marginBottom: '24px', color: '#1a1a2e', borderBottom: '3px solid #FFBA00', paddingBottom: '12px', display: 'inline-block' }}>
                                            <i className="fa-solid fa-check-double" style={{ marginRight: '12px', color: '#FFBA00' }} />
                                            {t('section6Title')}
                                        </h3>

                                        <div style={{ marginBottom: '20px' }}>
                                            <label style={labelStyle}>{t('coi')} *</label>
                                            <div style={{ display: 'flex', gap: '24px', marginTop: '8px' }}>
                                                <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                                                    <input
                                                        type="radio"
                                                        name="coi"
                                                        value="no"
                                                        checked={formData.coi === 'no'}
                                                        onChange={handleInputChange}
                                                        style={{ marginRight: '8px' }}
                                                    />
                                                    {t('noCoi')}
                                                </label>
                                                <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                                                    <input
                                                        type="radio"
                                                        name="coi"
                                                        value="yes"
                                                        checked={formData.coi === 'yes'}
                                                        onChange={handleInputChange}
                                                        style={{ marginRight: '8px' }}
                                                    />
                                                    {t('yesCoi')}
                                                </label>
                                            </div>
                                        </div>

                                        {formData.coi === 'yes' && (
                                            <div style={{ marginBottom: '20px' }}>
                                                <label style={labelStyle}>{t('coiDetails')}</label>
                                                <textarea
                                                    name="coiDetails"
                                                    value={formData.coiDetails}
                                                    onChange={handleInputChange}
                                                    style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }}
                                                    placeholder={t('coiDetailsPlaceholder')}
                                                />
                                            </div>
                                        )}

                                        <div style={{ marginBottom: '16px' }}>
                                            <label style={{ display: 'flex', alignItems: 'flex-start', cursor: 'pointer' }}>
                                                <input
                                                    type="checkbox"
                                                    name="confirmOriginal"
                                                    checked={formData.confirmOriginal}
                                                    onChange={handleInputChange}
                                                    style={{ marginRight: '12px', marginTop: '4px' }}
                                                    required
                                                />
                                                <span style={{ fontSize: '14px', color: '#333' }}>
                                                    {t('confirmOriginal')}
                                                </span>
                                            </label>
                                        </div>

                                        <div style={{ marginBottom: '16px' }}>
                                            <label style={{ display: 'flex', alignItems: 'flex-start', cursor: 'pointer' }}>
                                                <input
                                                    type="checkbox"
                                                    name="agreeTerms"
                                                    checked={formData.agreeTerms}
                                                    onChange={handleInputChange}
                                                    style={{ marginRight: '12px', marginTop: '4px' }}
                                                    required
                                                />
                                                <span style={{ fontSize: '14px', color: '#333' }}>
                                                    {t('agreeTerms')} <Link href="/abstract-submission-guideline" style={{ color: '#FFBA00' }}>{t('termsLink')}</Link> {t('agreeTerms2')}
                                                </span>
                                            </label>
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <div style={{ textAlign: 'center', marginTop: '32px' }}>
                                        <button
                                            type="submit"
                                            className="vl-btn1"
                                            disabled={isSubmitting}
                                            style={{
                                                padding: '16px 48px',
                                                fontSize: '16px',
                                                opacity: isSubmitting ? 0.7 : 1,
                                                cursor: isSubmitting ? 'not-allowed' : 'pointer'
                                            }}
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <i className="fa-solid fa-spinner fa-spin" style={{ marginRight: '8px' }} />
                                                    {t('submitting')}
                                                </>
                                            ) : (
                                                <>
                                                    <i className="fa-solid fa-paper-plane" style={{ marginRight: '8px' }} />
                                                    {t('submitButton')}
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
