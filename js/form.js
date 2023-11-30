document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('text-color-toggle');
    const textSection = document.querySelector('section');

    function applyTheme(theme) {
        document.documentElement.style.setProperty('--the-theme', theme);
        if (theme === 'white') {
            textSection.classList.add('black-text');
            textSection.classList.remove('whitetext');
        } else {
            textSection.classList.add('whitetext');
            textSection.classList.remove('black-text');
        }
    }

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        applyTheme(savedTheme);
    }

    toggleButton.addEventListener('click', () => {
        const currentTheme = getComputedStyle(document.documentElement).getPropertyValue('--the-theme').trim();
        const newTheme = currentTheme === 'white' ? 'black' : 'white';
        applyTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    });
});



window.addEventListener('DOMContentLoaded', () => {
    let name_error = document.querySelector('output[name="nameError"]');
    let name_info = document.querySelector('output[name="nameInfo"]');
    let email_error = document.querySelector('output[name="emailError"]');
    let email_info = document.querySelector('output[name="emailInfo"]');
    let comments_error = document.querySelector('output[name="commentsError"]');
    let comments_info = document.querySelector('output[name="commentsInfo"]');

    const comments = document.getElementById('comments');

    comments.addEventListener('input', () => {
        const maxLength = comments.getAttribute('maxlength');
        const currentLength = comments.value.length;
        const infoOutput = document.querySelector('output[name="commentsInfo"]');
        infoOutput.textContent = `${maxLength - currentLength} characters remaining`;
        if (currentLength > maxLength - 10) {
            infoOutput.classList.add('warning');
        } else {
            infoOutput.classList.remove('warning');
        }
        if (currentLength === maxLength) {
            infoOutput.classList.add('error-message');
        } else {
            infoOutput.classList.remove('error-message');
        }
    });

    const name_exp = new RegExp('[a-zA-Z\- ]');
    const email_exp = new RegExp('[a-zA-Z0-9\-_.@]');
    const comment_exp = new RegExp('[a-zA-Z\- .!?\n,]');

    let form_errors = document.querySelector('input[name="form-errors"]');

    let form_errors_array = [];

    let inputs = document.querySelectorAll('input');
    let text_area = document.querySelector('textarea');
    text_area.addEventListener('input', check_input);
    for(let i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener('input', check_input);
    }
    
    document.querySelector('form').addEventListener('submit', form_submit);

    function form_submit(event) {
        console.log(event);
    }

    function check_input(event) {
        let id = event.target.id;
        if(event.target.value.length > 0) {           
            if(id === 'name') {
                if(name_exp.test(event.target.value.charAt(event.target.value.length - 1)) === false) {
                    name_error.innerHTML = `${event.target.value.charAt(event.target.value.length -1)} is not allowed！`;
                    append_error('invalid input');
                    input_error(event);
                    fade(name_error);
                }
            } 
            if (id === 'email') {
                if(email_exp.test(event.target.value.charAt(event.target.value.length - 1)) === false) {
                    email_error.innerHTML = `${event.target.value.charAt(event.target.value.length -1)} is not allowed`;
                    append_error('invalid input');
                    input_error(event);
                    fade(email_error);
                }
            }
            if (id === 'comments') {
                if(comment_exp.test(event.target.value.charAt(event.target.value.length - 1)) === false) {
                    comments_error.innerHTML = `${event.target.value.charAt(event.target.value.length -1)} is not allowed`;
                    append_error('invalid input');
                    fade(comments_error);
                    input_error(event);
                }
            }   
        }
    }

    async function input_error(event) {
        event.target.classList.add('invalid');
        await new Promise(x => setTimeout(x, 400));
        event.target.classList.remove('invalid');
        
    }

    async function fade(element) {
        element.classList.add('error-message');
        await new Promise(x => setTimeout(x, 2000));
        element.classList.remove('error-message');
        element.innerHTML = '';
    }

    function append_error(string) {
        form_errors_array.push(string);
        form_errors.value = form_errors_array;
    }
});

