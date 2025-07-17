"use client";
import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ResumeBuilder() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    summary: '',
    education: '',
    experience: '',
    skills: ''
  });
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const tailorResume = async () => {
    setLoading(true);
    const res = await fetch("/api/tailor-resume", {
      method: "POST",
      body: JSON.stringify({ resume: form, jobDescription }),
      headers: { "Content-Type": "application/json" }
    });
    const data = await res.json();
    setForm((prev) => ({ ...prev, summary: data.summary, experience: data.experience }));
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">Resume Builder</h1>

      <div className="grid grid-cols-1 gap-4 bg-white p-6 rounded-lg shadow-sm border">
        <Input name="name" value={form.name} onChange={handleChange} placeholder="Full Name" />
        <Input name="email" value={form.email} onChange={handleChange} placeholder="Email Address" />
        <Input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number" />

        <Textarea name="summary" value={form.summary} onChange={handleChange} placeholder="Professional Summary" rows={4} />
        <Textarea name="education" value={form.education} onChange={handleChange} placeholder="Education" rows={3} />
        <Textarea name="experience" value={form.experience} onChange={handleChange} placeholder="Work Experience" rows={3} />
        <Textarea name="skills" value={form.skills} onChange={handleChange} placeholder="Skills (comma separated)" rows={2} />

        <Textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste the job description here..."
          rows={4}
        />

        <div className="flex gap-4 mt-4">
          <Button onClick={tailorResume} disabled={loading}>
            {loading ? "Tailoring..." : "Tailor Resume with AI"}
          </Button>
          <Button variant="outline" onClick={() => window.print()}>
            Download as PDF
          </Button>
        </div>
      </div>

      <div className="mt-12 p-6 bg-white rounded-lg shadow-sm border">
        <h2 className="text-2xl font-semibold text-gray-800">{form.name}</h2>
        <p className="text-gray-600 mb-4">{form.email} | {form.phone}</p>

        <div className="space-y-4 text-gray-800">
          <section>
            <h3 className="font-bold text-lg border-b pb-1">Summary</h3>
            <p>{form.summary}</p>
          </section>
          <section>
            <h3 className="font-bold text-lg border-b pb-1">Education</h3>
            <p>{form.education}</p>
          </section>
          <section>
            <h3 className="font-bold text-lg border-b pb-1">Experience</h3>
            <p>{form.experience}</p>
          </section>
          <section>
            <h3 className="font-bold text-lg border-b pb-1">Skills</h3>
            <p>{form.skills}</p>
          </section>
        </div>
      </div>
    </div>
  );
}
