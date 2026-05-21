export class LoginDTO {
    constructor(formData) {
        this.email = formData.get('email').toLowerCase().trim();
        this.password = formData.get('password');
    }
}