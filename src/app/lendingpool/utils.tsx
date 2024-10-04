import { motion } from "framer-motion";
import { Bitcoin, Zap, HandCoins } from "lucide-react";
import Link from "next/link";

export const FeatureCard = ({
  title,
  description,
  icon: Icon,
  link,
}: {
  title: string;
  description: string;
  icon: React.ElementType;
  link: string;
}) => {
  return (
    <HoverScaleAnimation>
      <Link href={link}>
        <div className="bg-neutral-300 dark:bg-neutral-800 bg-opacity-50 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center">
          <div className="flex justify-center items-center w-14 h-14 bg-gray-700 bg-opacity-60 rounded-full mb-4">
            <Icon className="text-purple-300" size={25} />
          </div>
          <h3 className="text-black dark:text-white text-xl font-semibold mb-3">{title}</h3>
          <p className="text-black  dark:text-gray-300">{description}</p>
        </div>
      </Link>
    </HoverScaleAnimation>
  );
};

export const FeatureCards = () => {
  return (
    <FadeInAnimation delay={0.2}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <FeatureCard
          title="Invest"
          description="Invest in lending pool using TRS and JST coins"
          icon={Bitcoin}
          link={"/lendingpool#invest"}
        />
        <FeatureCard
          title="Borrow"
          description="Borrow TRS and JST coins securely"
          icon={HandCoins}
          link={"/lendingpool#borrow"}
        />
        <FeatureCard
          title="Flash Loan"
          description="Leverage instant, no-collateral flash loans"
          icon={Zap}
          link={"/flashloan"}
        />
      </div>
    </FadeInAnimation>
  );
};

export function FadeInAnimation({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}

export function HoverScaleAnimation({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.06 }}
      transition={{ type: "tween", stiffness: 300 }}
    >
      {children}
    </motion.div>
  );
}
