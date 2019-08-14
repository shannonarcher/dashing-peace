class Pawn {
    protected _id: number;
    protected _color: string;

    constructor(color: string) {
        this._id = 0;
        this._color = color;
    }

    get id() {
        return this._id;
    }

    get color() {
        return this._color;
    }
}

export default Pawn;