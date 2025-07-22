import { motion } from "framer-motion";


// Error Message Component
export const ErrorMessage = ({ message }: { message: string }) => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 text-center">
    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
      {message}
    </div>
  </div>
);

// Not Found Message Component
export const NotFoundMessage = ({ message }: { message: string }) => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 text-center">
    <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded">
      {message}
    </div>
  </div>
);

// Status Badge Component
export const StatusBadge = ({ status }: { status: string }) => {
  const statusConfig = {
    ready: {
      text: "Move in Ready",
      color: "bg-green-600",
    },
    pending: {
      text: "Coming Soon",
      color: "bg-amber-500",
    },
    sold: {
      text: "Sold",
      color: "bg-red-600",
    },
    available: {
      text: "Available",
      color: "bg-blue-500",
    },
  };

  const currentStatus =
    statusConfig[status as keyof typeof statusConfig] || statusConfig.available;

  return (
    <div
      className={`absolute top-0 left-0 z-10 px-2 py-2 sm:px-4 sm:py-4 text-sm sm:text-lg lg:text-xl uppercase font-semibold text-white ${currentStatus.color} shadow-lg`}
    >
      {currentStatus.text}
    </div>
  );
};

// Price Tag Component
export const PriceTag = ({
  oldPrice,
  newPrice,
}: {
  oldPrice?: number;
  newPrice?: number;
}) => (
  <motion.div
    className="absolute bottom-2 right-0 bg-white/90 backdrop-blur-sm px-4 py-2 shadow-lg"
    initial={{ x: 20 }}
    animate={{ x: 0 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <div className="flex flex-col items-end">
      {oldPrice && newPrice && oldPrice > newPrice && (
        <motion.div
          className="text-sm text-red-400 line-through"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          ${oldPrice.toLocaleString()}
        </motion.div>
      )}
      <motion.div
        className="text-green-700 font-bold text-sm sm:text-lg md:text-2xl"
        whileHover={{ scale: 1.05 }}
      >
        {newPrice !== undefined ? `$${newPrice.toLocaleString()}` : "Price TBD"}
      </motion.div>
    </div>
  </motion.div>
);

// Feature Card Component
export const FeatureCard = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) => (
  <div className="flex items-center justify-center gap-4 px-2 py-4 bg-golden/20 shadow-sm border border-golden">
    <div className="icon_wrapper w-8 h-8">
      {icon}
    </div>
    <div className="flex flex-col items-start gap-1 text-dark font-bold text-lg">
      <span>{value}</span>
    <span className="text-gray-600 ">{label}</span>
    </div>
  </div>
);

// Key Features List Component
// Feature Card Component
export const KeyFeatureCard = ({
  icon,
  label,

}: {
  icon: React.ReactNode;
  label: string;
}) => (
  <div className="flex flex-col items-center justify-center gap-4 px-2 py-4 bg-golden/20 shadow-sm border border-golden">
    <div className="icon_wrapper w-8 h-8">
      {icon}
    </div>
    <span className="text-gray-700 text-lg">{label}</span>
  </div>
);


export const HR = ()=>{
  return (
    <div className="w-full mt-2">
      <div className="h-1 bg-gradient-to-r from-golden via-golden to-transparent  max-w-48"></div>
    </div>
  );
}