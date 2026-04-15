import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { FileText } from "lucide-react";

export type TextSelectionDataCardProps = {
  selectedText: string;
  actionTitle?: string;
  onTextChange?: (text: string) => void;
  isLoading?: boolean;
};

const TextSelectionDataCard = ({
  selectedText,
  actionTitle: _actionTitle,
  isLoading: _isLoading = false,
}: TextSelectionDataCardProps) => {
  const [charCount, setCharCount] = useState(0);
  const [selectedChars, setSelectedChars] = useState(0);
  const [isSelecting, setIsSelecting] = useState(true);

  const lines = useMemo(() => selectedText.split("\n"), [selectedText]);
  const maxLineLength = useMemo(
    () => lines.reduce((max, line) => Math.max(max, line.length), 0),
    [lines]
  );

  const textSizeClass = useMemo(() => {
    if (charCount > 520 || lines.length > 18 || maxLineLength > 95) {
      return "text-[10px] leading-[1.05rem]";
    }
    if (charCount > 360 || lines.length > 14 || maxLineLength > 72) {
      return "text-[11px] leading-[1.1rem]";
    }
    return "text-sm leading-[1.25rem]";
  }, [charCount, lines.length, maxLineLength]);

  useEffect(() => {
    setCharCount(selectedText.length);

    if (!selectedText.length) {
      setSelectedChars(0);
      setIsSelecting(false);
      return;
    }

    setIsSelecting(true);
    setSelectedChars(0);

    const totalChars = selectedText.length;
    const duration = Math.min(700, Math.max(280, totalChars * 3));
    let animationFrame = 0;
    const start = performance.now();

    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(1, elapsed / duration);
      setSelectedChars(Math.floor(progress * totalChars));

      if (progress < 1) {
        animationFrame = window.requestAnimationFrame(animate);
      } else {
        setIsSelecting(false);
      }
    };

    animationFrame = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(animationFrame);
    };
  }, [selectedText]);

  let runningIndex = 0;

  return (
    <motion.div
      className="w-full rounded-2xl p-3 md:p-4 text-left bg-gradient-to-b from-[#15162d] via-[#111426] to-[#0d1020] border border-white/10 shadow-float"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* Minimal app chrome */}
      <div className="flex items-center mb-3">
        <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-[#1f2448] border border-[#2a2f57]">
          <FileText className="w-4 h-4 text-[#a8adff]" />
        </span>
      </div>

      {/* Editor Surface with Fast Selection Playback */}
      <div className="relative mb-3">
        <motion.div
          className="relative overflow-hidden rounded-xl border border-[#2a2f57] bg-[#161a35]"
          animate={isSelecting ? { scale: 1.02 } : { scale: 1 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
        >
          <div className="h-8 px-3 border-b border-[#2a2f57] bg-[#10142c] flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#ff5f57]" />
              <span className="w-2 h-2 rounded-full bg-[#febc2e]" />
              <span className="w-2 h-2 rounded-full bg-[#28c840]" />
            </div>
            <span className="text-[10px] text-[#8e93c7]">selection-preview.ts</span>
            <span className="text-[10px] text-[#6f75ad]">UTF-8</span>
          </div>

          <div
            className={`w-full h-[200px] md:h-[240px] overflow-hidden px-0 py-2 font-mono whitespace-pre-wrap break-words bg-[#161a35] transition-all ${textSizeClass} ${
              isSelecting
                ? "shadow-lg shadow-[#544cff]/15"
                : ""
            }`}
            role="region"
            aria-label="Selected text preview"
          >
            {lines.map((line, index) => {
              const lineStart = runningIndex;
              const lineLength = line.length;
              const lineEnd = lineStart + lineLength;
              const selectedInLine = Math.max(
                0,
                Math.min(selectedChars - lineStart, lineLength)
              );
              runningIndex = lineEnd + 1;

              const selectedPart = line.slice(0, selectedInLine) || "";
              const unselectedPart = line.slice(selectedInLine) || "";
              const lineNumber = String(index + 1).padStart(2, "0");

              return (
                <div
                  key={`${index}-${lineStart}`}
                  className="min-h-0 px-3 grid grid-cols-[2rem_1fr] items-start"
                >
                  <span className="text-[#59609a] select-none pr-3 text-right">
                    {lineNumber}
                  </span>
                  <span className="block min-w-0">
                    <span className="text-[#ecedff] bg-[#5a53ff]/45 rounded-[3px]">
                      {selectedPart}
                    </span>
                    <span className="text-[#ecedff]">{unselectedPart}</span>
                  </span>
                </div>
              );
            })}
          </div>

          {/* Fast sweep effect to mimic drag-select */}
          {isSelecting && (
            <motion.div
              className="absolute left-0 right-0 top-8 bottom-0 pointer-events-none"
              initial={{ opacity: 0.3, x: "-100%" }}
              animate={{ opacity: 0, x: "100%" }}
              transition={{ duration: 0.32, ease: "easeOut" }}
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(84, 76, 255, 0.28) 50%, transparent 100%)",
              }}
            />
          )}

          {isSelecting && (
            <motion.div
              className="absolute top-8 bottom-0 w-[2px] bg-[#8c84ff] pointer-events-none"
              initial={{ x: 0, opacity: 0.9 }}
              animate={{ x: "100%", opacity: 0 }}
              transition={{ duration: 0.32, ease: "easeOut" }}
            />
          )}
        </motion.div>

      </div>
    </motion.div>
  );
};

export default TextSelectionDataCard;
