import VehicleModel from './VehicleModel';

export function AdaptiveModel({ capability, scale = [5, 5, 5], modelType = 'kevin', ...props }) {
  const multiplier = (modelType === 'lucy' ? 3 : 1)
    * (capability === 'fallback' ? 0.8 : capability === 'mobile' ? 0.9 : 1);
  const optimizedScale = modelType === 'clutch'
    ? [0.006, 0.006, 0.006]
    : modelType === 'challenge'
      ? [0.0052, 0.0052, 0.0052]
      : scale.map(value => value * multiplier);
  
  return <VehicleModel modelType={modelType} scale={optimizedScale} {...props} />;
} 
