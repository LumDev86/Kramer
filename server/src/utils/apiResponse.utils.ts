/**
 * Construye un objeto de respuesta para la API con un indicador de éxito y un payload opcional.
 *
 * @param success - Indica si la solicitud a la API fue exitosa.
 * @param payload - Los datos devueltos por la solicitud a la API, si los hay.
 * @returns Un objeto con las propiedades `success` y `payload`.
 */
const apiResponse = (success: boolean, payload: object | null): object => {
    return {
        success,
        payload,
    };
};

export default apiResponse;
