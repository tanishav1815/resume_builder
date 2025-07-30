"use client";
import * as React from "react";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useRouter } from "next/navigation";





// Add inside your JSX
<div className="flex justify-end p-4">
  <ThemeToggle />
</div>


export default function ResumeBuilder() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    summary: "",
    education: "",
    experience: "",
    skills: "",
  });
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const previewRef = useRef<HTMLDivElement | null>(null);

  const router = useRouter();

<Button onClick={() => router.push("/auth")}>
  Go to Login
</Button>

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const tailorResume = async () => {
    setLoading(true);
    const res = await fetch("/api/tailor-resume", {
      method: "POST",
      body: JSON.stringify({ resume: form, jobDescription }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    setForm((prev) => ({
      ...prev,
      summary: data.summary,
      experience: data.experience,
    }));
    setLoading(false);
    setTimeout(() => {
      previewRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  return (
    <main className="bg-gray-50 min-h-screen py-10 px-4">
      <div className="max-w-screen-md mx-auto">
        <h1 className="text-3xl font-bold text-center mb-10">
          🎯 AI Resume Builder
        </h1>

        {/* Form */}
        <div className="bg-white p-6 rounded-lg shadow-lg space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label>Name</Label>
              <Input name="name" value={form.name} onChange={handleChange} />
            </div>
            <div>
              <Label>Email</Label>
              <Input name="email" value={form.email} onChange={handleChange} />
            </div>
            <div className="sm:col-span-2">
              <Label>Phone</Label>
              <Input name="phone" value={form.phone} onChange={handleChange} />
            </div>
          </div>

          <div>
            <Label>Summary</Label>
            <Textarea
              name="summary"
              value={form.summary}
              onChange={handleChange}
              rows={3}
            />
          </div>
          <div>
            <Label>Education</Label>
            <Textarea
              name="education"
              value={form.education}
              onChange={handleChange}
              rows={3}
            />
          </div>
          <div>
            <Label>Experience</Label>
            <Textarea
              name="experience"
              value={form.experience}
              onChange={handleChange}
              rows={4}
            />
          </div>
          <div>
            <Label>Skills</Label>
            <Textarea
              name="skills"
              value={form.skills}
              onChange={handleChange}
              rows={3}
            />
          </div>
          <div>
            <Label>Paste Job Description</Label>
            <Textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              rows={4}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Button onClick={tailorResume} disabled={loading} className="w-full">
              {loading ? "Tailoring..." : "Tailor with AI ✨"}
            </Button>
            <Button
              variant="outline"
              onClick={() => window.print()}
              className="w-full"
            >
              Download as PDF 📄
            </Button>
          </div>
        </div>

        {/* Preview */}
        <motion.div
          ref={previewRef}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-12 scroll-mt-24"
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Preview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p>
                <strong>{form.name}</strong> • {form.email} • {form.phone}
              </p>
              <div>
                <h2 className="text-lg font-medium">Summary</h2>
                <p>{form.summary}</p>
              </div>
              <div>
                <h2 className="text-lg font-medium">Education</h2>
                <p>{form.education}</p>
              </div>
              <div>
                <h2 className="text-lg font-medium">Experience</h2>
                <p>{form.experience}</p>
              </div>
              <div>
                <h2 className="text-lg font-medium">Skills</h2>
                <p>{form.skills}</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </main>
  );
}
