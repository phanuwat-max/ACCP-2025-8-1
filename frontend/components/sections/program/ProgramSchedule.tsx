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

    const handleDownload = (dayKey: string) => {
        // TODO: Implement database integration for agenda download
        // Temporarily disabled - waiting for database to be ready
        alert('Coming Soon! Agenda download will be available once the program schedule is finalized.');
    };

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

                {/* e-Program Buttons */}
                <div className="row" data-aos="fade-up" data-aos-duration={800}>
                    <div className="col-12">
                        <div className="eprogram-buttons">
                            <a href="/e-program" className="eprogram-btn primary">
                                <i className="fa-solid fa-book-open" />
                                <span>e-Program</span>
                            </a>
                            <a href="/assets/documents/e-program.pdf" download className="eprogram-btn-download">
                                <i className="fa-solid fa-download" />
                                <span className="download-label">Download e-Program</span>
                            </a>
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
                                    <button 
                                        className="download-btn"
                                        onClick={() => handleDownload(day.dayKey)}
                                        aria-label="Download Agenda"
                                    >
                                        <i className="fa-solid fa-download" />
                                        <span className="download-text">Download Agenda</span>
                                    </button>
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
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
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
                /* Download Button Styles */
                .download-btn {
                    display: flex;
                    align-items: center;
                    gap: 0;
                    background: rgba(255, 255, 255, 0.15);
                    border: 2px solid rgba(255, 255, 255, 0.3);
                    border-radius: 30px;
                    padding: 10px 14px;
                    color: white;
                    font-size: 16px;
                    cursor: pointer;
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    overflow: hidden;
                    white-space: nowrap;
                }
                .download-btn:hover {
                    background: #FFBA00;
                    border-color: #FFBA00;
                    color: #1a237e;
                    padding: 10px 20px;
                    gap: 10px;
                    box-shadow: 0 4px 15px rgba(255, 186, 0, 0.4);
                }
                .download-btn i {
                    font-size: 16px;
                    transition: transform 0.3s ease;
                }
                .download-btn:hover i {
                    transform: translateY(2px);
                }
                .download-text {
                    max-width: 0;
                    opacity: 0;
                    font-size: 14px;
                    font-weight: 600;
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .download-btn:hover .download-text {
                    max-width: 150px;
                    opacity: 1;
                }
                /* Scrollable Schedule Content */
                .schedule-content {
                    padding: 0;
                    max-height: 340px; /* Approximately 5 rows */
                    overflow-y: auto;
                    scrollbar-width: thin;
                    scrollbar-color: #1a237e #e5e7eb;
                }
                .schedule-content::-webkit-scrollbar {
                    width: 8px;
                }
                .schedule-content::-webkit-scrollbar-track {
                    background: #e5e7eb;
                    border-radius: 4px;
                }
                .schedule-content::-webkit-scrollbar-thumb {
                    background: linear-gradient(180deg, #1a237e 0%, #3949ab 100%);
                    border-radius: 4px;
                }
                .schedule-content::-webkit-scrollbar-thumb:hover {
                    background: linear-gradient(180deg, #283593 0%, #5c6bc0 100%);
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
                /* e-Program Buttons */
                .eprogram-buttons {
                    display: flex;
                    justify-content: center;
                    gap: 20px;
                    margin: 30px 0 50px;
                    flex-wrap: wrap;
                }
                .eprogram-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 12px;
                    padding: 16px 32px;
                    border-radius: 50px;
                    font-size: 16px;
                    font-weight: 600;
                    text-decoration: none;
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
                }
                .eprogram-btn i {
                    font-size: 18px;
                    transition: transform 0.3s ease;
                }
                .eprogram-btn.primary {
                    background: linear-gradient(135deg, #1a237e 0%, #283593 100%);
                    color: white;
                }
                .eprogram-btn.primary:hover {
                    background: linear-gradient(135deg, #283593 0%, #3949ab 100%);
                    transform: translateY(-3px);
                    box-shadow: 0 8px 25px rgba(26, 35, 126, 0.3);
                }
                .eprogram-btn.primary:hover i {
                    transform: rotate(-10deg) scale(1.1);
                }
                /* Download e-Program Button - Expand on hover */
                .eprogram-btn-download {
                    display: inline-flex;
                    align-items: center;
                    gap: 0;
                    padding: 16px 18px;
                    border-radius: 50px;
                    background: white;
                    color: #1a237e;
                    border: 2px solid #1a237e;
                    font-size: 16px;
                    font-weight: 600;
                    text-decoration: none;
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
                    overflow: hidden;
                    white-space: nowrap;
                }
                .eprogram-btn-download:hover {
                    background: #FFBA00;
                    border-color: #FFBA00;
                    color: #1a237e;
                    padding: 16px 28px;
                    gap: 12px;
                    transform: translateY(-3px);
                    box-shadow: 0 8px 25px rgba(255, 186, 0, 0.4);
                }
                .eprogram-btn-download i {
                    font-size: 18px;
                    transition: transform 0.3s ease;
                }
                .eprogram-btn-download:hover i {
                    transform: translateY(2px);
                }
                .download-label {
                    max-width: 0;
                    opacity: 0;
                    font-size: 14px;
                    font-weight: 600;
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .eprogram-btn-download:hover .download-label {
                    max-width: 200px;
                    opacity: 1;
                }
                @media (max-width: 768px) {
                    .schedule-header {
                        flex-direction: column;
                        gap: 15px;
                        padding: 15px 20px;
                    }
                    .download-btn {
                        padding: 8px 16px;
                        gap: 8px;
                    }
                    .download-text {
                        max-width: 150px;
                        opacity: 1;
                    }
                    .schedule-item {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 10px;
                    }
                    .schedule-time {
                        min-width: auto;
                    }
                    .schedule-content {
                        max-height: 250px;
                    }
                    .eprogram-buttons {
                        flex-direction: column;
                        align-items: center;
                    }
                    .eprogram-btn {
                        width: 100%;
                        max-width: 280px;
                        justify-content: center;
                        padding: 14px 24px;
                    }
                    .eprogram-btn-download {
                        padding: 14px 24px;
                        gap: 10px;
                    }
                    .download-label {
                        max-width: 200px;
                        opacity: 1;
                    }
                }
            `}</style>
        </div>
    )
}
