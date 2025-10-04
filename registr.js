document.addEventListener('DOMContentLoaded', function () {
            const inputs = document.querySelectorAll('input');

            inputs.forEach(input => {
                if (input.value !== '') {
                    input.classList.add('filled');
                }


                input.addEventListener('blur', function () {
                    if (this.value !== '') {
                        this.classList.add('filled');
                    } else {
                        this.classList.remove('filled');
                    }
                });
            });

            const form = document.querySelector('form');
            form.addEventListener('submit', function (e) {
                let valid = true;
                const password = document.querySelector('input[type="password"]');

                if (password.value.length < 6) {
                    alert('La contraseña debe tener al menos 6 caracteres');
                    valid = false;
                }

                if (!valid) {
                    e.preventDefault();
                }
            });
        });