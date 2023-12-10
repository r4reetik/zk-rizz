// PostgreSQL database connection
const { pg } = require("./db/connection");
const { match } = require("./matcher/matcher");

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const Traits = {
    art: 0,
    basketball: 1,
    blockchain: 2,
    bookworm: 3,
    carroms: 4,
    chess: 5,
    cricket: 6,
    dance: 7,
    foodie: 8,
    football: 9,
    gamer: 10,
    hackathons: 11,
    humourous: 12,
    lgbtq: 13,
    movies: 14,
    music: 15,
    photography: 16,
    puzzles: 17,
    traveler: 18,
    weeb: 19,
};
// Function to fetch and process data
async function fetchData() {
    const data = await pg.select("*").from("traits").where("status", false);
    if (!data || data.length < 1) {
        console.log("failed to get records");
        return nil;
    }
    return data;
}

// Function to process the response
async function processResponse(data) {
    // Implement your data processing logic here
    let blue = new Map();
    let yellow = new Map();
    let i = 0,
        j = 0;
    for (user of data) {
        if (user.mine_gender == 0) {
            yellow.set(i, user);
            i++;
        } else {
            blue.set(j, user);
            j++;
        }
    }
    console.log(yellow.size, blue.size, "233");
    (i = 0), (j = 0);
    let matrix = Array.from({ length: blue.size }, () =>
        new Array(yellow.size).fill(0)
    );
    let side = new Map();
    for (let [key1, value1] of blue) {
        for (let [key2, value2] of yellow) {
            console.log(value1, value2);
            let score1 = await getMatch(value1, value2);
            let score2 = await getMatch(value2, value1);
            console.log(score1, score2, key1, key2, matrix);
            let score = 0;
            if (score1 > score2) {
                side.set(key1.toString() + "," + key2.toString(), true);
                score = score1;
            } else {
                side.set(key1.toString() + "," + key2.toString(), false);
                score = score2;
            }
            side.set(key1.toString() + "," + key2.toString());
            matrix[key1][key2] = score;
        }
    }
    let blues = new Array(blue.length).fill(false);
    let yellows = new Array(yellow.length).fill(false);

    let pk = process.env.pk;
    let conAddr = process.env.conAddr;
    let rpc = process.env.rpc;

    let pairs = PairsWithDescendingValues(matrix);
    console.log(pairs, matrix, "pairs");
    for (let pair of pairs) {
        console.log(pair);
        if (blues[pair.indices[0]] || yellows[pair.indices[1]]) {
            continue;
        }
        console.log(blue, blue.get(0), pair.indices[0], 89999999);
        await match(
            pk,
            rpc,
            conAddr,
            blue.get(pair.indices[0]).address,
            yellow.get(pair.indices[1]).address,
            createZKinputs(
                blue.get(pair.indices[0]),
                yellow.get(pair.indices[1]),
                side.get(
                    pair.indices[0].toString() +
                        "," +
                        pair.indices[1].toString()
                )
            )
        );
        await pg
            .table("traits")
            .where("address", blue.get(pair.indices[0]).address)
            .update({ status: true });
        await pg
            .table("traits")
            .where("address", yellow.get(pair.indices[1]).address)
            .update({ status: true });
    }
}
function createZKinputs(user1, user2, side) {
    let data = {
        g1: user1.mine_gender,
        g2: user2.want_gender,
        a1: user1.mine_age,
        a2: user2.want_age,
        arr1: [
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
        ],
        arr2: [
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
        ],
    };

    let t1, t2;
    if (side) {
        t1 = splitStringByComma(user1.mine_traits);
        t2 = splitStringByComma(user2.want_traits);
    } else {
        t1 = splitStringByComma(user1.want_traits);
        t2 = splitStringByComma(user2.mine_traits);
    }
    let i = 0;
    for (t of t1) {
        data.arr1[t] = true;
        i++;
    }
    i = 0;
    for (t of t2) {
        data.arr2[t] = true;
        i++;
    }

    return data;
}
function PairsWithDescendingValues(matrix) {
    console.log(matrix);
    let pairs = [];

    // Traverse through the matrix
    console.log("i:", matrix.length);
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            console.log("j:", matrix[i].length);
            console.log(matrix[i][j], "678");
            if (matrix[i][j] > 5) {
                pairs.push({ value: matrix[i][j], indices: [i, j] });
            }
        }
    }

    // Sort pairs based on the value in descending order
    pairs.sort((a, b) => b.value - a.value);

    return pairs;
}

function countCommonElements(arr1, arr2) {
    const set2 = new Set(arr2);
    return arr1.filter((item) => set2.has(item)).length;
}
function symmetricDifferenceSize(arr1, arr2) {
    // Convert arrays to sets
    const set1 = new Set(arr1);
    const set2 = new Set(arr2);

    // Calculate union
    const union = new Set([...set1, ...set2]);

    // Calculate intersection
    const intersection = new Set([...set1].filter((x) => set2.has(x)));

    // Calculate symmetric difference size (size of union minus size of intersection)
    return union.size - intersection.size;
}

function splitStringByComma(inputString) {
    return inputString.split(",");
}

async function getMatch(usr1, usr2) {
    return (
        20 -
        symmetricDifferenceSize(
            splitStringByComma(usr1.mine_traits),
            splitStringByComma(usr2.want_traits)
        )
    );
}

async function main() {
    // Schedule the task to run every 10 minutes
    while (true) {
        try {
            const data = await fetchData();
            if (!data || data.length < 1) {
                await sleep(10000);
                continue;
            }

            console.log(data);

            await processResponse(data);
            await sleep(10000);
        } catch (e) {
            console.log(e);
            await sleep(2000);
            continue;
        }
    }
}

function dynamicImport(modulePath) {
    return new Promise((resolve, reject) => {
        try {
            let module = require(modulePath);
            resolve(module);
        } catch (error) {
            reject(error);
        }
    });
}

// Example usage
// dynamicImport("./matcher/matcher")
//     .then((module) => {
//         // Use the dynamically imported module
//         console.log("Module loaded:", module);
//     })
//     .catch((error) => {
//         console.error("Error loading module:", error);
//     });

main().then(() => {
    console.log("done");
});
