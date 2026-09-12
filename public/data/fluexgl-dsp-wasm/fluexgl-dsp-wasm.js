import {TextDecoder} from "text-decoding";void 0===globalThis.crypto&&(globalThis.crypto={}),"function"!=typeof globalThis.crypto.getRandomValues&&(globalThis.crypto.getRandomValues=function(o){for(let t=0;t<o.length;t++)o[t]=Math.floor(256*Math.random());return o}); let wasm_bindgen;
(function() {
    const __exports = {};
    let script_src;
    if (typeof document !== 'undefined' && document.currentScript !== null) {
        script_src = new URL(document.currentScript.src, location.href).toString();
    }
    let wasm = undefined;

    let cachedUint8ArrayMemory0 = null;

    function getUint8ArrayMemory0() {
        if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
            cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
        }
        return cachedUint8ArrayMemory0;
    }

    function getArrayU8FromWasm0(ptr, len) {
        ptr = ptr >>> 0;
        return getUint8ArrayMemory0().subarray(ptr / 1, ptr / 1 + len);
    }

    let cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });

    cachedTextDecoder.decode();

    function decodeText(ptr, len) {
        return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
    }

    function getStringFromWasm0(ptr, len) {
        ptr = ptr >>> 0;
        return decodeText(ptr, len);
    }

    let cachedFloat32ArrayMemory0 = null;

    function getFloat32ArrayMemory0() {
        if (cachedFloat32ArrayMemory0 === null || cachedFloat32ArrayMemory0.byteLength === 0) {
            cachedFloat32ArrayMemory0 = new Float32Array(wasm.memory.buffer);
        }
        return cachedFloat32ArrayMemory0;
    }

    let WASM_VECTOR_LEN = 0;

    function passArrayF32ToWasm0(arg, malloc) {
        const ptr = malloc(arg.length * 4, 4) >>> 0;
        getFloat32ArrayMemory0().set(arg, ptr / 4);
        WASM_VECTOR_LEN = arg.length;
        return ptr;
    }

    const ChorusFinalization = (typeof FinalizationRegistry === 'undefined')
        ? { register: () => {}, unregister: () => {} }
        : new FinalizationRegistry(ptr => wasm.__wbg_chorus_free(ptr >>> 0, 1));

    class Chorus {

        __destroy_into_raw() {
            const ptr = this.__wbg_ptr;
            this.__wbg_ptr = 0;
            ChorusFinalization.unregister(this);
            return ptr;
        }

        free() {
            const ptr = this.__destroy_into_raw();
            wasm.__wbg_chorus_free(ptr, 0);
        }
        /**
         * @returns {number}
         */
        get_rate_hz() {
            const ret = wasm.chorus_get_rate_hz(this.__wbg_ptr);
            return ret;
        }
        /**
         * @param {number} rate_hz
         */
        set_rate_hz(rate_hz) {
            wasm.chorus_set_rate_hz(this.__wbg_ptr, rate_hz);
        }
        /**
         * @returns {number}
         */
        get_depth_ms() {
            const ret = wasm.chorus_get_depth_ms(this.__wbg_ptr);
            return ret;
        }
        /**
         * @returns {number}
         */
        get_feedback() {
            const ret = wasm.chorus_get_feedback(this.__wbg_ptr);
            return ret;
        }
        /**
         * @param {number} depth_ms
         */
        set_depth_ms(depth_ms) {
            wasm.chorus_set_depth_ms(this.__wbg_ptr, depth_ms);
        }
        /**
         * @param {number} feedback
         */
        set_feedback(feedback) {
            wasm.chorus_set_feedback(this.__wbg_ptr, feedback);
        }
        /**
         * @param {number} phase
         */
        set_phase_offset(phase) {
            wasm.chorus_set_phase_offset(this.__wbg_ptr, phase);
        }
        /**
         * @returns {number}
         */
        get_base_delay_ms() {
            const ret = wasm.chorus_get_base_delay_ms(this.__wbg_ptr);
            return ret;
        }
        /**
         * @param {number} base_delay_ms
         */
        set_base_delay_ms(base_delay_ms) {
            wasm.chorus_set_base_delay_ms(this.__wbg_ptr, base_delay_ms);
        }
        /**
         * @param {number} sample_rate
         * @param {number} base_delay_ms
         * @param {number} depth_ms
         * @param {number} rate_hz
         * @param {number} mix
         * @param {number} feedback
         */
        constructor(sample_rate, base_delay_ms, depth_ms, rate_hz, mix, feedback) {
            const ret = wasm.chorus_new(sample_rate, base_delay_ms, depth_ms, rate_hz, mix, feedback);
            this.__wbg_ptr = ret >>> 0;
            ChorusFinalization.register(this, this.__wbg_ptr, this);
            return this;
        }
        /**
         * @returns {number}
         */
        get_mix() {
            const ret = wasm.chorus_get_mix(this.__wbg_ptr);
            return ret;
        }
        /**
         * @param {Float32Array} buffer
         */
        process(buffer) {
            var ptr0 = passArrayF32ToWasm0(buffer, wasm.__wbindgen_malloc);
            var len0 = WASM_VECTOR_LEN;
            wasm.chorus_process(this.__wbg_ptr, ptr0, len0, buffer);
        }
        /**
         * @param {number} mix
         */
        set_mix(mix) {
            wasm.chorus_set_mix(this.__wbg_ptr, mix);
        }
    }
    if (Symbol.dispose) Chorus.prototype[Symbol.dispose] = Chorus.prototype.free;

    __exports.Chorus = Chorus;

    const HardClipFinalization = (typeof FinalizationRegistry === 'undefined')
        ? { register: () => {}, unregister: () => {} }
        : new FinalizationRegistry(ptr => wasm.__wbg_hardclip_free(ptr >>> 0, 1));

    class HardClip {

        __destroy_into_raw() {
            const ptr = this.__wbg_ptr;
            this.__wbg_ptr = 0;
            HardClipFinalization.unregister(this);
            return ptr;
        }

        free() {
            const ptr = this.__destroy_into_raw();
            wasm.__wbg_hardclip_free(ptr, 0);
        }
        /**
         * @param {number} drive
         * @param {number} gain
         */
        constructor(drive, gain) {
            const ret = wasm.hardclip_new(drive, gain);
            this.__wbg_ptr = ret >>> 0;
            HardClipFinalization.register(this, this.__wbg_ptr, this);
            return this;
        }
        /**
         * @param {Float32Array} buffer
         */
        process(buffer) {
            var ptr0 = passArrayF32ToWasm0(buffer, wasm.__wbindgen_malloc);
            var len0 = WASM_VECTOR_LEN;
            wasm.hardclip_process(this.__wbg_ptr, ptr0, len0, buffer);
        }
        /**
         * @returns {number}
         */
        get_gain() {
            const ret = wasm.hardclip_get_gain(this.__wbg_ptr);
            return ret;
        }
        /**
         * @param {number} gain
         */
        set_gain(gain) {
            wasm.hardclip_set_gain(this.__wbg_ptr, gain);
        }
        /**
         * @returns {number}
         */
        get_drive() {
            const ret = wasm.hardclip_get_drive(this.__wbg_ptr);
            return ret;
        }
        /**
         * @param {number} drive
         */
        set_drive(drive) {
            wasm.hardclip_set_drive(this.__wbg_ptr, drive);
        }
    }
    if (Symbol.dispose) HardClip.prototype[Symbol.dispose] = HardClip.prototype.free;

    __exports.HardClip = HardClip;

    const HighPassFilterFinalization = (typeof FinalizationRegistry === 'undefined')
        ? { register: () => {}, unregister: () => {} }
        : new FinalizationRegistry(ptr => wasm.__wbg_highpassfilter_free(ptr >>> 0, 1));

    class HighPassFilter {

        __destroy_into_raw() {
            const ptr = this.__wbg_ptr;
            this.__wbg_ptr = 0;
            HighPassFilterFinalization.unregister(this);
            return ptr;
        }

        free() {
            const ptr = this.__destroy_into_raw();
            wasm.__wbg_highpassfilter_free(ptr, 0);
        }
        /**
         * @param {number} cutoff
         */
        set_cutoff(cutoff) {
            wasm.highpassfilter_set_cutoff(this.__wbg_ptr, cutoff);
        }
        /**
         * @param {number} max_freq
         */
        set_max_freq(max_freq) {
            wasm.highpassfilter_set_max_freq(this.__wbg_ptr, max_freq);
        }
        /**
         * @param {number} sample_rate
         */
        set_sample_rate(sample_rate) {
            wasm.highpassfilter_set_sample_rate(this.__wbg_ptr, sample_rate);
        }
        /**
         * @param {number} sample_rate
         * @param {number} cutoff
         * @param {number} q
         */
        constructor(sample_rate, cutoff, q) {
            const ret = wasm.highpassfilter_new(sample_rate, cutoff, q);
            this.__wbg_ptr = ret >>> 0;
            HighPassFilterFinalization.register(this, this.__wbg_ptr, this);
            return this;
        }
        reset() {
            wasm.highpassfilter_reset(this.__wbg_ptr);
        }
        /**
         * @param {number} q
         */
        set_q(q) {
            wasm.highpassfilter_set_q(this.__wbg_ptr, q);
        }
        /**
         * @param {Float32Array} buffer
         */
        process(buffer) {
            var ptr0 = passArrayF32ToWasm0(buffer, wasm.__wbindgen_malloc);
            var len0 = WASM_VECTOR_LEN;
            wasm.highpassfilter_process(this.__wbg_ptr, ptr0, len0, buffer);
        }
    }
    if (Symbol.dispose) HighPassFilter.prototype[Symbol.dispose] = HighPassFilter.prototype.free;

    __exports.HighPassFilter = HighPassFilter;

    const LowPassFilterFinalization = (typeof FinalizationRegistry === 'undefined')
        ? { register: () => {}, unregister: () => {} }
        : new FinalizationRegistry(ptr => wasm.__wbg_lowpassfilter_free(ptr >>> 0, 1));

    class LowPassFilter {

        __destroy_into_raw() {
            const ptr = this.__wbg_ptr;
            this.__wbg_ptr = 0;
            LowPassFilterFinalization.unregister(this);
            return ptr;
        }

        free() {
            const ptr = this.__destroy_into_raw();
            wasm.__wbg_lowpassfilter_free(ptr, 0);
        }
        /**
         * @param {number} cutoff
         */
        set_cutoff(cutoff) {
            wasm.lowpassfilter_set_cutoff(this.__wbg_ptr, cutoff);
        }
        /**
         * @param {number} min_freq
         */
        set_min_freq(min_freq) {
            wasm.lowpassfilter_set_min_freq(this.__wbg_ptr, min_freq);
        }
        /**
         * @param {number} sample_rate
         */
        set_sample_rate(sample_rate) {
            wasm.lowpassfilter_set_sample_rate(this.__wbg_ptr, sample_rate);
        }
        /**
         * @param {number} sample_rate
         * @param {number} cutoff
         * @param {number} q
         */
        constructor(sample_rate, cutoff, q) {
            const ret = wasm.lowpassfilter_new(sample_rate, cutoff, q);
            this.__wbg_ptr = ret >>> 0;
            LowPassFilterFinalization.register(this, this.__wbg_ptr, this);
            return this;
        }
        reset() {
            wasm.highpassfilter_reset(this.__wbg_ptr);
        }
        /**
         * @param {number} q
         */
        set_q(q) {
            wasm.lowpassfilter_set_q(this.__wbg_ptr, q);
        }
        /**
         * @param {Float32Array} buffer
         */
        process(buffer) {
            var ptr0 = passArrayF32ToWasm0(buffer, wasm.__wbindgen_malloc);
            var len0 = WASM_VECTOR_LEN;
            wasm.lowpassfilter_process(this.__wbg_ptr, ptr0, len0, buffer);
        }
    }
    if (Symbol.dispose) LowPassFilter.prototype[Symbol.dispose] = LowPassFilter.prototype.free;

    __exports.LowPassFilter = LowPassFilter;

    const NotchFilterFinalization = (typeof FinalizationRegistry === 'undefined')
        ? { register: () => {}, unregister: () => {} }
        : new FinalizationRegistry(ptr => wasm.__wbg_notchfilter_free(ptr >>> 0, 1));

    class NotchFilter {

        __destroy_into_raw() {
            const ptr = this.__wbg_ptr;
            this.__wbg_ptr = 0;
            NotchFilterFinalization.unregister(this);
            return ptr;
        }

        free() {
            const ptr = this.__destroy_into_raw();
            wasm.__wbg_notchfilter_free(ptr, 0);
        }
        /**
         * @param {number} cutoff
         */
        set_cutoff(cutoff) {
            wasm.notchfilter_set_cutoff(this.__wbg_ptr, cutoff);
        }
        /**
         * @param {number} min_freq
         */
        set_min_freq(min_freq) {
            wasm.notchfilter_set_min_freq(this.__wbg_ptr, min_freq);
        }
        /**
         * @param {number} sample_rate
         */
        set_sample_rate(sample_rate) {
            wasm.notchfilter_set_sample_rate(this.__wbg_ptr, sample_rate);
        }
        /**
         * @param {number} sample_rate
         * @param {number} cutoff
         * @param {number} q
         */
        constructor(sample_rate, cutoff, q) {
            const ret = wasm.notchfilter_new(sample_rate, cutoff, q);
            this.__wbg_ptr = ret >>> 0;
            NotchFilterFinalization.register(this, this.__wbg_ptr, this);
            return this;
        }
        reset() {
            wasm.highpassfilter_reset(this.__wbg_ptr);
        }
        /**
         * @param {number} q
         */
        set_q(q) {
            wasm.notchfilter_set_q(this.__wbg_ptr, q);
        }
        /**
         * @param {Float32Array} buffer
         */
        process(buffer) {
            var ptr0 = passArrayF32ToWasm0(buffer, wasm.__wbindgen_malloc);
            var len0 = WASM_VECTOR_LEN;
            wasm.notchfilter_process(this.__wbg_ptr, ptr0, len0, buffer);
        }
    }
    if (Symbol.dispose) NotchFilter.prototype[Symbol.dispose] = NotchFilter.prototype.free;

    __exports.NotchFilter = NotchFilter;

    const ReverbFinalization = (typeof FinalizationRegistry === 'undefined')
        ? { register: () => {}, unregister: () => {} }
        : new FinalizationRegistry(ptr => wasm.__wbg_reverb_free(ptr >>> 0, 1));
    /**
     * A Schroeder/Freeverb-style reverb: a bank of parallel damped comb filters
     * feeding a series of allpass diffusers, crossfaded against the dry signal.
     *
     * Intended to be instantiated once per audio channel (like `Chorus`); pass a
     * non-zero `stereo_spread_ms` on one channel's instance so its delay-line
     * tunings are offset from the other channel(s), which decorrelates the tail
     * between channels instead of producing a mono-sounding reverb.
     */
    class Reverb {

        __destroy_into_raw() {
            const ptr = this.__wbg_ptr;
            this.__wbg_ptr = 0;
            ReverbFinalization.unregister(this);
            return ptr;
        }

        free() {
            const ptr = this.__destroy_into_raw();
            wasm.__wbg_reverb_free(ptr, 0);
        }
        /**
         * @returns {number}
         */
        get_damping() {
            const ret = wasm.reverb_get_damping(this.__wbg_ptr);
            return ret;
        }
        /**
         * @param {number} damping
         */
        set_damping(damping) {
            wasm.reverb_set_damping(this.__wbg_ptr, damping);
        }
        /**
         * @returns {number}
         */
        get_room_size() {
            const ret = wasm.reverb_get_room_size(this.__wbg_ptr);
            return ret;
        }
        /**
         * @param {number} room_size
         */
        set_room_size(room_size) {
            wasm.reverb_set_room_size(this.__wbg_ptr, room_size);
        }
        /**
         * @returns {number}
         */
        get_stereo_spread_ms() {
            const ret = wasm.reverb_get_stereo_spread_ms(this.__wbg_ptr);
            return ret;
        }
        /**
         * Rebuilds the comb and allpass delay lines at the new spread. This
         * discards their current contents (equivalent to a `reset()`), since
         * the buffers themselves change length and old samples wouldn't line
         * up with the new tuning anyway.
         * @param {number} stereo_spread_ms
         */
        set_stereo_spread_ms(stereo_spread_ms) {
            wasm.reverb_set_stereo_spread_ms(this.__wbg_ptr, stereo_spread_ms);
        }
        /**
         * @param {number} sample_rate
         * @param {number} room_size
         * @param {number} damping
         * @param {number} mix
         * @param {number} stereo_spread_ms
         */
        constructor(sample_rate, room_size, damping, mix, stereo_spread_ms) {
            const ret = wasm.reverb_new(sample_rate, room_size, damping, mix, stereo_spread_ms);
            this.__wbg_ptr = ret >>> 0;
            ReverbFinalization.register(this, this.__wbg_ptr, this);
            return this;
        }
        reset() {
            wasm.reverb_reset(this.__wbg_ptr);
        }
        /**
         * @returns {number}
         */
        get_mix() {
            const ret = wasm.reverb_get_mix(this.__wbg_ptr);
            return ret;
        }
        /**
         * @param {Float32Array} buffer
         */
        process(buffer) {
            var ptr0 = passArrayF32ToWasm0(buffer, wasm.__wbindgen_malloc);
            var len0 = WASM_VECTOR_LEN;
            wasm.reverb_process(this.__wbg_ptr, ptr0, len0, buffer);
        }
        /**
         * @param {number} mix
         */
        set_mix(mix) {
            wasm.reverb_set_mix(this.__wbg_ptr, mix);
        }
    }
    if (Symbol.dispose) Reverb.prototype[Symbol.dispose] = Reverb.prototype.free;

    __exports.Reverb = Reverb;

    const SoftClipFinalization = (typeof FinalizationRegistry === 'undefined')
        ? { register: () => {}, unregister: () => {} }
        : new FinalizationRegistry(ptr => wasm.__wbg_softclip_free(ptr >>> 0, 1));

    class SoftClip {

        __destroy_into_raw() {
            const ptr = this.__wbg_ptr;
            this.__wbg_ptr = 0;
            SoftClipFinalization.unregister(this);
            return ptr;
        }

        free() {
            const ptr = this.__destroy_into_raw();
            wasm.__wbg_softclip_free(ptr, 0);
        }
        /**
         * @param {number} drive
         * @param {number} gain
         */
        constructor(drive, gain) {
            const ret = wasm.hardclip_new(drive, gain);
            this.__wbg_ptr = ret >>> 0;
            SoftClipFinalization.register(this, this.__wbg_ptr, this);
            return this;
        }
        /**
         * @param {Float32Array} buffer
         */
        process(buffer) {
            var ptr0 = passArrayF32ToWasm0(buffer, wasm.__wbindgen_malloc);
            var len0 = WASM_VECTOR_LEN;
            wasm.softclip_process(this.__wbg_ptr, ptr0, len0, buffer);
        }
        /**
         * @returns {number}
         */
        get_gain() {
            const ret = wasm.hardclip_get_gain(this.__wbg_ptr);
            return ret;
        }
        /**
         * @param {number} gain
         */
        set_gain(gain) {
            wasm.hardclip_set_gain(this.__wbg_ptr, gain);
        }
        /**
         * @returns {number}
         */
        get_drive() {
            const ret = wasm.hardclip_get_drive(this.__wbg_ptr);
            return ret;
        }
        /**
         * @param {number} drive
         */
        set_drive(drive) {
            wasm.hardclip_set_drive(this.__wbg_ptr, drive);
        }
    }
    if (Symbol.dispose) SoftClip.prototype[Symbol.dispose] = SoftClip.prototype.free;

    __exports.SoftClip = SoftClip;

    const EXPECTED_RESPONSE_TYPES = new Set(['basic', 'cors', 'default']);

    async function __wbg_load(module, imports) {
        if (typeof Response === 'function' && module instanceof Response) {
            if (typeof WebAssembly.instantiateStreaming === 'function') {
                try {
                    return await WebAssembly.instantiateStreaming(module, imports);

                } catch (e) {
                    const validResponse = module.ok && EXPECTED_RESPONSE_TYPES.has(module.type);

                    if (validResponse && module.headers.get('Content-Type') !== 'application/wasm') {
                        console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                    } else {
                        throw e;
                    }
                }
            }

            const bytes = await module.arrayBuffer();
            return await WebAssembly.instantiate(bytes, imports);

        } else {
            const instance = await WebAssembly.instantiate(module, imports);

            if (instance instanceof WebAssembly.Instance) {
                return { instance, module };

            } else {
                return instance;
            }
        }
    }

    function __wbg_get_imports() {
        const imports = {};
        imports.wbg = {};
        imports.wbg.__wbg___wbindgen_copy_to_typed_array_33fbd71146904370 = function(arg0, arg1, arg2) {
            new Uint8Array(arg2.buffer, arg2.byteOffset, arg2.byteLength).set(getArrayU8FromWasm0(arg0, arg1));
        };
        imports.wbg.__wbg___wbindgen_throw_b855445ff6a94295 = function(arg0, arg1) {
            throw new Error(getStringFromWasm0(arg0, arg1));
        };
        imports.wbg.__wbindgen_init_externref_table = function() {
            const table = wasm.__wbindgen_externrefs;
            const offset = table.grow(4);
            table.set(0, undefined);
            table.set(offset + 0, undefined);
            table.set(offset + 1, null);
            table.set(offset + 2, true);
            table.set(offset + 3, false);
            ;
        };

        return imports;
    }

    function __wbg_finalize_init(instance, module) {
        wasm = instance.exports;
        __wbg_init.__wbindgen_wasm_module = module;
        cachedFloat32ArrayMemory0 = null;
        cachedUint8ArrayMemory0 = null;


        wasm.__wbindgen_start();
        return wasm;
    }

    function initSync(module) {
        if (wasm !== undefined) return wasm;


        if (typeof module !== 'undefined') {
            if (Object.getPrototypeOf(module) === Object.prototype) {
                ({module} = module)
            } else {
                console.warn('using deprecated parameters for `initSync()`; pass a single object instead')
            }
        }

        const imports = __wbg_get_imports();

        if (!(module instanceof WebAssembly.Module)) {
            module = new WebAssembly.Module(module);
        }

        const instance = new WebAssembly.Instance(module, imports);

        return __wbg_finalize_init(instance, module);
    }

    async function __wbg_init(module_or_path) {
        if (wasm !== undefined) return wasm;


        if (typeof module_or_path !== 'undefined') {
            if (Object.getPrototypeOf(module_or_path) === Object.prototype) {
                ({module_or_path} = module_or_path)
            } else {
                console.warn('using deprecated parameters for the initialization function; pass a single object instead')
            }
        }

        if (typeof module_or_path === 'undefined' && typeof script_src !== 'undefined') {
            module_or_path = script_src.replace(/\.js$/, '_bg.wasm');
        }
        const imports = __wbg_get_imports();

        if (typeof module_or_path === 'string' || (typeof Request === 'function' && module_or_path instanceof Request) || (typeof URL === 'function' && module_or_path instanceof URL)) {
            module_or_path = fetch(module_or_path);
        }

        const { instance, module } = await __wbg_load(await module_or_path, imports);

        return __wbg_finalize_init(instance, module);
    }

    wasm_bindgen = Object.assign(__wbg_init, { initSync }, __exports);

})();
 
 if(typeof AudioWorkletProcessor !== "undefined") { AudioWorkletProcessor.wasm = wasm_bindgen; }