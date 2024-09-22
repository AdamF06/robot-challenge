import { Direction, DIRECTIONS } from "consts/directions"
import Table from "./table"
import { ERRORS } from "consts/messages"

export default class Robot {
  private x: number | null = null
  private y: number | null = null
  private direction: Direction | null = null
  private speed: number // use attribute 'speed' to calculate next position when execute 'MOVE' command
  private table: Table

  constructor(table: Table, speed: number) {
    this.table = table
    this.speed = speed
  }

  place(x: number, y: number, direction: Direction): void {
    // discard command if (x,y) is not a valid position
    if (this.table.isValidPosition(x, y)) {
      this.x = x
      this.y = y
      this.direction = direction
    }
  }

  isPlaced(): boolean {
    // Check if x, y, and direction are non-null and valid
    return (
      this.x !== null &&
      this.y !== null &&
      this.direction !== null &&
      this.table.isValidPosition(this.x, this.y) && // Ensure position is valid
      DIRECTIONS.includes(this.direction) // Ensure direction is valid
    )
  }

  move(): void {
    // discard command if robot hasn't been placed yet
    if (!this.isPlaced()) return

    const movement: Record<Direction, [number, number]> = {
      NORTH: [0, this.speed],
      EAST: [this.speed, 0],
      SOUTH: [0, -this.speed],
      WEST: [-this.speed, 0],
      // Could be extended with more directions e.g. NORTH-EAST: [0.7*this.speed, 0.7*this.speed]
    }

    const [deltaX, deltaY] = movement[this.direction as Direction]
    const newX = this.x! + deltaX
    const newY = this.y! + deltaY

    if (this.table.isValidPosition(newX, newY)) {
      this.x = newX
      this.y = newY
    }
  }

  left(): void {
    // discard command if robot hasn't been placed yet
    if (!this.isPlaced()) return

    const index = DIRECTIONS.indexOf(this.direction as Direction)
    this.direction =
      DIRECTIONS[(index + DIRECTIONS.length - 1) % DIRECTIONS.length]
  }

  right(): void {
    // discard command if robot hasn't been placed yet
    if (!this.isPlaced()) return

    const index = DIRECTIONS.indexOf(this.direction as Direction)
    this.direction = DIRECTIONS[(index + 1) % DIRECTIONS.length]
  }

  report(): string {
    // report error message if robot hasn't been placed yet
    if (!this.isPlaced()) {
      return ERRORS.INVALID_ROBOT
    }
    return `${this.x},${this.y},${this.direction}`
  }
}
