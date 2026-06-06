let borrowList = JSON.parse(localStorage.getItem('borrowList')) || [];

const borrowTableBody = document.getElementById('borrow-list');
const borrowForm = document.getElementById('borrow-form');
const borrowModal = document.getElementById('borrow-modal');
const openModalBtn = document.getElementById('open-modal-btn');
const closeModalBtn = document.getElementById('close-modal-btn');

const editIndexInput = document.getElementById('edit-index');
const borrowIdInput = document.getElementById('borrow-id');
const borrowerNameInput = document.getElementById('borrower-name');
const bookIdInput = document.getElementById('book-id');
const bookCategoryInput = document.getElementById('book-category');
const borrowDateInput = document.getElementById('borrow-date');
const returnDateInput = document.getElementById('return-date');
const borrowerPhoneInput = document.getElementById('borrower-phone');
const borrowerEmailInput = document.getElementById('borrower-email');
const borrowStatusInput = document.getElementById('borrow-status');

function renderData() {
    borrowTableBody.innerHTML = '';
    
    let total = borrowList.length;
    let borrowing = 0;
    let returned = 0;

    borrowList.forEach((item, index) => {
        // Đếm thống kê trạng thái phiếu
        if (item.status === 'Đang mượn') borrowing++;
        if (item.status === 'Đã trả') returned++;

        // Tạo dòng mới trên bảng tr
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.bookId}</td>
            <td>${item.category}</td>
            <td>${item.borrowDate}</td>
            <td>${item.returnDate}</td>
            <td>${item.phone}</td>
            <td>${item.email}</td>
            <td>${item.status}</td>
            <td>
                <button class="btn btn-edit" onclick="editBorrow(${index})">Sửa</button>
                <button class="btn btn-delete" onclick="deleteBorrow(${index})">Xóa</button>
            </td>
        `;
        borrowTableBody.appendChild(row);
    });

    document.getElementById('total-borrows').innerText = total;
    document.getElementById('borrowing-count').innerText = borrowing;
    document.getElementById('returned-count').innerText = returned;

    localStorage.setItem('borrowList', JSON.stringify(borrowList));
}

openModalBtn.onclick = function() {
    document.getElementById('modal-title').innerText = "Thêm Phiếu Mượn Sách";
    borrowForm.reset(); 
    editIndexInput.value = ""; // Để trống đại diện cho trạng thái THÊM MỚI
    borrowModal.style.display = "block";
}

closeModalBtn.onclick = function() {
    borrowModal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == borrowModal) {
        borrowModal.style.display = "none";
    }
}

borrowForm.onsubmit = function(e) {
    e.preventDefault(); // Chặn hành vi load lại trang mặc định

    const borrowData = {
        id: borrowIdInput.value,
        name: borrowerNameInput.value,
        bookId: bookIdInput.value,
        category: bookCategoryInput.value,
        borrowDate: borrowDateInput.value,
        returnDate: returnDateInput.value,
        phone: borrowerPhoneInput.value,
        email: borrowerEmailInput.value,
        status: borrowStatusInput.value
    };

    const editIndex = editIndexInput.value;

    if (editIndex === "") {
        borrowList.push(borrowData);
    } else {
        borrowList[editIndex] = borrowData;
    }

    renderData(); 
    borrowModal.style.display = "none"; // Đóng popup form
}

window.editBorrow = function(index) {
    document.getElementById('modal-title').innerText = "Sửa Phiếu Mượn Sách";
    const item = borrowList[index];

    editIndexInput.value = index;
    borrowIdInput.value = item.id;
    borrowerNameInput.value = item.name;
    bookIdInput.value = item.bookId;
    bookCategoryInput.value = item.category;
    borrowDateInput.value = item.borrowDate;
    returnDateInput.value = item.returnDate;
    borrowerPhoneInput.value = item.phone;
    borrowerEmailInput.value = item.email;
    borrowStatusInput.value = item.status;

    borrowModal.style.display = "block"; // Hiện popup lên
}

window.deleteBorrow = function(index) {
    const isConfirm = confirm("Bạn có chắc chắn muốn xóa phiếu mượn này khỏi danh sách không?");
    if (isConfirm) {
        borrowList.splice(index, 1); // Xóa 1 phần tử tại vị trí chỉ định
        renderData(); // Render lại bảng
    }
}

renderData();