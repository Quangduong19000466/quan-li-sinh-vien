function checkEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function save() {
    let fullname = document.getElementById('fullname').value;
    let email = document.getElementById('email').value;
    let phone = document.getElementById('phone').value;
    let address = document.getElementById('address').value;
    let gender = '';
    if (document.getElementById('nam').checked) {
        gender = document.getElementById('nam').value;
    } else if (document.getElementById('nu').checked) {
        gender = document.getElementById('nu').value;
    }

    if (fullname == '') {
        fullname = '';
        document.getElementById('errname').innerHTML = 'Vui lòng nhập họ tên!';

    } else {
        document.getElementById('errname').innerHTML = '';
    }

    if (email == '') {
        email = '';
        document.getElementById('err-email').innerHTML = 'Vui lòng nhập Email!';
    } else if (!checkEmail(email)) {
        email = '';
        document.getElementById('err-email').innerHTML = 'Email không đúng định dạng!';
    } else {
        document.getElementById('err-email').innerHTML = '';
    }

    if (phone == '') {
        phone = '';
        document.getElementById('err-phone').innerHTML = 'Vui lòng nhập số điện thoaị!';
    } else if (phone.trim().length > 10) {
        phone = '';
        document.getElementById('err-phone').innerHTML = 'Số điện thoại không đúng!'
    } else {
        document.getElementById('err-phone').innerHTML = '';
    }

    if (address == '') {
        address = '';
        document.getElementById('err-address').innerHTML = 'Vui lòng nhập địa chỉ!';
    } else {
        document.getElementById('err-address').innerHTML = '';
    }

    if (gender != 1 && gender != 2) {
        gender = '';
        document.getElementById('err-gender').innerHTML = 'Chưa chọn giới tính!';
    } else {
        document.getElementById('err-gender').innerHTML = '';
    }

    if (email && fullname && phone && address && gender) {
        let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : [];
        students.push({
            fullname: fullname,
            email: email,
            phone: phone,
            address: address,
            gender: gender
        });

        localStorage.setItem('students', JSON.stringify(students));
        this.renderListStudent();
    }
}
function renderListStudent() {
    let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : [];
    if (students.length === 0) {
        document.getElementById('list-student').style.display = 'none';
        return false;
    }
    document.getElementById('list-student').style.display = 'block';
    let tablecontent = `<tr>
        <th>#</th>
        <th>Họ và tên</th>
        <th>Email</th>
        <th>Điện thoải</th>
        <th>Địa chỉ</th>
        <th>Giới Tính</th>
        <th>Hành động</th>
        </tr>`;


    students.forEach((student, index) => {
        index++;
        let studentId = index;
        let genders = parseInt(student.gender) === 1 ? 'Nam' : 'Nữ';
        tablecontent += `<tr>
        <td>${index}</td>
        <td>${student.fullname}</td>
        <td>${student.email}</td>
        <td>${student.phone}</td>
        <td>${student.address}</td>
        <td>${genders}</td>
        <td>
            <a href='#' >Edit</a> | <a href='#' onclick = 'deleteStudent(${studentId})'>Delete</a>
        </td>
        </tr>`;
    });

    document.getElementById('grid-student').innerHTML = tablecontent;
}
// function deleteStudent(id) {
//     let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : [];
//     students.splice(id, 1);
//     localStorage.setItem('students', JSON.stringify(students));
//     renderListStudent();
// }