'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

type DraftProduct = {
  id: string;
  file: File;
  previewUrl: string;
  name: string;
  sku: string;
  weight: string;
  height: string; // 🚀 Naya field
  length: string; // 🚀 Naya field
  category: string; 
};

export default function BulkIdolUploadDashboard() {
  const [drafts, setDrafts] = useState<DraftProduct[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [defaultCategory, setDefaultCategory] = useState('ganesh_ji'); 
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(false); };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      addFilesToDrafts(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      addFilesToDrafts(Array.from(e.target.files));
    }
  };

  const addFilesToDrafts = (files: File[]) => {
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    const newDrafts = imageFiles.map(file => ({
      id: Math.random().toString(36).substring(7),
      file: file,
      previewUrl: URL.createObjectURL(file),
      name: '',
      sku: '',
      weight: '',
      height: '',
      length: '',
      category: defaultCategory
    }));
    setDrafts(prev => [...prev, ...newDrafts]);
  };

  const updateDraft = (id: string, field: keyof DraftProduct, value: string) => {
    setDrafts(prev => prev.map(draft => draft.id === id ? { ...draft, [field]: value } : draft));
  };

  const removeDraft = (id: string) => {
    setDrafts(prev => prev.filter(draft => draft.id !== id));
  };

  const handlePublish = async () => {
    if (drafts.length === 0) return alert("Pehle kuch photos to daal bhai!");
    
    const incomplete = drafts.find(d => !d.name || !d.sku || !d.weight);
    if (incomplete) return alert("Bhai, sabhi items ka Name, SKU aur Weight bharna zaroori hai!");

    setIsUploading(true);

    try {
      const formData = new FormData();
      
      const metadata = drafts.map(d => ({
        id: d.id, name: d.name, sku: d.sku, weight: d.weight, height: d.height, length: d.length, category: d.category
      }));
      formData.append('products', JSON.stringify(metadata));
      
      drafts.forEach(d => {
        formData.append(`file_${d.id}`, d.file);
      });

      const res = await fetch('/api/upload-idols', {
        method: 'POST',
        body: formData
      });

      const data = await res.json();
      
      if (data.success) {
        alert(`🎉 Bawaal! Tere ${data.count} Idols Sanity me save hoke Live ho gaye!`);
        setDrafts([]);
      } else {
        alert("Sanity ne error diya: " + data.error);
      }
    } catch (error) {
      alert("System me kuch gadbad ho gayi!");
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#150d11] p-8 pb-24 text-white">
      <div className="max-w-[1500px] mx-auto">
        
        {/* Header */}
        <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <h1 className="text-3xl font-serif text-[#d4af37] mb-2">Idol Master Dashboard</h1>
            <p className="text-gray-400">Bulk Upload & Fast Data Entry System for your VIP Collections.</p>
          </div>
          
          <div className="bg-black/40 border border-[#d4af37]/30 p-3 rounded-xl flex items-center gap-4 shadow-[0_0_15px_rgba(212,175,55,0.05)]">
            <span className="text-sm font-bold text-[#d4af37] uppercase tracking-wide">Select Idol Type:</span>
            <select 
              value={defaultCategory}
              onChange={(e) => setDefaultCategory(e.target.value)}
              className="bg-[#1a1114] border border-[#d4af37]/50 text-white text-sm rounded-lg px-4 py-2 focus:outline-none focus:border-[#d4af37] cursor-pointer"
            >
              <option value="ganesh_ji">Ganesh Ji</option>
              <option value="laxmi_ji">Laxmi Ji</option>
              <option value="laxmi_ganesh_jodi">Laxmi Ganesh Ji jodi</option>
              <option value="hanuman_ji">Hanuman Ji</option>
              <option value="krishna_ji">Krishna Ji / Laddu Gopal</option>
              <option value="ram_darbar">Ram Darbar</option>
              <option value="shiv_parvati">Shiv Parvati</option>
              <option value="saraswati_maa">Saraswati Maa</option>
              <option value="mataji">Mataji</option>
              <option value="jain_idols">Jain Idols</option>
              <option value="animal_idols">Animal Idols</option>
              <option value="gujarat_collection">Gujarat Collection</option>
              <option value="other_idols">Other Idols</option>
            </select>
          </div>
        </div>

        {/* Drag Drop Box */}
        <div 
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all duration-300 ${
            isDragging ? 'border-[#d4af37] bg-[#d4af37]/10' : 'border-gray-700 hover:border-[#d4af37]/50 bg-black/20'
          }`}
        >
          <input type="file" multiple accept="image/*" className="hidden" ref={fileInputRef} onChange={handleFileInput} />
          <div className="text-5xl mb-4">📸</div>
          <h3 className="text-xl text-[#d4af37] font-medium mb-2">Drag & Drop Photos Here</h3>
          <p className="text-gray-500">Selected photos will automatically be assigned to: <strong className="text-white capitalize">{defaultCategory.replace(/_/g, ' ')}</strong></p>
        </div>

        {/* Excel Grid (Updated columns to fit Height & Length) */}
        {drafts.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-12 bg-black/40 rounded-xl border border-[#d4af37]/20 overflow-hidden shadow-2xl">
            <div className="grid grid-cols-12 gap-3 bg-[#d4af37]/10 p-4 border-b border-[#d4af37]/20 text-[11px] font-bold text-[#d4af37] uppercase tracking-wider">
              <div className="col-span-1 text-center">Photo</div>
              <div className="col-span-2">Item Name</div>
              <div className="col-span-2">Idol Type</div>
              <div className="col-span-2">SKU (Code)</div>
              <div className="col-span-2">Weight</div>
              <div className="col-span-1">Height</div>
              <div className="col-span-1">Length</div>
              <div className="col-span-1 text-center">Action</div>
            </div>

            <div className="divide-y divide-gray-800 max-h-[500px] overflow-y-auto">
              {drafts.map((draft) => (
                <div key={draft.id} className="grid grid-cols-12 gap-3 p-4 items-center hover:bg-white/5 transition-colors">
                  
                  <div className="col-span-1 flex justify-center">
                    <img src={draft.previewUrl} alt="preview" className="w-12 h-12 object-cover rounded border border-[#d4af37]/30 shadow-md" />
                  </div>

                  <div className="col-span-2">
                    <input type="text" placeholder="e.g. Antique Ganesha" value={draft.name} onChange={(e) => updateDraft(draft.id, 'name', e.target.value)} className="w-full bg-transparent border-b border-gray-700 px-2 py-1.5 focus:outline-none focus:border-[#d4af37] text-sm text-gray-200 placeholder-gray-600" />
                  </div>

                  <div className="col-span-2">
                    <select value={draft.category} onChange={(e) => updateDraft(draft.id, 'category', e.target.value)} className="w-full bg-transparent border-b border-gray-700 px-2 py-1.5 focus:outline-none focus:border-[#d4af37] text-sm text-[#d4af37] cursor-pointer">
                      <option className="bg-[#150d11] text-white" value="ganesh_ji">Ganesh Ji</option>
                      <option className="bg-[#150d11] text-white" value="laxmi_ji">Laxmi Ji</option>
                      <option className="bg-[#150d11] text-white" value="laxmi_ganesh_jodi">Laxmi Ganesh Ji jodi</option>
                      <option className="bg-[#150d11] text-white" value="hanuman_ji">Hanuman Ji</option>
                      <option className="bg-[#150d11] text-white" value="krishna_ji">Krishna Ji / Laddu Gopal</option>
                      <option className="bg-[#150d11] text-white" value="ram_darbar">Ram Darbar</option>
                      <option className="bg-[#150d11] text-white" value="shiv_parvati">Shiv Parvati</option>
                      <option className="bg-[#150d11] text-white" value="saraswati_maa">Saraswati Maa</option>
                      <option className="bg-[#150d11] text-white" value="mataji">Mataji</option>
                      <option className="bg-[#150d11] text-white" value="jain_idols">Jain Idols</option>
                      <option className="bg-[#150d11] text-white" value="animal_idols">Animal Idols</option>
                      <option className="bg-[#150d11] text-white" value="gujarat_collection">Gujarat Collection</option>
                      <option className="bg-[#150d11] text-white" value="other_idols">Other Idols</option>
                    </select>
                  </div>

                  <div className="col-span-2">
                    <input type="text" placeholder="OAS-001" value={draft.sku} onChange={(e) => updateDraft(draft.id, 'sku', e.target.value)} className="w-full bg-transparent border-b border-gray-700 px-2 py-1.5 focus:outline-none focus:border-[#d4af37] text-sm text-gray-200 placeholder-gray-600 uppercase" />
                  </div>

                  <div className="col-span-2">
                    <input type="text" placeholder="e.g. 15.5g" value={draft.weight} onChange={(e) => updateDraft(draft.id, 'weight', e.target.value)} className="w-full bg-transparent border-b border-gray-700 px-2 py-1.5 focus:outline-none focus:border-[#d4af37] text-sm text-[#d4af37] font-medium placeholder-gray-600" />
                  </div>

                  {/* Height Input */}
                  <div className="col-span-1">
                    <input type="text" placeholder="e.g. 2.5 inch" value={draft.height} onChange={(e) => updateDraft(draft.id, 'height', e.target.value)} className="w-full bg-transparent border-b border-gray-700 px-2 py-1.5 focus:outline-none focus:border-[#d4af37] text-sm text-gray-300 placeholder-gray-600" />
                  </div>

                  {/* Length Input */}
                  <div className="col-span-1">
                    <input type="text" placeholder="e.g. 2 inch" value={draft.length} onChange={(e) => updateDraft(draft.id, 'length', e.target.value)} className="w-full bg-transparent border-b border-gray-700 px-2 py-1.5 focus:outline-none focus:border-[#d4af37] text-sm text-gray-300 placeholder-gray-600" />
                  </div>

                  <div className="col-span-1 text-center">
                    <button onClick={() => removeDraft(draft.id)} className="text-red-500 hover:text-red-400 text-2xl leading-none transition-transform hover:scale-110" title="Remove Item">×</button>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Action Bar */}
            <div className="p-4 bg-black border-t border-[#d4af37]/20 flex justify-between items-center">
              <span className="text-gray-400 text-sm">Total Items: <strong className="text-[#d4af37] text-lg">{drafts.length}</strong></span>
              <button 
                onClick={handlePublish}
                disabled={isUploading}
                className={`px-10 py-3 rounded-full font-bold uppercase tracking-[0.1em] text-sm transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.4)] ${
                  isUploading ? 'bg-gray-500 text-gray-300 cursor-not-allowed' : 'bg-[#d4af37] text-black hover:bg-yellow-400 hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] hover:-translate-y-0.5'
                }`}
              >
                {isUploading ? '🚀 Uploading to Sanity...' : 'Publish to Website 🚀'}
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}