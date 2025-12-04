// server.js - Updated for Multi-Course Support

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// --- MOCK DATABASE ---
let COURSES = [
    { id: 'C1', name: 'Grade 10 - Computer Science', teacherId: 'T1' },
    { id: 'C2', name: 'Grade 8 - Math', teacherId: 'T1' }, // T1 now teaches two courses
    { id: 'C3', name: 'Grade 9 - History', teacherId: 'T2' } 
];

let TEACHERS = [
    { 
        id: 'T1', 
        email: 'teacher@school.edu', 
        password: 'password', 
        name: 'Mrs. Johnson', 
        courseIds: ['C1', 'C2'] // Array of course IDs
    }
];

let STUDENTS = [
    { id: 'S1', name: 'Alice Smith', rollNo: '001', gender: 'F', courseId: 'C1' },
    { id: 'S2', name: 'Bob Brown', rollNo: '002', gender: 'M', courseId: 'C1' },
    { id: 'S3', name: 'Charlie Davis', rollNo: '003', gender: 'M', courseId: 'C1' },
    { id: 'S4', name: 'Diana Evans', rollNo: '004', gender: 'F', courseId: 'C2' }, // Student in C2
    { id: 'S5', name: 'Ethan Hunt', rollNo: '005', gender: 'M', courseId: 'C2' }, // Student in C2
];

let ATTENDANCE_LOG = [
    { date: '2024-10-10', courseId: 'C1', studentId: 'S1', status: 'P' },
    { date: '2024-10-10', courseId: 'C1', studentId: 'S2', status: 'A' },
    { date: '2024-10-10', courseId: 'C2', studentId: 'S4', status: 'P' }, // C2 record
    { date: '2024-10-11', courseId: 'C1', studentId: 'S1', status: 'P' },
    { date: '2024-10-11', courseId: 'C1', studentId: 'S2', status: 'P' },
];

// --- UTILITY FUNCTION FOR ATTENDANCE SUMMARY ---
function getAttendanceSummary(courseId) {
    const courseStudents = STUDENTS.filter(s => s.courseId === courseId).map(s => s.id);
    const courseAttendance = ATTENDANCE_LOG.filter(r => r.courseId === courseId);

    const recordsByDate = courseAttendance.reduce((acc, record) => {
        if (!acc[record.date]) {
            acc[record.date] = { P: 0, A: 0, total: 0 };
        }
        acc[record.date][record.status]++;
        acc[record.date].total++;
        return acc;
    }, {});

    const summaryList = Object.keys(recordsByDate).map(date => ({
        date,
        presentCount: recordsByDate[date].P,
        absentCount: recordsByDate[date].A,
        totalStudents: courseStudents.length,
    }));

    summaryList.sort((a, b) => new Date(b.date) - new Date(a.date));
    return summaryList;
}

// --- ENDPOINTS ---

// 1. Login (Returns an array of courses)
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const teacher = TEACHERS.find(t => t.email === email && t.password === password);
    
    if (teacher) {
        const teacherCourses = COURSES.filter(c => teacher.courseIds.includes(c.id));
        res.json({ 
            success: true, 
            user: { 
                name: teacher.name, 
                teacherId: teacher.id,
                courses: teacherCourses.map(c => ({ id: c.id, name: c.name }))
            } 
        });
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});

// 2. Register (Creates one course and assigns it)
app.post('/api/register', (req, res) => {
    const { name, email, password, courseName } = req.body;
    
    if (TEACHERS.some(t => t.email === email)) {
        return res.status(409).json({ success: false, message: 'Account with this email already exists.' });
    }

    const newCourseId = `C${COURSES.length + 1}`;
    const newTeacherId = `T${TEACHERS.length + 1}`;
    
    const newCourse = { id: newCourseId, name: courseName, teacherId: newTeacherId };
    COURSES.push(newCourse);

    const newTeacher = { 
        id: newTeacherId, 
        name, 
        email, 
        password, 
        courseIds: [newCourseId] // Initial course is an array
    };
    TEACHERS.push(newTeacher);
    
    res.status(201).json({ 
        success: true, 
        user: { 
            name: newTeacher.name, 
            teacherId: newTeacher.id,
            courses: [{ id: newCourse.id, name: newCourse.name }]
        } 
    });
});

// 3. Create New Course
app.post('/api/courses/create', (req, res) => {
    const { courseName, teacherId } = req.body;
    
    const teacher = TEACHERS.find(t => t.id === teacherId);
    if (!teacher) {
        return res.status(404).json({ success: false, message: 'Teacher not found.' });
    }

    const newCourseId = `C${COURSES.length + 1}`;
    const newCourse = { id: newCourseId, name: courseName, teacherId };
    COURSES.push(newCourse);
    teacher.courseIds.push(newCourseId); // Assign to teacher

    res.status(201).json({ 
        success: true, 
        course: { id: newCourse.id, name: newCourse.name }
    });
});

// 4. Get Teacher Profile (updated to reflect multi-course)
app.get('/api/profile/:teacherId', (req, res) => {
    const { teacherId } = req.params;
    const teacher = TEACHERS.find(t => t.id === teacherId); 

    if (!teacher) {
        return res.status(404).json({ message: 'Teacher not found' });
    }

    const teacherCourses = COURSES.filter(c => teacher.courseIds.includes(c.id));
    const totalStudents = STUDENTS.filter(s => teacher.courseIds.includes(s.courseId)).length;

    res.json({
        teacherName: teacher.name,
        totalCourses: teacherCourses.length,
        totalStudents: totalStudents,
        courseList: teacherCourses.map(c => c.name)
    });
});

// 5. Get Students by Course ID 
app.get('/api/students/:courseId', (req, res) => {
    const { courseId } = req.params;
    const courseStudents = STUDENTS.filter(s => s.courseId === courseId);
    res.json(courseStudents);
});

// 6. Add New Student 
app.post('/api/students/:courseId', (req, res) => {
    const { courseId } = req.params;
    const { name, rollNo, gender } = req.body;
    
    const newId = `S${STUDENTS.length + 1}`;
    const studentWithId = { id: newId, name, rollNo, gender, courseId };
    STUDENTS.push(studentWithId);
    
    res.status(201).json(studentWithId);
});

// 7. Record Attendance 
app.post('/api/attendance/:courseId', (req, res) => {
    const { courseId } = req.params;
    const { date, records } = req.body;
    
    const newRecords = records.map(record => ({
        date: date,
        courseId: courseId, // Important addition
        studentId: record.id,
        status: record.status 
    }));
    
    // Remove existing records for this date and course
    ATTENDANCE_LOG = ATTENDANCE_LOG.filter(r => !(r.date === date && r.courseId === courseId));
    
    ATTENDANCE_LOG.push(...newRecords);
    
    res.status(200).json({ success: true, message: 'Attendance recorded' });
});

// 8. Get Attendance Summary 
app.get('/api/attendance/summary/:courseId', (req, res) => {
    const { courseId } = req.params;
    const summary = getAttendanceSummary(courseId);
    res.json(summary);
});

// 9. Get Daily Attendance Details 
app.get('/api/attendance/details/:date/:courseId', (req, res) => {
    const { date, courseId } = req.params;
    
    const courseStudents = STUDENTS.filter(s => s.courseId === courseId);

    const dailyRecords = ATTENDANCE_LOG.filter(r => r.date === date && r.courseId === courseId);

    const details = courseStudents.map(student => {
        const record = dailyRecords.find(r => r.studentId === student.id);
        return {
            id: student.id,
            name: student.name,
            rollNo: student.rollNo,
            status: record ? record.status : 'A', 
        };
    });

    details.sort((a, b) => parseInt(a.rollNo) - parseInt(b.rollNo));

    res.json(details);
});


app.listen(port, () => {
    console.log(`🟢 Backend Server running successfully on port ${port}`);
});