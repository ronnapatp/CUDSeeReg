import { useState } from 'react';
import Container from "@/components/container";
import Meta from "@/components/meta";

export default function Timetable() {
  const [selectedTable, setSelectedTable] = useState('1epmil'); // Initial selection

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
            <option value="1epmil">ม.1 EP ช่วงรด.</option>
            <option value="1epnotmil">ม.1 EP ช่วงปกติ</option>
            <option value="1normil">ม.1 ธรรมดา ช่วงรด.</option>
            <option value="1nornotmil">ม.1 ธรรมดา ช่วงปกติ</option>
            <option value="2epmil">ม.2 EP ช่วงรด.</option>
            <option value="2epnotmil">ม.2 EP ช่วงปกติ</option>
            <option value="2normil">ม.2 ธรรมดา ช่วงรด.</option>
            <option value="2nornotmil">ม.2 ธรรมดา ช่วงปกติ</option>
            <option value="3epmil">ม.3 EP ช่วงรด.</option>
            <option value="3epnotmil">ม.3 EP ช่วงปกติ</option>
            <option value="3normil">ม.3 ธรรมดา ช่วงรด.</option>
            <option value="3nornotmil">ม.3 ธรรมดา ช่วงปกติ</option>
            <option value="4epmil">ม.4 EP ช่วงรด.</option>
            <option value="4epnotmil">ม.4 EP ช่วงปกติ</option>
            <option value="4normil">ม.4 ธรรมดา ช่วงรด.</option>
            <option value="4nornotmil">ม.4 ธรรมดา ช่วงปกติ</option>
            <option value="5epmil">ม.5 EP ช่วงรด.</option>
            <option value="5epnotmil">ม.5 EP ช่วงปกติ</option>
            <option value="5normil">ม.5 ธรรมดา ช่วงรด.</option>
            <option value="5nornotmil">ม.5 ธรรมดา ช่วงปกติ</option>
            <option value="6epmil">ม.6 EP ช่วงรด.</option>
            <option value="6epnotmil">ม.6 EP ช่วงปกติ</option>
            <option value="6normil">ม.6 ธรรมดา ช่วงรด.</option>
            <option value="6nornotmil">ม.6 ธรรมดา ช่วงปกติ</option>
          </select>
        </div>

        {/* Display the selected table */}
        <div className="overflow-x-auto mt-4">
          <TableComponent />
        </div>

      </div>
    </Container>
  )
}
