export default class Table {
  private width: number
  private height: number

  constructor(width: number, height: number) {
    this.width = width // X-axis
    this.height = height // Y-axis
  }

  // Check if a given position is within the table bounds
  public isValidPosition(x: number, y: number): boolean {
    return x >= 0 && x < this.width && y >= 0 && y < this.height
  }
}
