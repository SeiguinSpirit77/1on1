import { motion } from 'motion/react';
import cloudDividerImg from '../assets/images/section-cloud-divider.png';

type CloudDividerProps = {
  flipped?: boolean;
  className?: string;
};

/**
 * Full-width stereoscopic cloud seam between page sections.
 * Sits above section backgrounds (z-50) with screen blend on dark pages.
 */
export default function CloudDivider({ flipped = false, className = '' }: CloudDividerProps) {
  return (
    <div
      aria-hidden
      className={`cloud-divider pointer-events-none relative z-50 w-full select-none ${className}`}
      data-flipped={flipped ? 'true' : 'false'}
    >
      {/* Soft vertical blend into sections above/below */}
      <div className="cloud-divider__fade" />

      {/* Back layer — slow drift, softer depth */}
      <motion.div
        className="cloud-divider__layer cloud-divider__layer--back"
        animate={{ x: ['-3%', '3%'] }}
        transition={{
          duration: 28,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
      >
        <img
          src={cloudDividerImg}
          alt=""
          className="cloud-divider__img cloud-divider__img--back"
          draggable={false}
        />
      </motion.div>

      {/* Front layer — stronger presence, subtle blur for embedding */}
      <motion.div
        className="cloud-divider__layer cloud-divider__layer--front"
        animate={{ y: [-8, 8], x: ['1.5%', '-1.5%'] }}
        transition={{
          y: { duration: 8, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' },
          x: { duration: 20, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' },
        }}
      >
        <img
          src={cloudDividerImg}
          alt=""
          className="cloud-divider__img cloud-divider__img--front"
          draggable={false}
        />
      </motion.div>
    </div>
  );
}
