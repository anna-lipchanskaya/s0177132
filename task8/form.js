document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const emailInput = form.querySelector('input[name="email"]');
  const messageInput = form.querySelector('textarea[name="message"]');

  form.addEventListener("submit", async function (event) {
    event.preventDefault(); // Останавливаем стандартную отправку

    clearErrors(); // Удаляем старые ошибки

    let isValid = true;

    // Проверка email
    if (!validateEmail(emailInput.value)) {
      showError(emailInput, "Введите корректный email.");
      isValid = false;
    }

    // Проверка сообщения
    if (messageInput.value.trim() === "") {
      showError(messageInput, "Поле сообщения не может быть пустым.");
      isValid = false;
    }

    if (!isValid) return; // Если есть ошибки, форма не отправляется

    // Если валидация успешна, отправляем форму
    const formData = new FormData(form);

    try {
      const response = await fetch("https://formcarry.com/s/c6CJZmuoM7t", {
        method: "POST",
        body: formData,
      });

      const result = await response.json(); // Парсим ответ

      if (response.ok) {
        showSuccess("Форма успешно отправлена!"); // Сообщение об успехе
        form.reset(); // Очищаем форму
      } else {
        showErrorMessage("Ошибка при отправке формы: " + result.message);
      }
    } catch (error) {
      console.error("Ошибка сети:", error);
      showErrorMessage("Ошибка сети. Попробуйте позже.");
    }
  });

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function showError(input, message) {
    const errorElement = document.createElement("div");
    errorElement.classList.add("error-message");
    errorElement.textContent = message;
    input.parentNode.appendChild(errorElement);
    input.classList.add("error-border");
  }

  function showErrorMessage(message) {
    const errorContainer = document.createElement("div");
    errorContainer.classList.add("error-message");
    errorContainer.textContent = message;
    form.appendChild(errorContainer);
  }

  function showSuccess(message) {
    const successContainer = document.createElement("div");
    successContainer.classList.add("success-message");
    successContainer.textContent = message;
    form.appendChild(successContainer);
  }

  function clearErrors() {
    document.querySelectorAll(".error-message").forEach((el) => el.remove());
    document.querySelectorAll(".error-border").forEach((el) => el.classList.remove("error-border"));
  }
});
