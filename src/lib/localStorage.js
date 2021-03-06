import { AsyncStorage } from 'react-native';

export default (key) => ({
    load() {
        return AsyncStorage.getItem(key)
            .then((jsonState) => {
                let result = JSON.parse(jsonState) || {}
                return result
            });
    },
    save(state) {
        const jsonState = JSON.stringify(state);
        return AsyncStorage.setItem(key, jsonState);
    },
    remove() {
        return AsyncStorage.removeItem(key);
    }    
});