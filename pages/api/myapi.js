
import axios from "axios";
export default function handler(req, res) {
  const api = "plPhDK6AiKeqXxTgbmFOVkKEfmlnDaGS"
console.log("body",req.body.url);

var data = req.body;
let url = req.body.url;
let method =req.body.method;
delete data.method;
delete data.url;
console.log('data :>> ', data);
console.log('url :>> ', url);
var config = {
  method: method,
  url: url,
  headers: { 
    'Content-Type': 'application/json'
  },
  data : JSON.stringify(data)
};

axios(config)
.then(function (response) {
  res.status(200).json(response.data)
})
}
