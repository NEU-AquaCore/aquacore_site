import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useProgressiveEnhancement } from '../hooks/useProgressiveEnhancement';
import { getOptimizedGLConfig, getOptimizedDPR, getOptimizedShadows } from '../utils/webglConfig';
import { AdaptiveModel } from './AdaptiveModel';
import { StaticImageViewer } from './StaticImageViewer';
import ErrorBoundary from '../ErrorBoundary';
import Spinner from '../Spinner';

function ResponsiveOrbitControls({ active, enableDamping }) {
  const controls = useRef(null);
  // Preserve the same damping duration even when a device renders fewer frames.
  useFrame((_, delta) => {
    if (controls.current && enableDamping) {
      controls.current.dampingFactor = 1 - Math.pow(0.95, Math.min(delta, 0.25) * 60);
    }
  }, -2);

  return <OrbitControls ref={controls} enabled={active} enableZoom={false} enablePan={true} enableDamping={enableDamping} />;
}

export function Optimized3DViewer({ 
  active = true,
  scale = [5, 5, 5],
  modelType = 'kevin',
  modelRotation = [0, 0, 0]
}) {
  const { capability, isLoading } = useProgressiveEnhancement();
  
  const glConfig = getOptimizedGLConfig(capability);
  const dpr = getOptimizedDPR(capability);
  const shadows = getOptimizedShadows(capability);

  // Avoid creating a renderer before the device check has finished.
  if (isLoading) return null;

  if (capability === 'fallback') {
    return <StaticImageViewer modelType={modelType} />;
  }

  return (
    <ErrorBoundary>
      <Canvas 
        camera={{ 
          position: modelType === 'lucy' ? [0, 0, 8] : [0, 0, 5], 
          fov: modelType === 'lucy' ? 60 : 50 
        }} 
        style={{ background: 'transparent' }}
        gl={{
          ...glConfig,
        }}
        dpr={dpr}
        shadows={shadows}
        frameloop={active ? 'demand' : 'never'}
      >
        {/* Show loading state inside Canvas */}
        {isLoading ? (
          <Spinner />
        ) : (
          <Suspense fallback={<Spinner />}>
          {/* Adaptive lighting based on capability */}
          <ambientLight intensity={capability === 'mobile' ? 0.6 : 0.8} />
          <directionalLight 
            position={[10, 10, 5]} 
            intensity={capability === 'mobile' ? 0.8 : 1.2} 
            castShadow={shadows} 
          />
          <directionalLight 
            position={[-5, 5, 10]} 
            intensity={capability === 'mobile' ? 0.6 : 1.0} 
          />
          
          {/* Conditional point lights based on capability */}
          {capability !== 'mobile' && (
            <>
              <pointLight position={[-10, -10, -10]} intensity={0.6} />
              <pointLight position={[0, 10, 0]} intensity={0.5} />
              <pointLight position={[5, 0, 5]} intensity={0.4} />
            </>
          )}

          {/* Adaptive Model */}
          <AdaptiveModel 
            capability={capability} 
            scale={scale}
            modelType={modelType}
            rotation={modelRotation}
          />

          {/* Adaptive Controls */}
          <ResponsiveOrbitControls active={active} enableDamping={capability !== 'mobile'} />
        </Suspense>
        )}
      </Canvas>
    </ErrorBoundary>
  );
} 
