import { useState } from 'react';

interface BrainrotItemProps {
  name: string;
  image: string;
  onClaim: (name: string) => void;
}

export const BrainrotItem = ({ name, image, onClaim }: BrainrotItemProps) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <li className="pet-row flex items-center justify-between rounded-2xl shadow-lg relative">
      <div className="pet-img-bg flex items-center justify-center rounded-xl mr-3 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex-shrink-0">
        {!imageError ? (
          <img 
            src={image} 
            alt={name}
            className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain"
            onError={handleImageError}
          />
        ) : (
          <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-xs text-center p-1">
            {name.split(' ').map(word => word[0]).join('').slice(0, 3)}
          </div>
        )}
      </div>
      <span className="item-title-glow flex-1 px-2 sm:px-4 text-left sm:text-center">{name}</span>
      <button 
        className="claim-pill flex-shrink-0"
        onClick={() => onClaim(name)}
      >
        Claim
      </button>
    </li>
  );
};