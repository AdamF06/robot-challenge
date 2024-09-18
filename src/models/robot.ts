import { Direction, DIRECTIONS } from "consts/directions"
import Table from "./table"
import { ERRORS } from "consts/messages"
import { Logger } from "utils/logger"

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
    if (this.table.isValidPosition(x, y)) {
      this.x = x
      this.y = y
      this.direction = direction
    } else {
      Logger.error(ERRORS.INVALID_PLACE_COMMAND)
    }
  }

  move(): void {
    // skip command if car doesn't position or direction
    if (this.x === null || this.y === null || this.direction === null) return

    const movement: Record<Direction, [number, number]> = {
      NORTH: [0, this.speed],
      EAST: [this.speed, 0],
      SOUTH: [0, -this.speed],
      WEST: [-this.speed, 0],
      // Could be extended with more directions e.g. NORTH-EAST: [0.7*this.speed, 0.7*this.speed]
    }

    const [deltaX, deltaY] = movement[this.direction]
    const newX = this.x + deltaX
    const newY = this.y + deltaY

    if (this.table.isValidPosition(newX, newY)) {
      this.x = newX
      this.y = newY
    }
  }

  left(): void {
    // skip command if car doesn't have direction
    if (this.direction === null) return

    const index = DIRECTIONS.indexOf(this.direction)
    this.direction =
      DIRECTIONS[(index + DIRECTIONS.length - 1) % DIRECTIONS.length]
  }

  right(): void {
    // skip command if car doesn't have direction
    if (this.direction === null) return

    const index = DIRECTIONS.indexOf(this.direction)
    this.direction = DIRECTIONS[(index + 1) % DIRECTIONS.length]
  }

  report(): string {
    // report error message if car doesn't have a valid position
    if (this.x === null || this.y === null || this.direction === null) {
      return ERRORS.INVALID_ROBOT
    }
    return `${this.x},${this.y},${this.direction}`
  }
}
