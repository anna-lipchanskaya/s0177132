document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const submitButton = form.querySelector('input[type="submit"]');
    let controller = new AbortController();

    form.addEventListener("submit", async function (event) {
        event.preventDefault();
        clearErrors();

        let isValid = true;
        const requiredFields = form.querySelectorAll("input:not([type=submit]):not([type=radio]):not([type=checkbox])[required], textarea[required], select[required]");

        requiredFields.forEach((field) => {
            if (field.value.trim() === "") {
                showError(field, "Это поле обязательно для заполнения.");
                isValid = false;
            }
        });

        const emailInput = form.querySelector('input[name="field-email"]');
        if (emailInput && !validateEmail(emailInput.value)) {
            showError(emailInput, "Введите корректный email.");
            isValid = false;
        }

        if (!isValid) return;

        submitButton.disabled = true;

        if (!document.querySelector(".cancel-button")) {
            let cancelButton = document.createElement("button");
            cancelButton.textContent = "Отмена";
            cancelButton.classList.add("cancel-button");
            form.appendChild(cancelButton);

            cancelButton.addEventListener("click", function () {
                controller.abort();
                showErrorMessage("Отправка отменена пользователем.");
                resetForm();
            });
        }

        controller = new AbortController();

        const formData = new FormData(form);
        try {
            const response = await fetch("https://formcarry.com/s/c6CJZmuoM7t", {
                method: "POST",
                body: formData,
                signal: controller.signal,
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
            resetForm();
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

