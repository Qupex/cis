# Extract benchmarks from CIS

Extract API that pulls from CIS [SecureSuite Member API](https://optimusapi.readthedocs.io/en/latest/) 

## getBenchmarks

Returns a json object with all a list of information about all the avaialble benchmarks

## getToken

Retruns a valid token to be used in `getBenchamrk` requires a valid licens in the project dir

## getBenchmark

Returns a benchmark given the security `token` and a benchmark id `bid`. Benchmark id can be found in the list given by `getBenchmarks`

This method fetches a zip file that is then unzipped and a json object is created and returned by the function.


## Leftover code

This snippet can be used to create a json file 

```js
    response.body.pipe(unzipper.Parse())
        .on('entry', (entry) => {
            const fileName = entry.path
            const type = entry.type // dir or file
            const size = entry.vars.uncompressedSize
            console.log(`entry: ${fileName}\t${type}`)
            entry.pipe(fs.createWriteStream(`./${fileName}`))
        })
        .on('error', () => {throw new Error('entry') })
```

## Useful links

Information about zip
https://stackoverflow.com/questions/10308110/simplest-way-to-download-and-unzip-files-in-node-js-cross-platform


Library used for unzipping
https://www.npmjs.com/package/unzipper