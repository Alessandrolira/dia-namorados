'use client';

import { useState, useEffect } from 'react';

interface Story {
  name: string;
  email: string;
  story: string;
  anonymous: boolean;
  timestamp: string;
}

export default function Home() {
  const [charCount, setCharCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    story: '',
  });

  const handleStoryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setFormData({ ...formData, story: value });
    setCharCount(value.length);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const storyData: Story = {
      name: formData.name,
      email: formData.email,
      story: formData.story,
      anonymous: false,
      timestamp: new Date().toISOString(),
    };

    try {
      // Enviar para Google Sheets via Apps Script
      const SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL;

      if (SCRIPT_URL) {
        const response = await fetch(SCRIPT_URL, {
          method: 'POST',
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            story: formData.story,
          }),
        });

        if (!response.ok) {
          console.error('Erro ao enviar para Google Sheets');
        }
      }

      // Salvar no localStorage também
      const stories = JSON.parse(localStorage.getItem('stories') || '[]');
      stories.push(storyData);
      localStorage.setItem('stories', JSON.stringify(stories));

      setShowSuccess(true);
      setFormData({ name: '', email: '', story: '' });
      setCharCount(0);

      setTimeout(() => setShowSuccess(false), 5000);
    } catch (error) {
      alert('Houve um erro ao enviar sua história. Tente novamente!');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const scrollToForm = () => {
    document.getElementById('form-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="w-full">
      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-br from-pink-500 to-pink-700 text-white py-20 md:py-32 px-4 min-h-screen flex flex-col justify-center items-center overflow-hidden">
        {/* LOGO */}
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-20 pointer-events-none">
          <img
            src="/GRUPO W3G BRANCO PNGN.png"
            alt="W3G Logo"
            className="h-24 object-contain"
          />
        </div>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute w-48 h-48 bg-white/10 rounded-full -top-12 -right-12"></div>
          <div className="absolute w-32 h-32 bg-white/10 rounded-full -bottom-8 -left-8"></div>
          <div className="floating-hearts">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="heart absolute text-2xl opacity-60">❤️</div>
            ))}
          </div>
        </div>

        <div className="relative z-10 text-center">
          <div className="text-8xl md:text-9xl mb-8 inline-block animate-float">💌</div>
          <h1 className="text-4xl md:text-5xl font-light mb-6 tracking-wide">Como tudo começou?</h1>
          <p className="text-xl md:text-2xl font-light mb-3">Toda história de amor tem um início especial.</p>
          <p className="text-xl md:text-2xl font-light mb-8">Compartilhe a sua!</p>
          <audio autoPlay loop>
            <source src="/Ben E. King - Stand By Me (Audio) - Soulful Sounds (youtube).mp3.mpeg" type="audio/mpeg" />
          </audio>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="bg-white px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl text-pink-500 font-light mb-8">Sobre a Campanha</h2>
          <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
            Queremos conhecer a sua história de amor! Compartilhe de forma anônima e participe da nossa campanha especial de Dia dos Namorados.
            As 5 histórias mais marcantes serão selecionadas para votação entre todos os colaboradores.
          </p>
        </div>
      </section>

      {/* STEPS SECTION */}
      <section className="relative bg-pink-100 px-4 py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="floating-hearts">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="heart absolute text-2xl opacity-60">❤️</div>
            ))}
          </div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl text-pink-500 font-light mb-16 text-center">Como Participar</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
            {[
              { number: '1️⃣', title: 'Escreva', desc: 'Conte como você conheceu seu amor' },
              { number: '2️⃣', title: 'Envie', desc: 'Compartilhe sua história' },
              { number: '3️⃣', title: 'Vote', desc: 'Dentre as 5 histórias selecionadas, escolha a mais bonita.' },
            ].map((step) => (
              <div key={step.number} className="text-center">
                <div className="text-4xl mb-4">{step.number}</div>
                <h3 className="text-2xl text-pink-500 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FORM SECTION */}
      <section id="form-section" className="bg-white px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl text-pink-500 font-light mb-12 text-center">Compartilhe Sua História</h2>

          <div className="max-w-2xl mx-auto">
            {showSuccess && (
              <div className="mb-6 p-5 bg-green-100 text-green-800 rounded-lg text-center animate-in">
                ✨ Obrigado! Sua história foi enviada com sucesso! 💕
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block mb-3 font-medium text-gray-900">Seu Nome (obrigatório)</label>
                <input
                  type="text"
                  placeholder="Como você gostaria de aparecer?"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-4 py-3 border-2 border-pink-200 rounded-lg focus:outline-none focus:border-pink-500 placeholder-gray-400 text-gray-900"
                />
              </div>

              <div>
                <label className="block mb-3 font-medium text-gray-900">Email para contato (obrigatório)</label>
                <input
                  type="email"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full px-4 py-3 border-2 border-pink-200 rounded-lg focus:outline-none focus:border-pink-500 placeholder-gray-400 text-gray-900"
                />
              </div>

              <div>
                <label className="block mb-3 font-medium text-gray-900">Sua História de Amor ✨</label>
                <textarea
                  placeholder="Comece contando como e quando você conheceu seu amor... Deixe sua criatividade fluir!"
                  value={formData.story}
                  onChange={handleStoryChange}
                  maxLength={500}
                  required
                  className="w-full px-4 py-3 border-2 border-pink-200 rounded-lg focus:outline-none focus:border-pink-500 resize-none min-h-40 font-sans placeholder-gray-400 text-gray-900"
                />
                <div className={`text-right text-sm mt-2 ${charCount >= 500 ? 'text-red-500' : charCount >= 400 ? 'text-orange-500' : 'text-gray-600'}`}>
                  {charCount}/500 caracteres
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-full transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Enviando...' : 'Enviar História'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* PRIZE SECTION */}
      <section className="relative bg-pink-200 px-4 py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="floating-hearts">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="heart absolute text-2xl opacity-60">❤️</div>
            ))}
          </div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl text-pink-500 font-light mb-12 text-center">🏆 O Prêmio</h2>
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 max-w-2xl mx-auto text-center">
            <div className="text-5xl mb-6">🍽️</div>
            <h3 className="text-2xl text-pink-500 mb-6">Um Jantar Especial</h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              As 2 histórias vencedoras ganharão um
              <span className="font-bold text-pink-500"> jantar especial para dois no melhor restaurante </span>
              da cidade!
            </p>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="relative bg-gradient-to-br from-pink-500 to-pink-700 text-white px-4 py-20 md:py-32 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="floating-hearts">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="heart absolute text-2xl opacity-60">❤️</div>
            ))}
          </div>
        </div>

        <div className="relative z-10">
          <h2 className="text-4xl md:text-5xl font-light mb-8">A sua história merece ser contada!</h2>
          <button
            onClick={scrollToForm}
            className="inline-block px-12 py-3 bg-white text-pink-500 font-semibold rounded-full hover:scale-105 transition-transform"
          >
            Participar Agora
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-white px-4 py-8 text-center">
        <p className="text-sm opacity-80">&copy; 2026 Campanha Dia dos Namorados - "Como tudo começou?" 💕</p>
      </footer>
    </div>
  );
}
