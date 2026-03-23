import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface RollingTextProps {
  text: string;
  className?: string;
  duration?: number; // total duration in seconds (default: 2)
  charsPerSecond?: number; // animation speed (default: 15)
}

// Random character set for the rolling animation
const RANDOM_CHARS = "@#$%^&()*!@#$%^&()";

const RollingText: React.FC<RollingTextProps> = ({
  text,
  className = "",
  duration = 2,
  charsPerSecond = 15,
}) => {
  const [displayText, setDisplayText] = useState<string[]>(
    text.split("").map(() => RANDOM_CHARS[Math.floor(Math.random() * RANDOM_CHARS.length)])
  );

  useEffect(() => {
    const totalChars = text.length;
    const delayBetweenChars = 1000 / charsPerSecond; // milliseconds between character reveals

    let charIndex = 0;
    const interval = setInterval(() => {
      if (charIndex < totalChars) {
        setDisplayText((prev) =>
          prev.map((char, index) =>
            index < charIndex ? text[index] : RANDOM_CHARS[Math.floor(Math.random() * RANDOM_CHARS.length)]
          )
        );
        charIndex++;
      } else {
        clearInterval(interval);
      }
    }, delayBetweenChars);

    return () => clearInterval(interval);
  }, [text, charsPerSecond]);

  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={className}
    >
      {displayText.map((char, index) => (
        <span key={index} className="inline">
          {char}
        </span>
      ))}
    </motion.span>
  );
};

export default RollingText;
