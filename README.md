# Name Randomizer (A+B+C)

เว็บแอปสุ่มชื่อแบบ 3 ท่อน รองรับการติ๊กเลือกโหมดสุ่มเป็น A+B+C, A+B หรือ A โดยแก้ข้อมูลในกล่อง A/B/C ได้ และสามารถบันทึกออกเป็นไฟล์ A.txt, B.txt, C.txt ได้

## Features

- แก้ไขข้อมูลชุด A/B/C ได้จากหน้าเว็บ
- สุ่มชื่อจากโหมดที่เลือกได้ 3 แบบ: A+B+C, A+B, A
- ระบุจำนวนที่จะสุ่มได้ (1-100)
- Save Draft ลง localStorage
- Save ผลลัพธ์เป็น `result.txt`
- Save แต่ละชุดเป็น `A.txt`, `B.txt`, `C.txt`

## Run local

เปิด `index.html` ใน browser ได้เลย

## Deploy on GitLab Pages

1. สร้าง GitLab repository ใหม่
2. push ไฟล์ทั้งหมดขึ้น branch `main` หรือ `master`
3. รอ pipeline job `pages` สำเร็จ
4. เข้าเมนู Deploy > Pages เพื่อรับ URL

## Important note

บน GitLab Pages เป็น static hosting จึงไม่สามารถเขียนไฟล์ทับบนเซิร์ฟเวอร์โดยตรงได้
การกด Save จะเป็นการดาวน์โหลดไฟล์ .txt ลงเครื่องผู้ใช้
