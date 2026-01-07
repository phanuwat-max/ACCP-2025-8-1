'use client'
import Link from "next/link"
import { useTranslations } from 'next-intl';
import { tracks } from '@/data/programData';

export default function ScientificTracks() {
    const t = useTranslations('program');

    return (
        <div className="service2-section-area sp2" style={{ backgroundColor: '#f8f9fa' }}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 m-auto">
                        <div className="heading2 text-center space-margin60">
                            <h5 data-aos="fade-up" data-aos-duration={800}>{t('researchAreas')}</h5>
                            <div className="space16" />
                            <h2 className="text-anime-style-3">{t('scientificTracks')}</h2>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {tracks.map((track, index) => (
                        <div className="col-lg-3 col-md-6" key={track.id} data-aos="zoom-in" data-aos-duration={800} data-aos-delay={index * 50}>
                            <div className="service2-boxarea">
                                <div className="icon-area">
                                    <i className={`fa-solid ${track.icon}`} />
                                </div>
                                <div className="content-area">
                                    <Link href="#">Track {track.id}</Link>
                                    <div className="space8" />
                                    <p>{t(track.nameKey)}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
