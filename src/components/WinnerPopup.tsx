import { useEffect, useState } from 'react';
import { Trophy } from 'lucide-react';

interface WinnerPopupProps {
  isVisible: boolean;
  message: string;
  onHide: () => void;
}

export const WinnerPopup = ({ isVisible, message, onHide }: WinnerPopupProps) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
        setTimeout(onHide, 300); // Wait for fade out animation
      }, 4000);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, onHide]);

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed left-1/2 bottom-4 sm:bottom-8 transform -translate-x-1/2 z-50 
        min-w-72 sm:min-w-80 max-w-[90vw] bg-black/80 text-white rounded-full shadow-lg 
        px-4 sm:px-6 py-3 sm:py-4 border-2 border-accent
        flex items-center gap-3 sm:gap-4 transition-all duration-300 ${
          show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
    >
      <div className="text-accent flex-shrink-0">
        <Trophy size={20} className="sm:w-6 sm:h-6" />
      </div>
      <span className="font-fredoka-one text-left flex-1 text-sm sm:text-base leading-tight">
        {message}
      </span>
    </div>
  );
};