function moForm() {
  // Hiện cả cái lớp nền đen lên, cái form bên trong sẽ hiện theo
  document.getElementById("mainForm").style.display = "flex";
}

function tatForm() {
  // Ẩn cái lớp nền đen đi, cái form bên trong sẽ biến mất theo
  document.getElementById("mainForm").style.display = "none";
}
function clearForm() {
  // 1. Reset các ô nhập liệu về rỗng
  document.getElementById("stt").value = "";
  document.getElementById("msv").value = "";
  document.getElementById("fullname").value = "";
  document.getElementById("clas").value = "";
  document.getElementById("ns").value = "";
  document.getElementById("diem").value = "";

  document.getElementById("error-msv").innerHTML = "";
  document.getElementById("error-fullname").innerHTML = "";
  document.getElementById("error-diem").innerHTML = "";

  // 3. Xóa bỏ viền đỏ vi phạm (input-error) trên các ô nhập
  document.getElementById("msv").classList.remove("input-error");
  document.getElementById("fullname").classList.remove("input-error");
  document.getElementById("diem").classList.remove("input-error");
  //  Gỡ  viền xanh lá (input-success) khi dọn dẹp form
  // ==========================================
  document.getElementById("msv").classList.remove("input-success");
  document.getElementById("fullname").classList.remove("input-success");
  document.getElementById("diem").classList.remove("input-success");
}
let hangDangSua = null;
function luuSinhVien() {
  //lấy dữ liệu từ người dùng nhập vào form
  let stt = document.getElementById("stt").value;
  let maSV = document.getElementById("msv").value;
  let hoten = document.getElementById("fullname").value;
  let lop = document.getElementById("clas").value;
  let ngaysinh = document.getElementById("ns").value;
  let diem = document.getElementById("diem").value;
  // lấy nguyên bản thẻ input để can thiệp vào việc chỉnh sửa giao diện ô đó
  let inputMsv = document.getElementById("msv");
  let inputFullname = document.getElementById("fullname");
  let inputDiem = document.getElementById("diem");
  //tìm các thẻ <small> thông báo lỗi
  let errMsv = document.getElementById("error-msv");
  let errFullname = document.getElementById("error-fullname");
  let errDiem = document.getElementById("error-diem");
  //gỡ bỏ cái class trong CSS cho ô nhập liệu
  inputMsv.classList.remove("input-error");
  inputFullname.classList.remove("input-error");
  inputDiem.classList.remove("input-error");
  let bHopLe = true;

  // 3. KIỂM TRA MÃ SINH VIÊN
  if (inputMsv.value.trim() === "") {
    errMsv.innerHTML = "Mã sinh viên không được để trống!";
    inputMsv.classList.add("input-error"); // Đổi viền ô mã SV thành đỏ
    inputMsv.classList.remove("input-success");
    bHopLe = false;
  } else {
    errMsv.innerHTML = "";
    inputMsv.classList.remove("input-error");
    inputMsv.classList.add("input-success");
  }

  // 4. KIỂM TRA HỌ VÀ TÊN
  if (inputFullname.value.trim() === "") {
    errFullname.innerHTML = "Họ và tên không được để trống!";
    inputFullname.classList.add("input-error"); // Đổi viền ô họ tên thành đỏ
    inputMsv.classList.remove("input-success");
    bHopLe = false;
  } else {
    errFullname.innerHTML = "";
    inputFullname.classList.remove("input-error");
    inputFullname.classList.add("input-success");
  }

  // 5. KIỂM TRA ĐIỂM
  if (inputDiem.value.trim() === "") {
    errDiem.innerHTML = "Điểm số không được để trống!";
    inputDiem.classList.add("input-error"); // Đổi viền ô điểm thành đỏ
    inputMsv.classList.remove("input-success");
    bHopLe = false;
  } else {
    let diemSo = parseFloat(inputDiem.value);
    if (isNaN(diemSo) || diemSo < 0 || diemSo > 10) {
      errDiem.innerHTML = "Điểm phải là số thực hợp lệ từ 0 đến 10!";
      inputDiem.classList.add("input-error"); // Đổi viền ô điểm thành đỏ nếu sai định dạng
      inputMsv.classList.remove("input-success");
      bHopLe = false;
    } else {
      errDiem.innerHTML = "";
      inputDiem.classList.remove("input-error");
      inputDiem.classList.add("input-success");
    }
  }
  // 6. CHẶN FORM: Nếu có bất kỳ ô nào lỗi (bHopLe bằng false) thì dừng hàm ngay lập tức
  if (bHopLe === false) {
    return;
  }
  if (hangDangSua !== null) {
    hangDangSua.cells[0].innerHTML = stt;
    hangDangSua.cells[1].innerHTML = maSV;
    hangDangSua.cells[2].innerHTML = hoten;
    hangDangSua.cells[3].innerHTML = lop;
    hangDangSua.cells[4].innerHTML = ngaysinh;
    hangDangSua.cells[5].innerHTML = diem;
    hangDangSua = null;
  } else {
    let tbody = document.querySelector("#bang table tbody");
    let row = tbody.insertRow();
    row.insertCell(0).innerHTML = stt;
    row.insertCell(1).innerHTML = maSV;
    row.insertCell(2).innerHTML = hoten;
    row.insertCell(3).innerHTML = lop;
    row.insertCell(4).innerHTML = ngaysinh;
    row.insertCell(5).innerHTML = diem;
    row.insertCell(6).innerHTML =
      "<button class='btn-sua' onclick='suaSV(this)'>Sửa</button> <button class='btn-xoa' onclick='xoaSV(this)'>Xóa</button>";
  }
  clearForm();
  hangDangSua = null;
  tatForm();
  tinhToan();
}

function xoaSV(luan) {
  if (confirm("Bạn có chắc chắn muốn xóa không?")) {
    let hang = luan.parentElement.parentElement;
    hang.remove();
  }
}
function suaSV(nnt) {
  hangDangSua = nnt.parentElement.parentElement;
  document.getElementById("stt").value = hangDangSua.cells[0].innerHTML;
  document.getElementById("msv").value = hangDangSua.cells[1].innerHTML;
  document.getElementById("fullname").value = hangDangSua.cells[2].innerHTML;
  document.getElementById("clas").value = hangDangSua.cells[3].innerHTML;
  document.getElementById("ns").value = hangDangSua.cells[4].innerHTML;
  document.getElementById("diem").value = hangDangSua.cells[5].innerHTML;
  moForm();
}
function tinhToan() {
  // 1. Lấy tất cả các hàng (tr) nằm trong phần thân của bảng (tbody)
  // Bạn nhớ kiểm tra xem bảng của bạn có thẻ tbody chưa, hoặc dùng selector thẻ tr dữ liệu
  let rows = document.querySelectorAll("#bang table tbody tr");

  // Nếu bảng của bạn không dùng tbody, hãy dùng selector này:
  // let rows = document.querySelectorAll("#bang table tr");

  let tongSV = rows.length; // Số lượng hàng chính là tổng số sinh viên
  let diemTB = 0;

  if (tongSV > 0) {
    let tongDiem = 0;

    // Vòng lặp chạy qua từng hàng đang hiển thị trên giao diện
    for (let i = 0; i < tongSV; i++) {
      // Theo code luuSinhVien của bạn: row.insertCell(5).innerHTML = diem;
      // Nghĩa là điểm số nằm ở ô thứ 5 (bắt đầu đếm từ 0, 1, 2, 3, 4, 5)
      let oDiem = rows[i].cells[5];

      if (oDiem) {
        // Lấy chữ trong ô điểm, chuyển thành số rồi cộng dồn vào tổng
        let diemSo = parseFloat(oDiem.innerText || oDiem.innerHTML);
        if (!isNaN(diemSo)) {
          tongDiem += diemSo;
        }
      }
    }
    // Tính điểm trung bình và làm tròn 2 chữ số thập phân
    diemTB = (tongDiem / tongSV).toFixed(2);
  }

  // 2. Hiển thị kết quả lên thanh thống kê màu xanh
  document.getElementById("tssv").innerHTML = tongSV;
  document.getElementById("dtb").innerHTML = diemTB;
}

// Hàm tự động xóa lỗi khi người dùng gõ chữ
function xoaLoiKhiNhap(inputId, errorId) {
  let inputEle = document.getElementById(inputId);
  let errorEle = document.getElementById(errorId);

  if (inputEle && errorEle) {
    inputEle.addEventListener("input", function () {
      inputEle.classList.remove("input-error"); // Mất viền đỏ
      errorEle.innerHTML = ""; // Mất chữ báo lỗi
    });
  }
}
function doiMauVienKhiDung(inputId, errorId) {
  let inputEle = document.getElementById(inputId);
  let errorEle = document.getElementById(errorId);

  if (inputEle && errorEle) {
    inputEle.addEventListener("input", function () {
      let giáTrị = inputEle.value.trim();
      let hợpLệ = true;

      // 1. Kiểm tra riêng cho ô Điểm số khi đang gõ
      if (inputId === "diem") {
        let diemSo = parseFloat(giáTrị);
        if (giáTrị === "" || isNaN(diemSo) || diemSo < 0 || diemSo > 10) {
          hợpLệ = false; // Điểm sai quy định hoặc trống
        }
      }
      // 2. Kiểm tra cho các ô chữ khác (Mã SV, Họ tên)
      else {
        if (giáTrị === "") {
          hợpLệ = false; // Bị trống
        }
      }

      // PHÂN VÂN ĐỔI MÀU VIỀN NGAY KHI GÕ
      if (hợpLệ) {
        errorEle.innerHTML = ""; // Xóa chữ lỗi
        inputEle.classList.remove("input-error"); // Bỏ viền đỏ
        inputEle.classList.add("input-success"); // Bật viền xanh lá
      } else {
        // Khi đang gõ mà xoá sạch hoặc gõ điểm sai (như 225665), chuyển đỏ luôn
        inputEle.classList.remove("input-success");
        inputEle.classList.add("input-error");

        // Cập nhật câu chữ báo lỗi tương ứng
        if (
          inputId === "diem" &&
          giáTrị !== "" &&
          (diemSo < 0 || diemSo > 10)
        ) {
          errorEle.innerHTML = "Điểm phải là số thực hợp lệ từ 0 đến 10!";
        }
      }
    });
  }
}

// tính năng lắng nghe cho cả 3 ô input ngay khi trang web tải xong
window.addEventListener("DOMContentLoaded", function () {
  doiMauVienKhiDung("msv", "error-msv");
  doiMauVienKhiDung("fullname", "error-fullname");
  doiMauVienKhiDung("diem", "error-diem");
});
