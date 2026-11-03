import { lazy } from 'react';

// Each model is loaded only when a visible viewer actually uses it.
const models = {
  kevin: lazy(() => import('../KevinOptimized').then(module => ({ default: module.KevinOptimized }))),
  lucy: lazy(() => import('../LucyOptimized').then(module => ({ default: module.LucyOptimized }))),
  hydra: lazy(() => import('../HydraOptimized').then(module => ({ default: module.HydraOptimized }))),
  kraken: lazy(() => import('../KrakenOptimized').then(module => ({ default: module.KrakenOptimized }))),
  clutch: lazy(() => import('../ClutchOptimized').then(module => ({ default: module.ClutchOptimized }))),
  challenge: lazy(() => import('../ChallengeOptimized').then(module => ({ default: module.ChallengeOptimized }))),
};

export default function VehicleModel({ modelType = 'kevin', ...props }) {
  const Model = models[modelType] || models.kevin;
  return <Model {...props} />;
}
