import { motion } from 'motion/react';
import { Droplets, Wind, Gauge, Eye, AlertCircle, Sun } from 'lucide-react';

interface WeatherDetailsProps {
  data: {
    humidity: number;
    pollution: number;
    windSpeed: number;
    pressure: number;
    visibility: number;
    uvIndex: number;
  };
}

const getPollutionLevel = (value: number) => {
  if (value <= 50) return { label: 'Good', color: 'text-green-400' };
  if (value <= 100) return { label: 'Moderate', color: 'text-yellow-400' };
  if (value <= 150) return { label: 'Unhealthy', color: 'text-orange-400' };
  return { label: 'Hazardous', color: 'text-red-400' };
};

const getUVLevel = (value: number) => {
  if (value <= 2) return { label: 'Low', color: 'text-green-400' };
  if (value <= 5) return { label: 'Moderate', color: 'text-yellow-400' };
  if (value <= 7) return { label: 'High', color: 'text-orange-400' };
  return { label: 'Very High', color: 'text-red-400' };
};

export function WeatherDetails({ data }: WeatherDetailsProps) {
  const pollutionLevel = getPollutionLevel(data.pollution);
  const uvLevel = getUVLevel(data.uvIndex);

  const details = [
    {
      icon: Droplets,
      label: 'Humidity',
      value: `${data.humidity}%`,
      color: 'text-blue-300',
    },
    {
      icon: AlertCircle,
      label: 'Pollution Index',
      value: data.pollution,
      sublabel: pollutionLevel.label,
      color: pollutionLevel.color,
    },
    {
      icon: Wind,
      label: 'Wind Speed',
      value: `${data.windSpeed} km/h`,
      color: 'text-cyan-300',
    },
    {
      icon: Gauge,
      label: 'Pressure',
      value: `${data.pressure} hPa`,
      color: 'text-purple-300',
    },
    {
      icon: Eye,
      label: 'Visibility',
      value: `${data.visibility} km`,
      color: 'text-indigo-300',
    },
    {
      icon: Sun,
      label: 'UV Index',
      value: data.uvIndex,
      sublabel: uvLevel.label,
      color: uvLevel.color,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mb-8"
    >
      <h3 className="text-white mb-4">Current Conditions</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {details.map((detail, index) => {
          const Icon = detail.icon;
          return (
            <motion.div
              key={detail.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.05 }}
              className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/30"
            >
              <Icon className={`w-8 h-8 ${detail.color} mb-3`} />
              <p className="text-white/70 text-sm mb-1">{detail.label}</p>
              <p className="text-white">{detail.value}</p>
              {detail.sublabel && (
                <p className={`text-sm ${detail.color}`}>{detail.sublabel}</p>
              )}
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
