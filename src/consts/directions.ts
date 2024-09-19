/**
 * Please ensure the directions are arranged clockwise,
 * as this will affect the Model Robot's left() and right() logic.
 */

export const DIRECTIONS = ["NORTH", "EAST", "SOUTH", "WEST"] as const
export type Direction = (typeof DIRECTIONS)[number]

export const DIRECTION = Object.fromEntries(
  DIRECTIONS.map((dir) => [dir, dir]),
) as {
  [key in Direction]: key
}
