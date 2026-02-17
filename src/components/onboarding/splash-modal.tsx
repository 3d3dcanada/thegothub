'use client';

import { useState, useEffect } from 'react';
import { Check, X, Search, Download, Gamepad2, Palette, Code, Database, Globe, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SplashModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FEATURES = [
  {
    icon: Search,
    title: 'Discover Projects',
    description: 'Search millions of open source projects from GitHub, GitLab, SourceForge, Hugging Face, and more.',
  },
  {
    icon: Download,
    title: 'Download Easily',
    description: 'Get direct links to download any project. We also feature free software that isn\'t open source.',
  },
  {
    icon: Gamepad2,
    title: 'Game Engines & More',
    description: 'Find game engines like Godot, Blender, and Unreal Engine alongside developer tools.',
  },
  {
    icon: Palette,
    title: 'Creative Tools',
    description: 'Discover image editors, video tools, audio software, and design resources.',
  },
  {
    icon: Code,
    title: 'Developer Libraries',
    description: 'Access frameworks, libraries, and APIs for your next project.',
  },
  {
    icon: Globe,
    title: 'Multi-Platform',
    description: 'We aggregate from multiple sources, giving you one place to find it all.',
  },
];

export function SplashModal({ isOpen, onClose }: SplashModalProps) {
  const [step, setStep] = useState(0);
  const [dontShowAgain, setDontShowAgain] = useState(false);
  const [understood, setUnderstood] = useState(false);

  const handleContinue = () => {
    if (step < FEATURES.length) {
      setStep(step + 1);
    } else {
      if (dontShowAgain) {
        localStorage.setItem('onboardingComplete', 'true');
      }
      onClose();
    }
  };

  const handleSkip = () => {
    if (dontShowAgain) {
      localStorage.setItem('onboardingComplete', 'true');
    }
    onClose();
  };

  if (!isOpen) return null;

  const currentFeature = FEATURES[step];
  const isLastStep = step === FEATURES.length;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop - subtle overlay */}
      <div
        className="absolute inset-0 bg-black/30 dark:bg-black/50"
        onClick={() => {}}
      />
      
      {/* Modal */}
      <div className="relative z-10 w-full max-w-2xl mx-4 bg-card border rounded-2xl shadow-2xl overflow-hidden">
        {/* Progress Bar */}
        <div className="h-1 bg-muted">
          <div 
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${((step + 1) / (FEATURES.length + 1)) * 100}%` }}
          />
        </div>

        {/* Content */}
        <div className="p-8">
          {!isLastStep ? (
            <>
              {/* Feature Walkthrough */}
              <div className="text-center mb-8">
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center">
                  {currentFeature.icon && (
                    <currentFeature.icon className="w-10 h-10 text-primary" />
                  )}
                </div>
                <h2 className="text-2xl font-bold mb-3">{currentFeature.title}</h2>
                <p className="text-muted-foreground text-lg">{currentFeature.description}</p>
              </div>

              {/* Feature Navigation Dots */}
              <div className="flex justify-center gap-2 mb-8">
                {FEATURES.map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      "w-2 h-2 rounded-full transition-all",
                      i === step ? "bg-primary w-6" : "bg-muted"
                    )}
                  />
                ))}
              </div>
            </>
          ) : (
            <>
              {/* Final Step - Summary & Notice */}
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold mb-3">You&apos;re All Set!</h2>
                <p className="text-muted-foreground">Ready to explore the world of open source?</p>
              </div>

              {/* Important Notice */}
              <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl p-4 mb-6">
                <div className="flex items-start gap-3">
                  <div className="shrink-0 w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center">
                    <svg className="w-4 h-4 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-amber-900 dark:text-amber-100">Important Notice</h3>
                    <p className="text-sm text-amber-800 dark:text-amber-200 mt-1">
                      THE GOT HUB is a <strong>search engine</strong> for open source projects. We aggregate from multiple platforms including GitHub, GitLab, SourceForge, and Hugging Face. Clicking download will take you to the project&apos;s official source.
                    </p>
                  </div>
                </div>
              </div>

              {/* Checkboxes */}
              <div className="space-y-3 mb-6">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={understood}
                    onChange={(e) => setUnderstood(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-muted-foreground">
                    I understand that THE GOT HUB is a discovery platform and I will be redirected to the official source for downloads.
                  </span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={dontShowAgain}
                    onChange={(e) => setDontShowAgain(e.target.checked)}
                    className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-muted-foreground">
                    Don&apos;t show this welcome screen again
                  </span>
                </label>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="px-8 pb-8 flex gap-3">
          <Button
            variant="outline"
            onClick={handleSkip}
            className="flex-1"
          >
            Skip
          </Button>
          <Button
            onClick={handleContinue}
            disabled={isLastStep && !understood}
            className="flex-1"
            size="lg"
          >
            {isLastStep ? (
              'Get Started'
            ) : (
              <>
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

export function useOnboarding() {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onboardingComplete = localStorage.getItem('onboardingComplete');
    if (!onboardingComplete) {
      setShowOnboarding(true);
    }
  }, []);

  const closeOnboarding = () => {
    setShowOnboarding(false);
  };

  return { showOnboarding, closeOnboarding, mounted };
}
