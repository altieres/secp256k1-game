import * as ecc from 'tiny-secp256k1'
import { createHash } from 'crypto'

const fromHexString = (hexString: string): Uint8Array =>
  Uint8Array.from(hexString.match(/.{1,2}/g)!.map((byte) => parseInt(byte, 16)))

const sha256 = (buffer: Buffer): Buffer =>
  createHash('sha256').update(buffer).digest()


const blocks = [
  {
    address: '13yaSqGNDzt1mNW4vrKM9CvD46cTavNabF',
    message: 'There is nothing too shocking about this signature',
    publicKey: '02000000000005689111130e588a12ecda87b2dc5585c6c6ba66a412fa0cce65bc',
    signatureBase16: 'ffffffff077b7209dc866fbfa0d2bf67a0c696afffe57a822e2ba90059a2cc7abb998becb4e427650e282522bf9576524665301b807c0e3194cf1e6c795a0cf7',
  },
  {
    address: '1MkanKef93F1iNLKvyijrbbW2k5VaXzDvA',
    message: 'Nor this, given a bit of algebra.',
    publicKey: '03742088316dacf400cea17fdea1dba3bc1e1f58ac0f852fd85545b0ba7ebaee79',
    signatureBase16: '10000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000001000000000000000000000000000',
  },
  {
    address: '13see6qjfupx1YWgRefwEkccZeM8QGTAiJ',
    message: 'But can you explain this one?',
    publicKey: '0200000000000000000000003b78ce563f89a0ed9414f5aa28ad0d96d6795f9c63',
    signatureBase16: 'deadbeef2f4a23b0f1954100b76bcb720f7b2ddc4a446dc06b8ffc4e143286e1e441f5f1583f300022ad3d134413a212581bcd36c20c7840d15b4d6b8e8f177f',
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
