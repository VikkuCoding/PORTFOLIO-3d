import { useState, useEffect } from "react";
import { supabase } from "../supabase";

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("projects");
  const [projects, setProjects] = useState([]);
  const [testimonials, setTestimonials] = useState([]);

  const [projectForm, setProjectForm] = useState({
    name: "",
    description: "",
    image_url: "",
    source_code_link: "",
    tags: "",
  });

  const [testimonialForm, setTestimonialForm] = useState({
    name: "",
    designation: "",
    company: "",
    testimonial: "",
    image: "",
  });

  const ADMIN_PASSWORD = "vikku123";

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
    } else {
      alert("Wrong password!");
    }
  };

  const fetchProjects = async () => {
    const { data } = await supabase.from("projects").select("*").order("created_at", { ascending: false });
    if (data) setProjects(data);
  };

  const fetchTestimonials = async () => {
    const { data } = await supabase.from("testimonials").select("*").order("created_at", { ascending: false });
    if (data) setTestimonials(data);
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchProjects();
      fetchTestimonials();
    }
  }, [isLoggedIn]);

  const handleAddProject = async (e) => {
    e.preventDefault();
    const tagsArray = projectForm.tags.split(",").map(t => t.trim());
    const { error } = await supabase.from("projects").insert([{
      name: projectForm.name,
      description: projectForm.description,
      image_url: projectForm.image_url,
      source_code_link: projectForm.source_code_link,
      tags: tagsArray,
    }]);
    if (!error) {
      alert("Project added!");
      setProjectForm({ name: "", description: "", image_url: "", source_code_link: "", tags: "" });
      fetchProjects();
    } else {
      alert("Error: " + error.message);
    }
  };

  const handleAddTestimonial = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from("testimonials").insert([testimonialForm]);
    if (!error) {
      alert("Testimonial added!");
      setTestimonialForm({ name: "", designation: "", company: "", testimonial: "", image: "" });
      fetchTestimonials();
    } else {
      alert("Error: " + error.message);
    }
  };

  const handleDeleteProject = async (id) => {
    await supabase.from("projects").delete().eq("id", id);
    fetchProjects();
  };

  const handleDeleteTestimonial = async (id) => {
    await supabase.from("testimonials").delete().eq("id", id);
    fetchTestimonials();
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#F5ECD2" }}>
        <div className="p-10 rounded-2xl shadow-xl" style={{ background: "#EDE0C4", border: "1px solid #8B1A1A" }}>
          <h1 className="text-[#8B1A1A] text-3xl font-bold mb-8 text-center">Admin Panel</h1>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="py-3 px-6 rounded-lg outline-none"
              style={{ background: "#DFC99A", color: "#8B1A1A" }}
            />
            <button
              type="submit"
              className="py-3 px-8 rounded-xl font-bold"
              style={{ background: "#8B1A1A", color: "#F5ECD2" }}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-10" style={{ background: "#F5ECD2" }}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-[#8B1A1A] text-4xl font-bold mb-8">Admin Panel</h1>

        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab("projects")}
            className="py-2 px-6 rounded-xl font-bold"
            style={{ background: activeTab === "projects" ? "#8B1A1A" : "#EDE0C4", color: activeTab === "projects" ? "#F5ECD2" : "#8B1A1A" }}
          >
            Projects
          </button>
          <button
            onClick={() => setActiveTab("testimonials")}
            className="py-2 px-6 rounded-xl font-bold"
            style={{ background: activeTab === "testimonials" ? "#8B1A1A" : "#EDE0C4", color: activeTab === "testimonials" ? "#F5ECD2" : "#8B1A1A" }}
          >
            Testimonials
          </button>
        </div>

        {/* Projects Tab */}
        {activeTab === "projects" && (
          <div>
            <form onSubmit={handleAddProject} className="p-8 rounded-2xl mb-8 flex flex-col gap-4" style={{ background: "#EDE0C4", border: "1px solid #8B1A1A" }}>
              <h2 className="text-[#8B1A1A] text-2xl font-bold">Add Project</h2>
              <input placeholder="Project Name" value={projectForm.name} onChange={(e) => setProjectForm({ ...projectForm, name: e.target.value })} className="py-3 px-4 rounded-lg" style={{ background: "#DFC99A", color: "#8B1A1A" }} />
              <textarea placeholder="Description" value={projectForm.description} onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })} className="py-3 px-4 rounded-lg" style={{ background: "#DFC99A", color: "#8B1A1A" }} rows={3} />
              <input placeholder="Image URL" value={projectForm.image_url} onChange={(e) => setProjectForm({ ...projectForm, image_url: e.target.value })} className="py-3 px-4 rounded-lg" style={{ background: "#DFC99A", color: "#8B1A1A" }} />
              <input placeholder="GitHub Link" value={projectForm.source_code_link} onChange={(e) => setProjectForm({ ...projectForm, source_code_link: e.target.value })} className="py-3 px-4 rounded-lg" style={{ background: "#DFC99A", color: "#8B1A1A" }} />
              <input placeholder="Tags (comma separated: react, tailwind)" value={projectForm.tags} onChange={(e) => setProjectForm({ ...projectForm, tags: e.target.value })} className="py-3 px-4 rounded-lg" style={{ background: "#DFC99A", color: "#8B1A1A" }} />
              <button type="submit" className="py-3 px-8 rounded-xl font-bold w-fit" style={{ background: "#8B1A1A", color: "#F5ECD2" }}>Add Project</button>
            </form>

            {/* Projects List */}
            <div className="flex flex-col gap-4">
              {projects.map((project) => (
                <div key={project.id} className="p-6 rounded-2xl flex justify-between items-center" style={{ background: "#EDE0C4", border: "1px solid #8B1A1A" }}>
                  <div>
                    <h3 className="text-[#8B1A1A] font-bold text-lg">{project.name}</h3>
                    <p className="text-[#8B1A1A] text-sm">{project.description}</p>
                  </div>
                  <button onClick={() => handleDeleteProject(project.id)} className="py-2 px-4 rounded-lg font-bold" style={{ background: "#8B1A1A", color: "#F5ECD2" }}>Delete</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Testimonials Tab */}
        {activeTab === "testimonials" && (
          <div>
            <form onSubmit={handleAddTestimonial} className="p-8 rounded-2xl mb-8 flex flex-col gap-4" style={{ background: "#EDE0C4", border: "1px solid #8B1A1A" }}>
              <h2 className="text-[#8B1A1A] text-2xl font-bold">Add Testimonial</h2>
              <input placeholder="Name" value={testimonialForm.name} onChange={(e) => setTestimonialForm({ ...testimonialForm, name: e.target.value })} className="py-3 px-4 rounded-lg" style={{ background: "#DFC99A", color: "#8B1A1A" }} />
              <input placeholder="Designation" value={testimonialForm.designation} onChange={(e) => setTestimonialForm({ ...testimonialForm, designation: e.target.value })} className="py-3 px-4 rounded-lg" style={{ background: "#DFC99A", color: "#8B1A1A" }} />
              <input placeholder="Company" value={testimonialForm.company} onChange={(e) => setTestimonialForm({ ...testimonialForm, company: e.target.value })} className="py-3 px-4 rounded-lg" style={{ background: "#DFC99A", color: "#8B1A1A" }} />
              <textarea placeholder="Testimonial" value={testimonialForm.testimonial} onChange={(e) => setTestimonialForm({ ...testimonialForm, testimonial: e.target.value })} className="py-3 px-4 rounded-lg" style={{ background: "#DFC99A", color: "#8B1A1A" }} rows={3} />
              <input placeholder="Image URL" value={testimonialForm.image} onChange={(e) => setTestimonialForm({ ...testimonialForm, image: e.target.value })} className="py-3 px-4 rounded-lg" style={{ background: "#DFC99A", color: "#8B1A1A" }} />
              <button type="submit" className="py-3 px-8 rounded-xl font-bold w-fit" style={{ background: "#8B1A1A", color: "#F5ECD2" }}>Add Testimonial</button>
            </form>

            {/* Testimonials List */}
            <div className="flex flex-col gap-4">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="p-6 rounded-2xl flex justify-between items-center" style={{ background: "#EDE0C4", border: "1px solid #8B1A1A" }}>
                  <div>
                    <h3 className="text-[#8B1A1A] font-bold text-lg">{testimonial.name}</h3>
                    <p className="text-[#8B1A1A] text-sm">{testimonial.testimonial}</p>
                  </div>
                  <button onClick={() => handleDeleteTestimonial(testimonial.id)} className="py-2 px-4 rounded-lg font-bold" style={{ background: "#8B1A1A", color: "#F5ECD2" }}>Delete</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;