
import axios from "axios";
export default function handler(req, res) {
  const api = "plPhDK6AiKeqXxTgbmFOVkKEfmlnDaGS"
console.log(req.body);

var config = {
  method: 'post',
  url: 'https://thentic.tech/api/nfts/contract',
  headers: { 
    'Content-Type': 'application/json'
  },
  data : JSON.stringify(req.body)
};

axios(config)
.then(function (response) {
  res.status(200).json(response.data)
})
}
