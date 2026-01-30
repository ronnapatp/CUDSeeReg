import React, { useState } from 'react';
import { BoxData } from './boxData';

// Helper functions (extracted from index.tsx or duplicated if necessary, ideally moved to utils)
// But for now, let's keep them here or assume they are passed in if they rely on index-specifics.
// To be clean, I'll rewrite the helpers here as pure functions.

const dayMapping: Record<string, string> = {
    'จ': 'จันทร์',
    'อ': 'อังคาร',
    'พ': 'พุธ',
    'พฤ': 'พฤหัสบดี',
    'ศ': 'ศุกร์',
};

function dateClasstime(thaiClasstime: string): string {
    const isThursday = thaiClasstime.startsWith('พฤ');
    const match = thaiClasstime.match(/([จอพศ])(?:\.|ฯ)?(\d+)-(\d+)/);

    if (isThursday) {
        return 'พฤหัสบดี';
    } else if (match) {
        const dayCode = match[1];
        return dayMapping[dayCode];
    } else if (thaiClasstime.match(/[จอพศ]\.\d+/)) {
        const dayCode = thaiClasstime[0];
        return dayMapping[dayCode];
    }
    return thaiClasstime;
}

function convertClasstime(thaiClasstime: string): string {
    if (thaiClasstime.startsWith('พฤ')) {
        const match = thaiClasstime.match(/พฤ(\d+)-(\d+)/);
        if (match) {
            return `พฤหัสบดี (${match[1]}-${match[2]})`;
        } else if (thaiClasstime.startsWith('พฤ.')) {
            return `พฤหัสบดี (${thaiClasstime.slice(3)})`;
        }
    }

    const match = thaiClasstime.match(/([จอพศ])(?:\.|ฯ)?(\d+)-(\d+)/);
    if (match) {
        const day = dayMapping[match[1]];
        return `${day} (${match[2]}-${match[3]})`;
    } else if (thaiClasstime.match(/[จอพศ]\.\d+/)) {
        const day = dayMapping[thaiClasstime[0]];
        return `${day} (${thaiClasstime.slice(2)})`;
    }
    return thaiClasstime;
}

function getTextColorForDay(day: string): string {
    const colorMapping: Record<string, string> = {
        'จันทร์': 'yellow',
        'อังคาร': 'pink',
        'พุธ': 'green',
        'พฤหัสบดี': 'orange',
        'ศุกร์': 'lightblue',
    };
    return colorMapping[day] || 'black';
}

interface SubjectCardProps {
    box: BoxData;
}

const SubjectCard: React.FC<SubjectCardProps> = ({ box }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className="border p-4 mb-4">
            <div className="flex justify-between items-center mb-2">
                <div>
                    <p className="text-sm text-slate-500">{box.code} - {box.credit} หน่วยกิต</p>
                    <p className="text-2xl font-bold">{box.name}</p>
                </div>
                <button
                    className="text-blue-500 text-2xl"
                    onClick={() => setExpanded(!expanded)}
                >
                    {expanded ? '-' : '+'}
                </button>
            </div>

            <p className="text-md">
                {Array.isArray(box.group) ? (
                    box.group.map((group, index) => (
                        <span
                            key={group}
                            style={{
                                borderRadius: '0.25rem',
                                backgroundColor: getTextColorForDay(dateClasstime(String(box.classtime[index]))),
                                padding: '0.25rem',
                                marginRight: '0.25rem',
                            }}
                        >
                            {convertClasstime(String(box.classtime[index]))}{' '}
                        </span>
                    ))
                ) : (
                    <span
                        style={{
                            borderRadius: '0.25rem',
                            backgroundColor: getTextColorForDay(dateClasstime(String(box.classtime))),
                            padding: '0.25rem',
                        }}
                    >
                        {convertClasstime(String(box.classtime))}
                    </span>
                )}
            </p>

            {expanded && (
                <div className="mt-4 bg-gray-100 p-4 rounded shadow">
                    {Array.isArray(box.group) ? (
                        box.group.map((group, index) => (
                            <div key={group} className="mb-2 border-b pb-2">
                                <p className="font-bold">กลุ่มที่ {group} - {convertClasstime(String(box.classtime[index]))}</p>
                                <p>อาจารย์ผู้สอน: {box.instructor[index]}</p>
                                <p>จำนวนนักเรียนที่รับ: {box.enrollment[index]} </p>
                            </div>
                        ))
                    ) : (
                        <div>
                            <p className="font-bold">กลุ่มที่ {box.group} - {convertClasstime(String(box.classtime))}</p>
                            <p>อาจารย์ผู้สอน: {box.instructor}</p>
                            <p>จำนวนนักเรียนที่รับ: {box.enrollment} </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SubjectCard;
