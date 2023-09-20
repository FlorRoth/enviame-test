const User = require('../entities/user');


class ManageUsersUsecase {

  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }

  async getUsers() {
    return await this.usersRepository.getUsers();
  }
  async getUsersSeller() {
    return await this.usersRepository.getUsersSeller();
  }
  async getUsersBuyer() {
    return await this.usersRepository.getUsersBuyer();
  }

  async getUser(id) {
    return await this.usersRepository.getUser(id);
  }

  async getUserEmail(email) {
    return await this.usersRepository.getUserEmail(email);
  }

  async createUser(data) {
    
    const user = new User(undefined, data.name, data.email, data.password,data.is_admin)
    const id = await this.usersRepository.createUser(user);
    user.id = id;

    return user;

  }

  async updateUser(id, data) {

    const user = new User(id, data.name, data.email, data.password,data.is_admin);
    await this.usersRepository.updateUser(user);

    return user;

  }

  async deleteUser(id) {
    await this.usersRepository.deleteUser(id);
  }

}

module.exports = ManageUsersUsecase;