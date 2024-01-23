import { useState, useEffect } from 'react';
import Container from '@/components/container';
import { BoxData } from '@/components/boxData';
import { useSearchParams } from 'next/navigation'
import Meta from "@/components/meta"

const BoxList: React.FC = () => {
  const [data, setData] = useState<BoxData[]>([]);
  const [selectedFile, setSelectedFile] = useState('m1');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedBox, setExpandedBox] = useState<number | null>(null);
  const [subjectFilter, setSubjectFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const itemsPerPage = 15;
  const searchParams = useSearchParams()
  const sortGradeValue = searchParams.get("matthayom")
  
  useEffect(() => {
    if (sortGradeValue) {
      const numericValue = parseInt(sortGradeValue, 10);
      if (!isNaN(numericValue) && numericValue >= 1 && numericValue <= 6) {
        setSelectedFile("m" + sortGradeValue);
      }
    }
  }, [sortGradeValue]);
  
  type DayMapping = Record<string, string>;

  const dayMapping: DayMapping = {
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
        const startPeriod = match[1];
        const endPeriod = match[2];
        return `พฤหัสบดี (${startPeriod}-${endPeriod})`;
      } else if (thaiClasstime.startsWith('พฤ.')) {
        return `พฤหัสบดี (${thaiClasstime.slice(3)})`;
      }
    }
  
    const match = thaiClasstime.match(/([จอพศ])(?:\.|ฯ)?(\d+)-(\d+)/);
    if (match) {
      const day = dayMapping[match[1]];
      const startPeriod = match[2];
      const endPeriod = match[3];
      return `${day} (${startPeriod}-${endPeriod})`;
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

  function shouldIncludeBox(box: BoxData): boolean {
    if (!dateFilter) {
      return true; // If no date filter is selected, include all boxes
    }
  
    const day = dateClasstime(String(box.classtime));
    const thaiDay = Object.values(dayMapping).find((value) => value === dateFilter);
    return thaiDay === day;
  }
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://raw.githubusercontent.com/ronnapatp/cudElective/main/data/json/${selectedFile}.json`);
        const jsonData: BoxData[] = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [selectedFile]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const filteredData = data.filter(
    (box) =>
      (box.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        box.code.toLowerCase().includes(searchTerm.toLowerCase())) &&
      shouldIncludeBox(box)
  );

  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const toggleExpandedBox = (order: number) => {
    setExpandedBox((prev) => (prev === order ? null : order));
  };

  return (
    <Container>
      <Meta title="รายวิชาเลือกเสรี" />
     <div className="mb-4 flex flex-wrap items-center mt-5">
        {/* Select box for choosing JSON file */}
        <label className="mr-2 font-bold text-slate-950 text-5xl">ค้นหาวิชาเลือกเสรี</label>
        <select
          value={selectedFile}
          onChange={(e) => setSelectedFile(e.target.value)}
          className="p-2 border rounded"
        >
          {Array.from({ length: 6 }).map((_, index) => (
            <option key={index} value={`m${index + 1}`}>
              ม.{index + 1}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col mb-4 sm:flex-row sm:items-center">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by name or code"
          className="flex-grow p-2 border rounded mb-2 sm:mb-0 sm:mr-2"
        />

        <div className="flex flex-col sm:flex-row sm:items-center">
          <select
            value={subjectFilter}
            onChange={(e) => setSubjectFilter(e.target.value)}
            className="p-2 border rounded mb-2  sm:mr-2 sm:mb-0 sm:flex-1"
          >
            <option value="">ทุกวิชา</option>
            <option value="subject1">Subject 1</option>
            <option value="subject2">Subject 2</option>
          </select>

          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="p-2 border rounded sm:flex-1"
          >
            <option value="">ทุกวัน</option>
            <option value="จันทร์">จันทร์</option>
            <option value="อังคาร">อังคาร</option>
            <option value="พุธ">พุธ</option>
            <option value="พฤหัสบดี">พฤหัสบดี</option>
            <option value="ศุกร์">ศุกร์</option>
          </select>
        </div>

      </div>

      <div className="grid grid-cols-1 gap-4">
      {currentItems.map((box) => (
        <div key={box.order} className="border p-4 mb-4">
          <div className="flex justify-between items-center mb-2">
            <div>
              <p className="text-sm text-slate-500">{box.code} - {box.credit} หน่วยกิต</p>
              <p className="text-2xl font-bold">{box.name}</p>
            </div>
            <button
              className="text-blue-500 text-2xl"
              onClick={() => toggleExpandedBox(box.order)}
            >
              {expandedBox === box.order ? '-' : '+'}
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

          {expandedBox === box.order && (
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
      ))}
      </div>
      <div className="mt-4">
        {Array.from({ length: Math.ceil(filteredData.length / itemsPerPage) }).map((_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={`mx-1 px-3 py-1 border ${currentPage === index + 1 ? 'bg-gray-300' : ''}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </Container>
  );
};

export default BoxList;
