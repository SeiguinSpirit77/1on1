import { motion } from 'motion/react';
import cloudDividerImg from '../assets/images/section-cloud-divider-alpha.png';

type CloudDividerProps = {
  flipped?: boolean;
  className?: string;
};

/**
 * Pełnoszerokościowy pas chmur (PNG z alfą) między sekcjami.
 */
export default function CloudDivider({ flipped = false, className = '' }: CloudDividerProps) {
  return (
    <div
      aria-hidden
      className={`cloud-divider pointer-events-none select-none ${className}`}
      data-flipped={flipped ? 'true' : 'false'}
    >
      <div className="cloud-divider__viewport">
        <img
          src={cloudDividerImg}
          alt=""
          className="cloud-divider__cloud cloud-divider__cloud--depth"
          draggable={false}
        />
        <motion.img
          src={cloudDividerImg}
          alt=""
          className="cloud-divider__cloud cloud-divider__cloud--main"
          draggable={false}
          animate={{ x: ['-0.8%', '0.8%'], y: [-5, 5] }}
          transition={{
            x: { duration: 22, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' },
            y: { duration: 9, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' },
          }}
        />
      </div>
    </div>
  );
}
