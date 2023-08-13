import { describe, it, expect } from 'vitest';

import uaPlatformer, { getPlatformName } from '../src';

describe('ua-platformer', () => {
  describe('#getPlatformName', () => {
    it('should return the proper name of a given platform', () => {
      expect(getPlatformName('alamofire')).to.equal('Swift');
    });

    it('should capitalize the name of an unknown platform', () => {
      expect(getPlatformName('buster')).to.equal('Buster');
    });
  });

  describe('main', () => {
    describe('should detect services from amazon, google, and microsoft', () => {
      describe.each(
        Object.entries({
          Amazon: ['Amazon CloudFront', 'fulfillment-gateway'],
          Azure: [
            'azure-logic-apps/1.0 (workflow d9b23ebbf9b431d009a20df52e515db5; version 08585321966596037483) microsoft-flow/1.0',
            'azure-logic-apps/1.0 (workflow d9b23ebbf9b431d009a20df52e515db5; version 08585361194119633383)',
          ],
          Google: [
            'Google-Cloud-Tasks',
            'Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.5304.110 Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
            'Mozilla/5.0 (compatible; Google-Apps-Script; beanserver; +https://script.google.com; id: UAEmdDd89HRwe5QuGhRVjz8E2pn_H-2y-cw)',
          ],
        }),
      )('%s', (platform, useragents) => {
        it.each(useragents)('%s', useragent => {
          expect(uaPlatformer(useragent)).to.equal(platform);
        });
      });
    });

    describe('should detect known platforms', () => {
      describe.each(
        Object.entries({
          C: ['UnityPlayer/2021.3.1f1 (UnityWebRequest/1.0, libcurl/7.80.0-DEV)'],
          'C++': ['Mozilla/4.0 (compatible; Win32; WinHttp.WinHttpRequest.5)'],
          'C#': ['RestSharp/108.0.3.0'],
          Dart: ['Dart/2.18 (dart:io)'],
          Erlang: ['hackney/1.18.1'],
          Java: [
            'Apache-HttpAsyncClient/4.1.3 (Java/17.0.4.1)',
            'Apache-HttpClient/4.5 (Java/11.0.14.1)',
            'Apache-HttpClient/4.5.1 (Java/1.8.0_201)',
            'Firefly Jetty/9.4.z-SNAPSHOT',
            'Java-http-client/17.0.3.1',
            'Java/17.0.2',
            'Jersey/2.25.1 (HttpUrlConnection 1.8.0_322)',
            'ReactorNetty/1.0.20',
            'Wink Client v1.1.2',
            'groovy-2.4.4',
            'okhttp/4.9.0',
          ],
          Go: [
            'Go-http-client/2.0',
            'OT-HTTP-WC-Client',
            'go-resty/2.7.0 (https://github.com/go-resty/resty)',
            'readme-api-go-client',
          ],
          Insomnia: ['insomnia/2022.6.0'],
          Node: [
            '@diagonal-finance/sdk@2.0.3 (node 16.16.0; linux 4.14.255-276-224.499.amzn2.x86_64)',
            'Needle/2.1.2 (Node.js v10.24.1; linux x64)',
            'api (node)/5.0.1',
            'axios/1.2.0',
            'got (https://github.com/sindresorhus/got)',
            'node-fetch',
            'node-fetch/1.0 (+https://github.com/bitinn/node-fetch)',
            'node-superagent/3.8.3',
            'readmeio/6.0.1',
            'undici',
          ],
          PHP: [
            'GuzzleHttp/6.3.3 curl/7.29.0 PHP/5.6.40',
            'GuzzleHttp/6.3.3 curl/7.52.1 PHP/7.2.34-32+0~20220627.74+debian9~1.gbpc7fa3c',
            'GuzzleHttp/6.3.3 curl/7.58.0 PHP/7.3.27-9+ubuntu18.04.1+deb.sury.org+1',
            'GuzzleHttp/6.5.5 curl/7.29.0 PHP/8.1.12',
            'GuzzleHttp/7',
            'MyAfterpayModule/1.0.0 (Tringa jewelers/1.0.0; PHP/7.0.0; Merchant/12345678) https://example.com',
            'Symfony HttpClient/Curl',
            'WordPress/6.0.3; https://example.com',
          ],
          Postman: ['PostmanRuntime/7.29.2'],
          PowerShell: [
            'Mozilla/5.0 (Linux; Linux 5.4.0-1089-azure #94~18.04.1-Ubuntu SMP Fri Aug 5 12:34:50 UTC 2022; ) PowerShell/7.1.5',
            'Mozilla/5.0 (Linux; Linux 5.4.0-1094-azure #100~18.04.1-Ubuntu SMP Mon Oct 17 11:44:30 UTC 2022; en-US) PowerShell/7.2.7',
            'Mozilla/5.0 (Windows NT; Windows NT 10.0; en-US) WindowsPowerShell/5.1.22000.832',
          ],
          Python: [
            'Python-urllib/3.10',
            'Python/3.10 aiohttp/3.8.1',
            'Python/3.7 aiohttp/3.8.3',
            'python-requests/2.9.1',
            'python-urllib3/1.26.9',
          ],
          ReadMe: ['ReadMe-API-Explorer', 'rdme-github/8.1.1', 'rdme/8.1.1'],
          Ruby: [
            'Faraday v0.17.3',
            'Faraday v1.10.0',
            'Ruby',
            'Typhoeus - https://github.com/typhoeus/typhoeus',
            'rest-client/2.0.2 (linux-musl x86_64) ruby/2.7.4p191',
          ],
          Shell: ['curl/7.85.0'],
          Swift: ['Impact-dev/0.1 (com.pitcher.Impact.dev; build:102; iOS 16.1.0) Alamofire/5.4.3'],
        }),
      )('%s', (platform, useragents) => {
        it.each(useragents)('%s', useragent => {
          expect(uaPlatformer(useragent)).to.equal(platform);
        });
      });
    });

    describe('should detect browser platforms', () => {
      describe.each(
        Object.entries({
          Chrome: [
            'Mozilla/5.0 (Linux; Android 10; M2006C3LG) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Mobile Safari/537.36',
            'Mozilla/5.0 (Linux; Android 11; vivo 1906; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/87.0.4280.141 Mobile Safari/537.36 VivoBrowser/8.9.0.0',
          ],
          Edge: [
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 Edg/107.0.1418.42',
          ],
          Firefox: ['Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:108.0) Gecko/20100101 Firefox/108.0'],
          Opera: [
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36 OPR/91.0.4516.106',
          ],
          Safari: [
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Safari/605.1.15',
            'Mozilla/5.0 (iPhone; CPU iPhone OS 16_1_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.1 Mobile/15E148 Safari/604.1',
          ],
        }),
      )('%s', (platform, useragents) => {
        it.each(useragents)('%s', useragent => {
          expect(uaPlatformer(useragent)).to.equal(platform);
        });
      });
    });

    describe('unknown user agents', () => {
      it('should not recognize an empty user agent', () => {
        expect(uaPlatformer('')).toBe(false);
        expect(uaPlatformer('   ')).toBe(false);
        expect(uaPlatformer(false as unknown as string)).toBe(false);
        expect(uaPlatformer(undefined)).toBe(false);
      });

      describe('should not retrieve a platform', () => {
        it.each([
          '/1.0.0.21 CFNetwork/1390 Darwin/22.1.0',
          '1C+Enterprise/8.3',
          '1999e4893f732ba38b948dbe8d34ed48cd54f058',
          '3.1.1.0',
          'API-ROUTER',
          'Aplicação (email para contato técnico)',
          'Application',
          'Avinode',
          'BasisCode/3 CFNetwork/1399 Darwin/22.1.0',
          'Cyclr (https://cyclr.com)',
          'DataDome',
          'Design%20Air/1.1.1.2 CFNetwork/1390 Darwin/22.0.0',
          'FerreyrosCamionVR/++UE4+Release-4.26-CL-15973114 Windows/10.0.19044.1.768.64bit',
          'Gumlet-Video-Pre-Processing',
          'Gumlet-Video-Processing',
          'Integromat/production',
          'Make/production',
          'Mozilla/5.0 (compatible; CensysInspect/1.1; +https://about.censys.io/)',
          'OpenAPI-Generator/1.0.0/csharp',
          'Paw/3.4.0 (Macintosh; OS X/12.6.0) GCDHTTPRequest',
          'Readme.io API Simulator',
          'Retool/2.0 (+https://docs.tryretool.com/docs/apis)',
          'SFDC-Callout/56.0',
          'ServiceNow/1.0',
          'Square One',
          'Swagger-Codegen/1.0.0/go',
          'Swagger-Codegen/1.0.0/python',
          'Telegram Bot SDK - (https://github.com/irazasyed/telegram-bot-sdk)',
          'ToMo/0 CFNetwork/1390 Darwin/22.0.0',
          'Vercel Edge Functions',
          'Zapier',
          'adeptid-bubble-app',
          'application/json',
          'bot',
          'cargo4u',
          'chrome',
          'dash.fi/1.0',
          'hubNashville/1.10.0.5 CFNetwork/1121.2.2 Darwin/19.3.0',
          'sq-connector/v12.3.1',
          'vtex.developer-docs-integration@0.5.6',
          'x99/meliflex',
        ])('%s', useragent => {
          expect(uaPlatformer(useragent)).toBe(false);
        });
      });
    });
  });
});
