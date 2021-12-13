
class InvalidUser extends Error {
  constructor() {
    super('Dados de usuário inválidos');
    this.name = 'InvalidUser';
  }
}

export {InvalidUser}