import {notifyUnauthorizedAction} from "./notifiers";

export let logout = () => location.assign(document.location.origin + '/logout');
export let refreshToDashboard = () => location.assign(document.location.origin + '/dashboard');
export let measuresInputUrl = (unique='', url='') => `${Laravel.baseUrl}/measures/input?unique=${unique}${url}`;
export let refreshPage = () => location.reload(true);
export let notifyUnauthorizedActionAndLogout = () => {
    notifyUnauthorizedAction();
    setTimeout(()=>logout(), 1500);
    throw new Error("Error found");
};
export let findUserCollections = (stations, collections) => {
    let foundCollections = [];
    stations.forEach(station=>{
        let collectionsFoundPerStation = collections.filter(collection=>collection.station_id === station.id);
        if(collectionsFoundPerStation.length){
            foundCollections = [...foundCollections, ...collectionsFoundPerStation]
        }
    })
    return foundCollections
};
export let findUserFromStation = (users, station) => users.find(user => user.id === station.user_id);
export let findCategoryNameFromId = (checkedCategories, allCategories) => {
    return checkedCategories.map(checkedCategoryId => allCategories.find(category=>category.id === checkedCategoryId).name)
};
export let convertCategoryNamesToStr = (categoryNames=[]) => categoryNames.map(category=>`&${category}=τιμή`).join('');
export let regexFindGreek = data => data.match(/[Α-Ωα-ωίϊΐόάέύϋΰήώΆΈΊΌΎΏΉ]+/);
export let findStationsWithCollections = (stations=[], collections=[]) => {
    let acceptedStations = [];
    stations.forEach(station => {
        let colls = collections.filter(collection => collection.station_id === station.id);
        if (colls.length) {
            acceptedStations.push(station)
        }
    });
    return acceptedStations;
};