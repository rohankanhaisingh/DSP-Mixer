declare namespace wasm_bindgen {
	/* tslint:disable */
	/* eslint-disable */
	export class Chorus {
	  free(): void;
	  [Symbol.dispose](): void;
	  get_rate_hz(): number;
	  set_rate_hz(rate_hz: number): void;
	  get_depth_ms(): number;
	  get_feedback(): number;
	  set_depth_ms(depth_ms: number): void;
	  set_feedback(feedback: number): void;
	  set_phase_offset(phase: number): void;
	  get_base_delay_ms(): number;
	  set_base_delay_ms(base_delay_ms: number): void;
	  constructor(sample_rate: number, base_delay_ms: number, depth_ms: number, rate_hz: number, mix: number, feedback: number);
	  get_mix(): number;
	  process(buffer: Float32Array): void;
	  set_mix(mix: number): void;
	}
	export class HardClip {
	  free(): void;
	  [Symbol.dispose](): void;
	  constructor(drive: number, gain: number);
	  process(buffer: Float32Array): void;
	  get_gain(): number;
	  set_gain(gain: number): void;
	  get_drive(): number;
	  set_drive(drive: number): void;
	}
	export class HighPassFilter {
	  free(): void;
	  [Symbol.dispose](): void;
	  set_cutoff(cutoff: number): void;
	  set_max_freq(max_freq: number): void;
	  set_sample_rate(sample_rate: number): void;
	  constructor(sample_rate: number, cutoff: number, q: number);
	  reset(): void;
	  set_q(q: number): void;
	  process(buffer: Float32Array): void;
	}
	export class LowPassFilter {
	  free(): void;
	  [Symbol.dispose](): void;
	  set_cutoff(cutoff: number): void;
	  set_min_freq(min_freq: number): void;
	  set_sample_rate(sample_rate: number): void;
	  constructor(sample_rate: number, cutoff: number, q: number);
	  reset(): void;
	  set_q(q: number): void;
	  process(buffer: Float32Array): void;
	}
	export class NotchFilter {
	  free(): void;
	  [Symbol.dispose](): void;
	  set_cutoff(cutoff: number): void;
	  set_min_freq(min_freq: number): void;
	  set_sample_rate(sample_rate: number): void;
	  constructor(sample_rate: number, cutoff: number, q: number);
	  reset(): void;
	  set_q(q: number): void;
	  process(buffer: Float32Array): void;
	}
	/**
	 * A Schroeder/Freeverb-style reverb: a bank of parallel damped comb filters
	 * feeding a series of allpass diffusers, crossfaded against the dry signal.
	 *
	 * Intended to be instantiated once per audio channel (like `Chorus`); pass a
	 * non-zero `stereo_spread_ms` on one channel's instance so its delay-line
	 * tunings are offset from the other channel(s), which decorrelates the tail
	 * between channels instead of producing a mono-sounding reverb.
	 */
	export class Reverb {
	  free(): void;
	  [Symbol.dispose](): void;
	  get_damping(): number;
	  set_damping(damping: number): void;
	  get_room_size(): number;
	  set_room_size(room_size: number): void;
	  get_stereo_spread_ms(): number;
	  /**
	   * Rebuilds the comb and allpass delay lines at the new spread. This
	   * discards their current contents (equivalent to a `reset()`), since
	   * the buffers themselves change length and old samples wouldn't line
	   * up with the new tuning anyway.
	   */
	  set_stereo_spread_ms(stereo_spread_ms: number): void;
	  constructor(sample_rate: number, room_size: number, damping: number, mix: number, stereo_spread_ms: number);
	  reset(): void;
	  get_mix(): number;
	  process(buffer: Float32Array): void;
	  set_mix(mix: number): void;
	}
	export class SoftClip {
	  free(): void;
	  [Symbol.dispose](): void;
	  constructor(drive: number, gain: number);
	  process(buffer: Float32Array): void;
	  get_gain(): number;
	  set_gain(gain: number): void;
	  get_drive(): number;
	  set_drive(drive: number): void;
	}
	
}

declare type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

declare interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_chorus_free: (a: number, b: number) => void;
  readonly __wbg_hardclip_free: (a: number, b: number) => void;
  readonly __wbg_highpassfilter_free: (a: number, b: number) => void;
  readonly __wbg_reverb_free: (a: number, b: number) => void;
  readonly chorus_get_base_delay_ms: (a: number) => number;
  readonly chorus_get_depth_ms: (a: number) => number;
  readonly chorus_get_feedback: (a: number) => number;
  readonly chorus_get_mix: (a: number) => number;
  readonly chorus_get_rate_hz: (a: number) => number;
  readonly chorus_new: (a: number, b: number, c: number, d: number, e: number, f: number) => number;
  readonly chorus_process: (a: number, b: number, c: number, d: any) => void;
  readonly chorus_set_base_delay_ms: (a: number, b: number) => void;
  readonly chorus_set_depth_ms: (a: number, b: number) => void;
  readonly chorus_set_feedback: (a: number, b: number) => void;
  readonly chorus_set_mix: (a: number, b: number) => void;
  readonly chorus_set_phase_offset: (a: number, b: number) => void;
  readonly chorus_set_rate_hz: (a: number, b: number) => void;
  readonly hardclip_get_drive: (a: number) => number;
  readonly hardclip_get_gain: (a: number) => number;
  readonly hardclip_new: (a: number, b: number) => number;
  readonly hardclip_process: (a: number, b: number, c: number, d: any) => void;
  readonly hardclip_set_drive: (a: number, b: number) => void;
  readonly hardclip_set_gain: (a: number, b: number) => void;
  readonly highpassfilter_new: (a: number, b: number, c: number) => number;
  readonly highpassfilter_process: (a: number, b: number, c: number, d: any) => void;
  readonly highpassfilter_reset: (a: number) => void;
  readonly highpassfilter_set_cutoff: (a: number, b: number) => void;
  readonly highpassfilter_set_max_freq: (a: number, b: number) => void;
  readonly highpassfilter_set_q: (a: number, b: number) => void;
  readonly highpassfilter_set_sample_rate: (a: number, b: number) => void;
  readonly lowpassfilter_new: (a: number, b: number, c: number) => number;
  readonly lowpassfilter_set_cutoff: (a: number, b: number) => void;
  readonly lowpassfilter_set_min_freq: (a: number, b: number) => void;
  readonly lowpassfilter_set_q: (a: number, b: number) => void;
  readonly lowpassfilter_set_sample_rate: (a: number, b: number) => void;
  readonly notchfilter_new: (a: number, b: number, c: number) => number;
  readonly notchfilter_set_cutoff: (a: number, b: number) => void;
  readonly notchfilter_set_min_freq: (a: number, b: number) => void;
  readonly notchfilter_set_q: (a: number, b: number) => void;
  readonly notchfilter_set_sample_rate: (a: number, b: number) => void;
  readonly reverb_get_damping: (a: number) => number;
  readonly reverb_get_mix: (a: number) => number;
  readonly reverb_get_room_size: (a: number) => number;
  readonly reverb_get_stereo_spread_ms: (a: number) => number;
  readonly reverb_new: (a: number, b: number, c: number, d: number, e: number) => number;
  readonly reverb_process: (a: number, b: number, c: number, d: any) => void;
  readonly reverb_reset: (a: number) => void;
  readonly reverb_set_damping: (a: number, b: number) => void;
  readonly reverb_set_mix: (a: number, b: number) => void;
  readonly reverb_set_room_size: (a: number, b: number) => void;
  readonly reverb_set_stereo_spread_ms: (a: number, b: number) => void;
  readonly softclip_process: (a: number, b: number, c: number, d: any) => void;
  readonly softclip_new: (a: number, b: number) => number;
  readonly __wbg_softclip_free: (a: number, b: number) => void;
  readonly __wbg_notchfilter_free: (a: number, b: number) => void;
  readonly __wbg_lowpassfilter_free: (a: number, b: number) => void;
  readonly lowpassfilter_reset: (a: number) => void;
  readonly lowpassfilter_process: (a: number, b: number, c: number, d: any) => void;
  readonly softclip_set_gain: (a: number, b: number) => void;
  readonly softclip_set_drive: (a: number, b: number) => void;
  readonly notchfilter_reset: (a: number) => void;
  readonly notchfilter_process: (a: number, b: number, c: number, d: any) => void;
  readonly softclip_get_drive: (a: number) => number;
  readonly softclip_get_gain: (a: number) => number;
  readonly __wbindgen_externrefs: WebAssembly.Table;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_start: () => void;
}

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
*
* @returns {Promise<InitOutput>}
*/
declare function wasm_bindgen (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
