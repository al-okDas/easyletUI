
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}
function showPosition(position) {
    sessionStorage.setItem("userLocation", JSON.stringify({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
    }));
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    displayMap(latitude, longitude);

}
function displayMap(latitude, longitude) {
    let map = new mappls.Map('map', {
        center: { lat: latitude, lng: longitude },
        fullscreenControl: false,
        zoomControl: true
    });
}
function showError(error) {
    var errorMessage = "An error occurred: ";
    var permissionError = false;
    switch (error.code) {
        case error.PERMISSION_DENIED:
            let map = new mappls.Map('map', { center: { lat: 20.296059, lng: 85.824539 } });
            permissionError = true;
            break;
        case error.POSITION_UNAVAILABLE:
            errorMessage += "Location information is unavailable.";
            break;
        case error.TIMEOUT:
            errorMessage += "The request to get user location timed out.";
            break;
        default:
            errorMessage += "An unknown error occurred.";
    }
    if (!permissionError) {
        alert(errorMessage);
    }
}
export function begin() {
    
        if (sessionStorage.getItem("userLocation")) {
            // Use the stored location data if available
            const locationData = JSON.parse(sessionStorage.getItem("userLocation"));
            displayMap(locationData.latitude, locationData.longitude);
        } else {
            // Location data not found, request permission again
            getLocation();
        }
   
}
