import api from './api';


export function getStories(that, data = {}) {
    return new Promise((resolve) => {
        const handlerSuccess = (other, res) => {
            resolve(res);
        };

        const handlerError = (other, res) => {
            resolve(res);
        };

        api(that, 'stories.get', data, handlerSuccess, handlerError);
    });
}

export function addStories(that, data = {}) {
    return new Promise((resolve) => {
        const handlerSuccess = (other, res) => {
            resolve(res);
        };

        const handlerError = (other, res) => {
            resolve(res);
        };

        api(that, 'stories.add', data, handlerSuccess, handlerError);
    });
}

export function deleteStories(that, data = {}) {
    return new Promise((resolve) => {
        const handlerSuccess = (other, res) => {
            resolve(res);
        };

        const handlerError = (other, res) => {
            resolve(res);
        };

        api(that, 'stories.delete', data, handlerSuccess, handlerError);
    });
}
