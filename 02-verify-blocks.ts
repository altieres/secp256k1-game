import * as ecc from 'tiny-secp256k1'
import { createHash } from 'crypto'

const fromHexString = (hexString: string): Uint8Array =>
  Uint8Array.from(hexString.match(/.{1,2}/g)!.map((byte) => parseInt(byte, 16)))

const sha256 = (buffer: Buffer): Buffer =>
  createHash('sha256').update(buffer).digest()


const blocks = [
  {
    address: '14XRkEAVr8zBdHDpkiQkgWHdEUjoLf5gHG',
    message: 'Nice message!',
    publicKey: '03fed78d4d4c71722ea68b70e59b3f81ccef3d7dd95a10e21afe780f898efe491d',
    signatureBase16: 'cccc0000000000000000000000000000000000000000000000c00000000000000000000000000000000000000000000c00000000000000000000000000000000',
  },
  {
    address: '1PwEjaEVfhhYsN6kMy1NPykVkQfXK4Ywrq',
    message: 'Got your point!',
    publicKey: '035367691c2e63dfbe570d51abadff55171706c19b260430c31e7de49d91e5af85',
    signatureBase16: 'aaaa0000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000a00000000000000000000000000000000',
  },
]

blocks.forEach(block => {
  const fullMessage = `Bitcoin Signed Message:\n${block.message}`
  const hashBuff = Buffer.from(fullMessage, 'utf8')
  const hashDblSha = sha256(sha256(hashBuff))
  const hash = Uint8Array.from(hashDblSha)
  // console.log('hash', hash)

  const pubkey = fromHexString(block.publicKey)
  // console.log('pubkey', pubkey)

  const signature = fromHexString(block.signatureBase16)
  // console.log('signature', signature)

  const verifyRes = ecc.verify(hash, pubkey, signature)
  console.log('verifyRes', verifyRes)
})
