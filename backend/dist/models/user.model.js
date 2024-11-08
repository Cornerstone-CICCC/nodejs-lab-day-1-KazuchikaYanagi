"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
class UserModel {
    constructor() {
        this.users = [
            {
                id: (0, uuid_1.v4)(),
                username: "John Smith",
                password: "pass1234",
                firstname: "John",
                lastname: "Smith",
            },
        ];
    }
    //   Get all users
    findAll() {
        return this.users;
    }
    //   Get user by id
    findById(id) {
        const user = this.users.find((user) => user.id === id);
        if (!user)
            return undefined;
        return user;
    }
    //  Check user and pw
    findByUsername(username) {
        const user = this.users.find((user) => user.username === username);
        if (user)
            return user;
        return undefined;
    }
    //   Create user
    create(newUser) {
        const user = Object.assign({ id: (0, uuid_1.v4)() }, newUser);
        this.users.push(user);
        return user;
    }
    //   Edit user
    update(id, newData) {
        const index = this.users.findIndex((user) => user.id === id);
        if (index === -1)
            return undefined;
        const updatedUser = Object.assign(Object.assign({}, this.users[index]), newData);
        this.users[index] = updatedUser;
        return updatedUser;
    }
    //   Delete user
    delete(id) {
        const index = this.users.findIndex((user) => user.id === id);
        if (index === -1)
            return false;
        this.users.splice(index, 1);
        return true;
    }
}
exports.default = new UserModel();
