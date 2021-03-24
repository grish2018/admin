import { syncScrypt } from "scrypt-js";

function hexToBase64(str: string): string {
  return btoa(
    String.fromCharCode.apply(
      null,
      str
        .replace(/\r|\n/g, "")
        .replace(/([\da-fA-F]{2}) ?/g, "0x$1 ")
        .replace(RegExp(" +$"), "")
        .split(" ")
        .map(el => +el)
    )
  );
}

function log2(n: number): number {
  let log = 0;
  if ((n & 0xffff0000) !== 0) {
    n >>>= 16;
    log = 16;
  }
  if (n >= 256) {
    n >>>= 8;
    log += 8;
  }
  if (n >= 16) {
    n >>>= 4;
    log += 4;
  }
  if (n >= 4) {
    n >>>= 2;
    log += 2;
  }
  log = log + (n >>> 1);
  return log;
}

export default (password: string): string => {
  const enc = new TextEncoder();
  const passwordArray = enc.encode(password);

  // формируем scrypt hash
  const N = 2048;
  const r = 8;
  const p = 1;
  const dkLen = 32;

  // генерим случайную соль каждый раз
  const saltBuffer = new Uint8Array(16);
  window.crypto.getRandomValues(saltBuffer);

  const saltHex: string = Array.prototype.map
    .call(saltBuffer, x => (`00${x.toString(16)}`).slice(-2))
    .join("");

  const hashHex = Array.prototype.map
    .call(syncScrypt(passwordArray, saltBuffer, N, r, p, dkLen), x =>
      (`00${x.toString(16)}`).slice(-2)
    )
    .join("");

  // собственно сам хэш
  // let hashHex = scrypt(this.password!!, saltBuffer, N, r, p, dkLen).toString('hex');

  let params: number | string = (log2(N) << 16) | (r << 8) | p;
  params = params.toString(16);
  const hash =
    `$s0$${params}$${hexToBase64(saltHex)}$${hexToBase64(hashHex)}`;
  // eslint-disable-next-line no-console
  console.log(`password hash: ${hash}`);
  return hash;
};
