export function StaticImageViewer({ modelType = 'clutch' }) {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <img 
        src={modelType === 'challenge' ? '/images/logos/challenge-home.png' : '/images/logos/clutch-home.png'}
        alt={`${modelType} - Static View`}
        className="w-full h-full object-cover rounded-full"
      />
    </div>
  );
} 