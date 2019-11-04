import asyncio
from proxybroker import Broker

async def show(proxies):
    while True:
        proxy = await proxies.get()
        if proxy is None: break
        proto = 'https' if 'HTTPS' in proxy.types else 'http'
        row = '%s://%s:%d\n' % (proto, proxy.host, proxy.port)
        print( '%s\n' % proxy )

countries = ['US']
proxies = asyncio.Queue()
broker = Broker(proxies)
tasks = asyncio.gather( broker.find(broker.find(types=['HTTP', 'HTTPS'], countries=countries, limit=10), show(proxies))

loop = asyncio.get_event_loop()
loop.run_until_complete(tasks)

