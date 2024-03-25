function checkEmptyCart() {
    var cartItems = document.querySelectorAll(".book");
    var cart = document.getElementById("cart");
    if (cartItems.length === 0) {
        var emptyMessage = document.createElement("p");
        emptyMessage.textContent = "Giỏ hàng của bạn đang trống!";
        cart.appendChild(emptyMessage);
    } else {
        // Nếu có sản phẩm trong giỏ hàng thì xóa thông điệp nếu có
        var emptyMessage = cart.querySelector("p");
        if (emptyMessage) {
            cart.removeChild(emptyMessage);
        }
    }
}

var sum_all = 0;

function displayCartItems() {
    var cart = document.getElementById("cart");
    cart.innerHTML = ""; // Xóa các sản phẩm hiện có trên trang trước khi hiển thị sản phẩm mới

    var n = localStorage.getItem("cartCount");

    for (var i = 0; i < n; i++) {
        // Lấy thông tin sản phẩm từ Local Storage
        var productName = localStorage.getItem("productName" + i);
        var productPrice = parseInt(localStorage.getItem("productPrice" + i)); // Chuyển đổi thành số nguyên
        var productImage = localStorage.getItem("productImage" + i);
        var quantity = parseInt(localStorage.getItem("quantity" + i)); // Chuyển đổi thành số nguyên

        if (productName && !isNaN(productPrice) && productImage && !isNaN(quantity)) {
            // Tạo một phần tử HTML để hiển thị thông tin sản phẩm trong giỏ hàng
            var cartItem = document.createElement("div");
            cartItem.classList.add("book");

            var image = document.createElement("img");
            image.src = productImage;
            image.alt = productName;
            cartItem.appendChild(image);

            var title = document.createElement("h3");
            title.textContent = productName;
            cartItem.appendChild(title);

            var price = document.createElement("p");
            price.textContent = "Giá: $" + productPrice;
            cartItem.appendChild(price);

            var quantityDisplay = document.createElement("p");
            quantityDisplay.textContent = "Số lượng: " + quantity;
            cartItem.appendChild(quantityDisplay);

            var deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Xóa";
            deleteBtn.classList.add("delete-btn");
            cartItem.appendChild(deleteBtn);

            // Thêm phần tử sản phẩm vào danh sách đơn hàng trên trang giohang.html
            cart.appendChild(cartItem);

            // Cập nhật tổng số tiền
            sum_all += productPrice * quantity;

            deleteBtn.addEventListener("click",createDeleteHandler(cartItem,productPrice,quantity));
        }
    }
    checkEmptyCart(); // Kiểm tra giỏ hàng trống
    updateTotalAmount(); // Cập nhật tổng số tiền
}


// Đợi cho trang được tải hoàn toàn
document.addEventListener("DOMContentLoaded", function () {
    var checkoutBtn = document.getElementById("checkout-btn");
    var totalAmountElement = document.getElementById("total-amount");

    checkoutBtn.addEventListener("click", function () {
        var cartItems = document.querySelectorAll(".book");
        if (cartItems.length === 0) {
            alert("Giỏ hàng trống !");
        } else {
            sum_all=parseInt(totalAmountElement.textContent.replace("Thanh Toán: $", ""));
            alert("Đã thanh toán thành công!\nTổng số tiền là: $" + sum_all);
            localStorage.clear();
            sum_all = 0; // Đặt tổng số tiền về 0
            cartItems.forEach(function (cartItem) {
                cartItem.remove();
            });
            updateTotalAmount();
            checkEmptyCart();
        }
    });

    function updateTotalAmount() {
        totalAmountElement.textContent = "Thanh Toán: $" + sum_all;
    }

    updateTotalAmount();
    var removeBtn = document.getElementById("remove-btn");
    removeBtn.addEventListener("click", function () {
        // Xóa thông tin sản phẩm từ Local Storage
        localStorage.clear();
        sum_all = 0; // Đặt tổng số tiền về 0
        updateTotalAmount(); // Cập nhật tổng số tiền
        // Xóa tất cả phần tử sản phẩm khỏi danh sách đơn hàng trên trang giohang.html
        var cartItems = document.querySelectorAll(".book");
        cartItems.forEach(function (cartItem) {
            cartItem.remove();
        });
        displayCartItems();
    });
});

function createDeleteHandler(item, price,quantity) {
    return function () {
        var index = Array.from(cart.children).indexOf(item); // Xác định chỉ mục của phần tử sản phẩm
        // Xóa thông tin sản phẩm từ Local Storage
        localStorage.removeItem("productName" + index);
        localStorage.removeItem("productPrice" + index);
        localStorage.removeItem("productImage" + index);
        localStorage.removeItem("quantity" + index);
        // Cập nhật tổng số tiền sau khi xóa sản phẩm
        updateTotalAmountAfterDelete(price*quantity);
        // Xóa phần tử sản phẩm khỏi danh sách đơn hàng trên trang giohang.html
        cart.removeChild(item);
        checkEmptyCart(); // Kiểm tra giỏ hàng trống sau khi xóa sản phẩm
    };
}

function updateTotalAmountAfterDelete(price) {
    var totalAmountElement = document.getElementById("total-amount");
    var currentTotal = parseInt(totalAmountElement.textContent.replace("Thanh Toán: $", ""));
    var newTotal = currentTotal - price;
    totalAmountElement.textContent = "Thanh Toán: $" + newTotal;
}

function findProductIndex(productName) {
    var cartCount = parseInt(localStorage.getItem("cartCount")) || 0;
    for (var i = 0; i < cartCount; i++) {
        var name = localStorage.getItem("productName" + i);
        if (name === productName) {
            return i; // Trả về chỉ mục của sản phẩm trong giỏ hàng
        }
    }
    return -1; // Trả về -1 nếu sản phẩm không tồn tại trong giỏ hàng
}

function addtocart1() {
    var productName = "Ế có lý do";
    var productPrice = 20;
    var productImage = "94786.jpg";
    var quantity = parseInt(document.getElementById("quantity1").value);

    var totalPrice = quantity * productPrice;

    var cartCount = parseInt(localStorage.getItem("cartCount")) || 0;

    // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
    var existingProductIndex = findProductIndex(productName);
    if (existingProductIndex === -1) {
        // Sản phẩm chưa tồn tại trong giỏ hàng, thêm vào
        localStorage.setItem("productName" + cartCount, productName);
        localStorage.setItem("productPrice" + cartCount, totalPrice);
        localStorage.setItem("productImage" + cartCount, productImage);
        localStorage.setItem("quantity" + cartCount, quantity);
        localStorage.setItem("cartCount", cartCount + 1);
    } else {
        // Sản phẩm đã tồn tại, cập nhật số lượng
        var existingQuantity = parseInt(localStorage.getItem("quantity" + existingProductIndex));
        localStorage.setItem("quantity" + existingProductIndex, existingQuantity + quantity);
    }

    alert("Đã thêm vào giỏ hàng");

    sum_all += totalPrice; // Cập nhật tổng số tiền
    updateTotalAmount();
    checkEmptyCart();
}

function addtocart2() {
    var productName = "Con tao giàu lắm";
    var productPrice = 15;
    var productImage = "maxresdefault.jpg";
    var quantity = parseInt(document.getElementById("quantity2").value);

    var totalPrice = quantity * productPrice;

    var cartCount = parseInt(localStorage.getItem("cartCount")) || 0;
    
    // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
    var existingProductIndex = findProductIndex(productName);
    if (existingProductIndex === -1) {
        // Sản phẩm chưa tồn tại trong giỏ hàng, thêm vào
        localStorage.setItem("productName" + cartCount, productName);
        localStorage.setItem("productPrice" + cartCount, totalPrice);
        localStorage.setItem("productImage" + cartCount, productImage);
        localStorage.setItem("quantity" + cartCount, quantity);
        localStorage.setItem("cartCount", cartCount + 1);
    } else {
        // Sản phẩm đã tồn tại, cập nhật số lượng
        var existingQuantity = parseInt(localStorage.getItem("quantity" + existingProductIndex));
        localStorage.setItem("quantity" + existingProductIndex, existingQuantity + quantity);
    }
    
    alert("Đã thêm vào giỏ hàng");
    
    sum_all += totalPrice; // Cập nhật tổng số tiền
    updateTotalAmount();
    checkEmptyCart();
    }
    


// Gọi hàm hiển thị sản phẩm trong giỏ hàng khi tải trang
displayCartItems();