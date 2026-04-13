/**
 * inspect-models.js — Diagnoses GLB content breakdown
 */
import { NodeIO } from '@gltf-transform/core';
import { KHRONOS_EXTENSIONS } from '@gltf-transform/extensions';
import draco3d from 'draco3d';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, '..', 'public');

const formatKB = (b) => b ? `${(b/1024).toFixed(1)} KB` : '0 KB';

async function inspect(filename) {
  const [decoder, encoder] = await Promise.all([
    draco3d.createDecoderModule(),
    draco3d.createEncoderModule(),
  ]);
  const io = new NodeIO()
    .registerExtensions(KHRONOS_EXTENSIONS)
    .registerDependencies({ 'draco3d.decoder': decoder, 'draco3d.encoder': encoder });

  const doc = await io.read(path.join(publicDir, filename));

  console.log(`\n=== ${filename} ===`);

  // Textures
  const textures = doc.getRoot().listTextures();
  let totalTextureBytes = 0;
  if (textures.length === 0) {
    console.log('  Textures   : NONE (pure geometry model)');
  } else {
    textures.forEach((tex, i) => {
      const size = tex.getImage()?.byteLength ?? 0;
      totalTextureBytes += size;
      console.log(`  Texture ${i+1}  : ${tex.getMimeType()} — ${formatKB(size)} — "${tex.getName()}"`);
    });
    console.log(`  Total tex  : ${formatKB(totalTextureBytes)}`);
  }

  // Meshes & triangles
  let totalTris = 0;
  doc.getRoot().listMeshes().forEach(mesh => {
    mesh.listPrimitives().forEach(prim => {
      const idx = prim.getIndices();
      if (idx) totalTris += idx.getCount() / 3;
    });
  });
  console.log(`  Meshes     : ${doc.getRoot().listMeshes().length}`);
  console.log(`  Triangles  : ${totalTris.toLocaleString()}`);
  console.log(`  Materials  : ${doc.getRoot().listMaterials().length}`);
  console.log(`  Nodes      : ${doc.getRoot().listNodes().length}`);
}

async function main() {
  await inspect('Logo3d.glb');
  await inspect('Baul3d.glb');
}

main().catch(e => { console.error(e.message); process.exit(1); });
