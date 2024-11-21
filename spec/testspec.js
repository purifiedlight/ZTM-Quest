import { scitavanie } from '../src/interactions/map_arcade/game_machine_11_interaction.js';

let year = 2019;

describe("Get year dates", () => {
    it("should be a number", () => {
        expect(year).toBe(2019);
    });

    it("should correctly sum two numbers", () => {
        expect(scitavanie(2, 3)).toBe(5); // Test pre funkciu scitavanie
    });
});