import React from 'react';
import Link from 'next/link';

export default function ECGProjectPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
          Deep Learning for Multi-Class <br />
          <span className="text-primary">ECG Classification</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          A state-of-the-art framework for automated cardiovascular disease detection using 12-lead ECG signals.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <a 
            href="https://github.com/erfsalehi/Deep-Learning-for-Multi-Class-ECG-Classification"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 rounded-full bg-gray-900 text-white font-medium hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
            View on GitHub
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Overview Section */}
          <section className="glass-panel p-8 rounded-2xl border border-white/20">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <span className="bg-primary/10 text-primary p-2 rounded-lg mr-3">🔬</span>
              Project Overview
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Cardiovascular diseases are the leading cause of death globally. Early diagnosis via Electrocardiogram (ECG) is critical but requires specialized expertise. This project implements an end-to-end Deep Learning pipeline to classify ECG signals into 5 major diagnostic categories, achieving state-of-the-art performance on the PTB-XL dataset.
            </p>
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mt-4">
              <h3 className="font-semibold text-blue-900 mb-2">Target Classes</h3>
              <div className="flex flex-wrap gap-2">
                {['NORM: Normal ECG', 'MI: Myocardial Infarction', 'STTC: ST/T Change', 'CD: Conduction Disturbance', 'HYP: Hypertrophy'].map((item) => (
                  <span key={item} className="px-3 py-1 bg-white text-blue-700 rounded-full text-sm font-medium border border-blue-100 shadow-sm">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* Methodology Section */}
          <section className="glass-panel p-8 rounded-2xl border border-white/20">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="bg-primary/10 text-primary p-2 rounded-lg mr-3">🛠</span>
              Methodology
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">1. Data Pipeline</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-2">
                  <li><strong>Dataset:</strong> PTB-XL (v1.0.3), containing 21,799 clinical 12-lead ECG records.</li>
                  <li><strong>Preprocessing:</strong> Bandpass filtering (0.5-40Hz), Z-score normalization, Stratified splitting.</li>
                  <li><strong>Efficient Loading:</strong> Custom DataGenerator for memory-efficient batch processing.</li>
                </ul>
              </div>
              
              <div className="h-px bg-gray-200"></div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">2. Model Architectures</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                  <div className="bg-white/50 p-4 rounded-xl border border-white/40">
                    <div className="font-bold text-gray-900 mb-1">Baseline</div>
                    <div className="text-sm text-gray-600">XGBoost with handcrafted features (statistical moments).</div>
                  </div>
                  <div className="bg-white/50 p-4 rounded-xl border border-white/40">
                    <div className="font-bold text-gray-900 mb-1">Deep Learning</div>
                    <div className="text-sm text-gray-600">1D-CNN with 3-block architecture for raw signals.</div>
                  </div>
                  <div className="bg-white/50 p-4 rounded-xl border border-primary/20 ring-1 ring-primary/20 shadow-sm">
                    <div className="font-bold text-primary mb-1">State-of-the-Art</div>
                    <div className="text-sm text-gray-600">SE-ResNet (Deep Residual Network with Squeeze-and-Excitation).</div>
                  </div>
                </div>
              </div>

              <div className="h-px bg-gray-200"></div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">3. Advanced Techniques</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-2">
                  <li><strong>Mixup Augmentation:</strong> Linearly interpolating between samples.</li>
                  <li><strong>Cutout Augmentation:</strong> Randomly masking signal sections.</li>
                  <li><strong>Ensembling:</strong> Combining predictions from multiple models.</li>
                </ul>
              </div>
            </div>
          </section>

        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          
          {/* Results Section */}
          <section className="glass-panel p-6 rounded-2xl border border-white/20">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <span className="bg-green-100 text-green-700 p-2 rounded-lg mr-3">📊</span>
              Performance
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 rounded-lg bg-white/40">
                <span className="text-gray-700 font-medium">Random Forest</span>
                <span className="font-bold text-gray-900">77.0%</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-white/40">
                <span className="text-gray-700 font-medium">XGBoost</span>
                <span className="font-bold text-gray-900">79.0%</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-white/40">
                <span className="text-gray-700 font-medium">1D-CNN</span>
                <span className="font-bold text-gray-900">87.0%</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-green-50 border border-green-200 shadow-sm">
                <span className="text-green-800 font-bold">SE-ResNet (SOTA)</span>
                <span className="font-bold text-green-700">&gt;90%</span>
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-600 italic">
              Key Insight: Deep Learning models with SE-blocks significantly outperform traditional methods.
            </div>
          </section>

          {/* Tech Stack */}
          <section className="glass-panel p-6 rounded-2xl border border-white/20">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Tech Stack</h2>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">Python</span>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">PyTorch/TensorFlow</span>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">Scikit-learn</span>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">Pandas</span>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">NumPy</span>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">XGBoost</span>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
