import { useState } from 'react';
import Container from "@/components/container";
import Meta from "@/components/meta";

export default function Timetable() {
  const [selectedTable, setSelectedTable] = useState('1ep'); // Initial selection

  const handleTableSelection = (event: any) => {
    setSelectedTable(event.target.value);
  };

  // Import the selected table component dynamically
  const TableComponent = require(`@/components/timetable/${selectedTable}`).default;

  return (
    <Container>
      <Meta title="ตารางเรียน" />
      <div className="mt-10">
        <label className="mr-2 font-bold text-slate-950 text-5xl">ตารางเรียน</label>
        
        {/* Table selection dropdown */}
        <div className="mt-4">
          <label htmlFor="tableSelect" className="mr-2">เลือกตาราง:</label>
          <select id="tableSelect" value={selectedTable} onChange={handleTableSelection} className="px-2 py-1 border border-gray-300 rounded">
            <option value="1ep">ม.1 EP</option>
            <option value="1nor">ม.1 ธรรมดา</option>
            <option value="2ep">ม.2 EP</option>
            <option value="2nor">ม.2 ธรรมดา</option>
            <option value="3ep">ม.3 EP</option>
            <option value="3nor">ม.3 ธรรมดา</option>
            <option value="4epmilsci">ม.4 EP ช่วงรด. (วิทย์)</option>
            <option value="4epmilart">ม.4 EP ช่วงรด. (ศิลป์)</option>
            <option value="4epnotmilsci">ม.4 EP ช่วงปกติ (วิทย์)</option>
            <option value="4epnotmilart">ม.4 EP ช่วงปกติ (ศิลป์)</option>
            <option value="4normilsci">ม.4 ธรรมดา ช่วงรด. (วิทย์)</option>
            <option value="4normilart">ม.4 ธรรมดา ช่วงรด. (ศิลป์)</option>
            <option value="4nornotmilsci">ม.4 ธรรมดา ช่วงปกติ (วิทย์)</option>
            <option value="4nornotmilart">ม.4 ธรรมดา ช่วงปกติ (ศิลป์)</option>
            <option value="5epmilsci">ม.5 EP ช่วงรด. (วิทย์)</option>
            <option value="5epnotmilsci">ม.5 EP ช่วงปกติ (วิทย์)</option>
            <option value="5normilsci">ม.5 ธรรมดา ช่วงรด. (วิทย์)</option>
            <option value="5normilart">ม.5 ธรรมดา ช่วงรด. (ศิลป์)</option>
            <option value="5nornotmilsci">ม.5 ธรรมดา ช่วงปกติ (วิทย์)</option>
            <option value="5nornotmilart">ม.5 ธรรมดา ช่วงปกติ (ศิลป์)</option>
            {/* <option value="6epmilsci">ม.6 EP ช่วงรด. (วิทย์)</option>
            <option value="6epmilart">ม.6 EP ช่วงรด. (ศิลป์)</option>
            <option value="6epnotmilsci">ม.6 EP ช่วงปกติ (วิทย์)</option>
            <option value="6epnotmilart">ม.6 EP ช่วงปกติ (ศิลป์)</option>
            <option value="6normilsci">ม.6 ธรรมดา ช่วงรด. (วิทย์)</option>
            <option value="6normilart">ม.6 ธรรมดา ช่วงรด. (ศิลป์)</option>
            <option value="6nornotmilsci">ม.6 ธรรมดา ช่วงปกติ (วิทย์)</option>
            <option value="6nornotmilart">ม.6 ธรรมดา ช่วงปกติ (ศิลป์)</option> */}
          </select>
        </div>

        {/* Display the selected table */}
        <div className="overflow-x-auto mt-4">
          <TableComponent />
        </div>

        <div className="mt-5">
          หมายเหตุ :
        </div>
        <span className="inline-flex">
          <div className='p-4 bg-emerald-500 w-10 mr-2'></div>
          คือวันที่เรียนรด.
        </span>
        <br/>
        และสีตามอ่อนๆตามสีวันคือคาบเลือกเสรี


      </div>
    </Container>
  )
}
