import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, ShieldCheck, MapPin, CheckCircle } from 'lucide-react';

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [createdProduct, setCreatedProduct] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.target);
    const data = {
      nom: formData.get('name'),
      marque: 'TraceLoop Demo',
      materiaux: formData.get('materials'),
      origin_fabric: formData.get('origin_fabric'),
      origin_manufacturing: formData.get('origin_manufacturing'),
      clientUrl: window.location.origin
    };

    try {
      const res = await fetch(`https://hackaton-ramify-1.onrender.com`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      
      if (!res.ok) throw new Error('Erreur réseau');
      
      const result = await res.json();
      setCreatedProduct(result);
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de la création du passeport.');
    } finally {
      setLoading(false);
    }
  };

  // Si le produit est créé, on affiche l'écran de succès avec le QR Code et le score
  if (createdProduct) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-md w-full bg-white py-10 px-6 shadow-xl shadow-slate-200/50 rounded-[2rem] border border-slate-100 text-center space-y-6">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-[#10B981]/10 rounded-full flex items-center justify-center text-[#10B981]">
              <CheckCircle className="w-8 h-8" />
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900">Félicitations !</h2>
            <p className="mt-2 text-sm text-slate-500 px-4">
              Le Passeport Numérique pour <span className="font-semibold text-slate-900">{createdProduct.nom}</span> a été créé avec succès.
            </p>
          </div>

          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 flex flex-col items-center">
            
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Score ESPR Européen</p>
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg mb-6 ${createdProduct.grade === 'A' || createdProduct.grade === 'B' ? 'bg-gradient-to-br from-[#10B981] to-emerald-600 shadow-emerald-500/30' : createdProduct.grade === 'C' ? 'bg-gradient-to-br from-orange-400 to-orange-500 shadow-orange-500/30' : 'bg-gradient-to-br from-red-500 to-rose-600 shadow-red-500/30'}`}>
              <span className="text-white text-3xl font-black">{createdProduct.grade}</span>
            </div>

            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 border-t border-slate-200 w-full pt-6">QR Code Public</p>
            {createdProduct.qrCodeDataUri ? (
              <img 
                src={createdProduct.qrCodeDataUri} 
                alt="QR Code du produit" 
                className="w-48 h-48 rounded-xl shadow-sm bg-white p-2 border border-slate-200" 
              />
            ) : (
              <div className="w-48 h-48 bg-slate-200 animate-pulse rounded-xl" />
            )}
            <p className="text-xs text-slate-500 mt-4">À imprimer sur l'étiquette du vêtement</p>
          </div>

          <div className="space-y-3 pt-4">
            <Link
              to={`/product/${createdProduct.id}`}
              className="w-full flex justify-center items-center space-x-2 py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-[#10B981] hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#10B981] transition-all"
            >
              <span>Voir le passeport en conditions réelles</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
            
            <button
              onClick={() => setCreatedProduct(null)}
              className="w-full py-3.5 px-4 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Créer un autre passeport
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Formulaire de création
  return (
    <div className="min-h-screen flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-white rounded-full shadow-sm border border-slate-100">
              <Leaf className="h-8 w-8 text-[#10B981]" />
            </div>
          </div>
          <h2 className="mt-2 text-3xl font-extrabold text-slate-900 tracking-tight">TraceLoop</h2>
          <p className="mt-2 text-sm text-slate-500">Passeport Numérique des Produits (ESPR)</p>
        </div>

        <div className="bg-white py-8 px-6 shadow-xl shadow-slate-200/50 rounded-[2rem] sm:px-10 border border-slate-100">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-bold text-slate-700">
                Nom du produit
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Ex: T-Shirt Essentiel Bio"
                  className="appearance-none block w-full px-4 py-3 border border-slate-200 rounded-xl placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#10B981]/20 focus:border-[#10B981] sm:text-sm transition-all bg-slate-50/50 focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label htmlFor="materials" className="block text-sm font-bold text-slate-700">
                Composition (Matières)
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  id="materials"
                  name="materials"
                  type="text"
                  required
                  placeholder="Ex: 100% Coton Biologique"
                  className="appearance-none block w-full px-4 py-3 border border-slate-200 rounded-xl placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#10B981]/20 focus:border-[#10B981] sm:text-sm transition-all bg-slate-50/50 focus:bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="origin_fabric" className="block text-sm font-bold text-slate-700">
                  Origine du tissu
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-4 w-4 text-slate-400" />
                  </div>
                  <input
                    id="origin_fabric"
                    name="origin_fabric"
                    type="text"
                    required
                    placeholder="Ex: Inde"
                    className="appearance-none block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#10B981]/20 focus:border-[#10B981] sm:text-sm transition-all bg-slate-50/50 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="origin_manufacturing" className="block text-sm font-bold text-slate-700">
                  Confection
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-4 w-4 text-slate-400" />
                  </div>
                  <input
                    id="origin_manufacturing"
                    name="origin_manufacturing"
                    type="text"
                    required
                    placeholder="Ex: Portugal"
                    className="appearance-none block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#10B981]/20 focus:border-[#10B981] sm:text-sm transition-all bg-slate-50/50 focus:bg-white"
                  />
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-[#10B981] hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#10B981] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Génération en cours...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <ShieldCheck className="w-5 h-5" />
                    <span>Générer le Passeport Numérique</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
