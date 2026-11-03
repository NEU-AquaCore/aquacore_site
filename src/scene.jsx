import { Suspense, useRef, useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import gsap from 'gsap';
import VehicleModel from './components/VehicleModel';

const positions = [[2.6, 0.6, 2.1], [-2.8, 0.2, 2.3], [0, 3, 0.2], [-2, -0.4, -1], [0, 3, 0.2], [0.4, -2.2, 0], [0, 2.5, 3.6]];

const Scene = ({ progress, modelType = 'kevin' }) => {
  const cameraRef = useRef(null);
  const invalidate = useThree(state => state.invalidate);

  useEffect(() => {
    const camera = cameraRef.current;
    const clampedProgress = Math.max(0, Math.min(1, progress));
    const segment = Math.min(5, Math.floor(clampedProgress * 6));
    const fraction = clampedProgress === 1 ? 1 : clampedProgress * 6 - segment;
    const [x, y, z] = positions[segment].map((value, axis) =>
      value + (positions[segment + 1][axis] - value) * fraction);

    const tween = gsap.to(camera.position, {
      x, y, z,
      duration: 0.1,
      ease: 'power1.out',
      overwrite: true,
      onUpdate: () => {
        camera.lookAt(0, 0, 0);
        invalidate();
      },
    });
    return () => tween.kill();
  }, [progress, invalidate]);

  return (
    <>
      <PerspectiveCamera ref={cameraRef} fov={65} near={0.1} far={10000} makeDefault position={[0, 0, 0]} />
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} castShadow />
      <directionalLight position={[-5, 5, 10]} intensity={0.6} />
      <pointLight position={[-10, -10, -10]} intensity={0.4} />
      <pointLight position={[0, 10, 0]} intensity={0.3} />
      <Suspense fallback={null}>
        <VehicleModel modelType={modelType} scale={modelType === 'clutch' || modelType === 'challenge' ? [0.003, 0.003, 0.003] : [2.5, 2.5, 2.5]} />
      </Suspense>
    </>
  );
};

export default Scene;   
