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
        <div className="sub-container w-full">
          <h1 className="text-3xl font-bold text-center mt-10 mb-8">
            Boost Your Memory and Have Fun!
          </h1>
          <div
            className="flex flex-wrap text-14-regular mt-20 flex flex-col justify-between"
            style={{ flexDirection: "row" }}
          >
            <div className="max-w-80">
              <Box
                imageUrl="/assets/images/memory.png"
                altText=""
                description="Memory Match"
                linkTo="memory-game"
              />
            </div>
            <div className="max-w-lg">
              <Box
                imageUrl="/assets/images/colorgame.jpeg"
                altText=""
                description="True Color"
                linkTo="color-game"
              />
            </div>
            <div className="max-w-90">
              <Box
                imageUrl="/assets/images/speedgame.jpeg"
                altText=""
                description="Arrow Dash"
                linkTo="speed-game"
              />
            </div>
            <div className="max-w-80">
              <Box
                imageUrl="/assets/images/meditation.jpeg"
                altText=""
                description="Serenity Sync"
                linkTo="meditation-game"
              />
            </div>
          </div>
        </div>
      </section>

      {/* <Image
        src="/assets/images/onboarding-img.png"
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[50%]"
      /> */}
    </div>
  );
};

export default Home;
