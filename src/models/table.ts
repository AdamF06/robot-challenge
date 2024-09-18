import dotenv from "dotenv"

dotenv.config()

class Table {
  private static instance: Table
  private readonly width: number
  private readonly height: number

  private constructor(width: number, height: number) {
    this.width = width // X-axis
    this.height = height // Y-axis
  }

  // Static method to get the single instance of the class
  // The size of the table can be passed as a parameter when constructing the object OR
  // configured in the .env file OR
  // use the default value 5x5
  public static getInstance(width?: number, height?: number): Table {
    if (!Table.instance) {
      const tableWidth = width || parseInt(process.env.TABLE_WIDTH || "5", 10)
      const tableHeight =
        height || parseInt(process.env.TABLE_HEIGHT || "5", 10)
      Table.instance = new Table(tableWidth, tableHeight)
    }
    return Table.instance
  }

  // Method to check if a given position is within the table bounds
  public isValidPosition(x: number, y: number): boolean {
    return x >= 0 && x < this.width && y >= 0 && y < this.height
  }
}

export default Table
