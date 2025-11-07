import { motion } from 'motion/react';
import { Cloud, Sun, CloudRain, Cloudy } from 'lucide-react';

interface CurrentWeatherProps {
  data: {
    location: string;
    country: string;
    current: {
      temp: number;
      feelsLike: number;
      condition: string;
      icon: string;
    };
  };
}

const weatherIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  sun: Sun,
  cloud: Cloud,
  rain: CloudRain,
  cloudy: Cloudy,
};

export function CurrentWeather({ data }: CurrentWeatherProps) {
  const IconComponent = weatherIcons[data.current.icon] || Cloud;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="mb-8"
    >
      <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 md:p-12 shadow-2xl border border-white/30">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Location and Temperature */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-white mb-2">
              {data.location}
              {data.country && (
                <span className="text-white/80">, {data.country}</span>
              )}
            </h2>
            <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.3 }}
              >
                <IconComponent className="w-24 h-24 text-white drop-shadow-lg" />
              </motion.div>
              <div>
                <div className="text-white" style={{ fontSize: '5rem', lineHeight: 1 }}>
                  {data.current.temp}°
                </div>
                <p className="text-white/90">Feels like {data.current.feelsLike}°</p>
              </div>
            </div>
            <p className="text-white/90 text-xl">{data.current.condition}</p>
          </div>

          {/* Animated Weather Illustration */}
          <div className="relative w-48 h-48 hidden lg:block">
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <IconComponent className="w-40 h-40 text-white/40 drop-shadow-2xl" />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
