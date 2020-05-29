export function removeInitialCharacters ( string, old, replace ) {
  // console.log(string,old,replace);
  let new_string: string = '';
  for (let index = 0; index < string.length; index++) {
    if ( string[index] == old )
      new_string += replace;
    else {
      new_string += string.substring(index, string.length);
      break;
    }
  }
  return new_string;
}

export function getStringByArraysAndKey (data:Array< Array<any> >, searching: Array<any>, key_principal: string): string {
  let string: string = '';

  searching.forEach(function(search){
    data.forEach(function(array){
      array.forEach(function(object){
        if ( object.id == search  ) {
          string += ( object[key_principal] != null ) ? '-'+object[key_principal] : '-'+object.id;
          return;
        }
      });
    });
  });

  return string;
}

export function unMaskNumberFormat(number_format: string, thousand_separator: string, decimal_symbol: string) {
  let new_number: string = '';
  for (let index = 0; index < number_format.length; index++) {
    if ( number_format[index] == thousand_separator )
      new_number += '';
    else if ( number_format[index] == decimal_symbol )
      new_number += '.';
    else
      new_number += number_format[index];
  }
  return parseFloat(new_number);
}