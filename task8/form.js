document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const emailInput = form.querySelector('input[name="email"]');
  const messageInput = form.querySelector('textarea[name="message"]');

  form.addEventListener("submit", async function (event) {
    event.preventDefault(); // Останавливаем стандартную отправку

    // Удаляем старые сообщения об ошибках
    clearErrors();

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

    if (!isValid) return; // Если есть ошибки, прерываем отправку

    // Если валидация пройдена, отправляем данные
    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: formData,
      });

      if (response.ok) {
        alert("Форма успешно отправлена!");
        form.reset(); // Очищаем форму
      } else {
        alert("Ошибка при отправке формы.");
      }
    } catch (error) {
      console.error("Ошибка:", error);
      alert("Ошибка сети.");
    }
  });

  // Функция валидации email
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  // Функция показа ошибки
  function showError(input, message) {
    const errorElement = document.createElement("div");
    errorElement.classList.add("error-message");
    errorElement.textContent = message;
    input.parentNode.appendChild(errorElement);
    input.classList.add("error-border");
  }

  // Функция очистки ошибок
  function clearErrors() {
    document.querySelectorAll(".error-message").forEach((el) => el.remove());
    document.querySelectorAll(".error-border").forEach((el) => el.classList.remove("error-border"));
  }
});
