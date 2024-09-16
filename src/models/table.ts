class Table {
    private static instance: Table;
    private readonly width: number;
    private readonly height: number;

    private constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }

    // Static method to get the single instance of the class
    // Default table size is 5x5
    public static getInstance(width: number = 5, height: number = 5): Table {
        if (!Table.instance) {
            Table.instance = new Table(width, height);
        }
        return Table.instance;
    }

    // Method to check if a given position is within the table bounds
    public isValidPosition(x: number, y: number): boolean {
        return x >= 0 && x < this.width && y >= 0 && y < this.height;
    }

}

export default Table;
