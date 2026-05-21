export class SignupDTO {
    constructor(formData) {
        this.firstName = formData.get('fname').trim();
        this.lastName = formData.get('lname').trim();
        this.email = formData.get('email').toLowerCase().trim();
        this.password = formData.get('password');
        this.role = formData.get("role");
    }
}