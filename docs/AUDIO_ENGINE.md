# Web Audio Engine Documentation

The **Russ-O-Meter** uses a zero-dependency, real-time procedural sound synthesizer implemented in `src/lib/audio.ts`. This architecture ensures zero latency, zero bandwidth overhead for audio assets, and full offline capabilities.

---

## 1. Synthesizer Architecture

The `SoundEngine` class wraps the browser `AudioContext` and dynamically allocates nodes on demand:

```
[AudioContext] ──> [OscillatorNode] ──> [GainNode (Envelope)] ──> [BiquadFilterNode] ──> [Master Gain] ──> [AudioContext.destination]
```

---

## 2. Sound Specifications

### `playChaChing()`
- **Use Case**: Fired when adding commas or completing funding rounds.
- **Waveform**: Triangle waves across four harmonic frequencies: `[987.77 Hz, 1318.51 Hz, 1567.98 Hz, 2093.00 Hz]`.
- **Envelope**: Staggered start times (60ms intervals) with 450ms exponential volume decay to mimic coin clinking in a brass register.

### `playRocketLaunch()`
- **Use Case**: Fired when hyper-inflating a pitch or commencing a pitch battle.
- **Waveform**: Dual oscillators:
  1. *Sawtooth sweep*: Frequency ramps exponentially from 110 Hz to 880 Hz over 500ms, processed through a lowpass filter sweeping from 300 Hz to 3000 Hz.
  2. *Sub-bass thump*: Sine wave sweeping from 150 Hz to 45 Hz with high initial attack.

### `playCelebrationFanfare()`
- **Use Case**: Fired when joining the Three Commas Club or crowning a pitch battle champion.
- **Waveform**: Arpeggiated C-major brass-like chord:
  - C5 (523.25 Hz, t=0ms)
  - E5 (659.25 Hz, t=150ms)
  - G5 (783.99 Hz, t=300ms)
  - C6 (1046.50 Hz, t=500ms)
  - E6 (1318.51 Hz, t=550ms)

### `playBuzzer()`
- **Use Case**: Fired during layoffs, revenue penalties, and VC roasts.
- **Waveform**: Sawtooth oscillator linearly descending from 220 Hz to 110 Hz over 350ms.

---

## 3. Persistence & Audio Policy Handling

Browsers restrict audio context autoplay until the first user interaction.
- The `SoundEngine` initializes or resumes its `AudioContext` lazily on the first user tap.
- Mute state (`russ_sound_muted`) and master volume (`russ_sound_volume`) are automatically persisted in `localStorage`.
