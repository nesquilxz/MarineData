/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo, useState, useRef, useEffect } from 'react';
import { Shield, Radar, Users, Globe as GlobeIcon, ChevronRight, Activity, Zap, Search, AlertCircle, Anchor, Skull, Filter, X } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { motion, AnimatePresence } from 'motion/react';
import Globe from 'react-globe.gl';
import * as DataService from './dataService';
import { PirateRecord } from './dataService';

const formatBounty = (value: number) => {
  if (value >= 1000000000) return `฿ ${(value / 1000000000).toFixed(1)}B`;
  if (value >= 1000000) return `฿ ${(value / 1000000).toFixed(1)}M`;
  return `฿ ${value.toLocaleString()}`;
};

const Logo = ({ className = "w-8 h-8", fill = "#0039B9" }: { className?: string, fill?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 256 256" 
    fill="none" 
    className={className}
  >
    <path 
      d="M 128 192 C 92.654 192 64 156 L 0 256 C 0 185.308 57.308 128 128 128 Z M 256 128 C 256 198.692 198.692 256 128 256 L 128 192 C 163.346 192 192 163.346 192 128 Z M 128 64 C 92.654 64 64 92.654 64 128 L 0 128 C 0 57.308 57.308 0 128 0 Z M 256 0 C 256 70.692 198.692 256 128 256 L 128 64 C 163.346 64 192 35.346 192 0 Z" 
      fill={fill}
    />
  </svg>
);

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-6">
      <div className="flex items-center gap-8 bg-white/70 backdrop-blur-md border border-gray-200/80 rounded-full px-5 py-2.5 shadow-sm transition-all duration-300">
        <div className="flex items-center gap-3">
          <img 
            src="https://i.pinimg.com/1200x/88/d0/1e/88d01e4bd1abd41ee71c5a657f618c1f.jpg" 
            alt="Marine Emblem" 
            className="h-7 w-auto object-contain"
            referrerPolicy="no-referrer"
          />
          <span className="font-bold text-[#001C5E] tracking-tight">MARINE DATA</span>
        </div>
        
        <div className="hidden lg:flex items-center gap-8">
          {[
            { name: 'Intelligence', id: 'intelligence' },
            { name: 'Operations', id: 'operations' },
            { name: 'Global Threats', id: 'global-threats' },
            { name: 'Bounty Feed', id: 'bounty-feed' }
          ].map((link) => (
            <a 
              key={link.id} 
              href={`#${link.id}`}
              className="text-sm font-medium text-gray-600 hover:text-[#98D7C2] transition-colors duration-150"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};


const BountyPoster = ({ pirate, size = "md" }: { pirate: PirateRecord, size?: "sm" | "md" | "lg" }) => {
  const isLarge = size === "lg";
  const mappedImage = DataService.getPirateImage(pirate.pirata, pirate.imgIndex);
  
  return (
    <div className={`wanted-border bg-[#F5E6CA] p-4 ${isLarge ? 'w-64' : 'w-48'} rotate-1 hover:rotate-0 transition-transform duration-300 shadow-2xl relative overflow-hidden group`}>
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')] opacity-10" />
      <div className="text-center font-serif font-black text-gray-800 uppercase tracking-[0.2em] mb-2 text-xl italic select-none">Wanted</div>
      <div className="relative aspect-[3/4] overflow-hidden rounded-sm border border-gray-900/10 mb-3 bg-gray-100 italic flex items-center justify-center text-gray-400">
        {mappedImage ? (
          <img 
            src={mappedImage} 
            alt={pirate.pirata} 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 transition-all duration-700"
          />
        ) : (
          <div className="flex flex-col items-center gap-2">
            <Skull className="w-12 h-12 text-gray-300 opacity-50" />
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-300">No Intelligence</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <div className="text-center">
        <div className="text-xl font-black text-gray-900 tracking-tighter leading-tight uppercase mb-1 font-serif">{pirate.pirata}</div>
        <div className="bg-gray-900/5 py-1 px-2 rounded-md">
           <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-0.5">Dead or Alive</div>
           <div className="text-lg font-black text-gray-800 tracking-tight leading-none">{formatBounty(pirate.bounty)}</div>
        </div>
      </div>
      <div className="mt-3 pt-2 border-t border-gray-900/10 flex justify-between items-center px-1">
         <span className="text-[8px] font-black text-gray-400 uppercase tracking-tighter">Marine Intelligence Division</span>
         <div className="w-1.5 h-1.5 rounded-full bg-red-500 opacity-60" />
      </div>
    </div>
  );
};

const WantedPosterSkeleton = ({ className = "", rotate = 0, pirate }: { className?: string, rotate?: number, pirate?: PirateRecord }) => {
  const mappedImage = pirate ? DataService.getPirateImage(pirate.pirata, pirate.imgIndex) : null;
  
  return (
    <div 
      className={`wanted-border bg-white p-3 w-40 shadow-xl border border-gray-200/50 pointer-events-none select-none transition-all duration-700 ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <div className="text-center font-serif font-black text-[#0039B9]/20 uppercase tracking-[0.1em] mb-1.5 text-xs italic">Wanted</div>
      
      {/* Background Poster Image Area */}
      <div className="relative aspect-[3/4] rounded-sm bg-gray-50 border border-dashed border-gray-100 mb-2 flex flex-col items-center justify-center gap-1 group overflow-hidden">
        {mappedImage ? (
           <img 
            src={mappedImage} 
            alt={pirate?.pirata} 
            className="w-full h-full object-cover grayscale opacity-60 mix-blend-multiply" 
            referrerPolicy="no-referrer"
          />
        ) : (
          <>
            <Skull className="w-8 h-8 text-gray-200" />
            <div className="w-1/2 h-1 bg-gray-100 rounded-full" />
          </>
        )}
        <div className="absolute inset-0 bg-[#98D7C2]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      <div className="text-center space-y-1.5">
        <div className="text-[10px] font-black text-gray-700 uppercase tracking-tighter truncate">
          {pirate?.pirata || <div className="h-4 bg-gray-100 rounded-md w-3/4 mx-auto" />}
        </div>
        <div className="bg-[#0039B9]/5 py-1 px-2 rounded-md space-y-0.5">
           <div className="text-[6px] font-black text-gray-400 uppercase tracking-widest">Global Scan</div>
           <div className="text-[9px] font-black text-[#0039B9] font-mono">
             {pirate ? formatBounty(pirate.bounty) : <div className="h-3 bg-[#0039B9]/10 rounded-full w-2/3 mx-auto" />}
           </div>
        </div>
      </div>

      <div className="mt-2 pt-1.5 border-t border-gray-100 flex justify-between items-center px-0.5">
         <div className="w-1 h-1 rounded-full bg-[#98D7C2]" />
         <div className="text-[6px] font-black text-gray-300 uppercase tracking-tighter">Marine Intel</div>
      </div>
    </div>
  );
};

const SectionHeader = ({ id, badge, title, subtitle }: { id: string, badge: string, title: string, subtitle: string }) => (
  <div id={id} className="max-w-7xl mx-auto px-6 mb-16 text-center lg:text-left">
    <div className="bg-[#0039B9]/5 text-[#0039B9] inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-4">
      <Zap className="w-3 h-3 fill-current" /> {badge}
    </div>
    <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">{title}</h2>
    <p className="text-lg text-gray-500 max-w-2xl">{subtitle}</p>
  </div>
);

const IntelligenceDashboard = () => {
  const allPirates = useMemo(() => DataService.getAllPirates(), []);
  const piratesWithImages = useMemo(() => {
    return allPirates.filter(p => !!DataService.getPirateImage(p.pirata, p.imgIndex));
  }, [allPirates]);
  
  // Selection of random pirates for decorative background
  const randomDecorPirates = useMemo(() => {
    return [...piratesWithImages].sort(() => 0.5 - Math.random()).slice(0, 10);
  }, [piratesWithImages]);

  const [showOnlyAliveTop3, setShowOnlyAliveTop3] = useState(false);

  const topPirates = useMemo(() => {
    if (showOnlyAliveTop3) {
      return allPirates
        .filter(p => p.status_historia === 'Vivo' || p.status_historia === 'Viva')
        .sort((a, b) => b.bounty - a.bounty)
        .slice(0, 3);
    }
    return DataService.getTop3Pirates();
  }, [allPirates, showOnlyAliveTop3]);

  const crewStats = useMemo(() => DataService.getBountyByCrew(), []);
  const captainStats = useMemo(() => DataService.getDangerousCaptains(), []);
  const islandDanger = useMemo(() => DataService.getDangerByIsland(), []);
  const yonkoTargets = useMemo(() => DataService.getYonko(), []);
  const warlords = useMemo(() => {
    const data = DataService.getExShichibukai();
    const stats = DataService.getExShichibukaiStats();
    return { data, ...stats };
  }, []);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isFeedExpanded, setIsFeedExpanded] = useState(false);
  const [selectedPirate, setSelectedPirate] = useState<PirateRecord | null>(null);
  const [expandedCommander, setExpandedCommander] = useState<string | null>(null);

  const filteredPirates = useMemo(() => {
    return allPirates.filter(p => {
      const matchesSearch = 
        p.pirata.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.tripulacao.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.capitao.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'All' || 
        (statusFilter === 'Vivo' && (p.status_historia === 'Vivo' || p.status_historia === 'Viva')) ||
        (statusFilter === 'Falecido' && p.status_historia === 'Falecido') ||
        (statusFilter === 'Desaparecido' && (p.status_historia.includes('Desconhecido') || p.status_historia.includes('Desaparecido')));
      
      return matchesSearch && matchesStatus;
    });
  }, [allPirates, searchTerm, statusFilter]);

  return (
    <div className="bg-white">
      {/* 1. Top Pirates & Summary Ribbon */}
      <section className="py-24 border-b border-gray-100 bg-gray-50/30">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-4 gap-12 items-center">
           <div className="lg:col-span-1 border-r border-gray-200 pr-12 hidden lg:block">
              <div className="space-y-12">
                 {[
                   { label: "Total Fleet Bounty", val: formatBounty(allPirates.reduce((a, b) => a + b.bounty, 0)), icon: Skull },
                   { label: "High Risk Targets", val: allPirates.length, icon: Shield },
                   { label: "Sea Locations", val: islandDanger.length, icon: GlobeIcon },
                 ].map((stat, i) => (
                   <div key={i} className="group">
                      <div className="bg-[#001C5E]/10 w-10 h-10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#98D7C2]/20 transition-colors">
                        <stat.icon className="w-5 h-5 text-[#001C5E]" />
                      </div>
                      <div className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">{stat.label}</div>
                      <div className="text-3xl font-black text-gray-900 tracking-tight">{stat.val}</div>
                   </div>
                 ))}
              </div>
           </div>
           <div className="lg:col-span-3">
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
                 <SectionHeader 
                   id="intelligence" 
                   badge="High Priority" 
                   title="Top Priority Targets" 
                   subtitle="The three most dangerous individuals currently operating in open waters. Translation of real-time bounty data."
                 />
                 <div className="px-6 mb-16 lg:mb-20 flex justify-center lg:justify-end">
                   <button 
                     onClick={() => setShowOnlyAliveTop3(!showOnlyAliveTop3)}
                     className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all shadow-sm ${
                       showOnlyAliveTop3 
                         ? 'bg-[#98D7C2] text-[#001C5E] shadow-[#98D7C2]/20 border border-[#98D7C2]' 
                         : 'bg-white border border-gray-200 text-gray-500 hover:border-[#98D7C2] hover:text-[#001C5E]'
                     }`}
                   >
                     <Filter className="w-3.5 h-3.5" />
                     {showOnlyAliveTop3 ? 'Confirmed Active Only' : 'Show All High-Risk'}
                   </button>
                 </div>
              </div>
              
              <div className="flex flex-wrap justify-center lg:justify-start gap-12">
                <AnimatePresence mode="wait">
                 {topPirates.map((p, i) => (
                   <motion.div 
                     key={p.pirata} 
                     initial={{ opacity: 0, y: 10 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0, scale: 0.95 }}
                     transition={{ duration: 0.4, delay: i * 0.1 }}
                     className={`relative ${i === 0 ? 'lg:scale-110 z-10' : ''}`}
                   >
                     {i === 0 && (
                       <div className="absolute -top-12 left-1/2 -translate-x-1/2 z-20">
                         <div className="bg-red-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-[0_10px_20px_-5px_rgba(220,38,38,0.5)] animate-pulse flex items-center gap-2 whitespace-nowrap">
                           <AlertCircle className="w-3 h-3" /> Critical Threat
                         </div>
                       </div>
                     )}
                     <BountyPoster pirate={p} size={i === 0 ? "lg" : "md"} />
                   </motion.div>
                 ))}
                </AnimatePresence>
              </div>
           </div>
        </div>
      </section>

      {/* 2. Global Threat Analytics (Crews & Captains) */}
      <section id="global-threats" className="py-32 relative overflow-hidden">
        {/* Decorative Side Posters */}
        <div className="absolute inset-0 z-0 pointer-events-none hidden xl:block">
           <WantedPosterSkeleton pirate={randomDecorPirates[0]} className="absolute top-20 -left-12 opacity-20 rotate-6" />
           <WantedPosterSkeleton pirate={randomDecorPirates[1]} className="absolute top-1/2 -right-12 opacity-20 -rotate-6" />
           <WantedPosterSkeleton pirate={randomDecorPirates[2]} className="absolute bottom-20 -left-12 opacity-20 rotate-12" />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(#001C5E_0.5px,transparent_0.5px)] [background-size:24px_24px] opacity-[0.03]" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
             {/* Crews */}
             <div>
                <SectionHeader id="crews" badge="Syndicates" title="Dangerous Crews" subtitle="Aggregated bounty totals from World Government records." />
                <div className="space-y-4">
                   {crewStats.slice(0, 6).map((c, i) => (
                     <div key={c.tripulacao} className="flex items-center justify-between p-6 bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-md transition-all group">
                        <div className="flex items-center gap-5">
                           <div className="text-2xl font-black text-gray-200 tracking-tighter w-8">0{i+1}</div>
                           <div className="font-black text-gray-900 group-hover:text-[#001C5E] transition-colors">{c.tripulacao}</div>
                        </div>
                        <div className="text-right">
                           <div className="text-lg font-black text-[#001C5E]">{formatBounty(c.bounty)}</div>
                           <div className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Global Ranking</div>
                        </div>
                     </div>
                   ))}
                </div>
             </div>
             {/* Captains */}
             <div>
                <SectionHeader id="commanders" badge="Commanders" title="Commanders of Threat" subtitle="Rankings based on individual and collective risk factors." />
                <div className="grid grid-cols-1 gap-4">
                   {captainStats.slice(0, 6).map((cap, i) => {
                     const mappedImg = DataService.getPirateImage(cap.capitao, i);
                     const isExpanded = expandedCommander === cap.capitao;
                     const crew = allPirates.filter(p => p.capitao === cap.capitao).sort((a, b) => b.bounty - a.bounty);
                     
                     return (
                       <div key={cap.capitao} className="flex flex-col border-b border-gray-100 last:border-0 overflow-hidden">
                         <div 
                           onClick={() => setExpandedCommander(isExpanded ? null : cap.capitao)}
                           className={`flex items-center gap-6 p-6 group transition-all cursor-pointer rounded-2xl ${isExpanded ? 'bg-gray-50' : 'hover:bg-gray-50/50'}`}
                         >
                            <div className="h-14 w-14 rounded-full bg-gray-50 overflow-hidden grayscale group-hover:grayscale-0 transition-all flex-shrink-0 flex items-center justify-center border border-gray-100">
                               {mappedImg ? (
                                 <img src={mappedImg} alt={cap.capitao} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                               ) : (
                                 <Skull className="w-6 h-6 text-gray-200" />
                               )}
                            </div>
                            <div className="flex-1">
                               <div className="flex justify-between items-end mb-1">
                                  <div className="flex items-center gap-2">
                                    <span className="font-black text-gray-900">{cap.capitao}</span>
                                    <ChevronRight className={`w-4 h-4 text-gray-300 transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`} />
                                  </div>
                                  <span className="text-sm font-black text-[#98D7C2]">{formatBounty(cap.bounty)}</span>
                               </div>
                               <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                  <div className="h-full bg-[#001C5E] transition-all duration-1000" style={{ width: cap.bounty > 0 ? `${(cap.bounty / captainStats[0].bounty) * 100}%` : '0%' }} />
                               </div>
                            </div>
                         </div>

                         <AnimatePresence>
                           {isExpanded && (
                             <motion.div
                               initial={{ height: 0, opacity: 0 }}
                               animate={{ height: 'auto', opacity: 1 }}
                               exit={{ height: 0, opacity: 0 }}
                               transition={{ duration: 0.3, ease: 'easeInOut' }}
                             >
                               <div className="px-6 pb-6 pt-2 space-y-3">
                                 <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 px-1">Subordinated Intelligence</div>
                                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                   {crew.map((member) => {
                                     const isCaptain = member.pirata === cap.capitao;
                                     return (
                                       <div 
                                         key={member.pirata}
                                         onClick={(e) => { e.stopPropagation(); setSelectedPirate(member); }}
                                         className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                                           isCaptain 
                                             ? 'bg-[#0039B9] border-[#0039B9] shadow-md shadow-[#0039B9]/20' 
                                             : 'bg-white border-gray-100 hover:border-[#98D7C2] hover:shadow-sm'
                                         }`}
                                       >
                                         <div className="flex items-center gap-3 overflow-hidden">
                                           <Skull className={`w-3 h-3 flex-shrink-0 ${isCaptain ? 'text-[#98D7C2]' : 'text-gray-300'}`} />
                                           <span className={`text-xs font-bold truncate ${isCaptain ? 'text-white' : 'text-gray-700'}`}>
                                             {member.pirata}
                                             {isCaptain && <span className="ml-2 text-[8px] opacity-70">(CAPTAIN)</span>}
                                           </span>
                                         </div>
                                         <span className={`text-[10px] font-mono font-black ${isCaptain ? 'text-[#98D7C2]' : 'text-[#0039B9]'}`}>
                                           {formatBounty(member.bounty)}
                                         </span>
                                       </div>
                                     );
                                   })}
                                 </div>
                               </div>
                             </motion.div>
                           )}
                         </AnimatePresence>
                       </div>
                     );
                   })}
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Motivational Recruitment Section */}
      <section className="py-32 bg-white relative overflow-hidden border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center font-sans">
            {/* Text Side */}
            <div className="text-center lg:text-left">
              <div className="bg-[#0039B9]/5 text-[#0039B9] inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-6">
                <Shield className="w-3 h-3" /> Duty & Pride
              </div>
              <h2 className="text-5xl md:text-7xl font-black text-gray-900 mb-8 tracking-tighter leading-[0.9] uppercase">
                Stand Guard for <br/>
                <span className="text-[#0039B9]">Absolute Justice</span>
              </h2>
              <p className="text-xl text-gray-500 max-w-xl leading-relaxed font-medium">
                The Marine HQ calls upon those with the courage to uphold the honor of the seas. Rise through the ranks, protect the innocent, and serve with unwavering pride.
              </p>
            </div>

            {/* Cards Side */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {/* Card 1 */}
              <div className="aspect-[3/4] rounded-[3rem] overflow-hidden relative shadow-2xl hover:scale-[1.02] transition-transform duration-500">
                <video 
                  autoPlay 
                  muted 
                  loop 
                  playsInline 
                  preload="auto"
                  className="absolute inset-0 w-full h-full object-cover z-0"
                >
                  <source src="https://dnznrvs05pmza.cloudfront.net/kling-3-0-standard/875335622326620209/untitled.mp4?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiYThkMjJjNTE2ZDFlZjBkZiIsImJ1Y2tldCI6InJ1bndheS10YXNrLWFydGlmYWN0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc3Njg4Mzc5M30.Ilwpw1Gibrtjxn8SODt4U4fXwIpYi1KQ1Jwg14Nb5vk" type="video/mp4" /> 
                </video>
                <div className="absolute inset-0 bg-[#0039B9]/20 mix-blend-overlay z-[1]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0039B9]/60 via-transparent to-transparent z-[2]" />
                <div className="absolute bottom-10 left-10 z-10">
                  <div className="text-white font-black text-2xl uppercase tracking-tight">Rise in Ranks</div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="aspect-[3/4] rounded-[3rem] overflow-hidden relative shadow-2xl hover:scale-[1.02] transition-transform duration-500">
                <video 
                  autoPlay 
                  muted 
                  loop 
                  playsInline 
                  preload="auto"
                  className="absolute inset-0 w-full h-full object-cover z-0"
                >
                 <source src="https://dnznrvs05pmza.cloudfront.net/kling-3-0-standard/875334898361049187/untitled.mp4?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiZmM5MTY5ZDcwNGM3NzVhNiIsImJ1Y2tldCI6InJ1bndheS10YXNrLWFydGlmYWN0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc3Njg4OTA0N30.3a-aji_aN0IgIgsw_rMoo4IjsaZW7Bx4Jnkr08U_MeY" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-[#0039B9]/20 mix-blend-overlay z-[1]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0039B9]/60 via-transparent to-transparent z-[2]" />
                <div className="absolute bottom-10 left-10 z-10">
                  <div className="text-white font-black text-2xl uppercase tracking-tight">Eternal Pride</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Global Threat Map (Islands) & Specialized Targets */}
      <section className="py-32 bg-white relative overflow-hidden">
         <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-24 relative z-10">
            <div className="lg:col-span-1 border-r border-gray-100 pr-12">
               <div className="bg-[#001C5E]/5 text-[#001C5E] inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-6 border border-[#001C5E]/10">
                  <GlobeIcon className="w-3 h-3" /> Area Scan
               </div>
               <h2 className="text-5xl font-black mb-8 tracking-tighter leading-tight text-gray-900">Island <br/> <span className="text-[#001C5E]">Threat Index</span></h2>
               <p className="text-gray-500 text-lg mb-12">Real-time geospatial intelligence and territory evaluation.</p>
               <div className="space-y-6">
                  {islandDanger.slice(0, 8).map((island, i) => (
                    <div key={island.ilha} className="flex items-center justify-between group">
                       <div className="flex items-center gap-4">
                          <div className={`h-2 w-2 rounded-full ${i < 3 ? 'bg-red-500 animate-pulse' : 'bg-gray-200'}`} />
                           <div className="font-black text-xl text-gray-900 group-hover:text-[#001C5E] transition-colors">{island.ilha}</div>
                       </div>
                       <div className="text-[#001C5E] font-black font-mono">{formatBounty(island.bounty)}</div>
                    </div>
                  ))}
               </div>
            </div>
            
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-12">
               {/* Yonko Section */}
               <div className="bg-gray-50 p-10 rounded-[3rem] border border-gray-200 relative overflow-hidden group hover:border-[#98D7C2] hover:shadow-xl transition-all">
                  <div className="flex items-center gap-3 mb-8">
                     <AlertCircle className="text-red-500 w-6 h-6" />
                     <h3 className="font-black text-2xl uppercase tracking-tight text-gray-900">Yonko Priority</h3>
                  </div>
                  <div className="space-y-4">
                     {yonkoTargets.map(y => (
                       <div key={y.pirata} className="flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
                          <span className="font-bold text-gray-800">{y.pirata}</span>
                          <span className="text-[#001C5E] font-black text-sm font-mono">{formatBounty(y.bounty)}</span>
                       </div>
                     ))}
                  </div>
               </div>

               {/* Warlords Section */}
               <div className="bg-gray-50 p-10 rounded-[3rem] border border-gray-200 relative overflow-hidden group hover:border-[#98D7C2] hover:shadow-xl transition-all">
                  <div className="flex items-center gap-3 mb-8">
                     <Anchor className="text-[#001C5E] w-6 h-6" />
                     <h3 className="font-black text-2xl uppercase tracking-tight text-gray-900">Ex-Shichibukai</h3>
                  </div>
                  <div className="flex items-center justify-between mb-8">
                     <div>
                        <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Mean Variance</div>
                        <div className="text-2xl font-black text-[#001C5E] font-mono">{formatBounty(warlords.variance / 1e9)}B</div>
                     </div>
                  </div>
                  <div className="space-y-4 overflow-y-auto max-h-64 pr-2 custom-scrollbar">
                     {warlords.data.map(w => (
                       <div key={w.pirata} className="flex items-center justify-between p-3 bg-white rounded-2xl border border-gray-100 shadow-sm">
                          <span className="font-bold text-sm text-gray-800">{w.pirata}</span>
                          <span className="text-[#001C5E] font-black text-xs font-mono">{formatBounty(w.bounty)}</span>
                       </div>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 4. Status Watch & Intelligence Feed */}
      <section id="bounty-feed" className="py-32 bg-white">
         <SectionHeader 
            id="status-feed" 
            badge="Historical Record" 
            title="Intelligence Feed" 
            subtitle="Deep synchronization with the original Python analysts." 
         />
         <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between mb-8">
              <button 
                onClick={() => setIsFeedExpanded(!isFeedExpanded)}
                className="flex items-center gap-3 px-6 py-3 bg-[#001C5E] text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-[#001C5E]/90 transition-all group"
              >
                <Search className={`w-4 h-4 transition-transform duration-300 ${isFeedExpanded ? 'rotate-90' : ''}`} />
                {isFeedExpanded ? 'Terminate Surveillance' : 'Initialize Deep Search'}
              </button>
              {isFeedExpanded && (
                <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] animate-pulse">
                  System Scanning Active...
                </div>
              )}
            </div>

            <AnimatePresence>
              {isFeedExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: 'circOut' }}
                  className="overflow-hidden"
                >
                  {/* Search and Filter Controls */}
                  <div className="mb-10 flex flex-col md:flex-row gap-6 items-center justify-between">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input 
                          type="text" 
                          placeholder="Search by name, crew or captain..." 
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold focus:outline-none focus:border-[#98D7C2] transition-all"
                        />
                    </div>
                    <div className="flex gap-2 p-1.5 bg-gray-50 rounded-2xl border border-gray-100">
                        {['All', 'Vivo', 'Falecido', 'Desaparecido'].map((status) => (
                          <button
                              key={status}
                              onClick={() => setStatusFilter(status)}
                              className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                                statusFilter === status 
                                    ? 'bg-[#001C5E] text-white shadow-lg shadow-[#001C5E]/20' 
                                    : 'text-gray-400 hover:text-gray-900'
                              }`}
                          >
                              {status}
                          </button>
                        ))}
                    </div>
                  </div>

                  <div className="overflow-x-auto rounded-[2rem] border border-gray-100 shadow-xl mb-12">
                    <table className="w-full text-left border-collapse bg-white">
                        <thead>
                          <tr className="bg-gray-50 border-b border-gray-100">
                              <th className="py-6 px-10 text-[10px] font-black text-gray-400 uppercase tracking-widest">Name</th>
                              <th className="py-6 px-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status / Location</th>
                              <th className="py-6 px-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Crew</th>
                              <th className="py-6 px-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Bounty</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                          {filteredPirates.map((p, i) => (
                            <tr 
                              key={`${p.pirata}-${i}`} 
                              onClick={() => setSelectedPirate(p)}
                              className="group hover:bg-[#001C5E]/[0.02] transition-colors cursor-pointer"
                            >
                                <td className="py-8 px-10">
                                  <span className="font-black text-gray-900 group-hover:text-[#001C5E] transition-colors text-lg">{p.pirata}</span>
                                </td>
                                <td className="py-8 px-4">
                                  <div className="flex flex-col">
                                      <span className={`text-[10px] font-black uppercase tracking-widest mb-1 ${p.status_historia === 'Falecido' ? 'text-red-500' : 'text-green-500'}`}>{p.status_historia}</span>
                                      <span className="text-xs text-gray-400">{p.ilha}</span>
                                  </div>
                                </td>
                                <td className="py-8 px-4 font-bold text-gray-600 text-sm">{p.tripulacao}</td>
                                <td className="py-8 px-10 text-right">
                                  <div className="text-xl font-black text-gray-900 group-hover:text-[#001C5E] transition-colors">{formatBounty(p.bounty)}</div>
                                </td>
                            </tr>
                          ))}
                        </tbody>
                    </table>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
         </div>

         {/* Target Detail Modal */}
         <AnimatePresence>
            {selectedPirate && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-12">
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setSelectedPirate(null)}
                  className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
                />
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.9, opacity: 0, y: 20 }}
                  className="relative bg-white w-full max-w-4xl rounded-[3rem] shadow-2xl overflow-hidden border border-gray-200"
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-2/5 p-8 bg-gray-50 flex flex-col items-center justify-center">
                      <BountyPoster pirate={selectedPirate} size="lg" />
                    </div>
                    <div className="md:w-3/5 p-12 relative">
                      <button 
                        onClick={() => setSelectedPirate(null)}
                        className="absolute top-8 right-8 text-gray-400 hover:text-gray-900 transition-colors"
                      >
                        <X className="w-6 h-6" />
                      </button>
                      <div className="text-[#001C5E] text-[10px] font-black uppercase tracking-[0.3em] mb-4">Subject Personnel File</div>
                      <h2 className="text-5xl font-black text-gray-900 mb-6 tracking-tighter uppercase">{selectedPirate.pirata}</h2>
                      
                      <div className="grid grid-cols-2 gap-8 mb-10">
                        <div>
                          <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Current Reward</div>
                          <div className="text-2xl font-black text-[#001C5E] font-mono">{formatBounty(selectedPirate.bounty)}</div>
                        </div>
                        <div>
                          <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Affiliation</div>
                          <div className="text-2xl font-black text-gray-900 tracking-tight">{selectedPirate.tripulacao}</div>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                          <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                             <Shield className="w-3 h-3 text-[#001C5E]" /> Intelligence Appraisal
                          </div>
                          <p className="text-gray-600 leading-relaxed font-medium italic">
                            {selectedPirate.observacoes || "No field notes available for this individual. Caution is advised during engagement."}
                          </p>
                        </div>
                        <div className="flex items-center gap-6">
                           <div className="flex items-center gap-2">
                              <div className={`w-2 h-2 rounded-full ${selectedPirate.status_historia === 'Falecido' ? 'bg-red-500' : 'bg-green-500'}`} />
                              <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{selectedPirate.status_historia}</span>
                           </div>
                           <div className="flex items-center gap-2">
                              <GlobeIcon className="w-3 h-3 text-[#001C5E]" />
                              <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{selectedPirate.ilha}</span>
                           </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
         </AnimatePresence>
      </section>
    </div>
  );
};

const OperationsCenter = () => {
  const allPirates = useMemo(() => DataService.getAllPirates(), []);
  const piratesWithImages = useMemo(() => {
    return allPirates.filter(p => !!DataService.getPirateImage(p.pirata, p.imgIndex));
  }, [allPirates]);
  
  const randomDecorPirates = useMemo(() => {
    // Offset or specific seed avoid duplicates with other sections if desired
    return [...piratesWithImages].sort(() => 0.5 - Math.random()).slice(10, 20);
  }, [piratesWithImages]);

  const [activeModule, setActiveModule] = React.useState('top-3');
  const [selectedIsland, setSelectedIsland] = useState<string | null>(null);
  const globeEl = useRef<any>();

  const islandDanger = useMemo(() => DataService.getDangerByIsland(), []);
  
  const islandsData = useMemo(() => {
    return islandDanger.map((island, i) => ({
      ...island,
      lat: ((i * 137.5) % 180) - 90,
      lng: ((i * 222.5) % 360) - 180,
      color: i < 3 ? '#ef4444' : '#3b82f6',
      size: 0.15 + (island.bounty / 5000000000) * 0.2
    }));
  }, [islandDanger]);

  const handleIslandSelect = (island: any) => {
    setSelectedIsland(island.ilha);
    if (globeEl.current) {
      globeEl.current.pointOfView({ lat: island.lat, lng: island.lng, altitude: 2 }, 1000);
    }
  };

  useEffect(() => {
    if (globeEl.current) {
      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = 0.5;
    }
  }, [activeModule]);

  const modules = [
    { id: 'total-bounty', label: 'Bounty per Crew', icon: Users, data: DataService.getBountyByCrew() },
    { id: 'avg-bounty', label: 'Average Bounty', icon: Activity, data: DataService.getAverageBounty() },
    { id: 'dangerous-captains', label: 'Dangerous Captains', icon: Skull, data: DataService.getDangerousCaptains() },
    { id: 'top-3', label: 'Top 3 Pirates', icon: Zap, data: DataService.getTop3Pirates() },
    { id: 'island-threat', label: 'Island Threat Index', icon: GlobeIcon, data: DataService.getDangerByIsland() },
    { id: 'emperors', label: 'Yonko', icon: Shield, data: DataService.getYonko() },
    { id: 'shichibukai', label: 'Ex-Shichibukai', icon: Anchor, data: { list: DataService.getExShichibukai(), stats: DataService.getExShichibukaiStats() } },
    { id: 'dead-targets', label: 'Dead Targets', icon: AlertCircle, data: DataService.getDeadPirates() },
    { id: 'combined-ranking', label: 'Combined Ranking', icon: Radar, data: DataService.getCombinedThreatRanking() },
  ];

  const currentModule = modules.find(m => m.id === activeModule) || modules[0];

  return (
    <section id="operations" className="py-32 bg-white text-gray-900 relative overflow-hidden border-t border-gray-100">
      {/* Decorative Posters */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.15] hidden lg:block overflow-hidden">
        <WantedPosterSkeleton pirate={randomDecorPirates[0]} className="absolute top-[10%] -left-16 -rotate-12 blur-[1px]" />
        <WantedPosterSkeleton pirate={randomDecorPirates[1]} className="absolute bottom-[15%] -left-12 rotate-6 blur-[2px]" />
        <WantedPosterSkeleton pirate={randomDecorPirates[2]} className="absolute top-[20%] -right-16 rotate-12 blur-[1px]" />
        <WantedPosterSkeleton pirate={randomDecorPirates[3]} className="absolute bottom-[25%] -right-12 -rotate-12 blur-[2px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar / Selector */}
          <div className="lg:w-1/3">
            <div className="bg-gray-50 rounded-3xl p-8 border border-gray-200 shadow-sm transition-all hover:shadow-md">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-[#0039B9]/10 flex items-center justify-center">
                  <Radar className="w-6 h-6 text-[#0039B9]" />
                </div>
                <div>
                  <h2 className="text-xl font-black tracking-tight uppercase text-[#0039B9]">Command Panel</h2>
                  <p className="text-xs text-gray-400 font-medium">Select Intelligence Analysis Module</p>
                </div>
              </div>

              <div className="space-y-2">
                {modules.map((mod) => (
                  <button
                    key={mod.id}
                    onClick={() => setActiveModule(mod.id)}
                    className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 group ${
                      activeModule === mod.id 
                        ? 'bg-[#98D7C2] text-[#0039B9] shadow-lg shadow-[#98D7C2]/20' 
                        : 'text-gray-500 hover:text-[#0039B9] hover:bg-[#0039B9]/5'
                    }`}
                  >
                    <mod.icon className={`w-4 h-4 transition-colors ${activeModule === mod.id ? 'text-[#0039B9]' : 'text-gray-400 group-hover:text-[#0039B9]'}`} />
                    {mod.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Display Area */}
          <div className="lg:w-2/3 h-[600px] bg-gray-50 rounded-3xl p-8 border border-gray-200 overflow-y-auto custom-scrollbar shadow-sm">
            <div className="flex items-center justify-between mb-8 border-b border-gray-200 pb-6">
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0039B9] mb-1 block">Sector Synchronization</span>
                <h3 className="text-2xl font-black tracking-tight text-gray-900">{currentModule.label} Analysis</h3>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-[#0039B9]/5 text-[#0039B9] rounded-full text-[10px] font-bold">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                ACTIVE_LINK
              </div>
            </div>

            <div className="space-y-4">
              {currentModule.id === 'total-bounty' && (
                <div className="flex flex-col h-full space-y-12">
                   <div className="h-[350px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={currentModule.data as any[]}
                          cx="50%"
                          cy="50%"
                          innerRadius={70}
                          outerRadius={110}
                          stroke="none"
                          paddingAngle={8}
                          dataKey="bounty"
                          nameKey="tripulacao"
                        >
                          {(currentModule.data as any[]).map((entry, index) => (
                            <Cell 
                              key={`cell-${index}`} 
                              fill={[ '#0039B9', '#98D7C2', '#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF' ][index % 6]} 
                              className="focus:outline-none cursor-pointer hover:opacity-80 transition-opacity"
                            />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value: any, name: any) => [formatBounty(value), name]} 
                          contentStyle={{ 
                            borderRadius: '16px', 
                            border: '1px solid #f0f0f0', 
                            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                            padding: '12px 16px',
                            fontWeight: 'bold'
                          }}
                          itemStyle={{ color: '#0039B9', fontSize: '14px' }}
                          labelStyle={{ display: 'none' }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {(currentModule.data as any[]).map((item, i) => (
                      <div key={i} className="flex items-center justify-between bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:border-[#98D7C2] transition-colors">
                        <div className="flex items-center gap-4">
                          <span className="text-xs font-black text-gray-300">#{String(i + 1).padStart(2, '0')}</span>
                          <span className="font-bold text-gray-800">{item.tripulacao}</span>
                        </div>
                        <span className="font-mono text-[#0039B9] font-black">{formatBounty(item.bounty)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-8 border-t border-gray-100 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-[10px] font-black uppercase tracking-widest text-gray-400">
                      <Activity className="w-3 h-3" /> Interact with segments for deep intel
                    </div>
                  </div>
                </div>
              )}

              {currentModule.id === 'avg-bounty' && (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-2">Global System Mean</div>
                  <div className="text-7xl font-black text-[#0039B9] tracking-tighter mb-4">{formatBounty(currentModule.data as number)}</div>
                  <p className="text-sm text-gray-500 max-w-xs mx-auto italic font-medium">Average threat level calculated across all registered targets.</p>
                </div>
              )}

              {currentModule.id === 'dangerous-captains' && (currentModule.data as any[]).map((item, i) => (
                <div key={i} className="flex items-center justify-between bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:border-[#98D7C2] transition-colors">
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-black text-gray-300">#{String(i + 1).padStart(2, '0')}</span>
                    <span className="font-bold text-gray-800">{item.capitao}</span>
                  </div>
                  <span className="font-mono text-[#0039B9] font-black">{formatBounty(item.bounty)}</span>
                </div>
              ))}

              {currentModule.id === 'top-3' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {(currentModule.data as PirateRecord[]).map((p) => {
                    const mappedImg = DataService.getPirateImage(p.pirata, p.imgIndex);
                    return (
                      <div key={p.pirata} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm text-center group hover:border-[#98D7C2]/50 hover:shadow-md transition-all">
                        <div className="aspect-[3/4] rounded-lg overflow-hidden mb-4 relative bg-gray-50 flex items-center justify-center">
                          {mappedImg ? (
                            <img 
                              src={mappedImg} 
                              alt={p.pirata} 
                              className="w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
                              referrerPolicy="no-referrer"
                            />
                          ) : (
                            <Skull className="w-12 h-12 text-gray-200" />
                          )}
                        </div>
                        <div className="text-sm font-black uppercase truncate text-gray-900">{p.pirata}</div>
                        <div className="text-xs text-[#0039B9] font-mono mt-1 font-bold">{formatBounty(p.bounty)}</div>
                      </div>
                    );
                  })}
                </div>
              )}

              {currentModule.id === 'island-threat' && (
                <div className="flex flex-col gap-8">
                  {/* Interactive Globe Container */}
                  <div className="w-full h-[400px] bg-[#001C5E] rounded-[2.5rem] overflow-hidden relative shadow-inner border border-gray-200">
                    <Globe
                      ref={globeEl}
                      width={800}
                      height={400}
                      backgroundColor="rgba(0,0,0,0)"
                      globeImageUrl="/textures/map.jpg"
                      pointsData={islandsData}
                      pointLat="lat"
                      pointLng="lng"
                      pointColor={(d: any) => d.ilha === selectedIsland ? '#facc15' : d.color}
                      pointAltitude={(d: any) => d.ilha === selectedIsland ? 0.3 : 0.1}
                      pointRadius={(d: any) => d.ilha === selectedIsland ? 1.2 : 0.6}
                      pointsMerge={false}
                      onPointClick={(point: any) => handleIslandSelect(point)}
                      onGlobeClick={() => {
                        const randomIndex = Math.floor(Math.random() * islandsData.length);
                        handleIslandSelect(islandsData[randomIndex]);
                      }}
                    />
                    <div className="absolute bottom-6 left-6 pointer-events-none">
                      <div className="bg-black/40 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
                        <div className="text-[8px] font-black uppercase tracking-[0.2em] text-[#98D7C2] mb-1">Geospatial Awareness</div>
                        <div className="text-white text-sm font-bold">{selectedIsland || 'Scan Sector Protocol'}</div>
                      </div>
                    </div>
                  </div>

                  {/* Synchronized Island List */}
                  <div className="grid grid-cols-1 gap-3">
                    {(currentModule.data as any[]).map((item, i) => {
                      const islandMapData = islandsData.find(id => id.ilha === item.ilha);
                      const isSelected = selectedIsland === item.ilha;
                      return (
                        <div 
                          key={i} 
                          onClick={() => islandMapData && handleIslandSelect(islandMapData)}
                          className={`flex items-center justify-between p-5 bg-white rounded-2xl border transition-all cursor-pointer group ${
                            isSelected 
                              ? 'border-[#0039B9] ring-2 ring-[#0039B9]/10 shadow-md bg-[#0039B9]/[0.02]' 
                              : 'border-gray-100 hover:border-[#98D7C2] hover:shadow-sm'
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <div className={`p-2 rounded-lg transition-colors ${isSelected ? 'bg-[#0039B9] text-white' : 'bg-[#0039B9]/5 text-[#0039B9]'}`}>
                              <GlobeIcon className="w-4 h-4" />
                            </div>
                            <span className={`font-bold transition-colors ${isSelected ? 'text-[#0039B9]' : 'text-gray-800'}`}>{item.ilha}</span>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden hidden sm:block">
                              <div 
                                className={`h-full transition-all duration-500 rounded-full ${isSelected ? 'bg-[#98D7C2]' : 'bg-[#0039B9]'}`} 
                                style={{ width: `${Math.min(100, (item.bounty / 10000000000) * 100)}%` }} 
                              />
                            </div>
                            <span className={`font-mono text-xs font-black w-24 text-right transition-colors ${isSelected ? 'text-[#0039B9]' : 'text-gray-400'}`}>
                              {formatBounty(item.bounty)}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {currentModule.id === 'emperors' && (
                <div className="space-y-4">
                  {(currentModule.data as PirateRecord[]).map((p, i) => {
                    const mappedImg = DataService.getPirateImage(p.pirata, p.imgIndex);
                    return (
                      <div key={i} className="flex items-center justify-between bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200 bg-gray-50 flex items-center justify-center">
                            {mappedImg ? (
                              <img src={mappedImg} alt={p.pirata} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                            ) : (
                              <Skull className="w-4 h-4 text-gray-300" />
                            )}
                          </div>
                          <div>
                            <div className="font-bold text-sm tracking-tight text-gray-900">{p.pirata}</div>
                            <div className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">{p.tripulacao}</div>
                          </div>
                        </div>
                        <span className="font-mono text-sm text-[#0039B9] font-black">{formatBounty(p.bounty)}</span>
                      </div>
                    );
                  })}

                  {/* Special Archive Mini Card */}
                  <div className="mt-8 pt-6 border-t border-gray-200/50">
                    <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 px-2 flex items-center gap-2">
                       <Shield className="w-3 h-3 text-[#0039B9]" /> Classified Record: Marineford Legacy
                    </div>
                    <div className="relative w-full aspect-[21/9] rounded-[2rem] overflow-hidden shadow-xl group cursor-help">
                      <img 
                        src="https://i.pinimg.com/1200x/83/e4/3f/83e43f7c35abaac5e59f324bffe8f01b.jpg" 
                        alt="Marineford History" 
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-[#0039B9]/30 mix-blend-overlay z-[1]" />
                      <div className="absolute inset-0 bg-gradient-to-r from-[#0039B9]/90 via-[#0039B9]/40 to-transparent z-[2]" />
                      
                      <div className="absolute inset-0 z-10 p-8 flex flex-col justify-center">
                        <div className="text-[#98D7C2] text-[8px] font-black uppercase tracking-[0.4em] mb-2">Internal Intel Archive</div>
                        <h4 className="text-white text-2xl font-black uppercase tracking-tighter leading-none mb-3">The Yonko <br/> Great War Era</h4>
                        <div className="flex items-center gap-4">
                          <div className="h-0.5 w-12 bg-[#98D7C2]/50 rounded-full" />
                          <p className="text-white/60 text-[10px] font-bold tracking-tight">Accessing Declassified Reports...</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentModule.id === 'shichibukai' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                      <div className="text-[10px] font-black uppercase text-gray-400 mb-1">Group Avg Bounty</div>
                      <div className="text-xl font-black text-[#0039B9]">{formatBounty((currentModule.data as any).stats.avg)}</div>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                      <div className="text-[10px] font-black uppercase text-gray-400 mb-1">Power Variance</div>
                      <div className="text-xl font-black text-[#0039B9]">{Math.sqrt((currentModule.data as any).stats.variance).toFixed(2)}</div>
                    </div>
                  </div>
                  {(currentModule.data as any).list.map((p: PirateRecord, i: number) => (
                    <div key={i} className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-50 shadow-sm">
                       <span className="text-sm font-bold text-gray-800">{p.pirata}</span>
                       <span className="text-sm font-mono text-gray-400">{formatBounty(p.bounty)}</span>
                    </div>
                  ))}
                </div>
              )}

              {currentModule.id === 'dead-targets' && (currentModule.data as PirateRecord[]).map((p, i) => (
                <div key={i} className="flex items-center justify-between bg-red-50/50 p-4 rounded-xl border border-red-100 opacity-80 grayscale">
                  <div className="flex items-center gap-4">
                    <Skull className="w-4 h-4 text-red-500" />
                    <span className="font-bold text-gray-600 underline decoration-red-200 decoration-2">{p.pirata}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] font-black uppercase text-red-500 mb-0.5">Eliminated</div>
                    <span className="font-mono text-gray-400 text-xs">{formatBounty(p.bounty)}</span>
                  </div>
                </div>
              ))}

              {currentModule.id === 'combined-ranking' && (currentModule.data as PirateRecord[]).map((p, i) => (
                <div key={p.pirata} className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black text-gray-200">#{String(i + 1).padStart(3, '0')}</span>
                    <span className={`text-sm font-bold ${p.status_historia === 'Falecido' ? 'text-gray-300 line-through' : 'text-gray-800'}`}>{p.pirata}</span>
                  </div>
                  <span className="font-mono text-sm text-[#0039B9] font-black">{formatBounty(p.bounty)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const CTASection = () => {
  return (
    <section className="py-[16rem] relative overflow-hidden bg-white">
      {/* Background Decor Logos */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]">
        <div className="grid grid-cols-8 gap-20 rotate-12 -translate-x-1/4 -translate-y-1/4 scale-150">
          {Array.from({ length: 64 }).map((_, i) => (
            <div key={i} className="flex justify-center"><Logo className="w-20 h-20" fill="#0039B9" /></div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="bg-[#0039B9] rounded-[4rem] px-10 py-32 md:p-32 text-center relative overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,57,185,0.4)]">
          <video 
            autoPlay
            muted 
            loop 
            playsInline 
            preload="auto" 
            className="absolute inset-0 w-full h-full object-cover z-0 opacity-30 mix-blend-overlay pointer-events-none"
          >
            <source src="https://dnznrvs05pmza.cloudfront.net/kling-3-0-standard/874903085968785414/untitled.mp4?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiMTllOTBmYzhkMzgxYjlkMSIsImJ1Y2tldCI6InJ1bndheS10YXNrLWFydGlmYWN0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc3Njc1NTUyOH0.AIhvKeMfwHuL3D-lE4c3nlBGUB7U_m8pqE9VrMHaaQs" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0039B9] via-transparent to-transparent z-[1]" />

     
          
          <h2 className="text-6xl md:text-[6rem] font-black text-white mb-12 tracking-tighter leading-[0.9] relative z-10">
            Justice. <br/>
            Uphold the Absolute.
          </h2>
          <p className="text-white/70 text-xl md:text-2xl mb-16 max-w-2xl mx-auto font-medium leading-relaxed relative z-10">
            Join the elite command of the World Government. Secure your territory and neutralize every threat to world peace with authorized Marine assets.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 relative z-10">
            <button className="bg-white text-[#0039B9] px-16 py-6 rounded-[2rem] font-black text-xl hover:bg-[#98D7C2] transition-all hover:scale-110 shadow-2xl">
              Register as Officer
            </button>
            <button className="bg-transparent border-2 border-white/20 text-white px-16 py-6 rounded-[2rem] font-black text-xl hover:bg-white/10 transition-all hover:border-[#98D7C2]/50 hover:text-[#98D7C2]">
              Access Bounties
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-white py-24 border-t border-gray-100 relative overflow-hidden">
      {/* Decorative Marine Logo */}
      <div className="absolute top-10 right-10 opacity-5 pointer-events-none">
         <img 
          src="https://i.pinimg.com/1200x/88/d0/1e/88d01e4bd1abd41ee71c5a657f618c1f.jpg" 
          alt="Marine Logo Watermark" 
          className="w-80 h-auto grayscale opacity-70"
          referrerPolicy="no-referrer"
        />
      </div>
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-20 mb-20">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-6 mb-8 group">
              <div className="relative">
                <img 
                  src="https://i.pinimg.com/1200x/88/d0/1e/88d01e4bd1abd41ee71c5a657f618c1f.jpg" 
                  alt="Marine Logo" 
                  className="w-16 h-auto object-contain transition-transform group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#98D7C2] rounded-full border-2 border-white" />
              </div>
              <div>
                <span className="font-black text-3xl text-gray-900 tracking-tighter leading-none block">MARINE HQ</span>
                <span className="text-[10px] text-gray-400 font-black uppercase tracking-[0.4em] mt-1.5 block leading-none">Global Defense Command</span>
              </div>
            </div>
            <p className="text-gray-500 max-w-sm text-xl leading-relaxed mb-10">
              Strategizing peace through absolute command. The primary military force for the World Government across the Grand Line.
            </p>
          </div>
          <div>
            <h5 className="font-black text-gray-900 uppercase tracking-[0.2em] text-xs mb-10">Intelligence</h5>
            <ul className="space-y-5">
              {['Highest Bounties', 'Crew Rankings', 'Island Security', 'Status Feed'].map(item => (
                <li key={item}><a href="#" className="text-gray-500 font-bold hover:text-[#98D7C2] transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="font-black text-gray-900 uppercase tracking-[0.2em] text-xs mb-10">Protocols</h5>
            <ul className="space-y-5">
              {['Yonko Sanction', 'Shichibukai Logs', 'Buster Call Protocol', 'Draft Portal'].map(item => (
                <li key={item}><a href="#" className="text-gray-500 font-bold hover:text-[#98D7C2] transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-16 border-t border-gray-100">
         <div className="text-gray-400 text-[10px] font-black uppercase tracking-[0.5em]">
  DEVELOPED BY PEDRO HENRIQUES. <br/>
  THIS IS A FAN-MADE PROJECT INSPIRED BY ONE PIECE. <br/>
  ALL RIGHTS TO ONE PIECE, ITS CHARACTERS, STORY, AND UNIVERSE BELONG TO TOEI ANIMATION AND EIICHIRO ODA.
</div>
            <div className="flex items-center gap-10">
              <a href="#" className="text-[10px] font-black text-gray-500 hover:text-[#98D7C2] transition-colors uppercase tracking-[0.2em]">Privacy Protocol</a>
              <a href="#" className="text-[10px] font-black text-gray-500 hover:text-[#98D7C2] transition-colors uppercase tracking-[0.2em]">HQ Directives</a>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const allPirates = useMemo(() => DataService.getAllPirates(), []);
  const piratesWithImages = useMemo(() => {
    return allPirates.filter(p => !!DataService.getPirateImage(p.pirata, p.imgIndex));
  }, [allPirates]);
  
  const headerPirates = useMemo(() => {
    return [...piratesWithImages].sort(() => 0.5 - Math.random()).slice(0, 6);
  }, [piratesWithImages]);

  return (
    <div 
      className="min-h-screen flex flex-col font-sans selection:bg-[#98D7C2]/30 selection:text-[#0039B9]"
      style={{ background: 'linear-gradient(160deg, #ffffff 0%, #f0f7ff 40%, #e8fdf5 100%)' }}
    >
      <Navbar />
      
      <main className="relative flex flex-col items-center justify-start px-6 pt-52 text-center min-h-[90vh] overflow-hidden">
        <video autoPlay muted loop playsInline preload="auto" className="absolute inset-0 w-full h-full object-cover z-0 opacity-40 mix-blend-multiply" style={{ pointerEvents: 'none' }}>
          <source src="https://dnznrvs05pmza.cloudfront.net/kling-3-0-standard/874851093401567283/untitled.mp4?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiZTY5YTlmNzNjYjE2MTVmNCIsImJ1Y2tldCI6InJ1bndheS10YXNrLWFydGlmYWN0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc3NjcxNzA0M30.GvTZPpEptEuItlli0nXWK3EJQrTR4kEH-4juDVPTh-8" type="video/mp4" />
        </video>
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-white/5 to-white" />
        
        {/* Decorative Falling Posters */}
        <div className="absolute inset-0 z-[15] pointer-events-none overflow-hidden hidden lg:block">
          {/* Left Side */}
          <WantedPosterSkeleton pirate={headerPirates[0]} className="absolute top-[10%] -left-10 opacity-40 rotate-12 blur-[1px]" />
          <WantedPosterSkeleton pirate={headerPirates[1]} className="absolute top-[40%] left-20 opacity-60 rotate-6" />
          <WantedPosterSkeleton pirate={headerPirates[2]} className="absolute top-[70%] -left-5 opacity-30 rotate-[45deg] blur-[2px]" />
          
          {/* Right Side */}
          <WantedPosterSkeleton pirate={headerPirates[3]} className="absolute top-[15%] -right-12 opacity-50 -rotate-12 blur-[1px]" />
          <WantedPosterSkeleton pirate={headerPirates[4]} className="absolute top-[50%] right-16 opacity-70 -rotate-3" />
          <WantedPosterSkeleton pirate={headerPirates[5]} className="absolute top-[80%] -right-8 opacity-40 -rotate-[45deg] blur-[2px]" />
        </div>

        <div className="relative z-20 flex flex-col items-center">
          <h1 className="animate-float-up text-[4rem] md:text-[5.5rem] leading-[0.9] tracking-tight font-black text-[#050A1A] max-w-4xl px-4">
            <span className="text-black">正義</span><br/>
            <span className="text-[#00ac71]">Justice.</span><br/>
            <span className="text-[#00ac71]">Justice </span><span className="text-[#0039B9]">Will</span><span className="text-[#00ac71]"> Prevail.</span>
          </h1>
          <p className="animate-float-up-delay-1 mt-8 text-lg md:text-xl text-gray-500 max-w-2xl leading-relaxed">
            Consuming strategic surveillance from the Global Marine Data repository.
          </p>
        </div>
      </main>

      <IntelligenceDashboard />
      <OperationsCenter />
      <CTASection />
      <Footer />
    </div>
  );
}


