export class Attribute {
    id : number = 0;
    name : string = '';
    type_attribute : string = '';
}

export class AttributeDetail {
    id : number = 0;
    attribute_id : number;
    reference : string;
    name : string = '';
    color : string = '#ffffff';
    position : string = '';

    constructor (attribute_id) {
    	this.attribute_id = attribute_id;
    }
}