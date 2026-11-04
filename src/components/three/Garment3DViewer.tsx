import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { RotateCw, ZoomIn, Eye, Sparkles, AlertCircle } from 'lucide-react';

interface Garment3DViewerProps {
  modelType?: 'trench' | 'jacket' | 'knit' | 'coat';
  colorHex?: string;
  className?: string;
  productTitle?: string;
}

export const Garment3DViewer: React.FC<Garment3DViewerProps> = ({
  modelType = 'trench',
  colorHex = '#101010',
  className = 'h-[460px] md:h-[580px] w-full',
  productTitle = 'NAMECLOTHES Silhouette'
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isRotating, setIsRotating] = useState(true);
  const [wireframeMode, setWireframeMode] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isFallback, setIsFallback] = useState(false);
  const [isControlsCollapsed, setIsControlsCollapsed] = useState(false);

  // References for render loop and interaction
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const garmentGroupRef = useRef<THREE.Group | null>(null);
  const primaryMaterialRef = useRef<THREE.MeshPhysicalMaterial | null>(null);
  const frameIdRef = useRef<number | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  const isDraggingRef = useRef(false);
  const previousPointerPositionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Detect software WebGL to adapt quality gracefully
    let isSoftwareGl = false;
    try {
      const probeCanvas = document.createElement('canvas');
      const gl = probeCanvas.getContext('webgl2') || probeCanvas.getContext('webgl');
      if (gl) {
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        isSoftwareGl = /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } else {
        setIsFallback(true);
        return;
      }
    } catch {
      isSoftwareGl = false;
    }

    // 2. Initialize Three.js Scene, Camera & Renderer
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 500;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x101010);
    scene.fog = new THREE.FogExp2(0x101010, 0.05);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0.5, 4.4);
    cameraRef.current = camera;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl,
        powerPreference: 'high-performance',
        alpha: false
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio || 1, 2));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.15;
      renderer.shadowMap.enabled = !isSoftwareGl;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;

      container.replaceChildren(renderer.domElement);
      rendererRef.current = renderer;
    } catch {
      setIsFallback(true);
      return;
    }

    // 3. Studio Environment Reflection via RoomEnvironment
    try {
      const pmremGenerator = new THREE.PMREMGenerator(renderer);
      scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
      pmremGenerator.dispose();
    } catch (e) {
      console.warn('RoomEnvironment skipped', e);
    }

    // 4. Studio 3-Point Lighting Rig
    const keyLight = new THREE.DirectionalLight(0xfff5e6, 2.8); // Warm key
    keyLight.position.set(2.5, 4, 3);
    keyLight.castShadow = !isSoftwareGl;
    keyLight.shadow.bias = -0.0005;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    scene.add(keyLight);

    const fillLight = new THREE.HemisphereLight(0xe8edf2, 0x1b1b1b, 1.2); // Cool sky / dark ground
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xd4e2ff, 2.0); // Cool rim backlight
    rimLight.position.set(-3, 2, -2.5);
    scene.add(rimLight);

    // Soft grounded contact shadow plane
    const shadowGeo = new THREE.PlaneGeometry(3.5, 3.5);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x050505,
      transparent: true,
      opacity: 0.65,
      depthWrite: false
    });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -1.55;
    scene.add(shadowPlane);

    // Subtle studio pedestal
    const pedestalGeo = new THREE.CylinderGeometry(1.6, 1.8, 0.12, 48);
    const pedestalMat = new THREE.MeshStandardMaterial({
      color: 0x191919,
      roughness: 0.7,
      metalness: 0.2
    });
    const pedestal = new THREE.Mesh(pedestalGeo, pedestalMat);
    pedestal.position.y = -1.61;
    pedestal.receiveShadow = !isSoftwareGl;
    scene.add(pedestal);

    // 5. Build Procedural Multi-Part 3D Garment (3-12 parts)
    const garmentGroup = new THREE.Group();
    garmentGroup.position.y = -0.3;
    scene.add(garmentGroup);
    garmentGroupRef.current = garmentGroup;

    // Materials
    const initialColor = new THREE.Color(colorHex);
    const garmentMat = new THREE.MeshPhysicalMaterial({
      color: initialColor,
      roughness: 0.42,
      metalness: 0.12,
      clearcoat: 0.25,
      clearcoatRoughness: 0.35,
      sheen: 0.8,
      sheenColor: new THREE.Color(0xffffff),
      sheenRoughness: 0.3
    });
    primaryMaterialRef.current = garmentMat;

    const titaniumMat = new THREE.MeshStandardMaterial({
      color: 0xdcdcdc,
      roughness: 0.2,
      metalness: 0.95
    });

    const innerLiningMat = new THREE.MeshStandardMaterial({
      color: 0x222222,
      roughness: 0.5,
      metalness: 0.1
    });

    // Mannequin core torso (Architectural Haute Couture Mannequin)
    const mannequinMat = new THREE.MeshStandardMaterial({
      color: 0x222222,
      roughness: 0.8,
      metalness: 0.05
    });
    const neckGeo = new THREE.CylinderGeometry(0.18, 0.22, 0.4, 24);
    const neck = new THREE.Mesh(neckGeo, mannequinMat);
    neck.position.y = 1.05;
    garmentGroup.add(neck);

    const neckCapGeo = new THREE.CylinderGeometry(0.19, 0.19, 0.05, 24);
    const neckCap = new THREE.Mesh(neckCapGeo, titaniumMat);
    neckCap.position.y = 1.25;
    garmentGroup.add(neckCap);

    // Garment Parts according to modelType
    if (modelType === 'trench' || modelType === 'coat') {
      // 1. Upper Bodice & Torso
      const chestGeo = new THREE.CylinderGeometry(0.48, 0.54, 0.9, 32, 1, true);
      const chest = new THREE.Mesh(chestGeo, garmentMat);
      chest.position.y = 0.45;
      chest.castShadow = true;
      garmentGroup.add(chest);

      // 2. Flared Lower Trench Skirt / Drape
      const skirtGeo = new THREE.CylinderGeometry(0.55, 0.88, 1.2, 32, 1, true);
      const skirt = new THREE.Mesh(skirtGeo, garmentMat);
      skirt.position.y = -0.55;
      skirt.castShadow = true;
      garmentGroup.add(skirt);

      // 3. Wide Architectural Storm Collar
      const collarGeo = new THREE.CylinderGeometry(0.32, 0.38, 0.35, 28, 1, true);
      const collar = new THREE.Mesh(collarGeo, garmentMat);
      collar.position.y = 0.95;
      collar.scale.set(1.2, 1, 1.1);
      garmentGroup.add(collar);

      // 4 & 5. Left & Right Raglan Sleeves
      const leftSleeveGeo = new THREE.CylinderGeometry(0.22, 0.17, 1.2, 24);
      const leftSleeve = new THREE.Mesh(leftSleeveGeo, garmentMat);
      leftSleeve.position.set(-0.65, 0.25, 0);
      leftSleeve.rotation.z = Math.PI / 12;
      leftSleeve.castShadow = true;
      garmentGroup.add(leftSleeve);

      const rightSleeveGeo = new THREE.CylinderGeometry(0.22, 0.17, 1.2, 24);
      const rightSleeve = new THREE.Mesh(rightSleeveGeo, garmentMat);
      rightSleeve.position.set(0.65, 0.25, 0);
      rightSleeve.rotation.z = -Math.PI / 12;
      rightSleeve.castShadow = true;
      garmentGroup.add(rightSleeve);

      // 6. Asymmetrical Storm Flap (Front Architectural Feature)
      const stormFlapGeo = new THREE.BoxGeometry(0.44, 0.65, 0.04);
      const stormFlap = new THREE.Mesh(stormFlapGeo, garmentMat);
      stormFlap.position.set(0.18, 0.52, 0.44);
      stormFlap.rotation.y = -0.15;
      garmentGroup.add(stormFlap);

      // 7. Structural Waist Belt
      const beltGeo = new THREE.TorusGeometry(0.56, 0.035, 16, 40);
      const belt = new THREE.Mesh(beltGeo, garmentMat);
      belt.rotation.x = Math.PI / 2;
      belt.position.y = 0.02;
      garmentGroup.add(belt);

      // 8. Brushed Titanium Belt Buckle & D-Ring
      const buckleGeo = new THREE.TorusGeometry(0.08, 0.018, 16, 24);
      const buckle = new THREE.Mesh(buckleGeo, titaniumMat);
      buckle.position.set(0.05, 0.02, 0.58);
      garmentGroup.add(buckle);

      // 9. Cuff Straps
      const cuffGeo = new THREE.TorusGeometry(0.18, 0.025, 12, 24);
      const leftCuff = new THREE.Mesh(cuffGeo, titaniumMat);
      leftCuff.position.set(-0.76, -0.28, 0);
      leftCuff.rotation.x = Math.PI / 2;
      garmentGroup.add(leftCuff);

      const rightCuff = new THREE.Mesh(cuffGeo, titaniumMat);
      rightCuff.position.set(0.76, -0.28, 0);
      rightCuff.rotation.x = Math.PI / 2;
      garmentGroup.add(rightCuff);
    } else {
      // Tailored Blazer / Knit Silhouette (Sculpted Modernist Fit)
      const blazerTorsoGeo = new THREE.CylinderGeometry(0.46, 0.52, 1.1, 32);
      const blazerTorso = new THREE.Mesh(blazerTorsoGeo, garmentMat);
      blazerTorso.position.y = 0.35;
      garmentGroup.add(blazerTorso);

      // Sharp lapel detail
      const lapelLeftGeo = new THREE.BoxGeometry(0.18, 0.55, 0.05);
      const lapelLeft = new THREE.Mesh(lapelLeftGeo, innerLiningMat);
      lapelLeft.position.set(-0.16, 0.55, 0.42);
      lapelLeft.rotation.z = -0.2;
      garmentGroup.add(lapelLeft);

      const lapelRightGeo = new THREE.BoxGeometry(0.18, 0.55, 0.05);
      const lapelRight = new THREE.Mesh(lapelRightGeo, innerLiningMat);
      lapelRight.position.set(0.16, 0.55, 0.42);
      lapelRight.rotation.z = 0.2;
      garmentGroup.add(lapelRight);

      // Sleeves
      const sLeftGeo = new THREE.CylinderGeometry(0.2, 0.16, 1.15, 24);
      const sLeft = new THREE.Mesh(sLeftGeo, garmentMat);
      sLeft.position.set(-0.62, 0.22, 0);
      sLeft.rotation.z = 0.18;
      garmentGroup.add(sLeft);

      const sRightGeo = new THREE.CylinderGeometry(0.2, 0.16, 1.15, 24);
      const sRight = new THREE.Mesh(sRightGeo, garmentMat);
      sRight.position.set(0.62, 0.22, 0);
      sRight.rotation.z = -0.18;
      garmentGroup.add(sRight);

      // Bespoke Horn Buttons
      for (let i = 0; i < 3; i++) {
        const btnGeo = new THREE.CylinderGeometry(0.035, 0.035, 0.015, 16);
        const btn = new THREE.Mesh(btnGeo, titaniumMat);
        btn.rotation.x = Math.PI / 2;
        btn.position.set(0.04, 0.4 - i * 0.2, 0.48);
        garmentGroup.add(btn);
      }
    }

    // 6. Mouse/Touch Drag to Rotate Interaction
    const onPointerDown = (e: PointerEvent) => {
      isDraggingRef.current = true;
      previousPointerPositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDraggingRef.current || !garmentGroupRef.current) return;
      const deltaX = e.clientX - previousPointerPositionRef.current.x;
      const deltaY = e.clientY - previousPointerPositionRef.current.y;

      garmentGroupRef.current.rotation.y += deltaX * 0.008;
      garmentGroupRef.current.rotation.x = Math.max(
        -0.3,
        Math.min(0.3, garmentGroupRef.current.rotation.x + deltaY * 0.005)
      );

      previousPointerPositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const onPointerUp = () => {
      isDraggingRef.current = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    // 7. Render Loop with on-demand fallback pacing
    const clock = new THREE.Clock();

    const animate = () => {
      const delta = clock.getDelta();

      if (garmentGroupRef.current) {
        // Auto rotate when idle
        if (isRotating && !isDraggingRef.current) {
          garmentGroupRef.current.rotation.y += delta * 0.4;
        }

        // Floating breath simulation
        garmentGroupRef.current.position.y = -0.3 + Math.sin(clock.getElapsedTime() * 1.5) * 0.025;
      }

      renderer.render(scene, camera);
      frameIdRef.current = requestAnimationFrame(animate);
    };

    frameIdRef.current = requestAnimationFrame(animate);

    // 8. Responsive Resize Observer
    const resizeObserver = new ResizeObserver(() => {
      if (!container || !rendererRef.current || !cameraRef.current) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      cameraRef.current.aspect = newWidth / newHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(newWidth, newHeight);
    });
    resizeObserver.observe(container);

    // Cleanup
    return () => {
      if (frameIdRef.current) cancelAnimationFrame(frameIdRef.current);
      resizeObserver.disconnect();
      domElement.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);

      renderer.dispose();
      scene.clear();
    };
  }, [modelType]);

  // Update dynamic material color when prop changes
  useEffect(() => {
    if (primaryMaterialRef.current) {
      primaryMaterialRef.current.color.set(colorHex);
    }
  }, [colorHex]);

  // Update wireframe mode
  useEffect(() => {
    if (primaryMaterialRef.current) {
      primaryMaterialRef.current.wireframe = wireframeMode;
    }
  }, [wireframeMode]);

  // Handle Zoom change
  const handleZoom = (level: number) => {
    setZoomLevel(level);
    if (cameraRef.current) {
      cameraRef.current.position.z = 4.4 / level;
    }
  };

  return (
    <div className={`relative bg-[#0d0d0d] overflow-hidden rounded-none border border-[#222222] select-none ${className}`}>
      {/* 3D Canvas Mount Point */}
      <div
        ref={mountRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        title="Click and drag to rotate garment in 3D"
      />

      {/* Top Spec & Indicator Badge */}
      <div className="absolute top-4 left-4 z-10 flex items-center space-x-2 pointer-events-none">
        <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
        <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-[#FAFAF8]/90 bg-[#161616]/90 backdrop-blur-none px-3 py-1 border border-[#333333]">
          Interactive 3D Atelier • {productTitle}
        </span>
      </div>

      {/* WebGL context fallback warning if graphics unaccelerated */}
      {isFallback && (
        <div className="absolute inset-0 bg-[#141414] flex flex-col items-center justify-center p-6 text-center z-20">
          <AlertCircle className="w-8 h-8 text-[#B7B0A5] mb-2" />
          <h4 className="text-lg font-serif text-[#FAFAF8] uppercase tracking-wider mb-1">
            Studio Model Viewer
          </h4>
          <p className="text-xs text-[#B7B0A5] max-w-sm mb-4">
            Hardware 3D acceleration is currently disabled in your browser environment. High-fidelity photographic views are loaded automatically.
          </p>
        </div>
      )}

      {/* Ergonomic Bottom Control Dock: Unified & Collapsible (Zero Viewport Occlusion) */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 w-auto max-w-[94vw]">
        {/* Toggle / Collapse Pill */}
        <div className="flex justify-center mb-1.5">
          <button
            onClick={() => setIsControlsCollapsed(!isControlsCollapsed)}
            className="text-[10px] uppercase tracking-[0.18em] px-3 py-0.5 bg-[#1b1b1b] border border-[#333333] text-[#B7B0A5] hover:text-[#FAFAF8] transition-colors cursor-pointer"
          >
            {isControlsCollapsed ? '▲ Show 3D Controls' : '▼ Minimize Dock'}
          </button>
        </div>

        {/* Control Buttons Container */}
        {!isControlsCollapsed && (
          <div className="flex items-center gap-2 bg-[#141414] border border-[#2e2e2e] p-2 shadow-2xl">
            {/* Auto Rotate Toggle */}
            <button
              onClick={() => setIsRotating(!isRotating)}
              className={`flex items-center space-x-1.5 px-3 py-1.5 text-xs uppercase tracking-wider font-medium transition-all ${
                isRotating
                  ? 'bg-[#FAFAF8] text-[#101010]'
                  : 'bg-[#222222] text-[#B7B0A5] hover:text-[#FAFAF8]'
              }`}
            >
              <RotateCw className={`w-3.5 h-3.5 ${isRotating ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">{isRotating ? 'Turntable: On' : 'Rotate'}</span>
            </button>

            {/* Wireframe / Structure inspect */}
            <button
              onClick={() => setWireframeMode(!wireframeMode)}
              className={`flex items-center space-x-1.5 px-3 py-1.5 text-xs uppercase tracking-wider font-medium transition-all ${
                wireframeMode
                  ? 'bg-[#FAFAF8] text-[#101010]'
                  : 'bg-[#222222] text-[#B7B0A5] hover:text-[#FAFAF8]'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{wireframeMode ? 'Wireframe' : 'Tailor Wire'}</span>
            </button>

            {/* Zoom Toggle */}
            <div className="flex items-center bg-[#222222] border border-[#333333]">
              <button
                onClick={() => handleZoom(1)}
                className={`px-2.5 py-1 text-xs uppercase font-mono ${
                  zoomLevel === 1 ? 'bg-[#FAFAF8] text-[#101010]' : 'text-[#B7B0A5]'
                }`}
              >
                1x
              </button>
              <button
                onClick={() => handleZoom(1.35)}
                className={`px-2.5 py-1 text-xs uppercase font-mono ${
                  zoomLevel === 1.35 ? 'bg-[#FAFAF8] text-[#101010]' : 'text-[#B7B0A5]'
                }`}
              >
                1.35x
              </button>
            </div>

            {/* Hint */}
            <span className="hidden md:inline text-[10px] uppercase text-[#777777] tracking-widest pl-2 pr-1">
              Drag to Orbit
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
