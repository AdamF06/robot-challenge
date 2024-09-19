import Table from "models/table"

describe("Table Class", () => {
  let table: Table

  beforeEach(() => {
    table = new Table(5, 5)
  })

  test("should validate positions correctly", () => {
    expect(table.isValidPosition(0, 0)).toBe(true)
    expect(table.isValidPosition(4, 4)).toBe(true)
    expect(table.isValidPosition(5, 5)).toBe(false)
    expect(table.isValidPosition(-1, -1)).toBe(false)
  })
})
