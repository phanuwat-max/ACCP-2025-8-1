'use client'
import { useTranslations } from 'next-intl';
import { programDays } from '@/data/programData';

export default function ProgramSchedule() {
    const t = useTranslations('program');

    const getEventStyle = (type: string) => {
        switch (type) {
            case 'plenary': return { bg: '#8B5CF6', light: '#EDE9FE' };
            case 'symposia': return { bg: '#3B82F6', light: '#DBEAFE' };
            case 'oral': return { bg: '#10B981', light: '#D1FAE5' };
            case 'poster': return { bg: '#F59E0B', light: '#FEF3C7' };
            case 'ceremony': return { bg: '#EC4899', light: '#FCE7F3' };
            case 'social': return { bg: '#EF4444', light: '#FEE2E2' };
            default: return { bg: '#9CA3AF', light: '#F3F4F6' };
        }
    }

    return (
        <div className="service1-section-area sp1">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 m-auto">
                        <div className="heading2 text-center space-margin60">
                            <h5 data-aos="fade-up" data-aos-duration={800}>{t('scientificProgram')}</h5>
                            <div className="space16" />
                            <h2 className="text-anime-style-3">{t('programAtAGlance')}</h2>
                            <div className="space16" />
                            <p data-aos="fade-up" data-aos-duration={1000}>{t('programDesc')}</p>
                        </div>
                    </div>
                </div>

                {programDays.map((day, dayIndex) => (
                    <div key={dayIndex} className="row" style={{ marginBottom: '40px' }} data-aos="fade-up" data-aos-duration={800} data-aos-delay={dayIndex * 100}>
                        <div className="col-12">
                            <div className="schedule-boxarea">
                                <div className="schedule-header">
                                    <div className="date-badge">
                                        <span className="day-label">{t(day.dayKey)}</span>
                                        <span className="date-label">{day.date}</span>
                                    </div>
                                </div>
                                <div className="schedule-content">
                                    {day.events.map((event, eventIndex) => {
                                        const style = getEventStyle(event.type);
                                        return (
                                            <div key={eventIndex} className="schedule-item" style={{
                                                borderLeft: `4px solid ${style.bg}`,
                                                backgroundColor: eventIndex % 2 === 0 ? '#fff' : '#fafafa'
                                            }}>
                                                <div className="schedule-time">
                                                    <i className={`fa-solid ${event.icon}`} style={{ color: style.bg, marginRight: '10px' }} />
                                                    {event.time}
                                                </div>
                                                <div className="schedule-title">{t(event.titleKey)}</div>
                                                <div className="schedule-type" style={{ backgroundColor: style.light, color: style.bg }}>
                                                    {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <style jsx>{`
                .schedule-boxarea {
                    background: white;
                    border-radius: 16px;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.08);
                    overflow: hidden;
                }
                .schedule-header {
                    background: linear-gradient(135deg, #1a237e 0%, #283593 100%);
                    padding: 20px 30px;
                }
                .date-badge {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                }
                .day-label {
                    background: #FFBA00;
                    color: #1a237e;
                    padding: 8px 20px;
                    border-radius: 25px;
                    font-weight: 700;
                    font-size: 14px;
                }
                .date-label {
                    color: white;
                    font-size: 18px;
                    font-weight: 600;
                }
                .schedule-content {
                    padding: 0;
                }
                .schedule-item {
                    display: flex;
                    align-items: center;
                    padding: 18px 25px;
                    gap: 20px;
                    transition: all 0.3s ease;
                }
                .schedule-item:hover {
                    background-color: #f0f7ff !important;
                }
                .schedule-time {
                    min-width: 180px;
                    font-weight: 600;
                    color: #1a237e;
                    font-size: 14px;
                }
                .schedule-title {
                    flex: 1;
                    font-size: 15px;
                    color: #333;
                }
                .schedule-type {
                    padding: 5px 15px;
                    border-radius: 20px;
                    font-size: 12px;
                    font-weight: 600;
                    text-transform: capitalize;
                }
                @media (max-width: 768px) {
                    .schedule-item {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 10px;
                    }
                    .schedule-time {
                        min-width: auto;
                    }
                }
            `}</style>
        </div>
    )
}
