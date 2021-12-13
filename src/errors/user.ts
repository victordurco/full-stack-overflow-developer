
class InvalidUser extends Error {
  constructor() {
    super('Dados de usuário inválidos');
    this.name = 'InvalidUser';
  }
}

class NonExistentUser extends Error {
    constructor() {
    super('Usuário não é cadastrado');
    this.name = 'NonExistentUser';
  }
}

export {InvalidUser, NonExistentUser}