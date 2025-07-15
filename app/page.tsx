"use client";
import * as React from "react";


import { useState } from 'react';
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
    <div className="max-w-3xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Resume Builder</h1>
      <div className="space-y-4">
        <Input placeholder="Name" name="name" value={form.name} onChange={handleChange} />
        <Input placeholder="Email" name="email" value={form.email} onChange={handleChange} />
        <Input placeholder="Phone" name="phone" value={form.phone} onChange={handleChange} />
        <Textarea placeholder="Summary" name="summary" value={form.summary} onChange={handleChange} />
        <Textarea placeholder="Education" name="education" value={form.education} onChange={handleChange} />
        <Textarea placeholder="Experience" name="experience" value={form.experience} onChange={handleChange} />
        <Textarea placeholder="Skills" name="skills" value={form.skills} onChange={handleChange} />

        <Textarea placeholder="Paste Job Description Here..." value={jobDescription} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setJobDescription(e.target.value)} />

        <Button onClick={tailorResume} disabled={loading}>{loading ? "Tailoring..." : "Tailor Resume with AI"}</Button>
        <Button onClick={() => window.print()}>Download as PDF</Button>
      </div>

      <div className="mt-12 p-6 border rounded-lg bg-white shadow">
        <h2 className="text-xl font-semibold mb-2">{form.name}</h2>
        <p>{form.email} | {form.phone}</p>
        <h3 className="font-bold mt-4">Summary</h3>
        <p>{form.summary}</p>
        <h3 className="font-bold mt-4">Education</h3>
        <p>{form.education}</p>
        <h3 className="font-bold mt-4">Experience</h3>
        <p>{form.experience}</p>
        <h3 className="font-bold mt-4">Skills</h3>
        <p>{form.skills}</p>
      </div>
    </div>
  );
}
