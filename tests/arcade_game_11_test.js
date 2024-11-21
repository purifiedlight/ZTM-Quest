import { scitavanie } from '../src/interactions/map_arcade/game_machine_11.interaction.js'
import { odcitavanie } from '../src/interactions/map_arcade/game_machine_11.interaction.js'

describe("Testovanie pocitania", function(){
    it("Scitavanie", function(){
        let a = 3;
        let b = 2;
        if(scitavanie(a,b) != 5){
            throw Error("Nespravne scitanie");
        }else console.log("Test sa podaril.\n%i + %i = 7", a, b);
        
    })

    it("Odcitavanie", function(){
        let a = 3;
        let b = 2;
        if(odcitavanie(a,b) != 1){
            throw Error("Nespravne odcitanie");
        }else console.log("Test sa podaril.\n%i - %i = 1", a, b);
        
    })
})