const assert = require('assert');

function calculateTotalScore(integers) {
    return integers.reduce((totalScore, integer) => {
        if (integer === 5) return totalScore + 5;
        return totalScore + (integer % 2 === 0 ? 1 : 3);
    }, 0);
}

function runTests() {
    // Prueba 1
    let inputA = [1, 2, 3, 4, 5];
    let expectedA = 13;
    let resultA = calculateTotalScore(inputA);
    assert.strictEqual(resultA, expectedA);

    // Prueba 2
    let inputB = [17, 19, 21];
    let expectedB = 9;
    let resultB = calculateTotalScore(inputB);
    assert.strictEqual(resultB, expectedB);

    // Prueba 3
    let inputC = [5, 5, 5];
    let expectedC = 15;
    let resultC = calculateTotalScore(inputC);
    assert.strictEqual(resultC, expectedC);

    // Prueba 4
    let inputD = [5, 2, 1, 99, 0];
    let expectedD = 13;
    let resultD = calculateTotalScore(inputD);
    assert.strictEqual(resultD, expectedD);

    // Prueba 5
    let inputE = [2, 4, 6, 8, 10, 100];
    let expectedE = 6;
    let resultE = calculateTotalScore(inputE);
    assert.strictEqual(resultE, expectedE);

    console.log("Todos los tests se ejecutaron correctamente!");
}

runTests();