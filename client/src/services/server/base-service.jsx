import Axios from 'axios';
import configData from '../../config.json';

const SERVER_URL = configData.SERVER_URL;

async function processRequest(promise) {
  return new Promise(function (resolve, reject) {
    promise
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        if (data.status && data.status.indexOf('OK') > -1) {
          let model;
          if (data.collection) {
            model = data.model;
          } else {
            model = data.model ? data.model[0] : null;
          }
          resolve(model);
        } else {
          reject({ message: 'Unhandled error.'});
        }
      })
      .catch((error) => {
        if (error.response) {
          return error.response.data;
        } else {
          return {message: error.toString()};
        }
      })
      .then((errorData) => {
        if (errorData) {
          reject(errorData);
        }
      });
  });
}

export async function get(url, body) {
  return await processRequest(Axios.get(SERVER_URL + url, body));
}

export async function findById(url, id) {
  return get(url + '/' + id);
}

export async function post(url, body) {
  return await processRequest(Axios.post(SERVER_URL + url, body));
}

export async function postPaginator(url, pageFrom, pageSize, projectionFieldsParam, filtersParam) {
  var formdata = { pageFrom, pageSize }

  if (projectionFieldsParam) {
    var projectionFields = ['id']
    
    projectionFieldsParam.forEach((projectionField) => {
      projectionFields.push(projectionField);
    });
  
    formdata.projectionFields = projectionFields;
  }

  formdata.filters = filtersParam;
  
  return post(url, formdata);
}

export async function put(url, body) {
  return await processRequest(Axios.put(SERVER_URL + url, body));
}

export async function remove(url, id) {
  return await processRequest(Axios.delete(SERVER_URL + url + '/' + id));
}
