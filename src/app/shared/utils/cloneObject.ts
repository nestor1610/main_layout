/**
 * Clona objetos y arreglos recursivamente sin la referencia de los mismos
 *
 * @export
 * @param {*} original
 * @returns
 */
export function cloneObject(original) {
  let clone: any = null;

  if (Array.isArray(original)) {
    clone = Object.assign([], original);
    clone.forEach((element, index) => {
      clone[index] = cloneObject(element);
    });
  } else if (typeof original === 'object') {
    if (original !== null) {
      clone = Object.assign({}, original);
      Object.keys(original).forEach(key => {
        clone[key] = cloneObject(original[key]);
      });
    }
  } else {
    clone = original;
  }

  return clone;
}

export function cloneArrayObject(original: Array<any>) {
  let clone: Array<any> = [];
  original.forEach(function (element) {
    clone.push(cloneObject(element));
  });
  return clone;
}

/* export function cloneObject (original) {
    let type = Array.isArray(original) ? true : false;
    let clone = [];

    if (type) {
        original.forEach(function (element) {
            // if ( typeof element === 'object' )
            //     clone.push( Object.assign({}, element) );
            switch (typeof element) {
                case 'object':

                    if ( Array.isArray )
                        clone.push( element.slice(0) );
                    else
                        clone.push( Object.assign({}, element) );

                break;

                default:
                    clone.push( element );
                break;
            }
        });
    }
    else {
        clone = copyElement( original );
    }

    return clone;
}

function copyElement (element) {
    let type = Array.isArray(element) ? true : false;

    if (type)
        return element.slice(0);
    else
        return Object.assign({}, element);
} */