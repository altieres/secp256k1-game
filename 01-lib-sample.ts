import * as ecc from 'tiny-secp256k1'
import { randomBytes as rand } from 'crypto'

const randomBytes = (byteCount: any) =>
  Uint8Array.from(rand(byteCount))


const seckey = randomBytes(32)
console.log('seckey', seckey)

const hash = randomBytes(32)
console.log('hash', hash)

const pubkey = ecc.pointFromScalar(seckey, true)!
console.log('pubkey', pubkey)

const signature = ecc.sign(hash, seckey)
console.log('signature', signature)

const verifyRes = ecc.verify(hash, pubkey, signature)
console.log('verifyRes', verifyRes)
