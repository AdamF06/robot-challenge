import Robot from "models/robot"
import Table from "models/table"
import { ERRORS } from "consts/messages"
import { DIRECTION } from "consts/directions"

describe("Robot Class", () => {
  let table: Table
  let robot: Robot

  beforeEach(() => {
    table = new Table(5, 5)
    robot = new Robot(table, 1)
  })

  test("should not move or turn before PLACE command", () => {
    robot.move()
    robot.left()
    robot.right()
    expect(robot.report()).toBe(ERRORS.INVALID_ROBOT)
  })

  test("should place robot correctly", () => {
    robot.place(0, 0, DIRECTION.NORTH)
    expect(robot.report()).toBe(`0,0,${DIRECTION.NORTH}`)
  })

  test("should ignore invalid PLACE positions", () => {
    robot.place(5, 5, DIRECTION.NORTH)
    expect(robot.report()).toBe(ERRORS.INVALID_ROBOT)
  })

  test("should move robot forward", () => {
    robot.place(0, 0, DIRECTION.NORTH)
    robot.move()
    expect(robot.report()).toBe(`0,1,${DIRECTION.NORTH}`)
    robot.move()
    expect(robot.report()).toBe(`0,2,${DIRECTION.NORTH}`)
    robot.move()
    expect(robot.report()).toBe(`0,3,${DIRECTION.NORTH}`)
    robot.move()
    expect(robot.report()).toBe(`0,4,${DIRECTION.NORTH}`)
  })

  test("should not move robot off the table", () => {
    robot.place(0, 4, DIRECTION.NORTH)
    robot.move()
    expect(robot.report()).toBe(`0,4,${DIRECTION.NORTH}`)
  })

  test("should turn robot left", () => {
    robot.place(0, 0, DIRECTION.NORTH)
    robot.left()
    expect(robot.report()).toBe(`0,0,${DIRECTION.WEST}`)
    robot.left()
    expect(robot.report()).toBe(`0,0,${DIRECTION.SOUTH}`)
    robot.left()
    expect(robot.report()).toBe(`0,0,${DIRECTION.EAST}`)
    robot.left()
    expect(robot.report()).toBe(`0,0,${DIRECTION.NORTH}`)
  })

  test("should turn robot right", () => {
    robot.place(0, 0, DIRECTION.NORTH)
    robot.right()
    expect(robot.report()).toBe(`0,0,${DIRECTION.EAST}`)
    robot.right()
    expect(robot.report()).toBe(`0,0,${DIRECTION.SOUTH}`)
    robot.right()
    expect(robot.report()).toBe(`0,0,${DIRECTION.WEST}`)
    robot.right()
    expect(robot.report()).toBe(`0,0,${DIRECTION.NORTH}`)
  })

  test("should handle a sequence of commands", () => {
    robot.place(1, 2, DIRECTION.EAST)
    robot.move()
    robot.move()
    robot.left()
    robot.move()
    expect(robot.report()).toBe(`3,3,${DIRECTION.NORTH}`)
  })

  test("Should skip commands that let the car fall, then continue with the following commands.", () => {
    robot.place(4, 4, DIRECTION.NORTH)
    robot.move() // should be ignored
    robot.move() // should be ignored
    robot.left() // (4, 4, EAST)
    robot.move() // (3, 4, EAST)
    robot.left() // (3, 4, SOUTH)
    robot.move() // (3, 3, SOUTH)
    expect(robot.report()).toBe(`3,3,${DIRECTION.SOUTH}`)

    robot.place(5, 5, DIRECTION.NORTH) // should be ignored
    expect(robot.report()).toBe(`3,3,${DIRECTION.SOUTH}`)

    robot.place(0, 0, DIRECTION.EAST) // replace
    robot.move()
    robot.move()
    expect(robot.report()).toBe(`2,0,${DIRECTION.EAST}`)
  })
})
