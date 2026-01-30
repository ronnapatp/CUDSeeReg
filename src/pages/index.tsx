import { useState, useEffect } from 'react';
import Container from '@/components/container';
import { useSearchParams } from 'next/navigation'
import Meta from "@/components/meta"
import SubjectCard from '@/components/SubjectCard';
import { useSubjectData } from '@/components/useSubjectData';
import { BoxData } from '@/components/boxData';
// Note: dayMapping logic for filters duplicated/embedded for now or can be extracted.

const BoxList: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState('m1');
  const [searchTerm, setSearchTerm] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const searchParams = useSearchParams()
  const sortGradeValue = searchParams.get("matthayom")

  const { data, loading, error } = useSubjectData(selectedFile);

  useEffect(() => {
    if (sortGradeValue) {
      const numericValue = parseInt(sortGradeValue, 10);
      if (!isNaN(numericValue) && numericValue >= 1 && numericValue <= 6) {
        setSelectedFile("m" + sortGradeValue);
      }
    }
  }, [sortGradeValue]);


  // Helper for filter logic (Simplified version of what was there)
  const dayMapping: Record<string, string> = {
    'จ': 'จันทร์', 'อ': 'อังคาร', 'พ': 'พุธ', 'พฤ': 'พฤหัสบดี', 'ศ': 'ศุกร์',
  };

  const getDayFromClasstime = (classtime: string) => {
    // Reusing logic from SubjectCard conceptually
    if (classtime.startsWith('พฤ')) return 'พฤหัสบดี';
    const match = classtime.match(/([จอพศ])(?:\.|ฯ)?(\d+)-(\d+)/);
    if (match) return dayMapping[match[1]];
    if (classtime.match(/[จอพศ]\.\d+/)) return dayMapping[classtime[0]];
    return classtime;
  }

  const shouldIncludeBox = (box: BoxData) => {
    if (!dateFilter) return true;
    const boxDay = getDayFromClasstime(String(box.classtime));
    // The filter value is full name e.g. "จันทร์"
    // boxDay should match that.
    // The original logic had a weird find, let's just compare direct mapped values
    // but the original code did `Object.values(dayMapping).find(...)`.
    // Let's assume dateFilter is "จันทร์" etc.
    return boxDay?.includes(dateFilter);
  }

  // Effect to reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedFile, searchTerm, subjectFilter, dateFilter]);

  const filteredData = data.filter(
    (box) =>
      (box.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        box.code.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (subjectFilter ? box.code.startsWith(subjectFilter) : true) &&
      shouldIncludeBox(box)
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const numberOfPages = Math.ceil(filteredData.length / itemsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <Container>
      <Meta title="รายวิชาเลือกเสรี" />
      <div className="mb-4 flex flex-wrap items-center mt-5">
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

      <div className="flex flex-col mb-4 sm:flex-row sm:items-center gap-2">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by name or code"
          className="flex-grow p-2 border rounded"
        />

        <select
          value={subjectFilter}
          onChange={(e) => setSubjectFilter(e.target.value)}
          className="p-2 border rounded sm:flex-1"
        >
          <option value="">ทุกวิชา</option>
          <option value="ค">คณิตศาสตร์</option>
          <option value="ว">วิทยาศาสตร์</option>
          <option value="ส">สังคมศึกษา</option>
          <option value="พ">พละศึกษา</option>
          <option value="ง">การงานอาชีพ</option>
          <option value="ท">ภาษาไทย</option>
          <option value="ภ">ภาษาต่างประเทศ</option>
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

      {loading && <div className="text-center p-10 text-xl text-gray-500">Loading subjects...</div>}
      {error && <div className="text-center p-10 text-xl text-red-500">Error loading data. Please try again.</div>}

      {!loading && !error && (
        <>
          <div className="grid grid-cols-1 gap-4">
            {currentItems.map((box) => (
              <SubjectCard key={box.order} box={box} />
            ))}
            {currentItems.length === 0 && <p className="text-center text-gray-500">No subjects found.</p>}
          </div>

          <div className="mt-4 flex flex-wrap gap-1 justify-center">
            {Array.from({ length: numberOfPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={`mx-1 px-3 py-1 border rounded ${currentPage === index + 1 ? 'bg-slate-800 text-white' : 'bg-white hover:bg-gray-100'}`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </Container>
  );
};

export default BoxList;
