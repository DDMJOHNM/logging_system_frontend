export function logDetailsMask(payload: any): any {
  
    const maskedPayload = {...payload}
    const maskedPayloadObject = JSON.parse(maskedPayload.output)
    
    if (maskedPayloadObject.name) {
        maskedPayloadObject.name = '********'
    }
    if (maskedPayloadObject.email) {
        maskedPayloadObject.email = '********'
    }
    if (maskedPayloadObject.password) {
        maskedPayloadObject.password = '********'
    }

    maskedPayload.output = JSON.stringify(maskedPayloadObject)
    console.log(maskedPayload)
    return maskedPayload
}

