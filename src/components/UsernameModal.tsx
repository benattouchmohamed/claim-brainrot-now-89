import { useState, useEffect } from 'react';
import { X, User, Loader2, Users } from 'lucide-react';

interface UsernameModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (username: string, itemName: string) => void;
  itemName: string;
}

interface RobloxUser {
  id: number;
  name: string;
  displayName: string;
}

export const UsernameModal = ({ isOpen, onClose, onSubmit, itemName }: UsernameModalProps) => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userFound, setUserFound] = useState<RobloxUser | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string>('');
  const [showVerifyButton, setShowVerifyButton] = useState(false);
  const [currentClaimingUser, setCurrentClaimingUser] = useState('');
  const [onlineCount, setOnlineCount] = useState(0);

  const fakeUsernames = [
    'ProGamer2024', 'CoolKid456', 'NinjaWarrior', 'DragonSlayer99', 'MasterBuilder',
    'SpeedRacer123', 'ShadowHunter', 'FireStorm88', 'IceBreaker777', 'ThunderBolt',
    'StarWars_Fan', 'MinecraftPro', 'RocketLeague45', 'FortniteKing', 'ApexLegend'
  ];

  // Cycle through fake claiming users
  useEffect(() => {
    if (!isOpen) return;
    
    // Set initial online count
    setOnlineCount(Math.floor(Math.random() * 500) + 1000);
    
    const interval = setInterval(() => {
      const randomUser = fakeUsernames[Math.floor(Math.random() * fakeUsernames.length)];
      setCurrentClaimingUser(randomUser);
      // Slightly fluctuate online count
      setOnlineCount(prev => prev + Math.floor(Math.random() * 10) - 5);
    }, 10000); // Change every 10 seconds

    // Set initial claiming user
    setCurrentClaimingUser(fakeUsernames[Math.floor(Math.random() * fakeUsernames.length)]);

    return () => clearInterval(interval);
  }, [isOpen]);

  const fetchRobloxUser = async (trimmedUsername: string) => {
    try {
      // Fetch user profile
      const response = await fetch(
        `https://corsproxy.io/?https://users.roblox.com/v1/users/search?keyword=${trimmedUsername}`
      );
      if (!response.ok) throw new Error('Failed to fetch user data');
      const data = await response.json();

      if (data.data && data.data.length > 0) {
        const user = data.data[0];
        setUserFound(user);

        // Fetch avatar
        const avatarResponse = await fetch(
          `https://corsproxy.io/?https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${user.id}&size=420x420&format=Png`
        );
        
        if (avatarResponse.ok) {
          const avatarData = await avatarResponse.json();
          if (avatarData.data && avatarData.data.length > 0) {
            setAvatarUrl(avatarData.data[0].imageUrl);
          }
        }
        
        return true;
      } else {
        throw new Error('User not found');
      }
    } catch (error) {
      console.error('Error fetching Roblox user:', error);
      throw error;
    }
  };

  const handleSubmit = async () => {
    if (!username.trim()) {
      setError('Please enter your username');
      return;
    }
    
    if (username.length < 3) {
      setError('Username must be at least 3 characters');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const trimmedUsername = username.trim();
      await fetchRobloxUser(trimmedUsername);
      
      // Wait a moment for user to see the found animation, then show verify button
      setTimeout(() => {
        setIsLoading(false);
        setShowVerifyButton(true);
      }, 2000);
    } catch (error) {
      setError('Roblox user not found. Please check your username.');
      setIsLoading(false);
      setUserFound(null);
      setAvatarUrl('');
    }
  };

  const handleVerifyClaim = () => {
    onSubmit(username, itemName);
    setUsername('');
    setUserFound(null);
    setAvatarUrl('');
    setShowVerifyButton(false);
    setIsLoading(false);
  };

  const handleClose = () => {
    setUsername('');
    setError('');
    setIsLoading(false);
    setUserFound(null);
    setAvatarUrl('');
    setShowVerifyButton(false);
    setCurrentClaimingUser('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center modal-backdrop z-50">
      <div className="modal-content p-8 rounded-2xl max-w-md w-full mx-4 relative">
        <button 
          className="absolute top-4 right-4 text-2xl hover:opacity-70 transition-opacity"
          onClick={handleClose}
        >
          <X size={24} />
        </button>
        
        <div className="modal-title text-xl sm:text-2xl font-bold mb-2 text-center">
          {showVerifyButton ? 'Ready to Claim!' : 'Enter Your Username'}
        </div>
        
        <div className="text-muted-foreground mb-4 sm:mb-6 text-center text-sm sm:text-base">
          {showVerifyButton ? `Verify your identity to claim ${itemName}` : `Please enter your username to claim ${itemName}.`}
        </div>

        {/* Online Users & Activity */}
        <div className="bg-muted/30 rounded-lg p-3 mb-4 animate-fade-in">
          <div className="flex items-center justify-between text-xs sm:text-sm">
            <div className="flex items-center space-x-2 text-primary">
              <Users size={16} />
              <span className="font-medium">{onlineCount.toLocaleString()} users online</span>
            </div>
            {currentClaimingUser && (
              <div className="text-muted-foreground animate-fade-in">
                <span className="text-yellow-500">🎁</span> {currentClaimingUser} is claiming...
              </div>
            )}
          </div>
        </div>
        
        <input 
          className="w-full p-3 rounded-xl bg-input border-2 border-border focus:border-primary transition-colors mb-4 text-foreground text-sm sm:text-base"
          placeholder="Your Username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSubmit()}
          disabled={isLoading}
        />

        {/* Loading State */}
        {isLoading && !userFound && (
          <div className="mb-4 text-center animate-fade-in">
            <div className="flex items-center justify-center space-x-2 text-primary">
              <Loader2 className="animate-spin" size={20} />
              <span className="text-sm sm:text-base">Searching for Roblox user...</span>
            </div>
          </div>
        )}

        {/* User Found Animation */}
        {userFound && (
          <div className="mb-4 text-center animate-scale-in">
            <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 mb-4">
              <div className="flex items-center justify-center space-x-3">
                {avatarUrl ? (
                  <img 
                    src={avatarUrl} 
                    alt={`${userFound.displayName} avatar`}
                    className="w-12 h-12 rounded-full border-2 border-green-500 animate-scale-in"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                    <User className="text-green-500" size={24} />
                  </div>
                )}
                <div className="text-left">
                  <div className="text-green-500 font-bold text-sm sm:text-base">
                    {userFound.displayName}
                  </div>
                  <div className="text-green-600 text-xs sm:text-sm">
                    @{userFound.name}
                  </div>
                </div>
              </div>
              <div className="text-green-600 text-xs mt-2 animate-fade-in">
                ✓ User found! Proceeding to claim...
              </div>
            </div>
          </div>
        )}
        
        {error && (
          <div className="text-destructive mb-4 text-center font-medium text-sm sm:text-base animate-fade-in">
            {error}
          </div>
        )}
        
        {showVerifyButton ? (
          <button 
            className="green-claim-button w-full py-3 text-lg sm:text-xl animate-scale-in"
            onClick={handleVerifyClaim}
          >
            🔐 Verify & Claim {itemName}
          </button>
        ) : (
          <button 
            className="green-claim-button w-full py-3 text-lg sm:text-xl disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
            onClick={handleSubmit}
            disabled={isLoading || showVerifyButton}
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <Loader2 className="animate-spin" size={20} />
                <span>Processing...</span>
              </div>
            ) : (
              'Submit'
            )}
          </button>
        )}
      </div>
    </div>
  );
};