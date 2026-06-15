import fs from 'fs';

let content = fs.readFileSync('app/admin/page.tsx', 'utf-8');

// 1. Replace imports
content = content.replace(
  /import\s*\{\s*Settings,[\s\S]*?from\s*'lucide-react';/,
`import { 
  Gear as Settings, 
  HardDrives as Server, 
  Tote as ShoppingBag, 
  GameController as Gamepad2, 
  Users, 
  CreditCard, 
  SquaresFour as LayoutDashboard, 
  Hammer, 
  PencilSimple as Pencil, 
  Trash as Trash2, 
  Plus, 
  ArrowCounterClockwise as RotateCcw, 
  X, 
  FloppyDisk as Save,
  MagnifyingGlass as Search,
  CheckCircle,
  Warning as AlertTriangle,
  Upload,
  Image as FileImage
} from '@phosphor-icons/react';
import * as PhosphorIcons from '@phosphor-icons/react';

const availableIcons = Object.keys(PhosphorIcons).filter(key => 
  typeof (PhosphorIcons as any)[key] === 'function' && /^[A-Z]/.test(key) && key !== 'IconBase' && key !== 'IconContext'
);`
);

// 2. Insert states
content = content.replace(
  /const \[isResetConfirmOpen, setIsResetConfirmOpen\] = useState\(false\);/,
  `const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);
  const [iconPickerOpen, setIconPickerOpen] = useState<number | null>(null);
  const [iconSearch, setIconSearch] = useState('');`
);

// 3. Replace "Ikon Lucide" and the input
content = content.replace(
  /<label className="block text-\[9px\] font-bold text-text-secondary mb-1">\s*Ikon Lucide\s*<\/label>\s*<input\s*type="text"\s*required\s*value=\{feat\.icon\}\s*onChange=\{\(e\) => handleUpdateFeatureField\(feat\.id, 'icon', e\.target\.value\)\}\s*className="w-full bg-bg-panel border border-stone-gray text-text-primary p-2 text-xs tracking-wider focus:border-primary focus:outline-none rounded-none"\s*\/>/g,
  `<label className="block text-[9px] font-bold text-text-secondary mb-1">
                            Ikon Phosphor
                         </label>
                         <div className="flex gap-2">
                           <button 
                             type="button" 
                             onClick={() => setIconPickerOpen(feat.id)} 
                             className="p-2 border border-stone-gray bg-bg-panel hover:bg-bg-surface flex items-center justify-center min-w-[40px] cursor-pointer transition-colors"
                             title="Pilih Ikon"
                           >
                             {(() => {
                               const IconComponent = (PhosphorIcons as any)[feat.icon] || PhosphorIcons.Package;
                               return <IconComponent className="w-4 h-4 text-primary" />;
                             })()}
                           </button>
                           <input 
                             type="text"
                             required
                             value={feat.icon}
                             onChange={(e) => handleUpdateFeatureField(feat.id, 'icon', e.target.value)}
                             className="w-full bg-bg-panel border border-stone-gray text-text-primary p-2 text-xs tracking-wider focus:border-primary focus:outline-none rounded-none"
                           />
                         </div>`
);

// 4. Add the modal at the very end before the last closing div
content = content.replace(
  /(\s*<\/div>\s*\n\s*\);\s*\n\s*\}\s*)$/,
  `
      {/* ICON PICKER MODAL */}
      {iconPickerOpen !== null && (
        <div className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4">
          <div className="minecraft-panel max-w-3xl w-full h-[85vh] flex flex-col bg-bg-panel border-2 border-stone-gray p-6 text-left animate-zoom-in">
            <div className="flex justify-between items-center pb-4 mb-4 border-b border-stone-gray shrink-0">
              <h2 className="text-xl font-bold tracking-tight text-text-primary flex items-center gap-2">
                <LayoutDashboard className="w-5 h-5 text-primary" /> Pilih Ikon Phosphor
              </h2>
              <button 
                onClick={() => { setIconPickerOpen(null); setIconSearch(''); }}
                className="p-1 border border-stone-gray hover:border-red-500 hover:text-red-500 text-text-secondary transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="relative mb-4 shrink-0">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-text-secondary" />
              <input 
                type="text" 
                placeholder="Cari ikon (contoh: Package, Check, Arrow...)" 
                value={iconSearch}
                onChange={(e) => setIconSearch(e.target.value)}
                className="w-full bg-bg-surface border border-stone-gray text-text-primary placeholder:text-stone-500 pl-10 pr-4 py-2 text-xs tracking-wider focus:border-primary focus:outline-none rounded-none"
                autoFocus
              />
            </div>

            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
                {availableIcons.filter(iconName => iconName.toLowerCase().includes(iconSearch.toLowerCase())).slice(0, 200).map(iconName => {
                  const IconComp = (PhosphorIcons as any)[iconName];
                  return (
                    <button
                      key={iconName}
                      onClick={() => {
                        handleUpdateFeatureField(iconPickerOpen, 'icon', iconName);
                        setIconPickerOpen(null);
                        setIconSearch('');
                      }}
                      className="p-3 border border-stone-gray bg-bg-surface hover:bg-wood-dark/20 hover:border-primary/30 text-text-secondary hover:text-primary transition-colors flex flex-col items-center justify-center gap-2 rounded-none aspect-square cursor-pointer group"
                      title={iconName}
                    >
                      <IconComp className="w-6 h-6" weight="regular" />
                      <span className="text-[8px] truncate w-full text-center group-hover:text-text-primary">{iconName}</span>
                    </button>
                  );
                })}
              </div>
              {availableIcons.filter(iconName => iconName.toLowerCase().includes(iconSearch.toLowerCase())).length === 0 && (
                <div className="py-12 text-center text-text-secondary flex flex-col items-center gap-2">
                  <AlertTriangle className="w-8 h-8 opacity-50" />
                  <p>Tidak ada ikon yang cocok dengan pencarian.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
$1`
);

fs.writeFileSync('app/admin/page.tsx', content);
