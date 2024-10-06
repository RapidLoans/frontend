import { BackgroundLines } from "@/components/ui/Background";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import Link from "next/link";

export default function Home() {
  return (
    <BackgroundLines className="flex items-center justify-center w-full flex-col px-4">
      <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-500 dark:to-white text-2xl md:text-4xl lg:text-8xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
        RapidLoans
      </h2>
      <div className="max-w-xl mx-auto text-sm md:text-xl text-neutral-700 dark:text-neutral-400 text-center">
        Borrow. Invest. Flash Loans.
      </div>
      
      <div className="flex gap-4 mt-6">
        <Link href={"/lendingpool"}>
          <HoverBorderGradient
            containerClassName="rounded-full"
            as="button"
            className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
          >
            {/* <AceternityLogo /> */}
            <span>Explore Lending Pool</span>
          </HoverBorderGradient>
        </Link>

        <Link href={"/flashloan"}>
          <HoverBorderGradient
            containerClassName="rounded-full"
            as="button"
            className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
          >
            {/* <AceternityLogo /> */}
            <span>Flash Loan</span>
          </HoverBorderGradient>
        </Link>
      </div>
      <div className="absolute bottom-4 mx-auto max-w-xl text-sm md:text-lg text-neutral-700 dark:text-neutral-400 text-center">
        Powered by Tron.
      </div>
    </BackgroundLines>
  );
}
