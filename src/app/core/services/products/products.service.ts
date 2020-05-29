import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BananaConstants } from '../../config/constants';
import { BananaHeader } from '../../config/header';
import { Product, ProductDetail } from '../../../shared/models/product';
import { getValuesOfSelect } from '../../../shared/utils/select2Util';

@Injectable()
export class ProductsService {
  column_headers: Array<any> = [
    { type_column: 'options', tag: 'opciones', visible: 1 },
    { column_id: 230, tag: 'id', key: 'id', position: 1, visible: 0, type_column: 'id' },
    { column_id: 735, tag: 'referencia', key: 'reference', position: 1, visible: 1 },
    { column_id: 717, tag: 'nombre', key: 'name', position: 2, visible: 1 },
    { column_id: 737, tag: 'imagen', key: 'image', position: 2, visible: 1, type_column: 'image' },
    { column_id: 236, tag: 'descripcion', key: 'description', position: 3, visible: 1 },
    { column_id: 236, tag: 'condicion', key: 'condition_name', position: 3, visible: 1 },
    { column_id: 236, tag: 'impuesto', key: 'taxe_name', position: 3, visible: 1 },
    { column_id: 236, tag: 'unidad', key: 'unit_name', position: 3, visible: 1 },
    { column_id: 236, tag: 'categoria', key: 'category_name', position: 3, visible: 1 },
    { column_id: 236, tag: 'manufacturador', key: 'manufacturer_name', position: 3, visible: 1 },
    { column_id: 715, tag: 'precio', key: 'sale_price', position: 3, visible: 1 },
    { column_id: 689, tag: 'ean13', key: 'ean13', position: 3, visible: 1, type_column: 'barcode', column_param: 'EAN13' },
    { column_id: 688, tag: 'sku', key: 'sku', position: 3, visible: 0 },
    { column_id: 690, tag: 'upc', key: 'upc', position: 3, visible: 0, type_column: 'barcode', column_param: 'UPC' },
    { column_id: 695, tag: 'creado', key: 'created_at', position: 3, visible: 0 },
    { column_id: 696, tag: 'actualizado', key: 'updated_at', position: 3, visible: 0 },
    { column_id: 0, tag: 'stock', key: 'stock', position: 3, visible: 0 }
  ];

  constructor(private http: HttpClient) { }

  getResources() {
    return this.http.get(BananaConstants.urlServer + 'api/products/resources', BananaHeader());
  }

  getProductsForPriceList(body) {
    return this.http.post(BananaConstants.urlServer + 'api/products/price-list', body, BananaHeader());
  }

  getListProducts() {
    return this.http.get(BananaConstants.urlServer + 'api/products/list', BananaHeader());
  }

  getNameOfDetail(combinations, attributes, name_product) {
    let name: string = '';
    for (let i = 0; i < combinations.length; i++) {
      for (let j = 0; j < attributes.length; j++) {
        if (combinations[i] == attributes[j].id) {
          name += attributes[j].text + ' ';
          break;
        }
      }
    }

    if (name == '') name = name_product;

    return name;
  }

  getProductDetailsByParams(keys_add: Object, product_details: Array<ProductDetail>, name_properties: Array<string>, change_name_details: Array<any> = []) {
    let details: Array<any> = [];
    let detail: any = {};

    product_details.forEach(function (element) {

      name_properties.forEach(function (key) {
        detail[key] = element[key];
      });

      if (change_name_details.length > 0) {
        change_name_details.forEach(function (change) {
          detail[change.new] = element[change.old];
          delete detail[change.old];
        });
      }

      Object.keys(keys_add).forEach(function (key) {
        detail[key] = keys_add[key];
      })

      details.push(detail);
      detail = {};
    });

    return details;
  }

  getNameOfAttributesOfProduct(details: Array<any>, name_properties: Array<any>, array_resources: Array<any>) {
    let new_details: Array<any> = [];

    details.forEach(function (detail) {
      name_properties.forEach(function (property, index) {
        detail[property.name] = getValuesOfSelect(array_resources[index], detail[property.property]);
      });
      new_details.push(detail);
    });

    return new_details;
  }

  /**
   *Obtiene los productos
   *
   * @param object params
   * @returns Observable<object>
   * @memberof ProductsService
   */
  getProducts(params) {
    return this.http.get(BananaConstants.urlServer + 'api/products', BananaHeader(params));
  }

  /**
   *Obtiene los productos
   *
   * @param object params
   * @returns Observable<object>
   * @memberof ProductsService
   */
  getProductsDetails(params) {
    return this.http.get(BananaConstants.urlServer + 'api/products/details', BananaHeader(params));
  }

  UpdateImage(body) {
    return this.http.post(BananaConstants.urlServer + 'api/products/save/image', body, BananaHeader({}, true));
  }

  /**
   *Busqueda
   *
   * @param {*} keyword
   * @returns
   * @memberof ProductsService
   */
  search(keyword) {
    return this.http.get(BananaConstants.urlServer + 'api/products/filter', BananaHeader(keyword));
  }

  /**
   *Busqueda
   *
   * @param {*} keyword
   * @returns
   * @memberof ProductsService
   */
  search2(keyword) {
    return this.http.get(BananaConstants.urlServer + 'api/products/details/filter', BananaHeader(keyword));
  }

  /**
   *Obtiene el producto junto a sus detalles
   *
   * @param int id
   * @returns Observable<object>
   * @memberof ProductsService
   */
  getProduct(id) {
    return this.http.get(BananaConstants.urlServer + 'api/product/' + id, BananaHeader());
  }

  getProductDetailPriceList(body) {
    return this.http.post(BananaConstants.urlServer + 'api/product/detail/price-list', body, BananaHeader());
  }

  /**
   *Crea un producto junto a sus detalles y atributos
   *
   * @param {*} body
   * @returns
   * @memberof ProductsService
   */
  createProduct(body: any) {
    return this.http.post(BananaConstants.urlServer + 'api/products/create', body, BananaHeader());
  }

  /**
   *Actualiza un producto junto a sus detalles y atributos
   *
   * @param {*} body
   * @returns
   * @memberof ProductsService
   */
  updateProduct(body: any) {
    return this.http.put(BananaConstants.urlServer + 'api/products/update', body, BananaHeader());
  }

  /**
   *Archiva un produto
   *
   * @param {*} body
   * @returns
   * @memberof ProductsService
   */
  archivedProduct(body: any) {
    return this.http.put(BananaConstants.urlServer + 'api/products/archived', body, BananaHeader());
  }

  /**
   *Borra producto
   *
   * @param {*} id
   * @returns
   * @memberof ProductsService
   */
  deleteProduct(id) {
    return this.http.delete(BananaConstants.urlServer + 'api/products/delete/' + id, BananaHeader());
  }

  /**
   *Obtiene los detalles del producto
   *
   * @param {*} id
   * @returns
   * @memberof ProductsService
   */
  getProductDetails(id: any) {
    return this.http.get(BananaConstants.urlServer + 'api/products/details/' + id, BananaHeader());
  }

  /**
   *Crea detalles del producto
   *
   * @param {*} body
   * @returns
   * @memberof ProductsService
   */
  createProductDetails(body) {
    return this.http.post(BananaConstants.urlServer + 'api/products/details/create', body, BananaHeader());
  }

  /**
   *Actualiza detalles del producto
   *
   * @param {*} body
   * @returns
   * @memberof ProductsService
   */
  updateProductDetails(body) {
    return this.http.put(BananaConstants.urlServer + 'api/products/details/update', body, BananaHeader());
  }

  /**
   *Archiva detalle del producto
   *
   * @param {*} body
   * @returns
   * @memberof ProductsService
   */
  archivedProductDetails(body) {
    return this.http.put(BananaConstants.urlServer + 'api/products/details/archived', body, BananaHeader());
  }

  /**
   *Elimina detalle del producto
   *
   * @param {*} id
   * @returns
   * @memberof ProductsService
   */
  deleteProductDetails(id) {
    return this.http.delete(BananaConstants.urlServer + 'api/products/details/delete/' + id, BananaHeader());
  }

}
