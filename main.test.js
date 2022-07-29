import { shipFactory } from './main.js';

describe('Ship Object Tests', () => {
    it('isSunk() happy path', () => {
        const ship = shipFactory(3);
        expect(ship.isSunk()).toBe(false);
    });
    it('not sunk after 1 hit', () => {
        const ship = shipFactory(3);
        ship.hit(0);
        expect(ship.isSunk()).toBe(false);
    });
    it('sunk after 3 hits', () => {
        const ship = shipFactory(3);
        ship.hit(0);
        ship.hit(1);
        ship.hit(2);
        expect(ship.isSunk()).toBe(true);
    });
});