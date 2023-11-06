# @readme/ua-platformer

[`ua-platformer`](https://github.com/readmeio/ua-platformer) is a library to determine the platform of a given `User-Agent` header. This library supports platform detection on a wide variety of cloud platforms, GitHub workflows, HTTP libraries, programming languages, and web browsers.

[![Build](https://github.com/readmeio/ua-platformer/workflows/CI/badge.svg)](https://github.com/readmeio/ua-platformer/) [![](https://img.shields.io/npm/v/@readme/ua-platformer)](https://npm.im/@readme/ua-platformer)

## Install

```
npm install --save @readme/ua-platformer
```

## Usage

```javascript
import uaPlatformer from '@readme/ua-platformer';

const useragent = 'Mozilla/5.0 (Windows NT; Windows NT 10.0; en-US) WindowsPowerShell/5.1.22000.832'

console.log(uaPlatformer(useragent)); // { name: 'PowerShell', browser: false }
```

## Examples

| User Agent | Platform |
| :--- | :--- |
| Amazon Cloudfront | `Amazon` |
| GuzzleHttp/6.5.5 curl/7.29.0 PHP/8.1.12 | `PHP` |
| Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.5304.110 Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html) | `Google` |
| Mozilla/5.0 (Windows NT; Windows NT 10.0; en-US) WindowsPowerShell/5.1.22000.832 | `PowerShell` |
| Faraday v1.10.0 | `Ruby`|
| rdme-github/8.1.1 | `ReadMe` |
| Typhoeus - https://github.com/typhoeus/typhoeus | `Ruby` |
| WordPress/6.0.3; https://example.com | `PHP` |
