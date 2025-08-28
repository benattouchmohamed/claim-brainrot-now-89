import { useState } from 'react';
import { BrainrotItem } from '@/components/BrainrotItem';
import { UsernameModal } from '@/components/UsernameModal';
import { GeneratorModal } from '@/components/GeneratorModal';
import { WinnerPopup } from '@/components/WinnerPopup';

// Brainrot items data
const brainrotItems = [
  { name: "sammy spiderini", image: "/images/sammy-spiderini.jpg" },
  { name: "La Supreme Combinasion", image: "/images/la-supreme-combinasion.jpg" },
  { name: "Galaxy Lucky Blocks", image: "/images/galaxy-lucky-blocks.jpg" },
  { name: "dul dul dul", image: "/images/dul-dul-dul.jpg" },
  { name: "Los Spyderinis", image: "/images/los-spyderinis.jpg" },
  { name: "Los Matteos", image: "/images/los-matteos.jpg" },
  { name: "job job job sahur", image: "/images/job-job-sahur.jpg" },
  { name: "Matteo", image: "/images/matteo.jpg" },
  { name: "Los Hotspotsitos", image: "/images/los-hotspotsitos.jpg" },
  { name: "Nooo My Hotspot", image: "/images/nooo-my-hotspot.jpg" },
  { name: "Esok Sekolah", image: "/images/esok-sekolah.jpg" },
  { name: "Tipi Topi Taco", image: "/images/tipi-topi-taco.jpg" },
  { name: "Bombardini Tortinii", image: "/images/bombardini-tortinii.jpg" },
  { name: "Statutino Libertino", image: "/images/statutino-libertino.jpg" },
  { name: "Karkerkar kurkur", image: "/images/karkerkar-kurkur.jpg" },
  { name: "dragon cannelloni", image: "https://tr.rbxcdn.com/180DAY-b14aa19aee59dcd2e3fdc474bc8ed42e/420/420/Hat/Webp/noFilter" },
  { name: "Bulbito Bandito Traktorito", image: "/images/bulbito-bandito.jpg" },
  { name: "Los Combinasionas", image: "https://tr.rbxcdn.com/180DAY-a06c75cf7c357e4e5ac2ce5b7192268d/420/420/BackAccessory/Webp/noFilter" },
  { name: "Los Orcalitos", image: "/images/los-orcalitos.jpg" },
  { name: "Trippi Troppi Troppa Trippa", image: "/images/trippi-troppi.jpg" },
  { name: "Secret Lucky Block", image: "/images/secret-lucky-block.jpg" },
  { name: "Chicleteira Bicicleteira", image: "/images/chicleteira-bicicleteira.jpg" },
  { name: "Agarrini La Palini", image: "/images/agarrini-la-palini.jpg" },
  { name: "Rainbow Odin Din Din Dun", image: "/images/rainbow-odin.jpg" },
  { name: "Rainbow Graipuss Medussi", image: "/images/rainbow-graipuss.jpg" },
  { name: "Rainbow Tralalero Tralala", image: "/images/rainbow-tralalero.jpg" },
  { name: "LOS TRALALERITOS", image: "https://tr.rbxcdn.com/180DAY-26182675b92f2ad9a61ecae30a2b8ead/420/420/BackAccessory/Webp/noFilter" },
  { name: "LAS TRALALERITAS", image: "https://tr.rbxcdn.com/180DAY-08e3120deac49b7bc1227de3932b255c/420/420/Hat/Webp/noFilter" },
  { name: "TRALALERO TRALALA LAVA", image: "https://tr.rbxcdn.com/180DAY-13af1b4d458233fb3fb4aa49a7ee5520/420/420/WaistAccessory/Webp/noFilter" },
  { name: "COCOFANTO ELEFANTO", image: "https://tr.rbxcdn.com/180DAY-308310f72b54e617e6039983ffa8987e/420/420/LayeredAccessory/Webp/noFilter" },
  { name: "BALLERINO LOLOLO", image: "https://tr.rbxcdn.com/180DAY-8722139c40ed43ae6cb73b046062ba7f/420/420/Hat/Webp/noFilter" },
  { name: "LA VACCA SATURNO SATURNITA", image: "https://tr.rbxcdn.com/180DAY-038dd6b56d93422289d07f8f3764d75d/420/420/JacketAccessory/Webp/noFilter" },
  { name: "NUCLEARO DINOSSAURO", image: "https://tr.rbxcdn.com/180DAY-b87295a7d3ed3eb3f8560bb3af747093/420/420/Hat/Webp/noFilter" },
  { name: "TORRTUGINNI DRAGONFRUTINI", image: "https://tr.rbxcdn.com/180DAY-f4e2a91bab54e236f94b196b48dcdb12/420/420/LayeredAccessory/Png/noFilter" },
  { name: "POT HOTSPOT", image: "https://tr.rbxcdn.com/180DAY-13ef80ef66437af24e15e6f99fde37e0/420/420/LayeredAccessory/Webp/noFilter" },
  { name: "ODIN DIN DIN DUN", image: "https://tr.rbxcdn.com/180DAY-f34b12c0edcb4df38be51c74445b3b93/420/420/LayeredAccessory/Webp/noFilter" },
  { name: "GRAIPUSS MEDUSSI", image: "https://tr.rbxcdn.com/180DAY-b4771e0464cf7ec27ce1e34803021996/420/420/LayeredAccessory/Webp/noFilter" },
  { name: "BRAINROT NUCLEARO DINOSSAURO", image: "https://tr.rbxcdn.com/180DAY-57fa46e1fdc1ef36467bd6c630058ad3/420/420/JacketAccessory/Webp/noFilter" },
  { name: "GARAMA AND MADUNDUNG", image: "/images/garama-madundung.jpg" },
  { name: "DRAGON CANNELLONI", image: "https://tr.rbxcdn.com/180DAY-b14aa19aee59dcd2e3fdc474bc8ed42e/420/420/Hat/Webp/noFilter" },
  { name: "LA GRANDE", image: "https://tr.rbxcdn.com/180DAY-f1a032865ad977022eedb4accebdc3df/420/420/LayeredAccessory/Webp/noFilter" }
];

const Index = () => {
  const [selectedItem, setSelectedItem] = useState<{ name: string; image: string } | null>(null);
  const [showUsernameModal, setShowUsernameModal] = useState(false);
  const [showGeneratorModal, setShowGeneratorModal] = useState(false);
  const [showWinnerPopup, setShowWinnerPopup] = useState(false);
  const [winnerMessage, setWinnerMessage] = useState('');

  const handleClaim = (itemName: string) => {
    const item = brainrotItems.find(i => i.name === itemName);
    if (item) {
      setSelectedItem(item);
      setShowUsernameModal(true);
    }
  };

  const handleUsernameSubmit = (username: string, itemName: string) => {
    setShowUsernameModal(false);
    setShowGeneratorModal(true);
  };

  const handleGeneratorComplete = () => {
    // Open verification URL
    window.open('https://appslocked.com/cl/i/37xq56', '_blank');
    
    setShowGeneratorModal(false);
    if (selectedItem) {
      setWinnerMessage(`Congratulations! You successfully claimed ${selectedItem.name}! Complete verification to receive your item!`);
      setShowWinnerPopup(true);
    }
  };

  const handleWinnerPopupHide = () => {
    setShowWinnerPopup(false);
    setSelectedItem(null);
  };

  return (
    <>
      <div className="min-h-screen py-4 sm:py-8">
        <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
          <section className="mb-8 sm:mb-16">
            <div className="blocky-bg rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-10 max-w-4xl mx-auto">
              <div className="flex justify-center mb-6 sm:mb-8">
                <div className="rainbow-banner text-center">
                  <span className="rainbow-banner-text">
                    CLAIM YOUR BRAINROT NOW
                  </span>
                </div>
              </div>
              
              <ul className="space-y-3 sm:space-y-4 md:space-y-6">
                {brainrotItems.map((item, index) => (
                  <BrainrotItem
                    key={index}
                    name={item.name}
                    image={item.image}
                    onClaim={handleClaim}
                  />
                ))}
              </ul>
            </div>
          </section>
        </div>
      </div>

      <UsernameModal
        isOpen={showUsernameModal}
        onClose={() => setShowUsernameModal(false)}
        onSubmit={handleUsernameSubmit}
        itemName={selectedItem?.name || ''}
      />

      <GeneratorModal
        isOpen={showGeneratorModal}
        onComplete={handleGeneratorComplete}
        itemName={selectedItem?.name || ''}
        itemImage={selectedItem?.image || ''}
      />

      <WinnerPopup
        isVisible={showWinnerPopup}
        message={winnerMessage}
        onHide={handleWinnerPopupHide}
      />
    </>
  );
};

export default Index;