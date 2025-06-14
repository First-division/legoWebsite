import { useEffect, useRef, useState } from "react";
import "../styles/scrollArrow.css"; // Ensure you have the appropriate styles for the scroll arrow

function ScrollArrow() {
  const [atBottom, setAtBottom] = useState(false);
  const arrowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrolledToBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 2;
      setAtBottom(scrolledToBottom);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={arrowRef}
      className={`scroll-arrow${atBottom ? " at-bottom" : ""}`}
      style={{
        position: "fixed",
        left: "50%",
        bottom: "32px",
        transform: "translateX(-50%)",
        zIndex: 10,
        pointerEvents: "none",
        transition: "opacity 0.4s",
      }}
    >
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        style={{
          display: "block",
        }}
      >
        <polygon
          points="24,36 12,20 36,20"
          fill="#888"
          style={{
            filter: "drop-shadow(0 2px 4px rgba(235, 223, 223, 0.2))",
          }}
        />
      </svg>
    </div>
  );
}

export default ScrollArrow;