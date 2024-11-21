//terminal prikaz -> mocha .\tests\arcade_game_11_test.js

import { getRandomValueOfTrack } from '../src/interactions/map_arcade/game_machine_11.interaction.js';
import { calculateScore } from '../src/interactions/map_arcade/game_machine_11.interaction.js';
import { addTrophy } from '../src/interactions/map_arcade/game_machine_11.interaction.js';
import { addFormula } from '../src/interactions/map_arcade/game_machine_11.interaction.js';
import { calculateInterval } from '../src/interactions/map_arcade/game_machine_11.interaction.js';

import { expect } from 'chai';
import sinon from 'sinon';

describe('getRandomValueOfTrack', () => {
    it('should return one of the values from the array', () => {
        const formulaValues = [100, 200, 300];
        const result = getRandomValueOfTrack(formulaValues);
        expect(formulaValues).to.include(result);
    });
});

describe('getRandomValueOfTrack with stub', () => {
    afterEach(() => {
        sinon.restore(); // Obnoví pôvodné správanie po každom teste
    });

    it('should return the first value if Math.random() returns 0', () => {
        const formulaValues = [100, 200, 300];
        sinon.stub(Math, 'random').returns(0); // Stub Math.random, aby vždy vrátilo 0

        const result = getRandomValueOfTrack(formulaValues);
        expect(result).to.equal(100); // Očakávame prvú hodnotu z poľa
    });

    it('should return the last value if Math.random() returns close to 1', () => {
        const formulaValues = [100, 200, 300];
        sinon.stub(Math, 'random').returns(0.9999999); // Stub Math.random, aby vrátilo takmer 1

        const result = getRandomValueOfTrack(formulaValues);
        expect(result).to.equal(300); // Očakávame poslednú hodnotu z poľa
    });
});

describe('getRandomValueOfTrack with mock', () => {
    it('should call Math.random once', () => {
        const mock = sinon.mock(Math);
        mock.expects('random').once(); // Očakávame, že Math.random sa zavolá presne raz

        getRandomValueOfTrack([100, 200, 300]);

        mock.verify(); // Overíme, že očakávania boli splnené
    });
});

describe('getRandomValueOfTrack with fake', () => {
    it('should return a predefined value based on a fake Math.random', () => {
        const formulaValues = [100, 200, 300];
        const fakeRandom = sinon.fake.returns(0.5); // Fake, ktorý vždy vráti 0.5
        sinon.replace(Math, 'random', fakeRandom); // Nahradíme Math.random

        const result = getRandomValueOfTrack(formulaValues);
        expect(result).to.equal(200); // Očakávame druhú hodnotu z poľa

        sinon.restore(); // Obnovíme Math.random na pôvodné správanie
    });
});

describe('calculateScore', () => {
    it('should halve the score if no formulas are overtaken', () => {
        const result = calculateScore(1000, 0, 2);
        expect(result).to.equal(1000); // 1000 * 0.5 * 2
    });

    it('should double the score for each overtaken formula', () => {
        const result = calculateScore(1000, 3, 2);
        expect(result).to.equal(12000); // 1000 * 3 * 2 * 2
    });

    it('should halve the score if no trophies are collected', () => {
        const result = calculateScore(1000, 2, 0);
        expect(result).to.equal(2000); // 1000 * 2 * 2 * 0.5
    });

    it('should correctly calculate score with formulas and trophies', () => {
        const result = calculateScore(1000, 2, 3);
        expect(result).to.equal(12000); // 1000 * 2 * 2 * 3
    });
});

describe('calculateScore with Mocks', () => {
    it('should call the external calculation method with correct parameters', () => {
        // Mock funkcie, ktorá bude volaná v calculateScore
        const mockCalculation = sinon.mock().withArgs(1000, 2, 3).returns(12000);

        // Funkcia, ktorá by mala volať tento mock
        const calculateScore = (score, formulas, trophies, calculationMethod) => {
            return calculationMethod(score, formulas, trophies); // Tu voláme mock
        };

        // Volanie calculateScore s mockom
        const result = calculateScore(1000, 2, 3, mockCalculation);

        // Overenie, že mock bol volaný s očakávanými parametrami
        mockCalculation.verify(); // Overenie, že bol volaný s parametrami (1000, 2, 3)
        expect(result).to.equal(12000); // Očakávame správny výpočet
    });
});


describe('calculateScore with Fakes', () => {
    it('should use fake calculation method for score calculation', () => {
        // Fake funkcia, ktorá sa správa ako reálna metóda, ale je zjednodušená
        const fakeCalculation = (score, formulas, trophies) => {
            return score * formulas * trophies;
        };

        const result = calculateScore(1000, 2, 3, fakeCalculation);
        expect(result).to.equal(12000); // Očakávame správny výpočet
    });
});

describe('calculateScore with Stubs', () => {
    it('should calculate score using stubbed method', () => {
        // Stub pre funkciu, ktorá počíta skóre
        const stubCalculation = sinon.stub().withArgs(1000, 2, 3).returns(12000);

        // Funkcia, ktorá používa tento stub
        const calculateScore = (score, formulas, trophies, calculationMethod) => {
            return calculationMethod(score, formulas, trophies); // Tu voláme stub
        };

        // Volanie calculateScore s naším stubom
        const result = calculateScore(1000, 2, 3, stubCalculation);

        // Overenie, že stub bol volaný s očakávanými parametrami
        expect(stubCalculation.calledOnceWith(1000, 2, 3)).to.be.true; // Overenie, že stub bol volaný raz s týmito parametrami
        expect(result).to.equal(12000); // Očakávame, že výsledok bude 12000
    });
});

describe('addTrophy function', () => {
    it('should increase trophy count by 1', () => {
        let trophyCount = 0;
        trophyCount = addTrophy(trophyCount);
        expect(trophyCount).to.equal(1); // 0 + 1 = 1
    });

    it('should increase trophy count from existing value', () => {
        let trophyCount = 5;
        trophyCount = addTrophy(trophyCount);
        expect(trophyCount).to.equal(6); // 5 + 1 = 6
    });
});

describe('addFormula function', () => {
    it('should increase formula count by 1', () => {
        let formulasCount = 0;
        formulasCount = addFormula(formulasCount);
        expect(formulasCount).to.equal(1); // 0 + 1 = 1
    });

    it('should increase formula count from existing value', () => {
        let formulasCount = 3;
        formulasCount = addFormula(formulasCount);
        expect(formulasCount).to.equal(4); // 3 + 1 = 4
    });
});

describe('calculateInterval function', () => {
    it('should return the base interval when speedy is 1', () => {
        const result = calculateInterval(1);
        expect(result).to.equal(0.1); // Ak je speedy 1, mal by vrátiť baseInterval
    });

    it('should return the min interval when speedy is very high', () => {
        const result = calculateInterval(1000); // Veľmi vysoká hodnota speedy
        expect(result).to.equal(0.05); // Ak je speedy veľmi veľké, mal by vrátiť minInterval
    });
});
