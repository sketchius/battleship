import { shipFactory } from './main.js';

describe('Ship Object Tests', () => {
    it('isSunk() happy path', () => {
        const ship = shipFactory(0,0,0,3);
        expect(ship.isSunk()).toBe(false);
    });
    it('not sunk after 1 hit', () => {
        const ship = shipFactory(0,0,0,3);
        ship.registerHit(0);
        expect(ship.isSunk()).toBe(false);
    });
    it('sunk after 3 hits', () => {
        const ship = shipFactory(0,0,0,3);
        ship.registerHit(0);
        ship.registerHit(1);
        ship.registerHit(2);
        expect(ship.isSunk()).toBe(true);
    });
});