### Lệnh Terminal
- Sau khi kéo về từ git chạy lệnh "npm i" cho cả fe và be
- Cả fe và be đều môi trường dev: npm run dev

### be
- Khỏi tạo table trong db chạy lệnh: npx sequelize-cli db:migrate

### Mô tả cơ bản về DB
accounts(acc_Id, acc_email, acc_password, acc_token, acc_name, acc_address, acc_phone, acc_gender, createdAt, updatedAt) ---- acc_Id: Khóa chỉnh
products(pro_Id, pro_name, pro_desc, pro_url, createdAt, updatedAt)
---- pro_Id: Khóa chỉnh
sizes(size_Id, size_name)
---- size_Id: Khóa chỉnh
detail(pro_Id, size_Id, detail_price)
---- (size_Id, pro_Id): Khóa chỉnh
products và detail có quan hệ Many to Many thông qua detail

### Dữ liệu test
Có thể thay đổi config db theo máy tùy chỉnh ở đường dẫn sau be/config/config.json
Lần lượt chạy file sql của accounts -> products -> sizes -> detail