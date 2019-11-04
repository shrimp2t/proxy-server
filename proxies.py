import asyncio
from proxybroker import Broker

async def show(proxies):
    while True:
        proxy = await proxies.get()
        if proxy is None: break
        proto = 'https' if 'HTTPS' in proxy.types else 'http'
        row = '%s://%s:%d' % (proto, proxy.host, proxy.port)
        print( '%s' % row )


def main():
    countries = ['US']
    proxies = asyncio.Queue()
    broker = Broker(proxies)
    loop = asyncio.get_event_loop()
    tasks = asyncio.gather(broker.find(types=['HTTP', 'HTTPS'], countries=countries, limit=100), show(proxies))
    loop.run_until_complete(tasks)


if __name__ == '__main__':
    main()
