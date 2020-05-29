declare var $: any;
/**
 * Valida cada una de las propiedas del objecto recibido
 * El arreglo con valores a ser excepcion es opcional
 *
 * @export
 * @param {Object} object
 * @param {Array<any>} [exeptions=[]]
 * @returns
 */
export function validateProperties (object: Object, exeptions: Array<any> = []): {validate: boolean, property:string} {
  let validate = true;
  let property = '';
  //Valores en el arreglo no permitidos en el objecto
  let values_not_permited = ['', null, 0, '0', undefined];
  let get_out = false;

  for (let index_0 = 0; index_0 < values_not_permited.length; index_0 ++) {
    exeptions.forEach(function (permited) {
      if (values_not_permited[index_0] === permited) {
        values_not_permited.splice(index_0, 1);
        index_0 --;
      }
    });
  }

  Object.keys(object).forEach( function (key) {
    values_not_permited.forEach(function (not_permited) {
      if ( object[key] === not_permited  ) {
        validate = false;
        property = key;
        get_out = true;
        return;
      }
    });
    if (get_out) return;
  });
  return {
    validate: validate,
    property: property
  }
}

export function equalProperties (a, b) {
  if ( a !== undefined && b !== undefined ) {
    return a == b ? true : false;
  } else {
    false;
  }
}

export function selectOneItem (array: Array<any>) {
  return ( array.length > 0 ) ? true : false;
}

export function diferentFrom (element, array: Array<any>, exeptions: Array<any> = []) {
  let diferent: boolean = true;
  let copy_array = array.slice();

  if (exeptions.length > 0) {
    // console.log('hay exepciones', exeptions);
    for (let i = 0; i < copy_array.length; i++) {
      for (let j = 0; j < exeptions.length; j++) {
        switch (typeof copy_array[0]) {
          case 'string':
            if ( copy_array[i].toUpperCase() == exeptions[j].toUpperCase() ) {
              // console.log('exepecion',copy_array[i], exeptions[j]);
              copy_array[i] = Date.now().toString();
            }
          break;
          case 'number':
            if ( copy_array[i] == exeptions[j] ) copy_array[i] = null;
          break;
        }
      }
    }
  }

  copy_array.forEach(function (value) {
    switch (typeof element) {
      case 'string':
        if (element.toUpperCase() == value.toUpperCase()) {
          // console.log('comparando', element, value);
          // console.log('string','elemento', element, 'valor', value);
          diferent = false;
          return;
        }
      break;
      case 'number':
        if (element == value) {
          // console.log('numero','elemento', element, 'valor', value);
          diferent = false;
          return;
        }
      break;
    }
  });
  return diferent;
}

export function validateFormById(id){

  let form = $(id).show();

  console.log(form)
  form.validate();

  return form.valid();
}

export function equalOrGreater (element, number) {
  return ( element >= number ) ? true : false;
}

export function isIntNumber (element) {
  return !isNaN(parseInt(element));
}

export function validateValue(value: any, exeptions: Array<any> = []) {
  let validate = true;
  let values_not_permited = ['', null, 0, '0', undefined];

  values_not_permited.forEach(function (not_permited, index_0) {
    exeptions.forEach(function (permited) {
      if (not_permited === permited)
        values_not_permited.splice(index_0, 1);
    });
  });

  values_not_permited.forEach(function (not_permited) {
    if ( value === not_permited  ) {
      validate = false;
      return;
    }
  });

  return validate;
}

export function smallerThan(value: number, smaller: number, equal: boolean = false) {
  if (!equal)
    return (value < smaller);
  else
    return ( value <= smaller );
}

export function greaterThan(value: number, greater: number, equal: boolean = false) {
  if (!equal)
    return (value > greater);
  else
    return ( value >= greater );
}