# Everyday Convert

เครื่องมือแปลงหน่วยแบบ Static สำหรับใช้งานบน GitHub Pages โดยคำนวณทั้งหมดใน browser และเก็บรายการล่าสุดไว้ในเครื่องผู้ใช้

## ความสามารถ

- ความยาว น้ำหนัก อุณหภูมิ พื้นที่ ปริมาตร ความเร็ว เวลา และข้อมูลดิจิทัล
- สลับหน่วยและคัดลอกผลลัพธ์
- ทางลัดสำหรับการแปลงที่ใช้บ่อย
- ประวัติ 5 รายการล่าสุดด้วย `localStorage`
- มีลิงก์ไปยัง Name Randomizer เดิม

## Local use

Open `unit-converter.html` in a browser. The `index.html` file remains as a compatibility redirect for GitHub Pages root URLs.

## Deploy on GitHub Pages

1. Push to the `main` branch.
2. In repository settings, open **Pages**.
3. Set the source to **Deploy from a branch**.
4. Select `main` and `/(root)`.
5. Save and wait for the Pages build to finish.
