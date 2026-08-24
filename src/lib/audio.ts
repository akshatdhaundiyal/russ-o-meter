// Web Audio API Synthesizer for Russ-O-Meter

class SoundEngine {
  private ctx: AudioContext | null = null;
  private muted: boolean = false;
  private volume: number = 0.5;

  constructor() {
    if (typeof window !== "undefined") {
      const savedMuted = localStorage.getItem("russ_sound_muted");
      if (savedMuted !== null) {
        this.muted = savedMuted === "true";
      }
      const savedVol = localStorage.getItem("russ_sound_volume");
      if (savedVol !== null) {
        this.volume = parseFloat(savedVol) || 0.5;
      }
    }
  }

  private init() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  public isMuted(): boolean {
    return this.muted;
  }

  public toggleMute(): boolean {
    this.muted = !this.muted;
    if (typeof window !== "undefined") {
      localStorage.setItem("russ_sound_muted", String(this.muted));
    }
    if (!this.muted) {
      this.playPop();
    }
    return this.muted;
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (typeof window !== "undefined") {
      localStorage.setItem("russ_sound_volume", String(this.volume));
    }
  }

  public getVolume(): number {
    return this.volume;
  }

  // Multi-tone metallic cash register chime (Add a Comma)
  public playChaChing() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.3 * this.volume, now);
    gain.connect(this.ctx.destination);

    // Coin tones
    const frequencies = [987.77, 1318.51, 1567.98, 2093.0];
    frequencies.forEach((freq, i) => {
      const osc = this.ctx!.createOscillator();
      const noteGain = this.ctx!.createGain();
      const start = now + i * 0.06;

      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, start);

      noteGain.gain.setValueAtTime(0.4, start);
      noteGain.gain.exponentialRampToValueAtTime(0.001, start + 0.45);

      osc.connect(noteGain);
      noteGain.connect(gain);

      osc.start(start);
      osc.stop(start + 0.5);
    });
  }

  // Rising resonant synth glide + sub-bass launch whoosh (Hyper-Inflate Pitch)
  public playRocketLaunch() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.35 * this.volume, now);
    gain.connect(this.ctx.destination);

    // Rising sweep
    const osc = this.ctx.createOscillator();
    const oscGain = this.ctx.createGain();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(110, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.5);

    // Lowpass filter for analog synth feeling
    const filter = this.ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(300, now);
    filter.frequency.exponentialRampToValueAtTime(3000, now + 0.4);

    oscGain.gain.setValueAtTime(0.3, now);
    oscGain.gain.exponentialRampToValueAtTime(0.01, now + 0.6);

    osc.connect(filter);
    filter.connect(oscGain);
    oscGain.connect(gain);

    osc.start(now);
    osc.stop(now + 0.65);

    // Sub-bass thump
    const sub = this.ctx.createOscillator();
    const subGain = this.ctx.createGain();
    sub.type = "sine";
    sub.frequency.setValueAtTime(150, now);
    sub.frequency.exponentialRampToValueAtTime(45, now + 0.3);

    subGain.gain.setValueAtTime(0.6, now);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

    sub.connect(subGain);
    subGain.connect(gain);

    sub.start(now);
    sub.stop(now + 0.45);
  }

  // Fanfare chords for Tres Comas Club & Celebration
  public playCelebrationFanfare() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.4 * this.volume, now);
    gain.connect(this.ctx.destination);

    // Majestic chord progression: C -> G -> C high
    const notes = [
      { f: 523.25, t: 0.0, d: 0.2 }, // C5
      { f: 659.25, t: 0.15, d: 0.2 }, // E5
      { f: 783.99, t: 0.3, d: 0.25 }, // G5
      { f: 1046.5, t: 0.5, d: 0.7 }, // C6
      { f: 1318.51, t: 0.55, d: 0.65 }, // E6
    ];

    notes.forEach(({ f, t, d }) => {
      const osc = this.ctx!.createOscillator();
      const nGain = this.ctx!.createGain();
      const start = now + t;

      osc.type = "triangle";
      osc.frequency.setValueAtTime(f, start);

      nGain.gain.setValueAtTime(0.4, start);
      nGain.gain.exponentialRampToValueAtTime(0.001, start + d);

      osc.connect(nGain);
      nGain.connect(gain);

      osc.start(start);
      osc.stop(start + d + 0.05);
    });
  }

  // Descending buzzer for roasts, penalties, and burn warnings
  public playBuzzer() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.25 * this.volume, now);
    gain.connect(this.ctx.destination);

    const osc = this.ctx.createOscillator();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.linearRampToValueAtTime(110, now + 0.35);

    const oscGain = this.ctx.createGain();
    oscGain.gain.setValueAtTime(0.5, now);
    oscGain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);

    osc.connect(oscGain);
    oscGain.connect(gain);

    osc.start(now);
    osc.stop(now + 0.45);
  }

  // Quick subtle UI tap pop
  public playPop() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.exponentialRampToValueAtTime(200, now + 0.08);

    gain.gain.setValueAtTime(0.15 * this.volume, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.09);
  }
}

export const sound = new SoundEngine();
