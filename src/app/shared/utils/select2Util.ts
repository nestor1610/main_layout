import { isArray } from "util";
import { cloneObject } from "./cloneObject";

export function getValuesOfSelect(data, id) :string{
  let result ='';
  let arrayResult:any[] = [];
  // console.log(data)
  if(isArray(data)){

    if(isArray(id)){

      for (let i = 0; i < id.length; i++) {
        const element = id[i];
        for (let j = 0; j < data.length; j++) {
          const obj = data[j];

          if(id[i] == data[j].id){
            arrayResult.push(data[j].text)
            break;
          }

        }
      }

      result = arrayResult.join();

    }else{

      for (let j = 0; j < data.length; j++) {
        const obj = data[j];

        if(id == data[j].id){
          result = data[j].text;
          break;
        }

      }

    }

  }

  return result;
}

export function getElementOfSelect(data, id) : any{
  let result: any = null;

  for (let j = 0; j < data.length; j++) {

    if(id == data[j].id){
      result = data[j];
      break;
    }

  }

  return result;
}

export function getElementBy(data: Array<any>, key: string, condition: any): any {
  let result: any = null;

  for (let j = 0; j < data.length; j++) {

    if(condition == data[j][key]){
      result = data[j];
      break;
    }

  }

  return result;
}

export function getSelect2List (data: Array<any>, property_name: string): Array<{id: number, text: string}> {
  let list: Array<{id:number, text:string}> = [];
  let object: any;

  data.forEach(function (element) {
    object = cloneObject(element);
    object.text = element[property_name];
    list.push(object);
  });

  return list;
}

export function getChildrenOfSelect2List(data: Array<any>): Array<any> {
  let list: Array<any> = [];

  data.forEach(function (element){
    list.push(element.children);
  });

  return list;
}

export function getTextByIdSelect2List (id, array) {
  for (let index = 0; index < array.length; index++) {
    if (array[index].id = id) return array[index].text;
  }

  return null;
}

export function insertElementInAllGroups (array: Array<any>, element: string) {
  for (let index = 0; index < array.length; index++) {
    array[index].children.push(
      {
        id: array[index].text,
        text: element
      }
    );
  }

  return array;
}

export function removeDisabledOptions(options: Array<any>) {
  let elements = [];

  options.forEach(function(option){
    if ( !option.hasOwnProperty('disabled') ) elements.push(option);
  });

  return elements;
}

export function getOptionNull (text: string): {id:number,text:string} {
  let option: any = {id:null ,text:''};
  option.id = null;
  option.text = text;
  return option;
}