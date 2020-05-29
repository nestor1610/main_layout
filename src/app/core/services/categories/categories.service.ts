import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BananaConstants } from '../../config/constants';
import { BananaHeader } from '../../config/header';
import { getSelect2List } from '../../../shared/utils/select2Util';
import { groupByParent } from '../../../shared/utils/arrayUtil';

@Injectable()
export class CategoriesService {

  constructor(private http: HttpClient) { }

  findParentCategory(category_id: number, categories: Array<any>): any {
    let category: any = null;
    let parent_id: number = null;

    function findParentCategoryId(id: number, categories: Array<any>): any {
      let parent_id: any = null;

      categories.forEach(function (element) {
        if (element.id == id) {
          parent_id = element.parent_id;
          return;
        }
      });

      return parent_id
    }

    parent_id = findParentCategoryId(category_id, categories);

    if ( parent_id != null ) {
      categories.forEach(function (element, index) {
        if (element.id == parent_id) {
          category = element;
          // category.index = index;
          return;
        }
      });
    }

    return category;
  }

  findChildrensCategory (category_id: number, categories: Array<any>) {
    let childrens: Array<any> = [category_id];
    let index: number = 0;
    let childrens_current: Array<any> = [];

    function getWhoReport(id: number, data: Array<any>)
    {
      let array: Array<any> = [];

      data.forEach(function(element){
        if (element.parent_id == id)
          array.push(element.id);
      });

      return array;

    }

    do {

      childrens_current = getWhoReport(childrens[index], categories);

      if ( childrens_current.length > 0 )
        childrens = childrens.concat(childrens_current);

      index++;

    } while ( childrens[index] !== undefined );

    return childrens;
  }

  viewParentCategory (category_id: number, data: Array<any>, category_name: string) {
    let parent_name: string = '';
    let flag: boolean = true;
    let parent: any = null;

    do {

      parent = this.findParentCategory(category_id, data);

      if ( parent == null )
				flag = false;
			else {
				parent_name += '—';
				category_id = parent.id;
			}

    } while (flag);

    return parent_name + category_name;
  }

  // viewParent (category_id: number, data: Array<any>, category_name: string) {
  //   let parent_name: string = '';
  //   let flag: boolean = true;
  //   let parent: any = null;

  //   // do {

  //     parent = this.findParentCategory(category_id, data);

  //     if ( parent == null )
		// 		flag = false;
		// 	else {
		// 		parent_name += '—';
		// 		category_id = parent.id;
		// 	}

  //   // } while (flag);

  //   return parent_name + category_name;
  // }


  getNameOfParentCategories (categories) {
    // let clone = cloneObject(categories);
    let list: Array<any> = [];


    for (let index = 0; index < categories.length; index++) {
      let element: any = {};
      Object.keys(categories[index]).forEach(function (key) {
        element[key] = categories[index][key];
      });
      element.name = this.viewParentCategory(categories[index].id, categories, categories[index].name);
      list.push(element);
    }

    return getSelect2List(list, 'name')/* list */;
  }


  groupByCategoryParent (categories: Array<any>, key_parent: string = 'parent_id') {
    return groupByParent(categories, key_parent);
  }

  /**
   * Obtiene las categorias
   *
   * @param {*} params
   * @returns Observable<object>
   * @memberof CategoriesService
   */
  getCategories(params) {
    return this.http.get(BananaConstants.urlServer+'api/categories', BananaHeader(params));
  }

  search (params) {
		return this.http.get(BananaConstants.urlServer+'api/categories/filter', BananaHeader(params));
	}

  /**
   * Crea una categoria
   *
   * @param {*} body
   * @returns Observable<object>
   * @memberof CategoriesService
   */
  createCategory (body) {
    return this.http.post(BananaConstants.urlServer + 'api/categories/create', body, BananaHeader());
  }

  /**
   * Actualiza una categoria
   *
   * @param {*} body
   * @returns Observable<object>
   * @memberof CategoriesService
   */
  updateCategory (body) {
    return this.http.put(BananaConstants.urlServer + 'api/categories/update', body, BananaHeader());
  }

  /**
   * Archiva una categoria
   *
   * @param {*} body
   * @returns Observable<object>
   * @memberof CategoriesService
   */
  archivedCategory (body) {
    return this.http.put(BananaConstants.urlServer + 'api/categories/archived', body, BananaHeader());
  }

  /**
   * Elimina una categoria
   *
   * @param {*} id
   * @returns Observable<object>
   * @memberof CategoriesService
   */
  deleteCategory (id) {
    return this.http.delete(BananaConstants.urlServer + 'api/categories/delete/' + id, BananaHeader());
  }

}
