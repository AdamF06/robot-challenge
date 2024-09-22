# Robot Challenge

- [Description](#description)
- [Environment](#environment)
- [How To](#how-to)
  - [Setup](#setup)
  - [Run Project](#run-project)
  - [Run Tests](#run-tests)
  - [Lint](#lint)
- [Custom Configuration (Optional)](#custom-configuration-optional)
- [Some Design Decisions](#some-design-decisions)
- [Some Extra Features](#some-extra-features)
- [Dependencies](#dependencies)

## Description
This is a console application to simulate a robot running on a table.
Once the app starts, the user can input commands from the following list to control the robot:
```
PLACE X,Y,F
MOVE
LEFT
RIGHT
REPORT
```
Commands are not case-sensitive. Similar command suggestions will be provided in case the user inputs a typo.

By default, the table size is 5x5, and the robot can move 1 unit per each MOVE command. Commands that would cause the robot to fall off the table will be ignored (including the PLACE command). Unrecognized commands will be ignored as well.

The app will print a warning message if there is no robot on the table before any REPORT command.

The app will keep running unless the user types EXIT or presses 'Ctrl + C'.

User can get more explanation for each command by HELP command.

## Environment

#### **Node.js**: v20.17.0

#### **npm**: v10.8.2


## How To

### Setup

Please Install dependencies by command `npm install` before run the project

### Run Project

Build and start the project:

```
npm run build
npm start
```

Alternatively, run in development mode:

```
npm run dev
```

### Run Tests

To execute the test suite: `npm test`

### Lint

To check for linting errors: `npm run lint`

Fix Lint Errors: `npm run format`

## Custom Configuration (Optional)

### Configurable Variables

The project includes three configurable variables:

`TABLE_WIDTH`, `TABLE_HEIGHT`: Define the default size of the table.

`ROBOT_SPEED`: Specifies the robot's movement speed, e.g., whether the robot moves 1 unit or 2 units per command.

Configuration is optional. If no configuration is provided, the main program "app.ts" will use the following default values: [TABLE_WIDTH=5, TABLE_HEIGHT=5, and ROBOT_SPEED=1].

### How to Set Up Configuration:

1. Create a file named ".env" under the root path.
2. Copy the contents from the "example-env" file and paste them into your ".env" file.
3. Modify the variables with your desired values.


## Some Design Decisions
This project follows OO principles and implements the Command pattern.

### Key Components:

- **Models:**
  - **Robot**: Holds the current position and the associated `Table` object. It includes all movement functions (`move`, `left`, `right`, `place`, `report`). Before each movement, the robot checks with its `Table` object to determine if the new position is valid.
  - **Table**: Contains width and height properties and a function to determine whether a given position is valid.

- **Commands:**
  - All command objects must inherit from the abstract `Command` class and implement the `execute()` function.
  - Commands that interact with the `Robot` have a private `robot` property and perform actions by calling the robot's movement functions. Commands are **not** allowed to directly modify the robot’s position attributes to initiate movement.

- **Command Manager:**
  - Responsible for processing user input and creating the corresponding command objects.

### Project Flow

1. The user inputs commands via the console.
2. The **Command Manager** interprets the input and selects the appropriate `Command`.
3. The `Command` triggers actions on the `Robot` (e.g., movement) or executes system commands, such as `help` or displaying the help documentation.
4. Users can continue to input commands until they exit the program.

### Considerations

Although the **Command pattern** might appear redundant at first glance (e.g., `LeftCommand` and `RightCommand` simply invoke `left()` and `right()` on the robot), this design provides better scalability for future complex commands. New commands can be easily introduced by creating new concrete command classes extending `Command`. And the **Robot** never needs to concern itself with the origin of the commands or how user input is processed (e.g., `PlaceCommand`).

By unifying the command interface, it becomes easier to extend or modify the command set without altering the `Robot` class.

From an object-oriented perspective, the movement behaviors (`move`, `left`, `right`, `place`, `report`) naturally belong to the **Robot** and should not be moved into the `Command` class. If the **Robot** class were reduced to only containing properties with simple getter/setter methods, it would turn into an **anemic model**. An anemic model lacks behaviors and serves as little more than a data container, violating the principle of encapsulation in object-oriented design.

The **Command** acts as a Middle-Man, effectively decoupling the user input (invoker) from the **Robot** (receiver).


## Some Extra Features
As a console application, it typically provides a `help` command and suggestions for similar commands. In the "src/commands/system" directory, there is a "help.ts" file that represents the `help` command class, and "default.ts" serves as the fallback handler for unrecognized commands. It can recommend similar commands that the user might intend to type or print an error message if none are found.

For a better user experience, the application logs errors for invalid `PLACE` commands and when `REPORT` is invoked without a valid robot placed on the table.

To maintain smooth execution, the program will DISCARD any commands that would cause the robot to fall off the table, without logging any errors for these cases.


## Dependencies

- **dotenv**: Loads environment variables from a .env file into process.env.
- **fuse.js**: A lightweight fuzzy-search library used to suggest similar valid commands when an invalid command is entered.



