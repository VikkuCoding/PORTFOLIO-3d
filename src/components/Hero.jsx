import { motion } from "framer-motion";
import { styles } from "../styles";

const MarqueeText = () => {
  const texts = ["Graphic Designer", "Video Editor", "React Developer", "3D Artist", "Creative Freelancer", "Brand Identity", "Motion Graphics"];
  
  return (
    <div className="absolute bottom-24 w-full overflow-hidden py-3" style={{ borderTop: "1px solid #8B1A1A", borderBottom: "1px solid #8B1A1A" }}>
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        {[...texts, ...texts].map((text, i) => (
          <span key={i} className="text-[#8B1A1A] text-[18px] font-medium flex items-center gap-8">
            {text}
            <span className="text-[#C5A028] text-[20px]">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
};

const Hero = () => {
  return (
    <section className="relative w-full h-screen mx-auto">
      <div className={`${styles.paddingX} absolute inset-0 top-[120px] max-w-7xl mx-auto flex flex-row items-start gap-5`}>
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-[#8B1A1A]" />
          <div className="w-1 sm:h-80 h-40 violet-gradient" />
        </div>

        <div>
          <h1 className={`${styles.heroHeadText}`}>
            Hi, I'm <span className="text-[#8B1A1A]">Souvik</span>
          </h1>
          <p className={`${styles.heroSubText} mt-2`}>
            I develop 3D visuals, user <br className="sm:block hidden" />
            interfaces and web applications
          </p>
        </div>
      </div>

      <MarqueeText />

      <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center">
        <a href="#about">
          <div className="w-[35px] h-[64px] rounded-3xl border-4 border-[#8B1A1A] flex justify-start items-start p-2">
            <motion.div
              animate={{ y: [0, 24, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
              className="w-3 h-3 rounded-full bg-[#8B1A1A] mb-1"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;