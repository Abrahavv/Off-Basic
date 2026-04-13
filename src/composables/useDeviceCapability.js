/**
 * useDeviceCapability
 * Detects hardware capability to decide whether to render 3D models.
 * Strategy used by Apple, Adidas, and other premium sites.
 *
 * Low-end threshold: ≤ 2 CPU cores OR ≤ 2GB RAM OR slow connection
 */
import { ref, readonly } from 'vue';

// Singleton — computed once per session
let _capability = null;

function computeCapability() {
  if (_capability) return _capability;

  // --- CPU Cores ---
  const cores = navigator.hardwareConcurrency ?? 4;

  // --- RAM (not available on all browsers, defaults to "enough") ---
  // navigator.deviceMemory is in GB; undefined if not supported
  const ram = navigator.deviceMemory ?? 4;

  // --- Connection ---
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  const effectiveType = connection?.effectiveType ?? '4g'; // '2g', '3g', '4g'
  const saveData = connection?.saveData ?? false;

  // --- GPU check via canvas (fallback) ---
  let gpuTier = 'high';
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (gl) {
      const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
      if (debugInfo) {
        const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL).toLowerCase();
        // Known low-end GPU patterns
        if (
          renderer.includes('adreno 5') ||
          renderer.includes('adreno 4') ||
          renderer.includes('mali-t') ||
          renderer.includes('mali-4') ||
          renderer.includes('powervr sgx') ||
          renderer.includes('videocore')
        ) {
          gpuTier = 'low';
        } else if (
          renderer.includes('adreno 6') ||
          renderer.includes('mali-g5') ||
          renderer.includes('mali-g7') ||
          renderer.includes('apple a1') ||
          renderer.includes('apple a2')
        ) {
          gpuTier = 'mid';
        }
      }
    }
  } catch (e) {
    // Ignore WebGL detection errors
  }

  // --- Decision Logic ---
  const isLowEnd =
    saveData ||
    effectiveType === '2g' ||
    (effectiveType === '3g' && cores <= 4) ||
    cores <= 2 ||
    ram <= 2 ||
    gpuTier === 'low';

  const isMidRange =
    !isLowEnd && (cores <= 4 || ram <= 4 || gpuTier === 'mid');

  const canRender3D = !isLowEnd;

  _capability = {
    canRender3D,
    isLowEnd,
    isMidRange,
    isHighEnd: !isLowEnd && !isMidRange,
    cores,
    ram,
    effectiveType,
    saveData,
    gpuTier,
  };

  return _capability;
}

export function useDeviceCapability() {
  const capability = ref(computeCapability());
  return {
    canRender3D: readonly(ref(capability.value.canRender3D)),
    isLowEnd: readonly(ref(capability.value.isLowEnd)),
    isMidRange: readonly(ref(capability.value.isMidRange)),
    isHighEnd: readonly(ref(capability.value.isHighEnd)),
    effectiveType: readonly(ref(capability.value.effectiveType)),
  };
}
