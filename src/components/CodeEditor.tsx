"use client";
import { CODING_QUESTIONS, LANGUAGES } from "@/constants";
import { useState, useEffect, useCallback } from "react";
import { executeCode } from "@/lib/piston";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./ui/resizable";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { AlertCircleIcon, BookIcon, LightbulbIcon } from "lucide-react";
import { Button } from "./ui/button";
import Editor from "@monaco-editor/react";
import debounce from "lodash.debounce";
import { useCall } from "@stream-io/video-react-sdk"; 

function CodeEditor() {
  const call = useCall(); 

  const [selectedQuestion, setSelectedQuestion] = useState(CODING_QUESTIONS[0]);
  const [language, setLanguage] = useState<"javascript" | "python" | "java">(
    LANGUAGES[0].id
  );
  const [code, setCode] = useState(selectedQuestion.starterCode[language]);
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // 🧠 Debounced real-time broadcast
  const broadcastChange = useCallback(
    debounce((payload: any) => {
      call?.sendCustomEvent({ type: "editor-sync", data: payload });
    }, 300),
    [call]
  );

  // 🧠 Handle code edit
  const handleCodeChange = (v?: string) => {
    const newCode = v ?? "";
    setCode(newCode);
    broadcastChange({ code: newCode, language });
  };

  // 🧠 Listen for custom Stream events
  useEffect(() => {
    if (!call) return;

    const onCustomEvent = (event: any) => {
      if (event.type !== "editor-sync") return;
      const data = event.data || {};

      // Update shared state safely
      if (data.language && data.language !== language)
        setLanguage(data.language);
      if (data.code && data.code !== code) setCode(data.code);
      if (data.output !== undefined) setOutput(data.output);
      if (data.error !== undefined) setError(data.error);
    };

    call.on("custom", onCustomEvent);
    return () => call.off("custom", onCustomEvent);
  }, [call, code, language]);

  // --- Local storage persistence
  useEffect(() => {
    const savedLang = localStorage.getItem("selectedLanguage");
    const savedCode = localStorage.getItem("editorCode");
    if (savedLang) setLanguage(savedLang as "javascript" | "python" | "java");
    if (savedCode) setCode(savedCode);
  }, []);

  useEffect(() => {
    localStorage.setItem("selectedLanguage", language);
    localStorage.setItem("editorCode", code);
  }, [language, code]);

  // --- Question change
  const handleQuestionChange = (questionId: string) => {
    const question = CODING_QUESTIONS.find((q) => q.id === questionId)!;
    setSelectedQuestion(question);
    const starter = question.starterCode[language];
    setCode(starter);
    broadcastChange({ code: starter, language });
    setOutput("");
    setError("");
  };

  // --- Language change
  const handleLanguageChange = (
    newLanguage: "javascript" | "python" | "java"
  ) => {
    setLanguage(newLanguage);
    const starter = selectedQuestion.starterCode[newLanguage];
    setCode(starter);
    broadcastChange({ code: starter, language: newLanguage });
    setOutput("");
    setError("");
  };

  // --- Run code
  const runCode = async () => {
    setLoading(true);
    setError("");
    setOutput("");

    try {
      const result = await executeCode(language, code);
      if (result.success) {
        setOutput(result.output ?? "");
        broadcastChange({
          code,
          language,
          output: result.output ?? "",
          error: "",
        });
      } else {
        const err = result.error || "Error executing code.";
        setError(err);
        broadcastChange({
          code,
          language,
          output: "",
          error: err,
        });
      }
    } catch {
      const err = "Unexpected error occurred.";
      setError(err);
      broadcastChange({ code, language, output: "", error: err });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ResizablePanelGroup
      direction="vertical"
      className="min-h-[calc(100vh-4rem-1px)]"
    >
      {/* QUESTION SECTION */}
      <ResizablePanel>
        <ScrollArea className="h-full">
          <div className="p-6">
            <div className="max-w-4xl mx-auto space-y-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-semibold tracking-tight">
                      {selectedQuestion.title}
                    </h2>
                    {selectedQuestion.difficulty && (
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          selectedQuestion.difficulty === "Easy"
                            ? "bg-green-500/20 text-green-400"
                            : selectedQuestion.difficulty === "Medium"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {selectedQuestion.difficulty}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Choose your language and solve the problem
                  </p>
                </div>

                {/* Dropdowns */}
                <div className="flex items-center gap-3">
                  <Select
                    value={selectedQuestion.id}
                    onValueChange={handleQuestionChange}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select question" />
                    </SelectTrigger>
                    <SelectContent>
                      {CODING_QUESTIONS.map((q) => (
                        <SelectItem key={q.id} value={q.id}>
                          {q.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={language} onValueChange={handleLanguageChange}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue>
                        <div className="flex items-center gap-2">
                          <img
                            src={`/${language}.png`}
                            alt={language}
                            className="w-5 h-5 object-contain"
                          />
                          {LANGUAGES.find((l) => l.id === language)?.name}
                        </div>
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {LANGUAGES.map((lang) => (
                        <SelectItem key={lang.id} value={lang.id}>
                          <div className="flex items-center gap-2">
                            <img
                              src={`/${lang.id}.png`}
                              alt={lang.name}
                              className="w-5 h-5 object-contain"
                            />
                            {lang.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Problem Description */}
              <Card>
                <CardHeader className="flex flex-row items-center gap-2">
                  <BookIcon className="h-5 w-5 text-primary/80" />
                  <CardTitle>Problem Description</CardTitle>
                </CardHeader>
                <CardContent className="text-sm leading-relaxed">
                  <p className="whitespace-pre-line">
                    {selectedQuestion.description}
                  </p>
                </CardContent>
              </Card>

              {/* Examples */}
              <Card>
                <CardHeader className="flex flex-row items-center gap-2">
                  <LightbulbIcon className="h-5 w-5 text-yellow-500" />
                  <CardTitle>Examples</CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedQuestion.examples.map((example, index) => (
                    <div key={index} className="mb-4">
                      <p className="font-medium text-sm">
                        Example {index + 1}:
                      </p>
                      <pre className="bg-muted/50 p-3 rounded-lg text-sm font-mono">
                        Input: {example.input}
                        <br />
                        Output: {example.output}
                        {example.explanation && (
                          <>
                            <br />
                            <span className="text-muted-foreground">
                              Explanation: {example.explanation}
                            </span>
                          </>
                        )}
                      </pre>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Constraints */}
              {selectedQuestion.constraints && (
                <Card>
                  <CardHeader className="flex flex-row items-center gap-2">
                    <AlertCircleIcon className="h-5 w-5 text-blue-500" />
                    <CardTitle>Constraints</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc list-inside space-y-1.5 text-sm marker:text-muted-foreground">
                      {selectedQuestion.constraints.map((c, i) => (
                        <li key={i} className="text-muted-foreground">
                          {c}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
          <ScrollBar />
        </ScrollArea>
      </ResizablePanel>

      <ResizableHandle withHandle />

      {/* CODE EDITOR + RUN PANEL */}
      <ResizablePanel defaultSize={60} minSize={25}>
        <div className="flex flex-col h-full bg-[#1e1e1e]">
          {/* Code Editor */}
          <div className="flex-1 overflow-hidden">
            <Editor
              key={language}
              height="100%"
              language={language}
              theme="vs-dark"
              value={code}
              onChange={handleCodeChange}
              options={{
                minimap: { enabled: false },
                fontSize: 18,
                lineNumbers: "on",
                scrollBeyondLastLine: false,
                automaticLayout: true,
                padding: { top: 16, bottom: 16 },
                wordWrap: "on",
                wrappingIndent: "indent",
              }}
            />
          </div>

          {/* Run Panel */}
          <div className="border-t border-zinc-700 p-3 bg-zinc-900 flex flex-col">
            <Button onClick={runCode} disabled={loading}>
              {loading ? "Running..." : "Run Code"}
            </Button>

            {(output || error) && (
              <pre
                className={`mt-3 p-3 rounded-md text-sm overflow-auto max-h-40 transition-all duration-300 ${
                  error ? "bg-red-950 text-red-400" : "bg-black text-green-400"
                }`}
              >
                {error || output}
              </pre>
            )}
          </div>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

export default CodeEditor;
