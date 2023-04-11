const validation = (form) => {
    const errors = {};
    
    let regex = new RegExp(/(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg|JPG|JPEG|PNG|GIF))/)
    if (!form.name) errors.name = 'The pokemon must have a name';
    if (form.name.match(/\d/)) errors.name = 'The name of the pokemon cannot include numbers'
    if (form.name.length > 12) errors.name = 'The name can have a maximum of 15 characters';
    if (!form.image) errors.image = 'You must add an image to your pokemon';
    if (!form.hp) errors.hp = 'You must specify the hp points';
    if (!form.attack) errors.attack = 'You must specify the attack points';
    if (!form.defense) errors.defense = 'You must specify the defense points';
    if (!regex.test(form.image)) errors.image = 'The image URL is invalid';
    if (!form.hp.match(/^\d+$/))  errors.hp = 'HP points must be Numerical'
    if (!form.attack.match(/^\d+$/)) errors.attack = 'Attack points must be Numerical'
    if (!form.defense.match(/^\d+$/)) errors.defense = 'Defense points must be Numerical'
    if (form.hp > 999) errors.hp = 'Health points cannot be higher than 999';
    if (form.attack > 999) errors.attack = 'Attack points cannot be higher than 999';
    if (form.defense > 999) errors.defense = 'Defense points cannot be higher than 999';
    if (form.speed > 999) errors.speed = 'Speed points cannot be higher than 999';
    if (form.height > 999) errors.height = 'Height cannot be greater than 999';
    if (form.weight > 999) errors.weight = 'Weight cannot be greater than 999';
    if (form.typeId.length > 2) errors.typeId = 'You can only choose two types';
    if (form.typeId[0] === form.typeId[1]) errors.typeId = 'You cant choose the same type twice'

    return errors;
};

export default validation;
