import Image from "next/image";
import Link from "next/link";

import { PatientForm } from "@/components/forms/PatientForm";
import { PasskeyModal } from "@/components/PasskeyModal";
import Navbar from "@/components/Navbar";
import Box from "@/components/Box";

const Home = ({ searchParams }: SearchParamProps) => {
  const isAdmin = searchParams?.admin === "true";

  return (
    <div className="flex h-screen max-h-screen">
      {isAdmin && <PasskeyModal />}
      <section className="remove-scrollbar container my-auto">
        <Navbar />
        <div className="sub-container max-w-[496px]">
          <div className="text-14-regular mt-20 flex justify-between">
            <Box
            imageUrl="/assets/images/onboarding-img.png"
            altText=""
            description="Memory Game"
            linkTo="memory-game"
          />
          <Box
            imageUrl="/assets/images/onboarding-img.png"
            altText=""
            description="Color Game"
            linkTo="color-game"
          />
          </div>
        </div>
      </section>

      <Image
        src="/assets/images/onboarding-img.png"
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[50%]"
      />
    </div>
  );
};

export default Home;
