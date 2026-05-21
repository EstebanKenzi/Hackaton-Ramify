import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Share2, Recycle, ShieldCheck, Globe, Scissors, Store, Sparkles, AlertCircle } from 'lucide-react';

export default function Passport() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // États pour l'économie circulaire
  const [showCollectPoints, setShowCollectPoints] = useState(false);
  const [showResellModal, setShowResellModal] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://${window.location.hostname}:3001/api/products/${id}`);
        if (!res.ok) throw new Error('Produit non trouvé');
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-950 via-slate-900 to-slate-950 flex flex-col justify-center items-center">
        <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-4 animate-pulse">Chargement du passeport...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-950 via-slate-900 to-slate-950 flex flex-col justify-center items-center text-slate-400 p-6">
        <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center text-red-500 mb-4 border border-red-500/20">
          <AlertCircle className="w-8 h-8" />
        </div>
        <p className="font-bold text-lg text-slate-200">Passeport introuvable</p>
        <p className="text-sm text-slate-500 text-center mt-1">Le produit demandé n'existe pas ou a été retiré.</p>
        <button 
          onClick={() => navigate('/')} 
          className="mt-6 px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-all border border-white/10 text-sm"
        >
          Retour au tableau de bord
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-950 via-slate-900 to-slate-950 flex justify-center items-center py-6 px-2 sm:px-4 md:py-12 font-sans antialiased text-slate-800 selection:bg-emerald-500 selection:text-white">
      {/* Conteneur principal simulant un mobile haut de gamme */}
      <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-[0_24px_60px_-15px_rgba(0,0,0,0.35)] overflow-hidden flex flex-col relative border border-slate-200/60 transition-all duration-300">
        
        {/* 4. Bandeau officiel discret ESPR 2026 */}
        <div className="bg-slate-950 text-slate-300 py-3 px-4 flex items-center justify-center space-x-2 border-b border-slate-800/50 relative overflow-hidden z-20 shrink-0">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-transparent to-emerald-500/10 animate-pulse" />
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 relative z-10" />
          <span className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-slate-200 relative z-10 text-center leading-normal">
            Passeport Numérique Certifié &bull; ESPR 2026
          </span>
        </div>

        {/* Header avec Image & Dégradé Sombre */}
        <div className="relative h-72 bg-slate-100 shrink-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent z-10" />
          <img 
            src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800" 
            alt={product.nom} 
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700 ease-out"
          />
          <button 
            onClick={() => navigate('/')}
            className="absolute top-4 left-4 z-20 p-2.5 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all border border-white/10 active:scale-95 shadow-lg"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: product.nom,
                  text: `Découvrez le passeport numérique de TraceLoop pour ${product.nom}`,
                  url: window.location.href,
                }).catch(console.error);
              } else {
                navigator.clipboard.writeText(window.location.href);
                alert('Lien copié dans le presse-papiers !');
              }
            }}
            className="absolute top-4 right-4 z-20 p-2.5 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all border border-white/10 active:scale-95 shadow-lg"
          >
            <Share2 className="w-5 h-5" />
          </button>
          
          <div className="absolute bottom-5 left-5 z-20 right-5">
            <span className="inline-block px-3 py-1 bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 rounded-full text-emerald-300 text-[10px] font-extrabold tracking-widest mb-2 uppercase">
              {product.marque}
            </span>
            <h1 className="text-2xl font-black text-white leading-tight tracking-tight">{product.nom}</h1>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6 space-y-6 overflow-y-auto pb-28 bg-slate-50/50">
          
          {/* 2. Affichage dynamique de l'Éco-Score (A à E) inspiré du Nutri-Score */}
          <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.015)] space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Éco-Score ESPR</span>
              <span className="text-[9px] font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full uppercase tracking-wider border border-emerald-500/10">
                Certifié UE
              </span>
            </div>

            {/* Nutri-Score Style horizontal bar */}
            <div className="flex items-stretch space-x-1 pt-1 h-14">
              {['A', 'B', 'C', 'D', 'E'].map((letter) => {
                const isActive = product.grade === letter;
                
                // Color mapping matching classic Nutri-Score & Eco-Score
                const colors = {
                  A: { bg: 'bg-[#1E5E3A]', text: 'text-white', glow: 'shadow-[#1E5E3A]/30' },
                  B: { bg: 'bg-[#7CB342]', text: 'text-white', glow: 'shadow-[#7CB342]/30' },
                  C: { bg: 'bg-[#FBC02D]', text: 'text-white', glow: 'shadow-[#FBC02D]/30' },
                  D: { bg: 'bg-[#F57C00]', text: 'text-white', glow: 'shadow-[#F57C00]/30' },
                  E: { bg: 'bg-[#D32F2F]', text: 'text-white', glow: 'shadow-[#D32F2F]/30' }
                };

                const activeStyle = colors[letter];

                if (isActive) {
                  return (
                    <div 
                      key={letter} 
                      className={`flex-1 flex flex-col items-center justify-center rounded-2xl ${activeStyle.bg} ${activeStyle.text} shadow-lg ${activeStyle.glow} border-2 border-white scale-110 -translate-y-1 z-10 transition-all duration-300`}
                    >
                      <span className="text-2xl font-black leading-none">{letter}</span>
                      <span className="text-[6px] font-black uppercase mt-0.5 tracking-wider leading-none">Actif</span>
                    </div>
                  );
                } else {
                  // Muted style with lighter pastel-like backgrounds
                  const baseColor = {
                    A: 'bg-[#1E5E3A]/10 text-[#1E5E3A]',
                    B: 'bg-[#7CB342]/10 text-[#7CB342]',
                    C: 'bg-[#FBC02D]/10 text-[#FBC02D]',
                    D: 'bg-[#F57C00]/10 text-[#F57C00]',
                    E: 'bg-[#D32F2F]/10 text-[#D32F2F]'
                  };

                  return (
                    <div 
                      key={letter} 
                      className={`flex-1 flex items-center justify-center rounded-xl ${baseColor[letter]} opacity-50 hover:opacity-85 hover:scale-105 transition-all duration-200`}
                    >
                      <span className="text-base font-black leading-none">{letter}</span>
                    </div>
                  );
                }
              })}
            </div>

            {/* Score interpretation */}
            <div className="flex items-center justify-between border-t border-slate-100 pt-3">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Score de conformité</p>
                <p className="text-slate-900 font-extrabold text-lg leading-tight mt-0.5">
                  {product.scoreConformite}% <span className="text-slate-400 font-semibold text-xs">/ 100</span>
                </p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Impact Global</p>
                <p className={`text-xs font-black uppercase tracking-wider mt-1 ${
                  product.grade === 'A' ? 'text-[#1E5E3A]' :
                  product.grade === 'B' ? 'text-[#7CB342]' :
                  product.grade === 'C' ? 'text-[#FBC02D]' :
                  product.grade === 'D' ? 'text-[#F57C00]' : 'text-[#D32F2F]'
                }`}>
                  {product.grade === 'A' ? 'Excellent — Minimal' :
                   product.grade === 'B' ? 'Très Bon — Faible' :
                   product.grade === 'C' ? 'Modéré' :
                   product.grade === 'D' ? 'Élevé' : 'Critique'}
                </p>
              </div>
            </div>
          </div>

          {/* 3. Jolie frise chronologique (Timeline) verticale de voyage */}
          <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.015)] space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Voyage du Vêtement</h3>
              <span className="text-[9px] font-extrabold text-slate-400 bg-slate-50 border border-slate-150 px-2 py-0.5 rounded-full uppercase tracking-wider">
                Traçabilité
              </span>
            </div>
            
            <div className="relative pl-6 space-y-6 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-gradient-to-b before:from-emerald-500 before:via-slate-200 before:to-slate-200">
              
              {/* Étape 1 : Provenance des matières */}
              <div className="relative group">
                {/* Icône et Cercle */}
                <div className="absolute -left-[23px] top-0 w-6 h-6 rounded-full bg-emerald-500 border-4 border-white flex items-center justify-center shadow-md shadow-emerald-500/20 group-hover:scale-115 transition-transform duration-200 z-10">
                  <Globe className="w-2.5 h-2.5 text-white" />
                </div>
                {/* Contenu de l'étape */}
                <div className="pl-4 space-y-1">
                  <span className="text-[8px] font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full uppercase tracking-wider border border-emerald-500/10">
                    Étape 1 &bull; Provenance des matières
                  </span>
                  <h4 className="text-xs font-black text-slate-900">Origine des fibres</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Matières premières récoltées et transformées en <span className="font-extrabold text-slate-800 bg-slate-50 border border-slate-100 px-1.5 py-0.5 rounded">{product.origine}</span>.
                  </p>
                  <p className="text-[10px] text-slate-400 italic">
                    Fibres : {product.materiaux}
                  </p>
                </div>
              </div>

              {/* Étape 2 : Confection */}
              <div className="relative group">
                {/* Icône et Cercle */}
                <div className="absolute -left-[23px] top-0 w-6 h-6 rounded-full bg-slate-200 border-4 border-white flex items-center justify-center shadow-sm group-hover:bg-emerald-500 group-hover:scale-115 group-hover:shadow-emerald-500/20 transition-all duration-200 z-10">
                  <Scissors className="w-2.5 h-2.5 text-slate-400 group-hover:text-white" />
                </div>
                {/* Contenu de l'étape */}
                <div className="pl-4 space-y-1">
                  <span className="text-[8px] font-extrabold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full uppercase tracking-wider group-hover:text-emerald-600 group-hover:bg-emerald-50 transition-colors duration-200">
                    Étape 2 &bull; Confection
                  </span>
                  <h4 className="text-xs font-black text-slate-900">Atelier de Confection</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Découpe, assemblage et finitions dans un atelier partenaire certifié éthique.
                  </p>
                  <p className="text-[10px] text-slate-400 flex items-center space-x-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>Audit social & environnemental approuvé</span>
                  </p>
                </div>
              </div>

              {/* Étape 3 : Votre magasin */}
              <div className="relative group">
                {/* Icône et Cercle */}
                <div className="absolute -left-[23px] top-0 w-6 h-6 rounded-full bg-slate-200 border-4 border-white flex items-center justify-center shadow-sm group-hover:bg-emerald-500 group-hover:scale-115 group-hover:shadow-emerald-500/20 transition-all duration-200 z-10">
                  <Store className="w-2.5 h-2.5 text-slate-400 group-hover:text-white" />
                </div>
                {/* Contenu de l'étape */}
                <div className="pl-4 space-y-1">
                  <span className="text-[8px] font-extrabold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full uppercase tracking-wider group-hover:text-emerald-600 group-hover:bg-emerald-50 transition-colors duration-200">
                    Étape 3 &bull; Distribution
                  </span>
                  <h4 className="text-xs font-black text-slate-900">Votre magasin</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Acheminement optimisé avec compensation carbone et disponibilité en boutique.
                  </p>
                  <p className="text-[10px] text-slate-400 flex items-center space-x-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                    <span>Prêt pour son premier jour et sa seconde vie</span>
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Section Économie Circulaire / Fin de vie du produit */}
          <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.015)] space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Économie Circulaire</h3>
              <span className="text-[9px] font-extrabold text-[#1E5E3A] bg-emerald-50 px-2 py-0.5 rounded-full uppercase tracking-wider border border-emerald-500/10">
                Loi AGEC &bull; Fin de vie
              </span>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-black text-slate-900 font-sans">Que faire de votre vêtement ?</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Valorisez votre pièce en lui offrant une seconde vie responsable ou en la recyclant localement.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-1">
                {/* Option Donner / Recycler */}
                <button 
                  onClick={() => setShowCollectPoints(!showCollectPoints)}
                  className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all duration-200 ${
                    showCollectPoints 
                      ? 'border-emerald-500 bg-emerald-50/20 text-emerald-900 ring-2 ring-emerald-500/10' 
                      : 'border-slate-150 hover:border-slate-300 bg-slate-50/50 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mb-2">
                    <Globe className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-center">Donner / Recycler</span>
                  <span className="text-[9px] text-slate-400 mt-1 font-medium">Points de collecte</span>
                </button>

                {/* Option Revendre */}
                <button 
                  onClick={() => setShowResellModal(true)}
                  className="flex flex-col items-center justify-center p-4 rounded-2xl border border-slate-150 hover:border-emerald-500 hover:bg-emerald-50/10 bg-slate-50/50 hover:text-emerald-900 transition-all duration-200"
                >
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-650 mb-2">
                    <Recycle className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-center">Revendre</span>
                  <span className="text-[9px] text-slate-400 mt-1 font-medium">TraceLoop Market</span>
                </button>
              </div>

              {/* Liste interactive des points de collecte textile */}
              {showCollectPoints && (
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-150 space-y-3 animate-fade-in mt-3">
                  <p className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider">Points de collecte proches</p>
                  
                  <div className="space-y-2.5">
                    <div className="flex items-start space-x-3 text-xs">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                      <div className="flex-1">
                        <p className="font-extrabold text-slate-800">Borne EcoTextile - Le Relais</p>
                        <p className="text-slate-500 text-[11px]">14 Rue de la République &bull; <span className="font-semibold text-emerald-600">à 150m</span></p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3 text-xs">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                      <div className="flex-1">
                        <p className="font-extrabold text-slate-800">Boutique Partenaire - Collecte en caisse</p>
                        <p className="text-slate-500 text-[11px]">Centre Commercial Grand Ciel &bull; <span className="font-semibold text-emerald-600">à 400m</span></p>
                        <p className="text-[10px] text-emerald-700 font-bold mt-0.5">Bon d'achat de 5€ offert</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 text-xs">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                      <div className="flex-1">
                        <p className="font-extrabold text-slate-800">Conteneur Croix-Rouge</p>
                        <p className="text-slate-500 text-[11px]">5 Avenue Charles de Gaulle &bull; <span className="font-semibold text-emerald-600">à 850m</span></p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Section Blockchain (Preuve de sécurité & authenticité) */}
          {product.txHashBlockchain && product.txHashBlockchain !== 'Non applicable' && (
            <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.015)] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Preuve Blockchain</span>
                <span className="text-[9px] font-extrabold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Sécurisé
                </span>
              </div>
              <div className="flex items-center space-x-3 bg-slate-50/50 p-3 rounded-2xl border border-slate-100/80">
                <Sparkles className="w-5 h-5 text-indigo-500 shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider leading-none">Hash Blockchain</p>
                  <p className="text-xs font-mono text-slate-650 truncate mt-1">{product.txHashBlockchain}</p>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Action Button Fini Premium en Pied de page */}
        <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-white via-white to-transparent pt-12 z-20 shrink-0">
          <button 
            onClick={() => setShowResellModal(true)}
            className="w-full flex justify-center items-center space-x-2 py-4 px-4 bg-slate-950 text-white rounded-2xl shadow-xl shadow-slate-950/20 hover:bg-slate-900 active:scale-[0.98] transition-all duration-200 font-extrabold text-sm border border-slate-800"
          >
            <Recycle className="w-5 h-5 text-emerald-400" />
            <span>Revendre en seconde main</span>
          </button>
        </div>

      </div>

      {/* 2. Fenêtre Modal "Votre annonce est prête !" */}
      {showResellModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-md z-50 flex items-center justify-center p-4 transition-all duration-300">
          <div className="bg-white rounded-[2.5rem] p-6 max-w-sm w-full border border-slate-100/80 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.3)] space-y-5 relative">
            
            {/* Trust badge */}
            <div className="flex justify-center">
              <div className="bg-emerald-50 border border-emerald-500/20 text-[#1E5E3A] px-4 py-1.5 rounded-full flex items-center space-x-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span className="text-[9px] font-black uppercase tracking-widest">Annonce Certifiée Authentique</span>
              </div>
            </div>

            {/* Modal Title */}
            <div className="text-center">
              <h3 className="text-xl font-black text-slate-900 tracking-tight">Votre annonce est prête !</h3>
              <p className="text-xs text-slate-500 mt-1">
                La mise en vente de votre article d'occasion a été automatisée et certifiée.
              </p>
            </div>

            {/* Fiche Produit Seconde Main */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/60 space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-slate-200 rounded-xl overflow-hidden shrink-0">
                  <img 
                    src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800" 
                    alt={product.nom} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest leading-none">{product.marque}</p>
                  <p className="text-sm font-extrabold text-slate-900 truncate mt-1">{product.nom}</p>
                </div>
              </div>

              <div className="border-t border-slate-200/80 pt-3 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400 font-bold uppercase tracking-wider text-[9px]">Composition :</span>
                  <span className="font-extrabold text-slate-800 truncate max-w-[180px] bg-white border border-slate-150 px-2 py-0.5 rounded-md">{product.materiaux}</span>
                </div>
                
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400 font-bold uppercase tracking-wider text-[9px]">Passeport ID :</span>
                  <span className="font-mono text-slate-650 bg-white border border-slate-150 px-2 py-0.5 rounded-md">#{product.id}</span>
                </div>

                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400 font-bold uppercase tracking-wider text-[9px]">Prix Occasion :</span>
                  <span className="font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">45,00 €</span>
                </div>
              </div>
            </div>

            {/* Certification Statement */}
            <div className="bg-emerald-50/40 border border-emerald-500/10 rounded-2xl p-4 flex items-start space-x-3">
              <Sparkles className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <h5 className="text-xs font-black text-emerald-950">Garantie Traçabilité TraceLoop</h5>
                <p className="text-[10px] text-emerald-850/90 leading-relaxed mt-0.5">
                  Cette annonce est certifiée authentique et infalsifiable car elle est liée directement au passeport numérique d'origine enregistré en base de données.
                </p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="space-y-2 pt-1">
              <button 
                onClick={() => {
                  alert("Félicitations, l'annonce a été publiée sur TraceLoop Market !");
                  setShowResellModal(false);
                }}
                className="w-full py-3.5 px-4 bg-slate-950 hover:bg-slate-900 text-white font-extrabold text-sm rounded-xl transition-all duration-200 active:scale-[0.98] border border-slate-800"
              >
                Publier l'annonce sur TraceLoop Market
              </button>
              <button 
                onClick={() => setShowResellModal(false)}
                className="w-full py-2 px-4 hover:bg-slate-100 text-slate-550 font-bold text-xs rounded-xl transition-all duration-150"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
