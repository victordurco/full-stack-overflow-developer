
class InvalidQuestion extends Error {
  constructor() {
    super('Dados da questão inválidos');
    this.name = 'InvalidQuestion';
  }
}

class InvalidAnswer extends Error {
  constructor() {
    super('Dados da resposta inválidos');
    this.name = 'InvalidAnswer';
  }
}

class NonExistentQuestion extends Error {
  constructor() {
    super('Pergunta inexistente');
    this.name = 'NonExistentQuestion';
  }
}

class AlreadyAnsweredQuestion extends Error {
  constructor() {
    super('Pergunta já respondida');
    this.name = 'AlreadyAnsweredQuestion';
  }
}


export {
  InvalidQuestion,
  InvalidAnswer,
  NonExistentQuestion,
  AlreadyAnsweredQuestion
}