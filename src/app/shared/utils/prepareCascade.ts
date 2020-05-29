export function prepareCascade(array: Array<any>) {
  let discount: number = 1;
  let flag: boolean;
  let array_verify: Array<any> = [];

  array.forEach(function(element){
    if (element != '' ) {
      array_verify.push(element);
      discount *= 1 - ( Math.abs(parseFloat(element)) / 100 );
    }
  });

  flag = ( array_verify.length > 1 ) ? true : false;

  return {
    dre: Math.abs( ( 1 - discount ) ),
    flag: flag
  };
}