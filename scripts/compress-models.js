/**
 * compress-models.js — Full GLB Optimization Pipeline
 *
 * What it does (in order):
 *  1. Decode existing Draco compression
 *  2. Weld + flatten + join + dedup + prune  (geometry cleanup)
 *  3. Simplify mesh triangles (reduce 40-45%)
 *  4. Compress embedded JPEG textures → WebP @ 70% quality
 *  5. Re-encode geometry with aggressive Draco + quantization
 *
 * Expected output:
 *  Logo3d.glb:  5.4 MB → ~1.3 MB  (-75%)
 *  Baul3d.glb:  8.6 MB → ~1.8 MB  (-79%)
 */

import { NodeIO } from '@gltf-transform/core';
import { KHRONOS_EXTENSIONS } from '@gltf-transform/extensions';
import {
  dedup, prune, draco, quantize, simplify,
  flatten, join, weld, textureCompress,
} from '@gltf-transform/functions';
import { MeshoptSimplifier } from 'meshoptimizer';
import draco3d from 'draco3d';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, '..', 'public');

const models = [
  { input: 'Logo3d.glb', output: 'Logo3d.glb', simplifyRatio: 0.55 },
  { input: 'Baul3d.glb', output: 'Baul3d.glb', simplifyRatio: 0.60 },
];

const formatMB  = (b) => (b / 1024 / 1024).toFixed(2) + ' MB';
const formatPct = (before, after) => (((before - after) / before) * 100).toFixed(1) + '%';

async function buildIO() {
  const [decoder, encoder] = await Promise.all([
    draco3d.createDecoderModule(),
    draco3d.createEncoderModule(),
  ]);
  return new NodeIO()
    .registerExtensions(KHRONOS_EXTENSIONS)
    .registerDependencies({ 'draco3d.decoder': decoder, 'draco3d.encoder': encoder });
}

async function compressModel(io, { input, output, simplifyRatio }) {
  const inputPath  = path.join(publicDir, input);
  const outputPath = path.join(publicDir, output);
  const backupPath = path.join(publicDir, input.replace('.glb', '.backup.glb'));

  const backupSrc = fs.existsSync(backupPath) ? backupPath : inputPath;
  const sizeBefore = fs.statSync(backupSrc).size;

  console.log(`\n📦  ${input}  (${formatMB(sizeBefore)} original)`);

  // Always work from the backup if it exists (so we never double-compress)
  if (!fs.existsSync(backupPath)) {
    fs.copyFileSync(inputPath, backupPath);
    console.log(`    💾 Backup saved → ${path.basename(backupPath)}`);
  } else {
    // Restore from backup before re-compressing
    fs.copyFileSync(backupPath, inputPath);
    console.log(`    ♻️  Restored from backup`);
  }

  console.log('    🔓 Decoding existing Draco…');
  const doc = await io.read(inputPath);

  // Show texture breakdown before compression
  const textures = doc.getRoot().listTextures();
  let texBytesBefore = 0;
  textures.forEach(t => { texBytesBefore += t.getImage()?.byteLength ?? 0; });
  console.log(`    🖼️  Textures: ${textures.length} files, ${formatMB(texBytesBefore)} total (JPEG)`);

  console.log('    ⚙️  Running optimization pipeline…');
  await doc.transform(
    // ── Geometry cleanup ──────────────────────────────────────────────────
    weld({ tolerance: 0.0001 }),
    flatten(),
    join(),
    dedup(),
    prune(),

    // ── Mesh simplification (reduce triangle count) ────────────────────────
    simplify({
      simplifier: MeshoptSimplifier,
      ratio: simplifyRatio,   // keep X% of polys
      error: 0.005,
    }),

    // ── Texture: JPEG → WebP 70% quality ──────────────────────────────────
    // WebP is ~60-70% smaller than JPEG at equivalent visual quality.
    // The 1024px cap is more than enough for a 260px on-screen element.
    textureCompress({
      encoder: sharp,
      targetFormat: 'webp',
      resize: [1024, 1024],
      quality: 70,
    }),

    // ── Geometry quantization ──────────────────────────────────────────────
    quantize({
      quantizePosition: 14,
      quantizeNormal:   10,
      quantizeTexcoord: 12,
      quantizeColor:    8,
    }),

    // ── Draco re-encode ────────────────────────────────────────────────────
    draco({
      method: 'edgebreaker',
      encodeSpeed: 0,
      decodeSpeed: 5,
      quantizePosition: 14,
      quantizeNormal:   10,
      quantizeTexcoord: 12,
      quantizeColor:    8,
    }),
  );

  // Show texture breakdown after
  let texBytesAfter = 0;
  doc.getRoot().listTextures().forEach(t => { texBytesAfter += t.getImage()?.byteLength ?? 0; });
  console.log(`    🗜️  Textures after WebP: ${formatMB(texBytesAfter)} (-${formatPct(texBytesBefore, texBytesAfter)})`);

  console.log('    💾 Writing…');
  await io.write(outputPath, doc);

  const sizeAfter = fs.statSync(outputPath).size;
  console.log(`    ✅  ${formatMB(sizeBefore)} → ${formatMB(sizeAfter)} (saved ${formatPct(sizeBefore, sizeAfter)})`);

  return { sizeBefore, sizeAfter };
}

async function main() {
  console.log('\n🚀  Off Basic — GLB Compression Pipeline');
  console.log('==========================================');

  await MeshoptSimplifier.ready;
  const io = await buildIO();

  let totalBefore = 0;
  let totalAfter  = 0;

  for (const model of models) {
    const { sizeBefore, sizeAfter } = await compressModel(io, model);
    totalBefore += sizeBefore;
    totalAfter  += sizeAfter;
  }

  console.log('\n==========================================');
  console.log('📊  TOTAL RESULTS');
  console.log(`    Before : ${formatMB(totalBefore)}`);
  console.log(`    After  : ${formatMB(totalAfter)}`);
  console.log(`    Saved  : ${formatPct(totalBefore, totalAfter)} smaller\n`);
}

main().catch(err => {
  console.error('\n❌  Error:', err.message);
  console.error(err.stack);
  process.exit(1);
});
