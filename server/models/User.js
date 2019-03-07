class User {
    constructor(id, firstName, lastName, email, password, confirmed, isAdmin, createdOn) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.confirmed = confirmed;
        this.isAdmin = isAdmin;
        this.createdOn = createdOn;
    }
}

export default User;
