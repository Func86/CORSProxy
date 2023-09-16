# CORSProxy

 CORS Proxy interface for MediaWiki.

# Usage

Example:

```php
wfLoadExtension( 'CORSProxy' );
$wgCORSProxyPrefix = 'https://cors-proxy.example.com/';
$wgCORSProxyDomainList = [ 'example.com' ];
```

Run your own CORS proxy backend that supports http2:

```python
import httpx
from quart import Quart, request

app = Quart(__name__)
app.url_map.merge_slashes = False
app.url_map.strict_slashes = False
client = httpx.AsyncClient(http2=True)

@app.route(r"/https://example.com/<path:path>")
async def proxy(path):
    response = await client.get('https://example.com/' + path, params=request.args)
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response.content, int(response.status_code), dict(response.headers)

if __name__ == "__main__":
    app.run()
```
