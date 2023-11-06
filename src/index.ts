import UAParser from 'ua-parser-js';

const PLATFORMS = {
  aiohttp: 'Python', // https://docs.aiohttp.org/en/stable/
  alamofire: 'Swift', // https://github.com/Alamofire/Alamofire
  axios: 'Node',
  csharp: 'C#',
  curl: 'Shell',
  dart: 'Dart',
  faraday: 'Ruby', // https://github.com/lostisland/faraday
  insomnia: 'Insomnia', // https://insomnia.rest/
  java: 'Java',
  'java-http-client': 'Java', // https://openjdk.org/groups/net/httpclient
  jersey: 'Java', // https://eclipse-ee4j.github.io/jersey/
  jetty: 'Java', // https://www.eclipse.org/jetty/
  hackney: 'Erlang', // https://hexdocs.pm/hackney/
  httpie: 'HTTPie', // https://httpie.io/cli
  'go-http-client': 'Go', // https://pkg.go.dev/net/http
  'go-resty': 'Go', // https://github.com/go-resty/resty
  'google-apps-script': 'Google',
  'google-cloud-tasks': 'Google',
  googlebot: 'Google',
  got: 'Node', // https://npm.im/got
  groovy: 'Java', // https://groovy-lang.org/
  guzzlehttp: 'PHP', // https://docs.guzzlephp.org/en/stable/
  libcurl: 'C',
  okhttp: 'Java', // https://github.com/square/okhttp
  'ot-http-wc-client': 'Go',
  php: 'PHP',
  postman: 'Postman',
  powershell: 'PowerShell',
  'python-requests': 'Python',
  'python-urllib': 'Python',
  'python-urllib3': 'Python',
  node: 'Node',
  rdme: 'ReadMe',
  'rdme-github': 'ReadMe',
  reactornetty: 'Java', // https://github.com/reactor/reactor-netty
  readmeio: 'Node',
  'readme-api-explorer': 'ReadMe',
  'readme-api-go-client': 'Go',
  'readme-metrics-php': 'PHP',
  restsharp: 'C#',
  ruby: 'Ruby',
  symfony: 'PHP',
  typhoeus: 'Ruby', // https://github.com/typhoeus/typhoeus
  undici: 'Node',
  windowspowershell: 'PowerShell',
  winhttp: 'C++',
  'wink client': 'Java', // http://wink.incubator.apache.org
  wordpress: 'PHP',
};

export function getPlatformName(platform: string): string {
  if (platform.toLowerCase() in PLATFORMS) {
    return PLATFORMS[platform.toLowerCase() as keyof typeof PLATFORMS];
  }

  return platform.charAt(0).toUpperCase() + platform.slice(1);
}

/**
 * Parse out a given `User-Agent` header value and extract the platform that it came from. If a
 * platform is unable to be determined, `false` is returned.
 *
 */
export default function uaPlatformer(useragent: string): false | string {
  if (!useragent) {
    return false;
  }

  const ualower = useragent.toLowerCase();

  // Is this user agent from some service at Amazon, Google, or Microsoft (like Amazon Cloudfront,
  // Google Cloud Tasks, or Azure Logic Apps).
  if (ualower.startsWith('amazon') || ualower === 'fulfillment-gateway') {
    return 'Amazon';
  } else if (ualower.startsWith('google')) {
    return 'Google';
  } else if (ualower.startsWith('azure')) {
    return 'Azure';
  }

  // Does this user agent contain platform or client that we know about?
  const rgx = new RegExp(`(^|[(| ])(?<agent>${Object.keys(PLATFORMS).join('|')})([/| ]?v?[\\d.]+)?`, 'i');
  const platform = useragent.match(rgx);
  if (platform?.groups) {
    return getPlatformName(platform.groups.agent);
  }

  // Is this a browser?
  const parser = new UAParser(useragent).getResult();
  if (parser.browser.name) {
    // We don't need to differentiate here between `Chrome`, `Chromium` or `Chrome WebView`.
    if (parser.browser.name.startsWith('Chrome')) {
      return 'Chrome';
    } else if (parser.browser.name === 'Mobile Safari') {
      return 'Safari';
    }

    return parser.browser.name;
  }

  return false;
}
