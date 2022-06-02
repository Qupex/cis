import fetch from 'node-fetch'
import unzipper from 'unzipper'
import fs from 'node:fs'
import license from './license/license.json' assert {type: 'json'}


const base_url = 'https://sbp-api.cisecurity.org'
const token = '5c9b3ff5b715d2c5e9b66d52803e0b27b5602ce84df481d62d2a83524e841efa'

// https://optimusapi.readthedocs.io/en/latest/
const getBenchmarks = async () => {
    const options = {
        method: 'GET'
    }

    return fetch(`${base_url}/benchmarks`, options)
        .then(response => response.json())
        .catch(error => console.log(error))
}

// https://optimusapi.readthedocs.io/en/latest/endpoints/license-verification/
const getToken = async () => {

    const body = license.securesuite_member_license.join('\n')

    const options = {
        method: 'POST',
        body: body
    }

    return fetch(`${base_url}/license`, options)
        .then(response => response.json())
        .catch(error => console.log(error))
}

// https://optimusapi.readthedocs.io/en/latest/
const getBenchmark = async (token, bid) => {

    const options = {
        method: 'GET',
        headers: {
            'X-SecureSuite-Token': token
        }
    }

    const response = await fetch(`${base_url}/benchmarks/${bid}/JSON`, options)
    if (!response.ok) throw new Error(`unexpected response ${response.statusText}`)
    // const file_name = response.headers.get('content-disposition').match(/(?<=filename=).*$/)[0]

    const stream2buffer = stream => {
        return new Promise((resolve, reject) => {
            const _buf = [];
    
            stream.on("data", (chunk) => _buf.push(chunk))
            stream.on("end", () => resolve(Buffer.concat(_buf)))
            stream.on("error", (err) => reject(err))
        })
    } 

    const buff = await stream2buffer( response.body.pipe(unzipper.ParseOne()) )
    const benchmark = await JSON.parse(buff.toString())

    return benchmark
}

await getBenchmark(token, 4225)