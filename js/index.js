document.addEventListener("DOMContentLoaded", function () {
  const product1 = document.getElementById("product1");
  const product2 = document.getElementById("product2");
  const product3 = document.getElementById("product3");
  const product4 = document.getElementById("product4");
  const product5 = document.getElementById("product5");
  const product6 = document.getElementById("product6");
  const product7 = document.getElementById("product7");
  const product8 = document.getElementById("product8");
  const product9 = document.getElementById("product9");

  const totalElement = document.getElementById("total-price");
  const discountElement = document.getElementById("discount");
  const netTotalElement = document.getElementById("net-total");
  const makePurchaseButton = document.getElementById("make-purchase");
  const couponButton = document.getElementById("coupon-btn");
  const couponInput = document.getElementById("coupon-code");
  const modal = document.getElementById("purchase-modal");
  const goHome = document.getElementById("goHome");
  const closeBtn = document.querySelector(".close");

  makePurchaseButton.addEventListener("click", () => {
    modal.style.display = "block";
  });

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });
  window.addEventListener("click", () => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
  goHome.addEventListener("click", () => {
    selectedProducts.length = 0;
    couponInput.value = "";
    totalElement.textContent = "Total price: 0.00TK";
    discountElement.textContent = "Discount : 0.00TK";
    netTotalElement.textContent = "Total: 0.00 TK";
    modal.style.display = "none";
  });

  const productDetails = [
    product1,
    product2,
    product3,
    product4,
    product5,
    product6,
    product7,
    product8,
    product9,
  ];

  const selectedProducts = [];

  productDetails.forEach((product) => {
    const priceTag = product.querySelector("p:nth-of-type(2)");
    const nameTag = product.querySelector("p:nth-of-type(1)");
    product.addEventListener("click", () => {
      const productName = nameTag.textContent;
      const productPrice = parseFloat(priceTag.textContent);

      const selectedProduct = selectedProducts.find(
        (item) => item.name === productName
      );

      if (selectedProduct) {
        selectedProduct.quantity++;
      } else {
        selectedProducts.push({
          name: productName,
          price: productPrice,
          quantity: 1,
        });
      }

      updatePriceSection();
    });
  });

  couponButton.addEventListener("click", () => {
    updatePriceSection();
  });

  function updatePriceSection() {
    let totalPrice = 0;

    selectedProducts.forEach((product) => {
      totalPrice += product.price * product.quantity;
    });

    totalElement.textContent = `Total price: ${totalPrice.toFixed(2)}TK`;

    const couponCode = couponInput.value;
    const discount =
      couponCode === "SELL200" && totalPrice > 200 ? totalPrice * 0.2 : 0;
    discountElement.textContent = `Discount: ${discount.toFixed(2)}TK`;
    const totalAmount = totalPrice - discount;
    netTotalElement.textContent = `Total: ${totalAmount.toFixed(2)}TK`;
    makePurchaseButton.disabled = totalAmount <= 0;
    couponButton.disabled = totalAmount < 200;
  }
});
