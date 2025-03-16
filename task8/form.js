document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const submitButton = form.querySelector('input[type="submit"]');
  let controller = new AbortController(); // Контроллер для отмены запроса

  form.addEventListener("submit", async function (event) {
    event.preventDefault(); // Остановка стандартной отправки
    clearErrors(); // Очистка ошибок

    let isValid = true;
    const requiredFields = form.querySelectorAll("input[required], textarea[required]");

    // Валидация обязательных полей
    requiredFields.forEach((field) => {
      if (field.value.trim() === "") {
        showError(field, "Это поле обязательно для заполнения.");
        isValid = false;
      }
    });

    // Дополнительная проверка email
    const emailInput = form.querySelector('input[name="field-email"]');
    if (emailInput && !validateEmail(emailInput.value)) {
      showError(emailInput, "Введите корректный email.");
      isValid = false;
    }

    if (!isValid) return; // Если есть ошибки, прерываем отправку

    // Деактивация кнопки отправки и создание кнопки отмены
    submitButton.disabled = true;
    let cancelButton = document.createElement("button");
    cancelButton.textContent = "Отмена";
    cancelButton.classList.add("cancel-button");
    form.appendChild(cancelButton);

    controller = new AbortController(); // Новый контроллер отмены

    cancelButton.addEventListener("click", function () {
      controller.abort(); // Отмена запроса
      showErrorMessage("Отправка отменена пользователем.");
      resetForm();
    });

    // Отправка данных
    const formData = new FormData(form);
    try {
      const response = await fetch("https://formcarry.com/s/c6CJZmuoM7t", {
        method: "POST",
        body: formData,
        signal: controller.signal, // Привязка к контроллеру
      });

      const result = await response.json();

      if (response.ok) {
        showSuccess("Форма успешно отправлена!");
        form.reset();
      } else {
        showErrorMessage("Ошибка: " + result.message);
      }
    } catch (error) {
      if (error.name === "AbortError") {
        showErrorMessage("Запрос был отменён.");
      } else {
        console.error("Ошибка сети:", error);
        showErrorMessage("Ошибка сети. Попробуйте позже.");
      }
    } finally {
      resetForm(); // Сброс состояния формы
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

  function resetForm() {
    submitButton.disabled = false;
    document.querySelector(".cancel-button")?.remove();
  }
});
