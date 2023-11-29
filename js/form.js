document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const email = document.getElementById('email');
    const comments = document.getElementById('comments');
    let formErrors = []; 


    form.addEventListener('submit', (event) => {
        if (!form.checkValidity()) {
            event.preventDefault();

            const formErrorsJson = JSON.stringify(formErrors);

            const hiddenInput = document.createElement('input');
            hiddenInput.type = 'hidden';
            hiddenInput.name = 'form-errors';
            hiddenInput.value = formErrorsJson;

  
            form.appendChild(hiddenInput);
            form.submit();
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const modeChange = document.getElementById("mode");
    const theme = localStorage.getItem("theme");
    if (theme) {
        document.body.classList.add(theme);
        modeChange.textContent = theme === "dark" ? "mode 1" : "mode 2";
    }
    modeChange.onclick = () => {
        document.body.classList.toggle("dark");
        const updatedTheme = document.body.classList.contains("dark") ? "dark" : "light";
        localStorage.setItem("theme", updatedTheme);
        modeChange.textContent = updatedTheme === "dark" ? "mode 1" : "mode 2";
    };
});

