import { useGLTF } from '@react-three/drei';

export function ClutchOptimized({ scale = [0.007, 0.007, 0.007], ...props }) {
  const { scene } = useGLTF('/models/clutch-draco.glb', '/draco/');
  
  return (
    <primitive 
      object={scene} 
      scale={scale}
      {...props}
    />
  );
}
