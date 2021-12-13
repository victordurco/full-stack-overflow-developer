
class InvalidQuestion extends Error {
  constructor() {
    super('Dados da questão inválidos');
    this.name = 'InvalidQuestion';
  }
}

export {InvalidQuestion}