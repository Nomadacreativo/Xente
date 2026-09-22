// Spatial sound generator using Web Audio API

class SoundManager {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private ambientGain: GainNode | null = null;
  private ambientOsc1: OscillatorNode | null = null;
  private ambientOsc2: OscillatorNode | null = null;
  private chimeTimer: number | null = null;

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stopAmbient();
    } else {
      this.startAmbient();
    }
    return !this.isMuted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public playClick(pitch: number = 600) {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(pitch, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(pitch * 1.5, this.ctx.currentTime + 0.06);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch {
      // Audio context might fail on un-interacted page
    }
  }

  public playStageTransition(stageNum: number) {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const baseFrequencies = [261.63, 329.63, 392.00, 523.25]; // C4, E4, G4, C5 pentatonic
      const freq = baseFrequencies[(stageNum - 1) % baseFrequencies.length] || 329.63;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.25, this.ctx.currentTime + 0.25);

      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.36);
    } catch {
      // Ignore
    }
  }

  public startAmbient() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      if (this.ambientGain) {
        return; // already running
      }

      this.ambientGain = this.ctx.createGain();
      this.ambientGain.gain.setValueAtTime(0.025, this.ctx.currentTime);

      this.ambientOsc1 = this.ctx.createOscillator();
      this.ambientOsc1.type = 'sine';
      this.ambientOsc1.frequency.setValueAtTime(110, this.ctx.currentTime); // A2 warm drone

      this.ambientOsc2 = this.ctx.createOscillator();
      this.ambientOsc2.type = 'triangle';
      this.ambientOsc2.frequency.setValueAtTime(164.81, this.ctx.currentTime); // E3 warm fifth

      this.ambientOsc1.connect(this.ambientGain);
      this.ambientOsc2.connect(this.ambientGain);
      this.ambientGain.connect(this.ctx.destination);

      this.ambientOsc1.start();
      this.ambientOsc2.start();

      // Trigger occasional soft chime sounds simulating bells / distant festival chimes
      this.chimeTimer = window.setInterval(() => {
        if (!this.isMuted && this.ctx) {
          const chimes = [523.25, 659.25, 783.99, 1046.50];
          const note = chimes[Math.floor(Math.random() * chimes.length)];
          const chOsc = this.ctx.createOscillator();
          const chGain = this.ctx.createGain();
          chOsc.type = 'sine';
          chOsc.frequency.setValueAtTime(note, this.ctx.currentTime);
          chGain.gain.setValueAtTime(0.03, this.ctx.currentTime);
          chGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.2);
          chOsc.connect(chGain);
          chGain.connect(this.ctx.destination);
          chOsc.start();
          chOsc.stop(this.ctx.currentTime + 1.2);
        }
      }, 4500);

    } catch {
      // Audio context policy
    }
  }

  public stopAmbient() {
    if (this.chimeTimer) {
      clearInterval(this.chimeTimer);
      this.chimeTimer = null;
    }
    if (this.ambientOsc1) {
      try { this.ambientOsc1.stop(); } catch {}
      this.ambientOsc1 = null;
    }
    if (this.ambientOsc2) {
      try { this.ambientOsc2.stop(); } catch {}
      this.ambientOsc2 = null;
    }
    if (this.ambientGain) {
      this.ambientGain = null;
    }
  }
}

export const soundFx = new SoundManager();
