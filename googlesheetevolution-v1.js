/*
 * Script adapted from https://3edgy6u.com/misc/pogoevo.html
 *
 * Author hasosoft@gmail.com
 * https://github.com/hasosoft/PokemonEvolutionCalcGoogleSheet
 * v1.0.0
 */

function pluralize(n, w) {
    if (n === 1) {
        return n + ' ' + w;
    }
    if (w === 'candy') {
        return n + ' candies';
    }
    return n + ' ' + w + 's';
}


/**
 * Calculates number of possible evolutions based on current base and evolved pokemon. Does not optimize
 * For Caterpie with 8 Caterpies and 2 Metapods, 71 candies at 12 required. calcEvolutions(8,2,71,12);
 *
 * @param {number} input The value of base pokemon.
 * @param {number} input The value of already evolved (you are prepared to transfer) pokemon.
 * @param {number} input The current number of candies for the pokemon.
 * @param {number} input The required number of candies to evolve the pokemon.
 * @return The number of evolutions
 * @customfunction
 */
function calcEvolutions(bases, evos, candy, req) {

    var baseStart = parseInt(bases, 10);
    var evoStart = parseInt(evos, 10);
    var candyStart = parseInt(candy, 10);
    var reqCandy = parseInt(req, 10);
    var evosTotal;


    if (isNaN(baseStart) || isNaN(evoStart) || isNaN(candyStart) || isNaN(reqCandy)) {
        return false;
    }

    // (reqCandy - 1) since we get 1 candy back from evolving
    var maxEvo = Math.floor(candyStart / (reqCandy - 1));
    var candyRemain = candyStart % (reqCandy - 1);
    if (candyRemain === 0 && candyStart !== 0) {
        maxEvo--;
    }
    evosTotal = Math.min(maxEvo, baseStart);
    candyRemain = candyStart - ((reqCandy - 1) * evosTotal);
    return evosTotal;
}


/**
 * Calculates number of possible evolutions based on current base and evolved pokemon. Does not optimize
 *
 * @param {number} input The value of base pokemon.
 * @param {number} input The value of already evolved (you are prepared to transfer) pokemon.
 * @param {number} input The current number of candies for the pokemon.
 * @param {number} input The required number of candies to evolve the pokemon.
 * @return The number of evolutions, how many base pokemon to keep and how many is left over after.
 * @customfunction
 */
function calcEvolutionsString(bases, evos, candy, req) {

    var baseStart = parseInt(bases, 10);
    var evoStart = parseInt(evos, 10);
    var candyStart = parseInt(candy, 10);
    var reqCandy = parseInt(req, 10);
    var evosTotal;


    if (isNaN(baseStart) || isNaN(evoStart) || isNaN(candyStart) || isNaN(reqCandy)) {
        return false;
    }

    var maxEvo = Math.floor(candyStart / (reqCandy - 1));
    var candyRemain = candyStart % (reqCandy - 1);
    if (candyRemain === 0 && candyStart !== 0) {
        maxEvo--;
    }
    evosTotal = Math.min(maxEvo, baseStart);
    var baseRemain = baseStart - evosTotal;
    candyRemain = candyStart - ((reqCandy - 1) * evosTotal);
    return generateEvolutionString();

    function generateEvolutionString() {
        return pluralize(evosTotal, 'evolution') + ', with ' + pluralize(baseRemain, 'base') + ', ' + pluralize((evoStart + evosTotal), 'evo') + ', and ' + pluralize(candyRemain,
            'candy') + ' left over';
    }
}

/**
 * Calculates number of possible evolutions based on current base and evolved pokemon. Optimizes with prior transfers
 *
 * @param {number} input The value of base pokemon.
 * @param {number} input The value of already evolved (you are prepared to transfer) pokemon.
 * @param {number} input The current number of candies for the pokemon.
 * @param {number} input The required number of candies to evolve the pokemon.
 * @return How many pokemon starting with evolutions to transfer to optimize
 * @customfunction
 */
function calcOptimized(bases, evos, candy, req) {

    var baseStart = parseInt(bases, 10);
    var evoStart = parseInt(evos, 10);
    var candyStart = parseInt(candy, 10);
    var reqCandy = parseInt(req, 10);
    var evosTotal;
    var transferPrior;


    if (isNaN(baseStart) || isNaN(evoStart) || isNaN(candyStart) || isNaN(reqCandy)) {
        return false;
    }

    var maxEvo = Math.floor(candyStart / (reqCandy - 1));
    var candyRemain = candyStart % (reqCandy - 1);
    if (candyRemain === 0 && candyStart !== 0) {
        maxEvo--;
    }
    evosTotal = Math.min(maxEvo, baseStart);
    var baseRemain = baseStart - evosTotal;
    candyRemain = candyStart - ((reqCandy - 1) * evosTotal);

    if (baseRemain > 0 && baseRemain + candyRemain + evoStart >= (reqCandy + 1)) {
        transferPrior = (reqCandy - candyRemain);
        evosTotal++;
        baseRemain--;
        if (candyRemain + evoStart < reqCandy) {
            baseRemain -= reqCandy - candyRemain - evoStart;
        }
        evoStart -= Math.min(transferPrior, evoStart);
        // We get 1 candy for the last evolve
        candyRemain = 1;
        return transferPrior;

    } else {
        return 0;
    }
}

/**
 * Calculates number of possible evolutions based on current base and evolved pokemon. Optimizes with prior transfers
 *
 * @param {number} input The value of base pokemon.
 * @param {number} input The value of already evolved (you are prepared to transfer) pokemon.
 * @param {number} input The current number of candies for the pokemon.
 * @param {number} input The required number of candies to evolve the pokemon.
 * @return The number of evolutions after optimization, how much is left over after evolving.
 * @customfunction
 */
function calcOptimizedString(bases, evos, candy, req) {

    var baseStart = parseInt(bases, 10);
    var evoStart = parseInt(evos, 10);
    var candyStart = parseInt(candy, 10);
    var reqCandy = parseInt(req, 10);
    var evosTotal;
    var transferPrior;


    if (isNaN(baseStart) || isNaN(evoStart) || isNaN(candyStart) || isNaN(reqCandy)) {
        return false;
    }

    var maxEvo = Math.floor(candyStart / (reqCandy - 1));
    var candyRemain = candyStart % (reqCandy - 1);
    if (candyRemain === 0 && candyStart !== 0) {
        maxEvo--;
    }
    evosTotal = Math.min(maxEvo, baseStart);
    var baseRemain = baseStart - evosTotal;
    candyRemain = candyStart - ((reqCandy - 1) * evosTotal);

    if (baseRemain > 0 && baseRemain + candyRemain + evoStart >= (reqCandy + 1)) {
        transferPrior = (reqCandy - candyRemain);
        evosTotal++;
        baseRemain--;
        if (candyRemain + evoStart < reqCandy) {
            baseRemain -= reqCandy - candyRemain - evoStart;
        }
        evoStart -= Math.min(transferPrior, evoStart);
        // We get 1 candy for the last evolve
        candyRemain = 1;
        return generateOptimumString();

    } else {
        return '';
    }

    function generateOptimumString() {
        return 'To squeeze another evolution in, you\'ll need to transfer ' + transferPrior + ' Pokémon in (starting with the evos) make sure to keep ' + evosTotal +
            ' base pokemon, to result in ' + pluralize(evosTotal,
                'evolution') + ', with ' +
            pluralize(baseRemain, 'base') + ', ' + pluralize((evoStart + evosTotal), 'evo') + ', and ' + pluralize(candyRemain, 'candy') + ' left over';
    }
}
