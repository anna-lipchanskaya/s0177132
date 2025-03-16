document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const submitButton = form.querySelector('input[type="submit"]');
    let controller = new AbortController();

    form.addEventListener("submit", async function (event) {
        event.preventDefault();
        clearErrors();
        
        let isValid = true;
        
        const nameInput = form.querySelector('input[name="name"]');
        const namePattern = /^[А-Яа-яЁёA-Za-z\-\s]+$/;
        if (!namePattern.test(nameInput.value.trim())) {
            showError(nameInput, "Введите корректное ФИО (только буквы, пробелы и дефисы).");
            isValid = false;
        }

        const phoneInput = form.querySelector('input[name="phone"]');
        const phonePattern = /^\+?[0-9]{10,15}$/;
        if (!phonePattern.test(phoneInput.value.trim())) {
            showError(phoneInput, "Введите корректный номер телефона.");
            isValid = false;
        }

        const emailInput = form.querySelector('input[name="email"]');
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailInput.value.trim())) {
            showError(emailInput, "Введите корректный email.");
            isValid = false;
        }
        
        const companyInput = form.querySelector('input[name="company"]');
        const companyPattern = /^[А-Яа-яA-Za-z0-9\-\s]+$/;
        if (!companyPattern.test(companyInput.value.trim())) {
            showError(companyInput, "Введите корректное название организации.");
            isValid = false;
        }

        const birthdateInput = form.querySelector('input[name="birthdate"]');
        const birthdatePattern = /^\d{4}-\d{2}-\d{2}$/;
        if (!birthdateInput.value && !birthdatePattern.test(birthdateInput.value.trim())) {
            showError(birthdateInput, "Выберите дату рождения.");
            isValid = false;
        }
        
        const genderInputs = form.querySelectorAll('input[name="gender"]');
        let genderValue = Array.from(genderInputs).find(input => input.checked)?.value;
        if (!["male", "female"].includes(genderValue)) {
            showError(genderInputs[0], "Выберите корректный пол.");
            isValid = false;
        }

        const languageSelect = form.querySelector('select[name="love-language[]"]');
        const allowedLanguages = ["Pascal", "C", "C++", "JavaScript", "PHP", "Python", "Java", "Haskell", "Clojure", "Prolog", "Scala"];
        const selectedLanguages = Array.from(languageSelect.selectedOptions).map(option => option.value);
        if (selectedLanguages.length === 0 || !selectedLanguages.every(lang => allowedLanguages.includes(lang))) {
            showError(languageSelect, "Выберите хотя бы один допустимый язык программирования.");
            isValid = false;
        }

        const biographyInput = form.querySelector('textarea[name="biography"]');
        if (biographyInput.value.trim().length < 10) {
            showError(biographyInput, "Введите хотя бы 10 символов в биографии.");
            isValid = false;
        }

        const agreementInput = form.querySelector('input[name="agreement"]');
        if (!agreementInput.checked) {
            showError(agreementInput, "Вы должны согласиться с контрактом.");
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

        setTimeout(async () => {
            const formData = new FormData(form);
            try {
                const response = await fetch(form.action, {
                    method: "POST",
                    body: formData,
                    signal: controller.signal,
                        headers: {
        "Accept": "application/json"
    }
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
        }, 2000); // Задержка перед отправкой в 2 секунды
    });

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
