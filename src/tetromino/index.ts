export interface TetrimonoContract {
  getPoints(): number;
}

export class TetrimonoDecorator implements TetrimonoContract {
  private tetrimono: TetrimonoContract;

  constructor(tetrimono: TetrimonoContract) {
    this.tetrimono = tetrimono;
  }

  public getPoints(): number {
    return this.tetrimono.getPoints();
  }
}

export class SuperTetrimono extends TetrimonoDecorator {
  constructor(tetrimono: TetrimonoContract) {
    super(tetrimono);
  }

  public getPoints(): number {
    return 4 * 2;
  }
}
