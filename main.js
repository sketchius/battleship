function shipFactory (x,y,orientation,length) {

    const hullHit = [];
    for (let i = 0; i < length; i++) {
        hullHit[i] = false;
    }

    const hit = (position) => { hullHit[position] = true; }

    const isSunk = () => {
        for (let i = 0; i < length; i++) {
            if (hullHit[i] == false) return false;
        }
        return true;
    }

    return { isSunk, hit };
};


export { shipFactory };