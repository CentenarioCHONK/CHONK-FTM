export const addressRegex = RegExp(`^[?]ref[=]0x[a-zA-Z0-9]{40}$`);
export const cookieExpirationDate = new Date(Date.UTC(new Date().getUTCFullYear() + 420, new Date().getUTCMonth()));

export function GetAddress(reflink) {
  let vIPAddress;
  vIPReflinks.forEach((item) => {
    const {link, address} = item;
    if (link === reflink) {
      vIPAddress = address;
    }
  });
  return vIPAddress;
}

const vIPReflinks = [
  {
    link: 'start',
    address: '0x04e6a6a18b87263c1e51a497723888da7FBFfBc7',
  },
  {
    link: 'dividends',
    address: '0x6c93e995f9AaB014B908bb87BCd3268a135e53E0',
  },
  {
    link: 'buy',
    address: '0x1E1C34D385375A66162c792346D65eC0B5024a0a',
  }
];