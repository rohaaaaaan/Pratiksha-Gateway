/**
 * Audio Generator Script
 * Generates placeholder audio files for the Pratiskhas Gateway website
 * Creates simple WAV files with sine wave tones
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SAMPLE_RATE = 44100;

function generateSineWave(frequency, duration, volume = 0.3) {
    const numSamples = Math.floor(SAMPLE_RATE * duration);
    const samples = new Float32Array(numSamples);

    for (let i = 0; i < numSamples; i++) {
        const t = i / SAMPLE_RATE;
        // Apply fade in/out envelope to prevent clicks
        let envelope = 1;
        const fadeTime = 0.01; // 10ms fade
        if (t < fadeTime) {
            envelope = t / fadeTime;
        } else if (t > duration - fadeTime) {
            envelope = (duration - t) / fadeTime;
        }
        samples[i] = Math.sin(2 * Math.PI * frequency * t) * volume * envelope;
    }

    return samples;
}

function generateClick(duration = 0.15) {
    const numSamples = Math.floor(SAMPLE_RATE * duration);
    const samples = new Float32Array(numSamples);

    // Create a short click with multiple harmonics
    for (let i = 0; i < numSamples; i++) {
        const t = i / SAMPLE_RATE;
        // Exponential decay envelope
        const envelope = Math.exp(-t * 30);

        // Mix of frequencies for a richer click sound
        const tone1 = Math.sin(2 * Math.PI * 800 * t) * 0.3;
        const tone2 = Math.sin(2 * Math.PI * 1200 * t) * 0.2;
        const tone3 = Math.sin(2 * Math.PI * 2000 * t) * 0.1;

        samples[i] = (tone1 + tone2 + tone3) * envelope;
    }

    return samples;
}

function generateHover(duration = 0.1) {
    const numSamples = Math.floor(SAMPLE_RATE * duration);
    const samples = new Float32Array(numSamples);

    // Soft, short blip for hover
    for (let i = 0; i < numSamples; i++) {
        const t = i / SAMPLE_RATE;
        // Bell-like envelope
        const envelope = Math.sin(Math.PI * t / duration) * Math.exp(-t * 10);

        // Higher pitched, softer tone
        const tone = Math.sin(2 * Math.PI * 1400 * t) * 0.15;

        samples[i] = tone * envelope;
    }

    return samples;
}

function generateAmbient(duration = 30) {
    const numSamples = Math.floor(SAMPLE_RATE * duration);
    const samples = new Float32Array(numSamples);

    // Create a gentle ambient drone with multiple layers
    for (let i = 0; i < numSamples; i++) {
        const t = i / SAMPLE_RATE;

        // Fade in at start, fade out at end for seamless looping
        let envelope = 1;
        const fadeTime = 2; // 2 second fade
        if (t < fadeTime) {
            envelope = t / fadeTime;
        } else if (t > duration - fadeTime) {
            envelope = (duration - t) / fadeTime;
        }

        // Multiple low-frequency tones with slow modulation
        const base1 = Math.sin(2 * Math.PI * 80 * t) * 0.1;
        const base2 = Math.sin(2 * Math.PI * 120 * t) * 0.08;
        const base3 = Math.sin(2 * Math.PI * 160 * t) * 0.05;

        // Add subtle modulation for movement
        const mod = Math.sin(2 * Math.PI * 0.1 * t) * 0.3 + 0.7;

        // Add very subtle high harmonic for shimmer
        const shimmer = Math.sin(2 * Math.PI * 440 * t) * 0.02 * Math.sin(2 * Math.PI * 0.05 * t);

        samples[i] = (base1 + base2 + base3 + shimmer) * envelope * mod;
    }

    return samples;
}

function createWavFile(samples, filename) {
    const numChannels = 1;
    const bitsPerSample = 16;
    const byteRate = SAMPLE_RATE * numChannels * bitsPerSample / 8;
    const blockAlign = numChannels * bitsPerSample / 8;
    const dataSize = samples.length * blockAlign;
    const fileSize = 36 + dataSize;

    const buffer = Buffer.alloc(44 + dataSize);

    // RIFF header
    buffer.write('RIFF', 0);
    buffer.writeUInt32LE(fileSize, 4);
    buffer.write('WAVE', 8);

    // fmt chunk
    buffer.write('fmt ', 12);
    buffer.writeUInt32LE(16, 16); // chunk size
    buffer.writeUInt16LE(1, 20); // audio format (PCM)
    buffer.writeUInt16LE(numChannels, 22);
    buffer.writeUInt32LE(SAMPLE_RATE, 24);
    buffer.writeUInt32LE(byteRate, 28);
    buffer.writeUInt16LE(blockAlign, 32);
    buffer.writeUInt16LE(bitsPerSample, 34);

    // data chunk
    buffer.write('data', 36);
    buffer.writeUInt32LE(dataSize, 40);

    // Write samples
    for (let i = 0; i < samples.length; i++) {
        const sample = Math.max(-1, Math.min(1, samples[i]));
        const intSample = Math.floor(sample * 32767);
        buffer.writeInt16LE(intSample, 44 + i * 2);
    }

    fs.writeFileSync(filename, buffer);
    console.log(`✓ Generated: ${filename} (${(buffer.length / 1024).toFixed(1)} KB)`);
}

// Create output directory if it doesn't exist
const outputDir = path.join(__dirname, '..', 'public', 'assets', 'audio');
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

console.log('🎵 Generating audio files for Pratiskhas Gateway...\n');

// Generate hover sound (short, subtle blip)
const hoverSamples = generateHover(0.1);
createWavFile(hoverSamples, path.join(outputDir, 'hover.wav'));

// Generate click sound (slightly longer, more noticeable)
const clickSamples = generateClick(0.15);
createWavFile(clickSamples, path.join(outputDir, 'click.wav'));

// Generate ambient sound (30 second gentle drone)
const ambientSamples = generateAmbient(30);
createWavFile(ambientSamples, path.join(outputDir, 'ambient.wav'));

console.log('\n✅ All audio files generated successfully!');
console.log(`📁 Location: ${outputDir}`);
console.log('\n💡 Note: These are placeholder files. For production, consider replacing with professional audio.');
