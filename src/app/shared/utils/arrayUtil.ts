export function findParent(element_id: number, data: Array<any>): any {
  let value: any = null;
  let parent_id: number = null;

  function findParentId(id: number, data: Array<any>): any {
    let parent_id: any = null;

    data.forEach(function (element) {
      if (element.id == id) {
        parent_id = element.parent_id;
        return;
      }
    });

    return parent_id;
  }

  parent_id = findParentId(element_id, data);

  if (parent_id != null) {
    data.forEach(function (element) {
      if (element.id == parent_id) {
        value = element;
        return;
      }
    });
  }

  return value;
}

/**
 * Organiza los elemento de @param data segun
 *
 * @param data Arreglo de elementos a organizar segun su padre
 * @param property_parent_name nombre de la llave padre
 */
export function groupByParent(data: Array<any>, property_parent_name: string) {
  let parent: any = null;
  let current: any;
  let parents: Array<any> = [];
  let key: any = null;
  let key_2: any = null;

  function findIndex(id, array: Array<any>) {
    let key = null;
    array.forEach(function (element, index) {
      if (element.id == id) {
        key = index + 1;
        return;
      }
    });
    return key;
  }

  data.forEach(function (element) {
    if (element[property_parent_name] == null) parents.push(element);
  });

  for (let index = 0; index < data.length; index++) {
    current = data[index];
    parent = findParent(current.id, data);

    if (parent != null) {
      key = findIndex(parent.id, parents);
      key_2 = findIndex(current.id, parents);

      if (key == null) {
        parents.push(parent);
        key = findIndex(parent.id, parents);
      }

      if (key_2 == null) {
        parents.splice(key, 0, current);
      }

      key = null;
    } else if (parent == null && current[property_parent_name] != null) {
      parents.push(current);
    }
  }

  return parents;

}

export function getArraySimpleByKeyObject(elements: Array<any>, key: string): Array<any> {
  let array: Array<any> = [];

  elements.forEach(function (object){
    if ( object.hasOwnProperty(key) ) {
      array.push(
        object[key]
      );
    }
  });

  return array;
}
