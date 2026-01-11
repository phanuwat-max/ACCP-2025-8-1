'use client'
import { useTranslations } from 'next-intl';
import Link from 'next/link';

import Layout from '@/components/layout/Layout';

export default function AbstractStatus() {
    const t = useTranslations('abstracts');
    const tUser = useTranslations('userProfile');

    // Mock abstract data
    const abstracts = [
        {
            id: 'ABS-2026-001234',
            title: 'Impact of Clinical Pharmacist Interventions on Medication Adherence in Chronic Disease Management',
            category: 'clinicalPharmacy',
            presentationType: 'oralPresentation',
            submittedDate: '2026-03-15',
            status: 'accepted',
            statusColor: '#00C853',
            reviewComments: 'Excellent research methodology. Well-written abstract with clear objectives and significant findings.',
            presentationDetails: {
                session: 'Oral Session 2A - Clinical Practice',
                date: 'July 10, 2026',
                time: '14:30 - 14:45',
                room: 'Conference Room B'
            }
        },
        {
            id: 'ABS-2026-001567',
            title: 'Pharmacoeconomic Analysis of Biosimilar Utilization in Oncology: A Multi-Center Study',
            category: 'pharmacoeconomics',
            presentationType: 'posterPresentation',
            submittedDate: '2026-03-20',
            status: 'underReview',
            statusColor: '#FF9800',
            reviewComments: null,
            presentationDetails: null
        }
    ];

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'accepted':
                return 'fa-circle-check';
            case 'underReview':
                return 'fa-clock';
            case 'rejected':
                return 'fa-circle-xmark';
            default:
                return 'fa-circle';
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            padding: '80px 20px 40px',
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
        }}>
                <div style={{
                    maxWidth: '1000px',
                    margin: '0 auto'
                }}>
                    {/* Page Header */}
                <div style={{
                    background: '#fff',
                    borderRadius: '20px',
                    padding: '40px',
                    marginBottom: '30px',
                        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '20px'
                }}>
                    <div>
                        <h1 style={{
                            fontSize: '32px',
                                fontWeight: '800',
                            color: '#1a237e',
                            marginBottom: '10px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '15px'
                        }}>
                                <i className="fa-solid fa-file-lines" style={{ color: '#FFC107' }} />
                                {t('title')}
                        </h1>
                            <p style={{
                                fontSize: '16px',
                                color: '#666'
                            }}>
                                {t('subtitle')}
                        </p>
                    </div>
                        <Link href="/abstract-submission" style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '10px',
                            background: '#009688',
                            color: '#fff',
                            padding: '12px 24px',
                            borderRadius: '50px',
                            fontWeight: '600',
                            textDecoration: 'none',
                            boxShadow: '0 4px 15px rgba(0, 150, 136, 0.3)',
                            transition: 'all 0.3s ease'
                        }}>
                        <i className="fa-solid fa-plus" />
                        {t('submitNew')}
                    </Link>
                </div>

                    {/* Status Overview Cards */}
                <div style={{
                    display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '20px',
                        marginBottom: '40px'
                }}>
                    <div style={{
                        background: '#fff',
                        borderRadius: '16px',
                        padding: '25px',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                            borderLeft: '5px solid #1a237e'
                    }}>
                        <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>{t('totalSubmitted')}</div>
                            <div style={{ fontSize: '36px', fontWeight: '800', color: '#1a237e' }}>2</div>
                    </div>
                    <div style={{
                        background: '#fff',
                        borderRadius: '16px',
                        padding: '25px',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                            borderLeft: '5px solid #00C853'
                    }}>
                        <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>{t('accepted')}</div>
                            <div style={{ fontSize: '36px', fontWeight: '800', color: '#00C853' }}>1</div>
                    </div>

                    <div style={{
                        background: '#fff',
                        borderRadius: '16px',
                        padding: '25px',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                            borderLeft: '5px solid #FF9800'
                    }}>
                        <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>{t('underReview')}</div>
                            <div style={{ fontSize: '36px', fontWeight: '800', color: '#FF9800' }}>1</div>
                    </div>
                </div>

                {/* Abstract List */}
                            <h2 style={{
                        fontSize: '24px',
                                fontWeight: '700',
                                color: '#333',
                                marginBottom: '20px',
                        paddingLeft: '10px',
                        borderLeft: '4px solid #1a237e'
                            }}>
                        {t('yourAbstracts')}
                            </h2>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                        {abstracts.map((abstract) => (
                            <div key={abstract.id} style={{
                                background: '#fff',
                                borderRadius: '20px',
                                overflow: 'hidden',
                                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.05)',
                                borderTop: `4px solid ${abstract.statusColor}`
                            }}>
                                {/* Header */}
                                <div style={{
                                    padding: '25px 30px',
                                    borderBottom: '1px solid #f0f0f0',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'start',
                                    flexWrap: 'wrap',
                                    gap: '15px'
                                }}>
                                    <div style={{ flex: 1 }}>
                                <div style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '8px',
                                            background: `${abstract.statusColor}15`,
                                            color: abstract.statusColor,
                                            padding: '6px 14px',
                                            borderRadius: '50px',
                                    fontSize: '13px',
                                            fontWeight: '700',
                                            marginBottom: '10px'
                            }}>
                                            <i className={`fa-solid ${getStatusIcon(abstract.status)}`} />
                                            {t(`status.${abstract.status}`)}
                            </div>
                                    <h3 style={{
                                            fontSize: '18px',
                                        fontWeight: '700',
                                            color: '#333',
                                            lineHeight: '1.5',
                                            marginBottom: '10px'
                                        }}>
                                            {abstract.title}
                                        </h3>
                                        <div style={{
                                            fontSize: '13px',
                                            color: '#666',
                                        display: 'flex',
                                        alignItems: 'center',
                                            gap: '20px',
                                            flexWrap: 'wrap'
                                    }}>
                                            <span>
                                                <i className="fa-solid fa-layer-group" style={{ marginRight: '6px', color: '#999' }} />
                                                {t(`category.${abstract.category}`)}
                                            </span>
                                            <span>
                                                <i className="fa-solid fa-microphone" style={{ marginRight: '6px', color: '#999' }} />
                                                {t(`type.${abstract.presentationType}`)}
                                            </span>
                                            <span>
                                                <i className="fa-solid fa-calendar-check" style={{ marginRight: '6px', color: '#999' }} />
                                                Submitted: {abstract.submittedDate}
                                            </span>
                                        </div>
                                    </div>
                                    <button style={{
                                        background: 'transparent',
                                        border: '1px solid #ddd',
                                        color: '#666',
                                        padding: '8px 16px',
                                        borderRadius: '8px',
                                        fontSize: '14px',
                                        fontWeight: '600',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s',
                                        whiteSpace: 'nowrap'
                                    }}>
                                        <i className="fa-solid fa-eye" style={{ marginRight: '8px' }} />
                                        View Details
                                    </button>
                                </div>

                                {/* Body */}
                                {abstract.status === 'accepted' && abstract.presentationDetails && (
                                    <div style={{ padding: '25px 30px', background: '#f9fbfd' }}>
                                        <h4 style={{
                                            fontSize: '15px',
                                            fontWeight: '700',
                                            color: '#1a237e',
                                            marginBottom: '15px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '10px'
                                        }}>
                                            <i className="fa-solid fa-chalkboard-user" />
                                            Presentation Scheduled
                                        </h4>
                                        <div style={{
                                            display: 'grid',
                                            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                                            gap: '20px',
                                            fontSize: '14px'
                                        }}>
                                            <div>
                                                <div style={{ color: '#888', marginBottom: '4px', fontSize: '12px' }}>Session</div>
                                                <div style={{ color: '#333', fontWeight: '500' }}>{abstract.presentationDetails.session}</div>
                                            </div>
                                            <div>
                                                <div style={{ color: '#888', marginBottom: '4px', fontSize: '12px' }}>Date & Time</div>
                                                <div style={{ color: '#333', fontWeight: '500' }}>
                                                    {abstract.presentationDetails.date} <br />
                                                    <span style={{ color: '#009688' }}>{abstract.presentationDetails.time}</span>
                                                </div>
                                            </div>
                                            <div>
                                                <div style={{ color: '#888', marginBottom: '4px', fontSize: '12px' }}>Venue</div>
                                                <div style={{ color: '#333', fontWeight: '500' }}>{abstract.presentationDetails.room}</div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
            </div>
        </div>
    );
}
