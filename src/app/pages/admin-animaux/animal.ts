export class Animal {

    constructor(private _id: number, private _nom: string, private _race: string, private _naissance: string, private _description: string) {}

public get id()
{
    return this._id;
}

public set id(value : number)
{
    this._id = value;
}

public get nom()
{
    return this._nom;
}

public set nom(value : string)
{
    this._nom = value;
}

public get race()
{
    return this._race;
}

public set race(value : string)
{
    this._race = value;
}

public get naissance()
{
    return this._naissance;
}

public set naissance(value : string)
{
    this._naissance = value;
}

public get description()
{
    return this._description;
}

public set description(value : string)
{
    this._description = value;
}

}
