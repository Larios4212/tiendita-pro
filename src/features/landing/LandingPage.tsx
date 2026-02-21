import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Logo } from '@/components/ui';
import {
  ArrowRight, Sparkles, BarChart3, Package, ShoppingCart,
  Bell, Shield, Smartphone, Zap, TrendingUp,
} from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

const FEATURES = [
  { icon: BarChart3, title: 'Dashboard en Vivo', desc: 'Ventas del día, ingresos mensuales, márgenes y productos más vendidos en tiempo real.' },
  { icon: Package, title: 'Control de Inventario', desc: 'Stock actual, precios de compra/venta, margen automático y alertas de bajo inventario.' },
  { icon: ShoppingCart, title: 'Punto de Venta', desc: 'Buscador rápido, carrito dinámico, descuentos y simulación de cobro en segundos.' },
  { icon: Bell, title: 'Alertas Inteligentes', desc: 'Productos por agotarse, baja rotación y sugerencias automáticas de reposición.' },
  { icon: TrendingUp, title: 'Márgenes Automáticos', desc: 'Calcula tu ganancia real por producto. Ve qué te deja más y qué hay que ajustar.' },
  { icon: Shield, title: 'Listo para Crecer', desc: 'Arquitectura modular preparada para conectar a un backend real cuando lo necesites.' },
];

const BENEFITS = [
  { emoji: '💰', text: 'Sabe exactamente cuánto ganas por día' },
  { emoji: '📦', text: 'Nunca te quedes sin producto estrella' },
  { emoji: '⚡', text: 'Cobra en segundos, sin complicaciones' },
  { emoji: '📊', text: 'Toma decisiones con datos, no corazonadas' },
];

export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-surface-950">
      {/* Ambient glows */}
      <div className="pointer-events-none absolute -left-40 -top-40 h-[600px] w-[600px] rounded-full bg-primary-500/8 blur-[120px]" />
      <div className="pointer-events-none absolute -right-32 top-1/3 h-[400px] w-[400px] rounded-full bg-accent-500/6 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-[350px] w-[500px] rounded-full bg-primary-500/5 blur-[90px]" />

      {/* ── Nav ── */}
      <nav className="relative z-10 flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 md:px-12">
        <Logo size="md" />
        <Link to="/dashboard" className="btn-primary rounded-xl px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold flex items-center gap-2">
          Abrir Dashboard <ArrowRight size={16} />
        </Link>
      </nav>

      {/* ── Hero ── */}
      <section className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 pt-12 sm:pt-16 pb-16 sm:pb-20 text-center md:pt-24">
        <motion.div initial="hidden" animate="visible" className="space-y-6">
          <motion.div variants={fadeUp} custom={0} className="inline-flex items-center gap-2 rounded-full border border-primary-500/30 bg-primary-500/10 px-4 py-1.5 text-sm text-primary-300">
            <Sparkles size={14} /> Control inteligente para tu tiendita
          </motion.div>

          <motion.h1 variants={fadeUp} custom={1} className="text-4xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
            Tu tiendita,{' '}
            <span className="primary-gradient-text">bajo control total</span>
          </motion.h1>

          <motion.p variants={fadeUp} custom={2} className="mx-auto max-w-2xl text-lg text-surface-400 md:text-xl">
            Inventario, ventas y ganancias en un solo lugar.
            Diseñado para tienditas, misceláneas y pequeños negocios en México.
          </motion.p>

          <motion.div variants={fadeUp} custom={3} className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link to="/dashboard" className="btn-primary group rounded-xl px-7 py-3.5 text-base font-semibold flex items-center gap-2">
              <Smartphone size={18} /> Probar Demo Gratis
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <a href="https://github.com/Larios4212/tiendita-pro" target="_blank" rel="noopener" className="btn-ghost rounded-xl px-7 py-3.5 text-base font-semibold">
              GitHub ↗
            </a>
          </motion.div>
        </motion.div>

        {/* Dashboard mockup preview */}
        <motion.div variants={fadeUp} custom={5} initial="hidden" animate="visible" className="relative mx-auto mt-16 max-w-4xl">
          <div className="glass-strong overflow-hidden rounded-2xl border border-surface-600/40 p-1 shadow-2xl shadow-primary-500/5">
            <div className="rounded-xl bg-surface-900/90 p-6">
              {/* Simulated stat cards */}
              <div className="mb-4 grid grid-cols-2 gap-3 md:grid-cols-4">
                {[
                  { label: 'Ventas Hoy', value: '$1,136', color: 'text-primary-400' },
                  { label: 'Transacciones', value: '10', color: 'text-accent-400' },
                  { label: 'Margen', value: '38.5%', color: 'text-primary-300' },
                  { label: 'Bajo Stock', value: '6', color: 'text-danger-400' },
                ].map((s, i) => (
                  <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.8 + i * 0.1 }} className="glass rounded-xl p-3 text-center">
                    <p className="text-[10px] text-surface-500">{s.label}</p>
                    <p className={`text-lg font-bold ${s.color}`}>{s.value}</p>
                  </motion.div>
                ))}
              </div>
              {/* Simulated chart bars */}
              <div className="flex items-end justify-between gap-1.5 h-20 px-2">
                {[40, 55, 70, 50, 85, 95, 65].map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ delay: 1.2 + i * 0.08, duration: 0.5 }}
                    className="flex-1 rounded-t-md bg-gradient-to-t from-primary-600 to-primary-400 opacity-70"
                  />
                ))}
              </div>
              <div className="mt-1 flex justify-between px-2 text-[9px] text-surface-600">
                {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map((d) => <span key={d}>{d}</span>)}
              </div>
            </div>
          </div>
          <div className="absolute -bottom-8 inset-x-10 h-16 rounded-full bg-primary-500/15 blur-2xl" />
        </motion.div>
      </section>

      {/* ── Benefits ── */}
      <section className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 pb-16 sm:pb-20">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-10">
          <motion.h2 variants={fadeUp} custom={0} className="text-2xl font-bold text-white md:text-3xl">
            ¿Por qué tu tiendita necesita esto?
          </motion.h2>
        </motion.div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid gap-4 sm:grid-cols-2">
          {BENEFITS.map((b, i) => (
            <motion.div key={i} variants={fadeUp} custom={i} className="glass flex items-center gap-4 rounded-2xl p-5">
              <span className="text-3xl">{b.emoji}</span>
              <p className="text-sm font-medium text-surface-300">{b.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Features ── */}
      <section className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 pb-20 sm:pb-24">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="text-center mb-14">
          <motion.div variants={fadeUp} custom={0} className="inline-flex items-center gap-2 rounded-full border border-surface-600/50 bg-surface-800/60 px-4 py-1.5 text-sm text-surface-400 mb-4">
            <Zap size={14} className="text-primary-400" /> Funcionalidades
          </motion.div>
          <motion.h2 variants={fadeUp} custom={1} className="text-3xl font-bold text-white md:text-4xl">
            Todo lo que necesita tu negocio
          </motion.h2>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <motion.div key={f.title} variants={fadeUp} custom={i} className="glass group rounded-2xl p-6 transition-all hover:border-primary-500/20">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-surface-700/80 text-primary-400 transition-colors group-hover:bg-primary-500/20">
                <f.icon size={22} />
              </div>
              <h3 className="mb-1.5 text-base font-semibold text-white">{f.title}</h3>
              <p className="text-sm leading-relaxed text-surface-400">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Footer ── */}
      <footer className="relative z-10 border-t border-surface-800 py-8 text-center">
        <p className="text-sm text-surface-500">
          TienditaPro © {new Date().getFullYear()} · Built by{' '}
          <a href="https://github.com/Larios4212" target="_blank" rel="noopener" className="text-primary-400 hover:underline">
            Armando Larios
          </a>
        </p>
      </footer>
    </div>
  );
}
