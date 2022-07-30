import { shipFactory, boardFactory } from './main.js';

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
    it('Coordinates test', () => {
        const ship = shipFactory(6,4,0,3);
        expect(ship.x).toBe(6);
    });
    it('Orientation test', () => {
        const ship = shipFactory(0,0,1,3);
        expect(ship.rotation).toBe(1);
    });
    it('Length test', () => {
        const ship = shipFactory(0,0,1,3);
        expect(ship.length).toBe(3);
    });
});

describe('Gameboard Object Tests', () => {
    it('Placement works', () => {
        const gameBoard = boardFactory(10,10);
        expect(gameBoard.placeShip(3,3,0,3)).toBe(true);
    });
    it('Overlapping placement fails', () => {
        const gameBoard = boardFactory(10,10);
        gameBoard.placeShip(3,3,0,3);
        expect(gameBoard.placeShip(3,3,0,3)).toBe(false);
    });
    it('Overlapping placement fails (+ overlap)', () => {
        const gameBoard = boardFactory(10,10);
        gameBoard.placeShip(3,3,0,3);
        expect(gameBoard.placeShip(4,2,1,3)).toBe(false);
    });
    it('Basic attack hit test', () => {
        const gameBoard = boardFactory(10,10);
        gameBoard.placeShip(3,3,0,3);
        expect(gameBoard.recieveAttack(3,3)).toBe('hit');
    });
    it('Vertical rotation attack hit test', () => {
        const gameBoard = boardFactory(10,10);
        gameBoard.placeShip(4,2,1,3);
        expect(gameBoard.recieveAttack(4,3)).toBe('hit');
    });
    it('Basic attack miss test', () => {
        const gameBoard = boardFactory(10,10);
        gameBoard.placeShip(3,3,0,3);
        expect(gameBoard.recieveAttack(3,4)).toBe('miss');
    });
    it('Sink ship test', () => {
        const gameBoard = boardFactory(10,10);
        gameBoard.placeShip(3,3,0,2);
        gameBoard.recieveAttack(3,3);
        expect(gameBoard.recieveAttack(4,3)).toBe('sunk');
    });
    it('Double miss test', () => {
        const gameBoard = boardFactory(10,10);
        gameBoard.placeShip(3,3,0,3);
        gameBoard.recieveAttack(5,5);
        expect(gameBoard.recieveAttack(5,5)).toBe('invalid');
    });
    it('Double hit test', () => {
        const gameBoard = boardFactory(10,10);
        gameBoard.placeShip(3,3,0,3);
        gameBoard.recieveAttack(3,3);
        expect(gameBoard.recieveAttack(3,3)).toBe('invalid');
    });
    it('Out of bounds test', () => {
        const gameBoard = boardFactory(10,10);
        gameBoard.placeShip(3,3,0,3);
        expect(gameBoard.recieveAttack(12,12)).toBe('invalid');
    });
});