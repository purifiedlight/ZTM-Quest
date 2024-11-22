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
        sinon.restore();
    });

    it('should return the first value if Math.random() returns 0', () => {
        const formulaValues = [100, 200, 300];
        sinon.stub(Math, 'random').returns(0);
        const result = getRandomValueOfTrack(formulaValues);
        expect(result).to.equal(100);
    });

    it('should return the last value if Math.random() returns close to 1', () => {
        const formulaValues = [100, 200, 300];
        sinon.stub(Math, 'random').returns(0.9999999);

        const result = getRandomValueOfTrack(formulaValues);
        expect(result).to.equal(300);
    });
});

describe('getRandomValueOfTrack with mock', () => {
    it('should call Math.random once', () => {
        const mock = sinon.mock(Math);
        mock.expects('random').once();

        getRandomValueOfTrack([100, 200, 300]);

        mock.verify();
    });
});

describe('getRandomValueOfTrack with fake', () => {
    it('should return a predefined value based on a fake Math.random', () => {
        const formulaValues = [100, 200, 300];
        const fakeRandom = sinon.fake.returns(0.5);
        sinon.replace(Math, 'random', fakeRandom);

        const result = getRandomValueOfTrack(formulaValues);
        expect(result).to.equal(200);

        sinon.restore();
    });
});

describe('calculateScore', () => {
    it('should halve the score if no formulas are overtaken', () => {
        const result = calculateScore(1000, 0, 2);
        expect(result).to.equal(1000);
    });

    it('should double the score for each overtaken formula', () => {
        const result = calculateScore(1000, 3, 2);
        expect(result).to.equal(12000);
    });

    it('should halve the score if no trophies are collected', () => {
        const result = calculateScore(1000, 2, 0);
        expect(result).to.equal(2000);
    });

    it('should correctly calculate score with formulas and trophies', () => {
        const result = calculateScore(1000, 2, 3);
        expect(result).to.equal(12000);
    });
});

describe('calculateScore with Mocks', () => {
    it('should call the external calculation method with correct parameters', () => {
        const mockCalculation = sinon.mock().withArgs(1000, 2, 3).returns(12000);

        const calculateScore = (score, formulas, trophies, calculationMethod) => {
            return calculationMethod(score, formulas, trophies);
        };

        const result = calculateScore(1000, 2, 3, mockCalculation);

        mockCalculation.verify();
        expect(result).to.equal(12000);
    });
});


describe('calculateScore with Fakes', () => {
    it('should use fake calculation method for score calculation', () => {
        const fakeCalculation = (score, formulas, trophies) => {
            return score * formulas * trophies;
        };

        const result = calculateScore(1000, 2, 3, fakeCalculation);
        expect(result).to.equal(12000);
    });
});

describe('calculateScore with Stubs', () => {
    it('should calculate score using stubbed method', () => {
        const stubCalculation = sinon.stub().withArgs(1000, 2, 3).returns(12000);

        const calculateScore = (score, formulas, trophies, calculationMethod) => {
            return calculationMethod(score, formulas, trophies);
        };

        const result = calculateScore(1000, 2, 3, stubCalculation);

        expect(stubCalculation.calledOnceWith(1000, 2, 3)).to.be.true;
        expect(result).to.equal(12000);
    });
});

describe('addTrophy function', () => {
    it('should increase trophy count by 1', () => {
        let trophyCount = 0;
        trophyCount = addTrophy(trophyCount);
        expect(trophyCount).to.equal(1);
    });

    it('should increase trophy count from existing value', () => {
        let trophyCount = 5;
        trophyCount = addTrophy(trophyCount);
        expect(trophyCount).to.equal(6);
    });
});

describe('addFormula function', () => {
    it('should increase formula count by 1', () => {
        let formulasCount = 0;
        formulasCount = addFormula(formulasCount);
        expect(formulasCount).to.equal(1);
    });

    it('should increase formula count from existing value', () => {
        let formulasCount = 3;
        formulasCount = addFormula(formulasCount);
        expect(formulasCount).to.equal(4);
    });
});

describe('calculateInterval function', () => {
    it('should return the base interval when speedy is 1', () => {
        const result = calculateInterval(1);
        expect(result).to.equal(0.1);
    });

    it('should return the min interval when speedy is very high', () => {
        const result = calculateInterval(1000);
        expect(result).to.equal(0.05);
    });
});
