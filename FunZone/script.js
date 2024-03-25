function login() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // Xử lý logic đăng nhập ở phía client (ví dụ: kiểm tra thông tin đăng nhập hợp lệ)
    var storedUsername = localStorage.getItem("registeredInUser");
    var storedPassword = localStorage.getItem("registeredInPassword");

    if (username === storedUsername && password === storedPassword) {
        // Lưu thông tin đăng nhập vào localStorage

        localStorage.setItem("loggedInUser", username);
        username=localStorage.getItem('username');
        document.getElementById("username").textContent=username;
        // Chuyển hướng đến trang dashboard
        window.location.href = "trang_chu.html";
    } else {
        alert("Invalid username or password");
    }
}

function register() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // Xử lý logic đăng kí ở phía client (ví dụ: lưu thông tin đăng kí vào localStorage)
    localStorage.setItem("registeredInUser", username);
    localStorage.setItem("registeredInPassword", password);

    alert("Registration successful! Please login.");
    window.location.href = "index.html";
}

function logout() {
    // Xóa thông tin đăng nhập trong localStorage
    localStorage.removeItem("loggedInUser");
    window.location.href = "index.html";
}

function giohang(){
    window.location.href = "giohang.html"
}

// Xử lý hiển thị tên người dùng
var usernameElement = document.getElementById('username');
usernameElement.textContent = username ? username : "Khách";

// Xử lý hiệu ứng khi di chuột vào liên kết
var links = document.querySelectorAll('nav ul li a');
links.forEach(function(link) {
  link.addEventListener('mouseenter', function() {
    link.style.color = '#f00'; // Thay đổi màu chữ khi di chuột vào
  });
  
  link.addEventListener('mouseleave', function() {
    link.style.color = '#000'; // Khôi phục màu chữ khi di chuột ra
  });
});
