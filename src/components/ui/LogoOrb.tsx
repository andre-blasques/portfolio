import { motion } from 'framer-motion'

export function LogoOrb() {
  return (
    <div
      className="relative w-[220px] h-[220px] xl:w-[280px] xl:h-[280px]"
      style={{ perspective: '1200px' }}
    >
      {/* Ambient glow */}
      <motion.div
        className="absolute inset-[-15%] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(0,153,255,0.18) 0%, transparent 65%)',
          filter: 'blur(20px)',
        }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Outer orbit ring */}
      <motion.div
        animate={{ rotateZ: [0, 360] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute',
          inset: '-8%',
          borderRadius: '50%',
          border: '1px solid rgba(0,153,255,0.25)',
          pointerEvents: 'none',
        }}
      >
        {/* Dot on ring */}
        <div
          style={{
            position: 'absolute',
            top: '0%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: '#09f',
            boxShadow: '0 0 8px #09f',
          }}
        />
      </motion.div>

      {/* Inner orbit ring */}
      <motion.div
        animate={{ rotateZ: [0, -360] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute',
          inset: '8%',
          borderRadius: '50%',
          border: '1px dashed rgba(255,255,255,0.08)',
          pointerEvents: 'none',
        }}
      />

      {/* 3D sphere card */}
      <motion.div
        animate={{
          rotateY: [-20, 20, -20],
          rotateX: [-8, 6, -8],
          y: [-10, 10, -10],
        }}
        transition={{
          rotateY: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
          rotateX: { duration: 7.5, repeat: Infinity, ease: 'easeInOut' },
          y: { duration: 3.8, repeat: Infinity, ease: 'easeInOut' },
        }}
        style={{
          position: 'absolute',
          inset: 0,
          transformStyle: 'preserve-3d',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 38% 32%, #2c2c2c 0%, #111 50%, #050505 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow:
            '0 30px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.07), inset 0 1px 0 rgba(255,255,255,0.1)',
          overflow: 'hidden',
        }}
      >
        {/* Moving highlight */}
        <motion.div
          animate={{ x: ['-40%', '80%'] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            top: '-10%',
            left: '-10%',
            width: '55%',
            height: '55%',
            background:
              'radial-gradient(circle, rgba(255,255,255,0.13) 0%, transparent 70%)',
            borderRadius: '50%',
            pointerEvents: 'none',
          }}
        />

        {/* Bottom shadow inside */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '40%',
            background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)',
            pointerEvents: 'none',
          }}
        />

        {/* Logo */}
        <img
          src="https://framerusercontent.com/images/X4YXA4f1YmQLuOssIHFCDNeMTA.png"
          alt="AB"
          style={{
            width: '42%',
            filter: 'brightness(0) invert(1)',
            position: 'relative',
            zIndex: 1,
            userSelect: 'none',
          }}
          draggable={false}
        />
      </motion.div>
    </div>
  )
}
