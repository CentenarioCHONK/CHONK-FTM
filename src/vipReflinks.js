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
    link: 'buy',
    address: '0x1E1C34D385375A66162c792346D65eC0B5024a0a',
  },
];