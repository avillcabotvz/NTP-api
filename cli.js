const pool = require('./src/dbConnection');
const { createUser, getUser, setUserPassword } = require('./src/users');

console.log('NANI?', process.argv);
// Get command line arguments. First 2 will be "node" and "/whatever/file/path" so take everything after that
const processArgs = process.argv.slice(2);

const usageHelp = `
Usage: node ./cli.js <command> [<args>]
Commands:
    add-user <username> <password>
    set-user-password <username> <password>
`;

function dieWrongUsage(message) {
    console.error(message);
    console.error(usageHelp);
    process.exit(1);
}

const [command, ...args] = processArgs; // First argument is command

if (!command) {
    dieWrongUsage('No command specified!');
}

async function addUserCmd(args) {
    if (args.length !== 2) {
        dieWrongUsage(`Expected 2 arguments, got ${args.length}`);
        return;
    }

    const [username, password] = args;

    const existing = await getUser(username);
    if (existing) {
        console.error('User already exists');
        process.exit(1);
    }

    await createUser(username, password);
    console.log('User created!');
    pool.end();
}

async function setUserPasswordCmd(args) {
    if (args.length !== 2) {
        dieWrongUsage(`Expected 2 arguments, got ${args.length}`);
        return;
    }

    const [username, password] = args;
    await setUserPassword(username, password);
    console.log('User password updated!');
    pool.end();
}

switch (command) {
    case 'add-user':
        addUserCmd(args);
        break;
    case 'set-user-password':
        setUserPasswordCmd(args);
        break;
    default:
        dieWrongUsage(`Unknown command ${command}`);
        break;
}