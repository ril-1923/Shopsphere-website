/* =========================================================
   ShopSphere — Form Validation Helpers
   ========================================================= */

function isValidEmail(email){
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function isValidPhone(phone){
  return /^[0-9]{10}$/.test(phone.replace(/[\s-]/g, ""));
}
function markInvalid(el, message){
  el.classList.add("is-invalid");
  el.classList.remove("is-valid");
  const feedback = el.parentElement.querySelector(".invalid-feedback");
  if(feedback && message) feedback.textContent = message;
}
function markValid(el){
  el.classList.remove("is-invalid");
  el.classList.add("is-valid");
}

/* ---------- Checkout form ---------- */
function validateCheckoutForm(form){
  let valid = true;
  const required = ["fullName","email","phone","address","city","state","postalCode","country"];
  required.forEach(name => {
    const el = form.elements[name];
    if(!el) return;
    if(!el.value.trim()){ markInvalid(el, "This field is required"); valid = false; }
    else if(name === "email" && !isValidEmail(el.value)){ markInvalid(el, "Enter a valid email address"); valid = false; }
    else if(name === "phone" && !isValidPhone(el.value)){ markInvalid(el, "Enter a valid 10-digit phone number"); valid = false; }
    else { markValid(el); }
  });

  const payment = form.querySelector('input[name="paymentMethod"]:checked');
  if(payment && payment.value === "card"){
    ["cardNumber","cardExpiry","cardCvv"].forEach(name => {
      const el = form.elements[name];
      if(el && !el.value.trim()){ markInvalid(el, "Required for card payment"); valid = false; }
      else if(el) markValid(el);
    });
  }
  if(payment && payment.value === "upi"){
    const el = form.elements["upiId"];
    if(el && !el.value.trim()){ markInvalid(el, "Enter your UPI ID"); valid = false; }
    else if(el) markValid(el);
  }

  return valid;
}

/* ---------- Login form ---------- */
function initLoginValidation(){
  const form = document.getElementById("loginForm");
  if(!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let valid = true;
    const email = form.elements["email"];
    const password = form.elements["password"];

    if(!isValidEmail(email.value)){ markInvalid(email, "Enter a valid email address"); valid = false; }
    else markValid(email);

    if(password.value.length < 6){ markInvalid(password, "Password must be at least 6 characters"); valid = false; }
    else markValid(password);

    if(valid){
      showToast("Login successful! Redirecting...", "success");
      setTimeout(() => window.location.href = "index.html", 1200);
    } else {
      showToast("Please fix the highlighted fields", "error");
    }
  });
}

/* ---------- Register form ---------- */
function initRegisterValidation(){
  const form = document.getElementById("registerForm");
  if(!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let valid = true;
    const fullName = form.elements["fullName"];
    const email = form.elements["email"];
    const phone = form.elements["phone"];
    const password = form.elements["password"];
    const confirmPassword = form.elements["confirmPassword"];
    const terms = form.elements["terms"];

    if(!fullName.value.trim()){ markInvalid(fullName, "Full name is required"); valid = false; } else markValid(fullName);
    if(!isValidEmail(email.value)){ markInvalid(email, "Enter a valid email address"); valid = false; } else markValid(email);
    if(!isValidPhone(phone.value)){ markInvalid(phone, "Enter a valid 10-digit phone number"); valid = false; } else markValid(phone);
    if(password.value.length < 6){ markInvalid(password, "Password must be at least 6 characters"); valid = false; } else markValid(password);
    if(confirmPassword.value !== password.value || !confirmPassword.value){ markInvalid(confirmPassword, "Passwords do not match"); valid = false; } else markValid(confirmPassword);
    if(!terms.checked){ terms.classList.add("is-invalid"); valid = false; } else terms.classList.remove("is-invalid");

    if(valid){
      showToast("Account created successfully!", "success");
      setTimeout(() => window.location.href = "login.html", 1200);
    } else {
      showToast("Please fix the highlighted fields", "error");
    }
  });
}

/* ---------- Contact form ---------- */
function initContactValidation(){
  const form = document.getElementById("contactForm");
  if(!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let valid = true;
    ["name","email","subject","message"].forEach(name => {
      const el = form.elements[name];
      if(!el.value.trim()){ markInvalid(el, "This field is required"); valid = false; }
      else if(name === "email" && !isValidEmail(el.value)){ markInvalid(el, "Enter a valid email address"); valid = false; }
      else markValid(el);
    });

    if(valid){
      showToast("Message sent! We'll get back to you soon.", "success");
      form.reset();
      form.querySelectorAll(".is-valid").forEach(el => el.classList.remove("is-valid"));
    } else {
      showToast("Please fix the highlighted fields", "error");
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initLoginValidation();
  initRegisterValidation();
  initContactValidation();
});
