import { motion } from "framer-motion";
import { styles } from "../styles";
import { testimonials } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import { SectionWrapper } from "../hoc";

const FeedbackCard = ({ index, testimonial, name, designation, company, image }) => (
  <motion.div
    variants={fadeIn("", "spring", index * 0.5, 0.75)}
    className="p-10 rounded-3xl xs:w-[320px] w-full"
    style={{ background: "#EDE0C4", border: "1px solid #8B1A1A" }}
  >
    <p className="text-[#8B1A1A] font-black text-[48px]">"</p>

    <div className="mt-1">
      <p className="text-[#8B1A1A] tracking-wider text-[18px]">{testimonial}</p>

      <div className="mt-7 flex justify-between items-center gap-1">
        <div className="flex-1 flex flex-col">
          <p className="text-[#8B1A1A] font-medium text-[16px]">
            <span className="text-[#C5A028]">@</span> {name}
          </p>
          <p className="mt-1 text-[#8B1A1A] text-[12px]">
            {designation} of {company}
          </p>
        </div>
        <img
          src={image}
          alt={`feedback_by-${name}`}
          className="w-10 h-10 rounded-full object-cover"
        />
      </div>
    </div>
  </motion.div>
);

const Feedbacks = () => {
  return (
    <div className="mt-12 rounded-[20px]" style={{ background: "#DFC99A" }}>
      <div className="rounded-2xl min-h-[300px] p-10" style={{ background: "#8B1A1A" }}>
        <motion.div variants={textVariant()}>
          <p className="sm:text-[18px] text-[14px] text-[#F5ECD2] uppercase tracking-wider">What others say</p>
          <h2 className="text-[#F5ECD2] font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]">Testimonials.</h2>
        </motion.div>
      </div>
      <div className="-mt-20 pb-14 px-6 flex flex-wrap gap-7">
        {testimonials.map((testimonial, index) => (
          <FeedbackCard key={testimonial.name} index={index} {...testimonial} />
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(Feedbacks, "");