'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Search, Sparkles, TrendingUp, Zap, Download, Github } from 'lucide-react';
import { GlitchText, SplitText, BrutalistButton, FloatingIcon, FloatingIconsContainer, NoiseBackground, GradientMesh } from '@/components/brutalist';

export function HeroBrutalist() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <section ref={ref} className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Animated gradient background */}
      <GradientMesh 
        colors={['#6366F1', '#8B5CF6', '#A855F7', '#D946EF']} 
        className="absolute inset-0"
      />
      
      {/* Noise overlay */}
      <NoiseBackground opacity={0.05} />
      
      {/* Floating icons */}
      <FloatingIconsContainer>
        <FloatingIcon icon={Github} color="#fff" x="5%" y="15%" size={48} delay={0} />
        <FloatingIcon icon={Download} color="#FFD700" x="10%" y="70%" size={40} delay={0.1} />
        <FloatingIcon icon={Sparkles} color="#FF6B6B" x="85%" y="20%" size={44} delay={0.2} />
        <FloatingIcon icon={TrendingUp} color="#4ECDC4" x="90%" y="65%" size={42} delay={0.3} />
        <FloatingIcon icon={Zap} color="#FFD93D" x="50%" y="10%" size={36} delay={0.4} />
        <FloatingIcon icon={Github} color="#fff" x="75%" y="85%" size={38} delay={0.5} />
      </FloatingIconsContainer>
      
      {/* Main content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        {/* Badge */}
        <motion.div
          initial={{ scale: 0, rotate: -5 }}
          animate={isInView ? { scale: 1, rotate: 0 } : undefined}
          transition={{ delay: 0.1, type: 'spring', stiffness: 300 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-5 py-2 bg-black/40 text-white text-sm font-bold border-2 border-white/50 shadow-[4px_4px_0_rgba(255,255,255,0.3)]">
            <Sparkles className="h-4 w-4" />
            DISCOVER OPEN SOURCE
          </span>
        </motion.div>
        
        {/* Main title with glitch effect */}
        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            textShadow: '4px 4px 0 rgba(0,0,0,0.3), 8px 8px 0 rgba(0,0,0,0.1)',
            WebkitTextStroke: '2px rgba(255,255,255,0.2)',
          }}
        >
          <GlitchText intensity="medium" glitchOnView>
            THE GOT HUB
          </GlitchText>
        </motion.h1>
        
        {/* Subtitle with split animation */}
        <motion.div
          className="text-xl md:text-2xl text-white/90 mb-8 font-medium"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : undefined}
          transition={{ delay: 0.4 }}
        >
          <SplitText delay={0.5}>
            Find. Download. Build.
          </SplitText>
        </motion.div>
        
        {/* Search bar - brutalist style */}
        <motion.div
          className="max-w-2xl mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ delay: 0.6 }}
        >
          <div className="relative flex items-center bg-white border-4 border-black shadow-[6px_6px_0_#000]">
            <Search className="absolute left-4 h-6 w-6 text-black/50" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects, frameworks, tools..."
              className="w-full py-4 pl-14 pr-4 text-lg font-medium text-black placeholder:text-black/40 focus:outline-none"
            />
            <BrutalistButton
              variant="accent"
              size="lg"
              className="mr-2"
              onClick={() => {}}
            >
              Search
            </BrutalistButton>
          </div>
        </motion.div>
        
        {/* Quick stats */}
        <motion.div
          className="flex flex-wrap justify-center gap-6 text-white/80"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : undefined}
          transition={{ delay: 0.8 }}
        >
          {[
            { label: 'Projects', value: '50K+' },
            { label: 'Downloads', value: '1M+' },
            { label: 'Languages', value: '15+' },
          ].map((stat) => (
            <div key={stat.label} className="flex items-center gap-2">
              <span className="text-2xl font-black">{stat.value}</span>
              <span className="text-sm font-medium uppercase tracking-wide">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
      
      {/* Bottom torn edge */}
      <div className="absolute bottom-0 left-0 right-0 h-8 overflow-hidden">
        <svg viewBox="0 0 100 10" preserveAspectRatio="none" className="absolute bottom-0 w-full h-full">
          <path
            d="M0,10 L0,5 Q5,8 10,5 T20,5 T30,5 T40,5 T50,5 T60,5 T70,5 T80,5 T90,5 T100,5 L100,10 Z"
            fill="#09090B"
          />
        </svg>
      </div>
    </section>
  );
}

export default HeroBrutalist;