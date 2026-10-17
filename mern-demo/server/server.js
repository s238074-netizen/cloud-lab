require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const Student = require("./models/Student");
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5000;

// Kết nối MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Kết nối MongoDB Atlas thành công!');

    app.listen(PORT, () => {
      console.log(`Server đang chạy ở port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Kết nối MongoDB Atlas thất bại!');
    console.error(err.message);
  });


// Test web
app.get('/', (req, res) => {
  res.send('Kết nối trang web thành công!');
});

// Câu 36: Lấy danh sách sinh viên
app.get("/api/students", async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (error) {
        res.status(500).json({
            message: "Lỗi khi lấy danh sách sinh viên",
            error: error.message
        });
    }
});

// Câu 37: Thêm sinh viên
app.post("/api/students", async (req, res) => {
  try {
    const student = await Student.create(req.body);

    res.status(201).json({
      message: "Thêm sinh viên thành công",
      student: student
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi thêm sinh viên",
      error: error.message
    });
  }
});
      
// Câu 38: Cập nhật sinh viên
app.put("/api/students/:id", async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!student) {
            return res.status(404).json({
                message: "Không tìm thấy sinh viên"
            });
        }

        res.json(student);
    } catch (error) {
        res.status(500).json({
            message: "Lỗi khi cập nhật sinh viên",
            error: error.message
        });
    }
});

// Câu 39: Xóa sinh viên
app.delete("/api/students/:id", async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);

        if (!student) {
            return res.status(404).json({
                message: "Không tìm thấy sinh viên"
            });
        }

        res.json({
            message: "Xóa sinh viên thành công",
            student
        });
    } catch (error) {
        res.status(500).json({
            message: "Lỗi khi xóa sinh viên",
            error: error.message
        });
    }
});