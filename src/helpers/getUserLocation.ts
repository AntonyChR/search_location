export const getUserLocation = async (): Promise<[number, number]> => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(({ coords }) => {
            resolve([coords.longitude, coords.latitude])
        }, (error) => {
            alert('No se puedo obtener la geolocalización');
            console.log(error)
        })
    });
}