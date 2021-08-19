"use strict";
navigator.geolocation.getCurrentPosition(success,error);
function success(position){
    renderMap([position.coords.longitude,position.coords.latitude]);
}
function error(position){
    alert(position.message);
}
function renderMap(coords){
    mapboxgl.accessToken = 'pk.eyJ1IjoiZnNkLWhhY2siLCJhIjoiY2tzY3A2YWprMGl2YjJ2bnUxMGN6bmhxcyJ9.2ayA5VAKqV3j8E86ZcQJ0A';
        const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/mapbox/streets-v11', // style URL
        center: coords, // starting position [lng, lat]
        zoom: 9 // starting zoom
    });
    map.addControl(new mapboxgl.NavigationControl());
    map.addControl(
        new MapboxDirections({
        accessToken: mapboxgl.accessToken
        }),
        'top-left'
    )
    
}
