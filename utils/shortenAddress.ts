export function shortenAddress(address: string): string {
  const prefixLen = 4;
  const suffixLen = 4;

  if (address.length < prefixLen + suffixLen) {
    return address;
  }

  return (
    address.substring(0, prefixLen) + "\u2026" + 
      address.substring(address.length - suffixLen)
  );
}
