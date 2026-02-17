'use client';

import { motion } from 'framer-motion';
import { 
  Heart, 
  Sparkles, 
  Users, 
  Clock, 
  ArrowRight,
  TrendingUp,
  Star,
  Zap,
  Gift,
  CheckCircle2,
  DollarSign
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

// ==================== COMMUNITY PROJECTS BANNER ====================
interface CommunityBannerProps {
  onApplyNow?: () => void;
}

export function CommunityBanner({ onApplyNow }: CommunityBannerProps) {
  const router = useRouter();
  
  return (
    <div className="relative -mx-4 px-4 rounded-t-3xl overflow-hidden" style={{
      background: 'linear-gradient(135deg, #fef3c7 0%, #fed7aa 50%, #fef3c7 100%)',
      boxShadow: '0 4px 20px -4px rgba(245, 158, 11, 0.3)',
    }}>
      {/* Dark mode */}
      <div className="hidden dark:block" style={{
        background: 'linear-gradient(135deg, #451a03 0%, #7c2d12 50%, #451a03 100%)',
      }} />

      {/* Floating icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-3 left-[8%] w-14 h-14 opacity-20"
          animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <Heart className="w-14 h-14 text-amber-500" fill="currentColor" />
        </motion.div>
        <motion.div 
          className="absolute top-6 right-[12%] w-10 h-10 opacity-20"
          animate={{ y: [0, -15, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          <Sparkles className="w-10 h-10 text-orange-500" />
        </motion.div>
        <motion.div 
          className="absolute bottom-4 left-[20%] w-8 h-8 opacity-15"
          animate={{ y: [0, -8, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <Users className="w-8 h-8 text-amber-600" />
        </motion.div>
        <motion.div 
          className="absolute bottom-6 right-[20%] w-12 h-12 opacity-15"
          animate={{ y: [0, -12, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        >
          <Star className="w-12 h-12 text-orange-600" fill="currentColor" />
        </motion.div>
      </div>

      <div className="py-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-4 mx-auto max-w-7xl">
        {/* Left: Icon & Title */}
        <div className="flex items-center gap-4">
          <motion.div 
            className="relative"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Heart className="w-7 h-7 text-white" fill="currentColor" />
            </div>
            <motion.div 
              className="absolute -top-1 -right-1"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
            </motion.div>
          </motion.div>
          
          <div>
            <h3 className="text-xl font-bold text-amber-900 dark:text-amber-100">
              Community Projects
            </h3>
            <p className="text-sm text-amber-700 dark:text-amber-300">
              Help sustain open source • Pay what you can • 1 week exposure
            </p>
          </div>
        </div>

        {/* Right: CTA */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-sm text-amber-700 dark:text-amber-300 bg-amber-100/50 dark:bg-amber-900/30 px-3 py-1.5 rounded-full">
            <Clock className="w-4 h-4" />
            <span>1 week exposure</span>
          </div>
          <Button 
            onClick={onApplyNow || (() => router.push('/search?q=featured'))}
            className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white border-0 gap-2"
          >
            Get Featured
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Features Row */}
      <motion.div 
        className="flex flex-wrap justify-center gap-4 pb-4 mx-auto max-w-7xl pt-2 border-t border-amber-200/50 dark:border-amber-700/30"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        {[
          { icon: Heart, text: 'Support Developers' },
          { icon: Users, text: 'Get Noticed' },
          { icon: Clock, text: '7 Days Visibility' },
          { icon: CheckCircle2, text: 'Easy Setup' }
        ].map((item, i) => (
          <motion.div 
            key={item.text}
            className="flex items-center gap-1.5 text-sm text-amber-700 dark:text-amber-300"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <item.icon className="w-4 h-4" />
            {item.text}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

// ==================== TRENDING BANNER ====================
interface TrendingBannerProps {
  dateRange: 'daily' | 'weekly' | 'monthly';
}

export function TrendingBanner({ dateRange }: TrendingBannerProps) {
  const router = useRouter();
  
  const getDateLabel = () => {
    switch (dateRange) {
      case 'daily': return "Today's";
      case 'weekly': return "This Week's";
      case 'monthly': return "This Month's";
    }
  };

  return (
    <div className="relative -mx-4 px-4 rounded-t-3xl overflow-hidden" style={{
      background: 'linear-gradient(135deg, #ffe4e6 0%, #fce7f3 50%, #ffe4e6 100%)',
      boxShadow: '0 4px 20px -4px rgba(244, 63, 94, 0.3)',
    }}>
      {/* Dark mode */}
      <div className="hidden dark:block" style={{
        background: 'linear-gradient(135deg, #881337 0%, #be1857 50%, #881337 100%)',
      }} />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${8 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 2 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          >
            <Zap className={`w-4 h-4 text-rose-${500 + i * 100}`} />
          </motion.div>
        ))}
      </div>

      <div className="py-5 relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4 mx-auto max-w-7xl">
        {/* Animated Icon */}
        <motion.div
          className="flex items-center gap-2"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-pink-500 rounded-xl flex items-center justify-center shadow-md">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-bold text-rose-900 dark:text-rose-100">
            🔥 Trending
          </span>
        </motion.div>

        {/* Divider */}
        <div className="hidden sm:block w-px h-6 bg-rose-200 dark:bg-rose-700" />

        {/* Date Range Pills */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-rose-700 dark:text-rose-300">
            {getDateLabel()} hottest projects
          </span>
          <div className="flex gap-1">
            {(['daily', 'weekly', 'monthly'] as const).map((range) => (
              <a
                key={range}
                href={`/search?sort=trending&dateRange=${range}`}
                onClick={(e) => {
                  e.preventDefault();
                  router.push(`/search?sort=trending&dateRange=${range}`);
                }}
                className={`px-3 py-1 text-sm rounded-full transition-all ${
                  dateRange === range
                    ? 'bg-rose-500 text-white shadow-md'
                    : 'dark:bg-rose-900/50 text-rose-700 dark:text-rose-300 hover:bg-rose-100 dark:hover:bg-rose-800'
                }`}
              >
                {range.charAt(0).toUpperCase() + range.slice(1)}
              </a>
            ))}
          </div>
        </div>

        {/* Animated Badge */}
        <motion.div
          className="flex items-center gap-1 px-3 py-1.5 dark:bg-rose-950/60 rounded-full shadow-sm"
          animate={{ x: [0, 3, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <Sparkles className="w-3.5 h-3.5 text-rose-500" />
          <span className="text-xs font-medium text-rose-700 dark:text-rose-300">
            Updated live
          </span>
        </motion.div>
      </div>
    </div>
  );
}

// ==================== FREE TO USE BANNER ====================
export function FreeToUseBanner() {
  return (
    <div className="relative -mx-4 px-4 rounded-t-3xl overflow-hidden" style={{
      background: 'linear-gradient(135deg, #d1fae5 0%, #ccfbf1 50%, #d1fae5 100%)',
      boxShadow: '0 4px 20px -4px rgba(16, 185, 129, 0.3)',
    }}>
      {/* Dark mode */}
      <div className="hidden dark:block" style={{
        background: 'linear-gradient(135deg, #064e3b 0%, #115e59 50%, #064e3b 100%)',
      }} />

      {/* Floating Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-4 left-[5%]"
          animate={{
            y: [0, -15, 0],
            rotate: [0, 15, 0],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Gift className="w-8 h-8 text-emerald-400 opacity-40" />
        </motion.div>
        <motion.div
          className="absolute top-6 right-[8%]"
          animate={{
            y: [0, -12, 0],
            rotate: [0, -15, 0],
          }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          <CheckCircle2 className="w-6 h-6 text-teal-400 opacity-40" />
        </motion.div>
        <motion.div
          className="absolute bottom-3 left-[18%]"
          animate={{
            y: [0, -10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <Star className="w-5 h-5 text-emerald-500 opacity-30" fill="currentColor" />
        </motion.div>
        <motion.div
          className="absolute bottom-5 right-[18%]"
          animate={{
            y: [0, -14, 0],
          }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        >
          <Zap className="w-4 h-4 text-teal-500 opacity-40" />
        </motion.div>
      </div>

      <div className="py-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-4 mx-auto max-w-7xl">
        {/* Left: Icon & Badge */}
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center shadow-md">
              <Gift className="w-6 h-6 text-white" />
            </div>
          </motion.div>
          
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-emerald-500 text-white text-xs font-bold rounded-lg">
                FREE
              </span>
              <h3 className="text-lg font-bold text-emerald-900 dark:text-emerald-100">
                Free to Use
              </h3>
            </div>
            <p className="text-sm text-emerald-700 dark:text-emerald-300">
              Not open source — just free! • 100% Free • No Ads
            </p>
          </div>
        </div>

        {/* Right: Stats */}
        <div className="flex items-center gap-4">
          <div className="text-center">
            <div className="text-lg font-bold text-emerald-700 dark:text-emerald-300">
              100%
            </div>
            <div className="text-xs text-emerald-600 dark:text-emerald-400">
              Free Forever
            </div>
          </div>
          <div className="w-px h-8 bg-emerald-200 dark:bg-emerald-700" />
          <div className="text-center">
            <div className="text-lg font-bold text-emerald-700 dark:text-emerald-300">
              No Ads
            </div>
            <div className="text-xs text-emerald-600 dark:text-emerald-400">
              Clean Apps
            </div>
          </div>
          <div className="w-px h-8 bg-emerald-200 dark:bg-emerald-700" />
          <div className="text-center">
            <div className="text-lg font-bold text-emerald-700 dark:text-emerald-300">
              ↗️
            </div>
            <div className="text-xs text-emerald-600 dark:text-emerald-400">
              Direct DL
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================== TOP PROJECTS BANNER ====================
interface FeaturedBannerProps {
  title: string;
}

export function FeaturedBanner({ title }: FeaturedBannerProps) {
  return (
    <div className="relative -mx-4 px-4 rounded-t-3xl overflow-hidden" style={{
      background: 'linear-gradient(135deg, #ede9fe 0%, #f3e8ff 50%, #ede9fe 100%)',
      boxShadow: '0 4px 20px -4px rgba(139, 92, 246, 0.3)',
    }}>
      {/* Dark mode */}
      <div className="hidden dark:block" style={{
        background: 'linear-gradient(135deg, #3b0764 0%, #581c87 50%, #3b0764 100%)',
      }} />

      {/* Animated glow */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(circle at 20% 50%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 50%, rgba(168, 85, 247, 0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 50%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)',
          ],
        }}
        transition={{ duration: 5, repeat: Infinity }}
      />

      <div className="py-5 relative z-10 flex flex-col sm:flex-row items-center justify-between gap-3 mx-auto max-w-7xl">
        {/* Left */}
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ 
              boxShadow: [
                '0 0 0 0 rgba(139, 92, 246, 0.4)',
                '0 0 20px 5px rgba(139, 92, 246, 0.2)',
                '0 0 0 0 rgba(139, 92, 246, 0.4)',
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-500 rounded-xl flex items-center justify-center">
              <Star className="w-5 h-5 text-white" fill="currentColor" />
            </div>
          </motion.div>
          <div>
            <h3 className="text-lg font-bold text-violet-900 dark:text-violet-100">
              {title}
            </h3>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2 text-sm text-violet-700 dark:text-violet-300">
          <motion.span
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            ✨
          </motion.span>
          <span>Curated picks</span>
          <span className="text-violet-400">•</span>
          <span>Updated daily</span>
        </div>
      </div>
    </div>
  );
}
