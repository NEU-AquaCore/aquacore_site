import { useGLTF } from '@react-three/drei';

export function ChallengeOptimized({ scale = [0.007, 0.007, 0.007], ...props }) {
  const { scene } = useGLTF('/models/challenge-draco.glb', '/draco/');
  
  return (
    <primitive 
      object={scene} 
      scale={scale}
      {...props}
    />
  );
}
