export function changeObject(evaluate: Array<any>) {
  let flag = false;

  for (let index = 0; index < evaluate.length; index++) {
    if (Array.isArray(evaluate[index]['current'])) {

      flag = compareArray(evaluate[index]['current'], evaluate[index]['changed']);

    } else if (typeof evaluate[index] === 'object') {

      flag = compareObject(evaluate[index]['current'], evaluate[index]['changed']);

    }

    if (flag) break;
  }

  return flag;
}

function compareArray(current: Array<any>, changed: Array<any>) {
  let flag = false;

  if (current.length != 0 || changed.length != 0) {

    let length_array = current.length > changed.length ? current.length : changed.length;

    for (let i = 0; i < length_array; i++) {
      // console.log('iteracion arreglo ', current, 'indice', i);

      if (Array.isArray(current[i])) {

        flag = compareArray(current[i], changed[i]);

      } else if (typeof current[i] === 'object') {

        flag = compareObject(current[i], changed[i]);

      } else {

        if (current[i] != changed[i]) {
          // console.log('arreglo diferente', 'current ' + i, current[i], 'changed ' + i, changed[i]);
          flag = true;
        }
      }

      if (flag) break;
    }
  }

  return flag;
}

function compareObject(current, changed) {
  let flag = false;
  const keys = Object.keys(current);

  if (current === undefined || changed === undefined) return true;

  for (let index = 0; index < keys.length; index++) {

    // console.log('iteracion objecto ', current, 'llave', keys[index]);

    if (Array.isArray(current[keys[index]])) {

      flag = compareArray(current[keys[index]], changed[keys[index]]);

    } else if (typeof current[keys[index]] === 'object' && current[keys[index]] !== null) {

      flag = compareObject(current[keys[index]], changed[keys[index]]);

    } else {

      if (current[keys[index]] != changed[keys[index]]) {
        // console.log('objeto diferente', 'current ' + keys[index], current[keys[index]], 'changed ' + keys[index], changed[keys[index]]);
        flag = true;
      }
    }

    if (flag) break;
  }

  return flag;
}
