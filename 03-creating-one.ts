import * as ecc from 'tiny-secp256k1'
import { createHash } from 'crypto'

const fromHexString = (hexString: string): Uint8Array =>
  Uint8Array.from(hexString.match(/.{1,2}/g)!.map((byte) => parseInt(byte, 16)))

const toHexString = (bytes: Uint8Array) =>
  bytes.reduce((str, byte) => str + byte.toString(16).padStart(2, '0'), '')

const sha256 = (buffer: Buffer): Buffer =>
  createHash('sha256').update(buffer).digest()

// check first block
// const message = 'There is nothing too shocking about this signature'
// const signatureBase16 = 'ffffffff077b7209dc866fbfa0d2bf67a0c696afffe57a822e2ba90059a2cc7abb998becb4e427650e282522bf9576524665301b807c0e3194cf1e6c795a0cf7'

// new block! :)
const message = 'Got your point!'
const signatureBase16 = 'aaaa0000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000a00000000000000000000000000000000'

const fullMessage = `Bitcoin Signed Message:\n${message}`
const hashBuff = Buffer.from(fullMessage, 'utf8')
const hashDblSha = sha256(sha256(hashBuff))
const hash = Uint8Array.from(hashDblSha)
console.log('hash', hash)

const signature = fromHexString(signatureBase16)
console.log('signature', signature)

const recovered = ecc.recover(hash, signature, 0, true)
console.log('recovered', recovered)

const verifyRes = ecc.verify(hash, recovered!, signature)
console.log('verifyRes', verifyRes)

const pubkey = toHexString(recovered!)
console.log('pubkey', pubkey)

console.log('generate address:', `bx sha256 ${pubkey} | bx ripemd160 | bx address-encode`)
