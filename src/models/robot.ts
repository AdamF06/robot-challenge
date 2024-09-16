import dotenv from 'dotenv';
import Table from 'models/table';
import {
    Direction,
    DIRECTIONS,
    MESSAGE
} from 'consts';

dotenv.config();

class Robot {
    private x: number | null = null;
    private y: number | null = null;
    private direction: Direction | null = null;
    private readonly speed: number; // use attribute 'speed' to calculate next position when execute 'MOVE' command
    private table: Table;

    // Robot's Speed can be passed as a parameter when constructing the object OR
    // configured in the .env file OR
    // use the default value 1
    constructor(speed?: number) {
        this.speed = speed || parseInt(process.env.CAR_SPEED || '1', 10); // Default speed set to 1
        this.table = Table.getInstance();
        console.log(this.speed)
    }

    place(x: number, y: number, direction: Direction): void {
        // skip command if (x,y) is an invalid position on table
        if (this.table.isValidPosition(x, y)) {
            this.x = x;
            this.y = y;
            this.direction = direction;
        }
    }

    move(): void {
        // skip command if car doesn't position or direction
        if (this.x === null || this.y === null || this.direction === null) return;

        // Define a map for direction deltas with speed
        const directionDeltas: Record<Direction, [number, number]> = {
            NORTH: [0, this.speed],
            EAST: [this.speed, 0],
            SOUTH: [0, -this.speed],
            WEST: [-this.speed, 0]
            // Could be extended with more directions e.g. NORTH-EAST: [0.7*this.speed, 0.7*this.speed]
        };

        // Get the delta for the current direction
        const [deltaX, deltaY] = directionDeltas[this.direction];

        // Calculate new positions
        const newX = this.x + deltaX;
        const newY = this.y + deltaY;

        if (this.table.isValidPosition(newX, newY)) {
            this.x = newX;
            this.y = newY;
        }
    }

    left(): void {
        // skip command if car doesn't have direction
        if (this.direction === null) return;
        const currentIndex = DIRECTIONS.indexOf(this.direction);
        const directionsCount = DIRECTIONS.length;
        this.direction = DIRECTIONS[(currentIndex + directionsCount - 1) % directionsCount];
    }

    right(): void {
        // skip command if car doesn't have direction
        if (this.direction === null) return;
        const currentIndex = DIRECTIONS.indexOf(this.direction);
        const directionsCount = DIRECTIONS.length;
        this.direction = DIRECTIONS[(currentIndex + 1) % directionsCount];
    }

    report(): string | null {
        // report error message if car doesn't have a valid position
        if (this.x === null || this.y === null || this.direction === null) return MESSAGE.ERRORS.INVALID_CAR;
        return `${this.x},${this.y},${this.direction}`;
    }
}

export default Robot;
