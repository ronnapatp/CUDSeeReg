import Container from "@/components/container2"
import Meta from "@/components/meta"

export default function about() {
    return (
      <Container>
        <Meta title="เกี่ยวกับเรา" />
        <div className="mt-10">
            <h1 className="text-4xl font-bold">เกี่ยวกับเรา</h1>
            <section className="mt-5 text-xl font-light space-y-5">
                <p className="indent-12">
                    โครงงาน CUDSeeReg นี้จัดทำขึ้นเพื่อเป็นส่วนหนึ่งของการประเมินผลในรายวิชาการออกแบบและเทคโนโลยี ชั้นมัธยมศึกษาปีที่ 3 โรงเรียนสาธิตจุฬาฯ ฝ่ายมัธยม
                </p>
                <h2 className="text-2xl font-bold">ระบบ CUDSeeReg</h2>
                <p className="indent-12">
                    CUDSeeReg เกิดมาจากปัญหาในการลงทะเบียนวิชาเพิ่มเติมในแต่ละเทอม ที่จำเป็นต้องดูข้อมูล จากไฟล์ PDF ของโรงเรียน  ซึ่งไม่สะดวกในการดูในหลายอุปกรณ์ โดยเฉพาะในโทรศัพท์ เพราะไม่ สะดวกในการเลือกดูวันเวลาตามตารางเรียน และยังมีขนาดตัวอักษรที่เล็ก
                </p>
                <p className="indent-12">
                    ด้วยสาเหตุนี้ พวกเราจึงพัฒนา CUDSeeReg ขึ้นมาเพื่อแก้ปัญหาเหล่านี้และพัฒนาฟีเจอร์ที่สร้างความสะดวกสบายในการใช้งานมากขึ้นอย่างเช่น สามารถค้นหารายวิชาตามวันและเวลาที่กำหนด ค้นหาชื่ออาจารย์ผู้สอนและชื่อวิชาได้เพื่อให้พวกเรา สามารถเลือกวิชาที่ตนเองสนใจได้อย่างสะดวกสบายมากขึ้น
                </p>
                <blockquote>
                </blockquote>
                <blockquote className="p-4 my-4 border-s-4 border-gray-300 bg-gray-50 ">
                    <p className="text-xl italic font-medium leading-relaxed text-gray-900">เว็บไซต์นี้เพียงแสดงข้อมูลเกี่ยวกับการลงทะเบียน การลงทะเบียนจริงต้องทำผ่านระบบ cudreg.com เท่านั้น</p>
                </blockquote>
                <p className="indent-12">
                    โดยข้อมูลรายวิชาและตารางเรียนทั้งหมดที่นำมาแสดงในเว็บไซต์นี้มาจากไฟล์ PDF และ Google Docs ที่โรงเรียนส่งให้นักเรียนในช่วงก่อนการลงทะเบียน
                </p>
                <div className="grid grid-cols-1 justify-items-center">
                    <a href="https://github.com/ronnapatp/CUDSeeReg" target="_blank" className="border p-5 max-w-xs text-center font-normal">
                        Open Source on Github
                    </a>
                </div>
                

            </section>
        </div>
      </Container>
    )
  }
  