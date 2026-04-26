import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { slideIn } from "../utils/motion";
import { SectionWrapper } from "../hoc";
import { supabase } from "../supabase";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('Contacts')
        .insert([{ name: form.name, email: form.email, message: form.message }]);

      if (error) throw error;

      setLoading(false);
      alert("Thank you! I will get back to you as soon as possible.");
      setForm({ name: "", email: "", message: "" });

    } catch (error) {
      setLoading(false);
      console.log(error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden">
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="flex-[0.75] p-8 rounded-2xl"
        style={{ background: "#EDE0C4", border: "1px solid #8B1A1A" }}
      >
        <p className="sm:text-[18px] text-[14px] text-[#8B1A1A] uppercase tracking-wider">Get in touch</p>
        <h3 className="text-[#8B1A1A] font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]">Contact.</h3>

        <form ref={formRef} onSubmit={handleSubmit} className="mt-12 flex flex-col gap-8">
          <label className="flex flex-col">
            <span className="text-[#8B1A1A] font-medium mb-4">Your Name</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="What's your name?"
              className="py-4 px-6 rounded-lg outline-none border-none font-medium"
              style={{ background: "#DFC99A", color: "#8B1A1A" }}
            />
          </label>
          <label className="flex flex-col">
            <span className="text-[#8B1A1A] font-medium mb-4">Your Email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="What's your email?"
              className="py-4 px-6 rounded-lg outline-none border-none font-medium"
              style={{ background: "#DFC99A", color: "#8B1A1A" }}
            />
          </label>
          <label className="flex flex-col">
            <span className="text-[#8B1A1A] font-medium mb-4">Your Message</span>
            <textarea
              rows={7}
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="What do you want to say?"
              className="py-4 px-6 rounded-lg outline-none border-none font-medium"
              style={{ background: "#DFC99A", color: "#8B1A1A" }}
            />
          </label>

          <button
            type="submit"
            className="py-3 px-8 rounded-xl outline-none w-fit font-bold shadow-md"
            style={{ background: "#8B1A1A", color: "#F5ECD2" }}
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]"
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");