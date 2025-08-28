import { useState, useEffect } from 'react';

interface GeneratorModalProps {
  isOpen: boolean;
  onComplete: () => void;
  itemName: string;
  itemImage: string;
}

const gamingTips = [
  "Pro tip: Collect all the rare items for ultimate brainrot power!",
  "Did you know? Rainbow items have special abilities!",
  "Fun fact: Los Tralaleritos are the rarest collectibles!",
  "Gaming tip: Claim multiple items to build your collection!",
  "Secret: Some items have hidden bonuses when combined!",
  "Brainrot fact: The more you collect, the more legendary you become!"
];

export const GeneratorModal = ({ isOpen, onComplete, itemName, itemImage }: GeneratorModalProps) => {
  const [progress, setProgress] = useState(0);
  const [currentTip, setCurrentTip] = useState(0);
  const [title, setTitle] = useState('Connecting...');
  const [showVerifyButton, setShowVerifyButton] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setProgress(0);
      setCurrentTip(0);
      setTitle('Connecting...');
      setShowVerifyButton(false);
      return;
    }

    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 15 + 5;
        
        if (newProgress >= 30 && title === 'Connecting...') {
          setTitle('Generating your brainrot...');
        }
        
        if (newProgress >= 60 && title === 'Generating your brainrot...') {
          setTitle('Almost ready...');
        }
        
        if (newProgress >= 100) {
          setTitle('Ready to claim!');
          setShowVerifyButton(true);
          clearInterval(interval);
          return 100;
        }
        
        return newProgress;
      });
    }, 200);

    const tipInterval = setInterval(() => {
      setCurrentTip(prev => (prev + 1) % gamingTips.length);
    }, 2500);

    return () => {
      clearInterval(interval);
      clearInterval(tipInterval);
    };
  }, [isOpen, title]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center modal-backdrop z-50">
      <div className="modal-content p-8 rounded-2xl max-w-md w-full mx-4 text-center relative">
        <div className={`text-xl sm:text-2xl font-bold mb-4 ${!showVerifyButton ? 'pulse-title' : ''}`}>
          {title}
        </div>
        
        <img 
          src={itemImage} 
          alt={itemName}
          className="mx-auto mb-4 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain"
        />
        
        <div className="progress-bar mb-4">
          <div 
            className="progress-fill" 
            style={{ width: `${progress}%` }}
          >
            {Math.round(progress)}%
          </div>
        </div>
        
        <div className="mb-4 text-sm sm:text-base md:text-lg text-muted-foreground min-h-[3rem] flex items-center justify-center text-center px-2">
          {gamingTips[currentTip]}
        </div>
        
        {showVerifyButton && (
          <button 
            className="green-claim-button w-full py-3 text-lg sm:text-xl"
            onClick={onComplete}
          >
            Verify & Claim
          </button>
        )}
      </div>
    </div>
  );
};