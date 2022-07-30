function shipFactory (x,y,rotation,length) {

    const hullHit = [];
    for (let i = 0; i < length; i++) {
        hullHit[i] = false;
    }

    const registerHit = (position) => { hullHit[position] = true; }

    const isSunk = () => {
        for (let i = 0; i < length; i++) {
            if (hullHit[i] == false) return false;
        }
        return true;
    }

    return { isSunk, registerHit, x, y, rotation, length };
};



function boardFactory (width, height) {
    const ships = [];
    const grid = [];
    for (let x = 0; x < width; x++) {
        grid[x] = [];
        for (let y = 0; y < height; y++) {
            grid[x][y] = 'open';
        }
    }
    
    const placeShip = (x,y,rotation,length) => {
        let occupied = false;
        if (rotation == 0) {
            for (let i = 0; i < length; i++) {
                const result = getShipAtPoint(x+i,y);
                if (result.occupied) {
                    occupied = true;
                }
            }
        } else {
            for (let i = 0; i < length; i++) {
                const result = getShipAtPoint(x,y+i);
                if (result.occupied) {
                    occupied = true;
                }
            }
        }
        if (occupied) { return false; }
        const ship = shipFactory(x,y,rotation,length);
        ships.push(ship);
        return true;
    }

    const getShipAtPoint = (x,y) => {
        let occupied = false;
        let shipObject;
        let position = 0;
        ships.forEach( (ship) => {
            if (ship.rotation == 0) {
                for (let i = 0; i < ship.length; i++) {
                    if (x == ship.x + i && y == ship.y) {
                        occupied = true;
                        shipObject = ship;
                        position = i;
                    }
                }
            } else {
                for (let i = 0; i < ship.length; i++) {
                    if (x == ship.x && y == ship.y + i) {
                        occupied = true;
                        shipObject = ship;
                        position = i;
                    }
                }
            }
        })
        return { occupied, ship: shipObject, position };
    }

    const recieveAttack = (x,y) => {
        if (x < 0 || y < 0 || x >= width || y >= height) {
            return 'invalid';
        }
        switch (grid[x][y]) {
            case 'open':
                const result = getShipAtPoint(x,y);
                if (result.occupied) {
                    grid[x][y] = 'hit';
                    if (result.ship != null) {
                        result.ship.registerHit(result.position);
                        if (result.ship.isSunk()) {
                            return 'sunk';
                        } else {
                            return 'hit';
                        }
                    } else {
                        return 'error'
                    }
                } else {
                    grid[x][y] = 'miss';
                    return 'miss';
                }
                break;
            case 'miss':
            case 'hit':
            case 'sunk':
                return 'invalid';
        }
    }
    
    return { placeShip, recieveAttack }
};


export { shipFactory, boardFactory };