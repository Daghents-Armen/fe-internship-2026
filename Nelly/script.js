import { SignupDTO } from './dto/signupDTO.js';
import { LoginDTO } from './dto/loginDTO.js';


document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab-btn');
    const contents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetId = tab.getAttribute('data-target');

            tabs.forEach(t => t.classList.remove('active'));

            contents.forEach(c => c.classList.remove('active'));

            tab.classList.add('active');
            document.getElementById(targetId).classList.add('active');
        });
    });


    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();


            const formId = form.id;
            console.log(formId);

            const formData = new FormData(form);
            var dto = "";
            if (formId === 'signup-form') {
                dto = new SignupDTO(formData);
                try {
                    const response = await fetch('http://localhost:8000/api/v1/users', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(dto)
                    });

                    const result = await response.json();
                    console.log("Server responded:", result);
                } catch (error) {
                    console.error("Connection failed:", error);
                }
            } else {
                dto = new LoginDTO(formData); try {
                    const response = await fetch('http://localhost:8000/api/v1/users/login', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(dto)
                    });

                    const result = await response.json();
                    console.log("Server responded:", result);
                } catch (error) {
                    console.error("Connection failed:", error);
                }

            }
            alert(`${dto.email}`);

        });
    });
});
