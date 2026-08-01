import React from 'react';
import { useGLTF } from '@react-three/drei';

export function ClutchOptimized({ scale = [0.007, 0.007, 0.007], ...props }) {
  const { scene } = useGLTF('/clutch3.glb', '/draco/');
  
  return (
    <primitive 
      object={scene} 
      scale={scale}
      {...props}
    />
  );
}

useGLTF.preload('/clutch3.glb', '/draco/');