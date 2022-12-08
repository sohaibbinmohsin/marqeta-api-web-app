import { Buffer } from "buffer";

const InitObject = {};

const tokens = '58bc258f-c4ae-4397-a23e-3c901c95c620:a70ac255-7573-44a2-9354-3bff41613c57';
const encoded = Buffer.from(tokens, 'ascii').toString('base64');

InitObject.headerParameters = {
    'Content-Type': 'application/json',
    'Authorization': `Basic ${encoded}`
};

InitObject.card_product_token = "d681ab9c-ed95-41f6-b569-96abd6c0b02f";
InitObject.user_token = "";
InitObject.access_token = "";

export default InitObject;