'use client'
import { useTranslations } from 'next-intl';
import { sampleCommitteeData } from '@/data/committeeData';

export default function CommitteeSection() {
    const t = useTranslations('about');
    const committees = sampleCommitteeData;

    return (
        <div className="committee-section-area sp2" style={{ background: '#f8f9fa' }}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 m-auto">
                        <div className="heading2 text-center space-margin60">
                            <h5 style={{ color: '#FFBA00' }}>{t('meetOurTeam')}</h5>
                            <div className="space16" />
                            <h2>{t('conferenceCommittee')}</h2>
                            <div className="space16" />
                            <p>{t('committeeDesc')}</p>
                        </div>
                    </div>
                </div>

                {committees.map((committee, index) => (
                    <div key={index} className="row" style={{ marginBottom: '40px' }}>
                        <div className="col-12">
                            <div style={{
                                background: '#fff',
                                borderRadius: '16px',
                                padding: '30px',
                                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                            }} data-aos="fade-up" data-aos-duration={800} data-aos-delay={index * 100}>
                                <h3 style={{
                                    fontSize: '20px',
                                    fontWeight: '700',
                                    color: '#1a1a2e',
                                    marginBottom: '24px',
                                    paddingBottom: '16px',
                                    borderBottom: '3px solid #FFBA00',
                                    display: 'inline-block'
                                }}>
                                    {committee.category}
                                </h3>

                                {committee.members.length > 0 ? (
                                    <div style={{ overflowX: 'auto' }}>
                                        <table style={{
                                            width: '100%',
                                            borderCollapse: 'collapse',
                                            fontSize: '15px'
                                        }}>
                                            <thead>
                                                <tr style={{
                                                    background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
                                                    color: '#fff'
                                                }}>
                                                    <th style={{ padding: '14px 16px', textAlign: 'left', fontWeight: '600' }}>{t('name')}</th>
                                                    <th style={{ padding: '14px 16px', textAlign: 'left', fontWeight: '600' }}>{t('position')}</th>
                                                    <th style={{ padding: '14px 16px', textAlign: 'left', fontWeight: '600' }}>{t('affiliation')}</th>
                                                    <th style={{ padding: '14px 16px', textAlign: 'left', fontWeight: '600' }}>{t('country')}</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {committee.members.map((member, memberIndex) => (
                                                    <tr key={memberIndex} style={{
                                                        background: memberIndex % 2 === 0 ? '#fff' : '#f8f9fa',
                                                        borderBottom: '1px solid #eee',
                                                        transition: 'background 0.3s ease'
                                                    }}>
                                                        <td style={{
                                                            padding: '14px 16px',
                                                            fontWeight: '600',
                                                            color: '#1a1a2e'
                                                        }}>
                                                            {member.name}
                                                        </td>
                                                        <td style={{
                                                            padding: '14px 16px',
                                                            color: '#FFBA00',
                                                            fontWeight: '500'
                                                        }}>
                                                            {member.title || '-'}
                                                        </td>
                                                        <td style={{ padding: '14px 16px', color: '#666' }}>
                                                            {member.affiliation || '-'}
                                                        </td>
                                                        <td style={{ padding: '14px 16px', color: '#666' }}>
                                                            {member.country || '-'}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <div style={{
                                        padding: '40px',
                                        textAlign: 'center',
                                        color: '#999',
                                        background: '#f8f9fa',
                                        borderRadius: '8px'
                                    }}>
                                        <i className="fa-solid fa-users" style={{ fontSize: '32px', marginBottom: '16px', display: 'block' }} />
                                        <p style={{ margin: 0 }}>{t('toBeAnnounced')}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
