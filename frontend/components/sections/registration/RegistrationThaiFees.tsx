'use client'
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function RegistrationThaiFees() {
    const t = useTranslations('registration');
    const tCommon = useTranslations('common');
    const locale = useLocale();
    const { user } = useAuth();

    const pricingOptions = [
        {
            type: 'student',
            delegateType: 'pharmacy_students',
            title: t('student'),
            price: t('studentPriceTHB'),
            regularPrice: t('studentRegularTHB'),
            features: [
                t('fullConferenceAccess'),
                t('conferenceMaterials'),
                t('coffeeBreaksLunch'),
                t('certificateAttendance'),
                t('validStudentID')
            ]
        },
        {
            type: 'professional',
            delegateType: 'all_delegate',
            title: t('professional'),
            price: t('professionalPriceTHB'),
            regularPrice: t('professionalRegularTHB'),
            features: [
                t('fullConferenceAccess'),
                t('conferenceMaterials'),
                t('coffeeBreaksLunch'),
                t('certificateAttendance'),
                t('networkingEvents')
            ],
            highlighted: true
        },
        {
            type: 'addons',
            delegateType: null, // Show for all
            title: t('addons'),
            price: t('workshopPriceTHB'),
            regularPrice: t('perWorkshop'),
            features: [
                t('preConferenceWorkshop'),
                `9 ${tCommon('programOverview').includes('ภาพรวม') ? 'ก.ค. 2569' : 'July 2026'}`,
                t('handsOnTraining')
            ],
            addons: [
                {
                    price: t('galaPriceTHB'),
                    features: [
                        t('networkingDinner'),
                        t('entertainment')
                    ]
                }
            ]
        }
    ];

    // Filter pricing options based on user delegate type
    const filteredOptions = pricingOptions.filter(option => {
        if (!user?.delegateType) return true; // Show all if not logged in
        if (option.delegateType === null) return true; // Always show addons
        return option.delegateType === user.delegateType;
    });

    return (
        <div className="pricing-lan-section-area sp1">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 m-auto">
                        <div className="heading2 text-center space-margin60">
                            <h5>{t('thaiDelegates')}</h5>
                            <div className="space18" />
                            <h2>{t('registrationFees')} (THB)</h2>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {filteredOptions.map((option, index) => (
                        <div key={option.type} className={`col-lg-${filteredOptions.length === 1 ? '12' : filteredOptions.length === 2 ? '6' : '4'} col-md-6`}>
                            <div className="pricing-boxarea" style={option.highlighted ? { border: '2px solid #FFBA00' } : {}}>
                                <h5>{option.title}</h5>
                                <div className="space20" />
                                <h2>{option.price} <span>{t('earlyBird')}</span></h2>
                                <p style={{ fontSize: '14px', color: '#666' }}>{option.regularPrice}</p>
                                <div className="space8" />
                                <ul>
                                    {option.features.map((feature, idx) => (
                                        <li key={idx}><img src="/assets/img/icons/check2.svg" alt="" />{feature}</li>
                                    ))}
                                </ul>
                                {option.addons && (
                                    <>
                                        <div className="space20" />
                                        <h2>{option.addons[0].price}</h2>
                                        <ul>
                                            {option.addons[0].features.map((feature, idx) => (
                                                <li key={idx}><img src="/assets/img/icons/check2.svg" alt="" />{feature}</li>
                                            ))}
                                        </ul>
                                    </>
                                )}
                                {option.type !== 'addons' && (
                                    <>
                                        <div className="space28" />
                                        <div className="btn-area1">
                                            <Link href={`/${locale}/checkout`} className="vl-btn1">{tCommon('registerNow')}</Link>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
