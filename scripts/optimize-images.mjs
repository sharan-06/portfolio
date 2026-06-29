import sharp from 'sharp'
import path from 'path'

// Hero photo → WebP, max 600px wide
await sharp('./public/sharavanan.png')
  .resize(600, null, { withoutEnlargement: true, fit: 'inside' })
  .webp({ quality: 82 })
  .toFile('./public/sharavanan.webp')
console.log('Hero image → sharavanan.webp')

// Project thumbnails — all live directly in /public/
const projectImages = [
  'innsole.png',
  'printe.png',
  'highnoontrivia.png',
  'sololevelling.png',
  'crowdshield.png',
]

for (const file of projectImages) {
  const input  = path.join('./public', file)
  const output = path.join('./public', file.replace(/\.png$/i, '.webp'))
  await sharp(input)
    .resize(800, null, { withoutEnlargement: true, fit: 'inside' })
    .webp({ quality: 75 })
    .toFile(output)
  console.log(`Converted: ${file} → ${file.replace(/\.png$/i, '.webp')}`)
}
