const axios = require('axios')

export const Http = async (
  url,
  method,
  data,
) => (
  axios({
    method,
    url,
    data,
  })
    .then((response) => {
      return response
    }).catch((err) => {
      return err.response
    })
)

export const HttpGet = async (
  url,
  method,
) => (
  axios({
    method,
    url,
  })
    .then((response) => {
      let err = {
        response: {
          status: 404
        }
      }
      return response
    }).catch(err => {
      return err.response
    })
)